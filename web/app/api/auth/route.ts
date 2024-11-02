import type { SignedPayload } from '@/lib/server/verify';
import { NextRequest, NextResponse } from 'next/server';
import { verifySignerIs }  from '@/lib/server/verify';
import { sql } from "@vercel/postgres";
const crypto = require('crypto');

function generateSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

interface PayloadData {
    message: string;
    // Add any other fields you expect in the payload
  }
  
  interface RequestQuery {
    user: string;
    payload: SignedPayload<PayloadData>;
  }

  export async function POST(request: NextRequest) {
    try {
      // Parse request body
      const body = await request.json();
      const { user, payload: signedPayloadStr } = body;
  
      // Validate required fields
      if (!user || !signedPayloadStr) {
        return NextResponse.json(
          { error: true, message: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      // Parse the signed payload
      let signedPayload: SignedPayload<any>;
      try {
        signedPayload = body.payload;
      } catch (error) {
        return NextResponse.json(
          { error: true, message: 'Invalid payload format' },
          { status: 400 }
        );
      }
  
      // Verify the signature
      const isValid = await verifySignerIs(signedPayload, user);
  
      if (!isValid) {
        return NextResponse.json(
          { error: true, message: 'Invalid signature' },
          { status: 400 }
        );
      }
  
      // Return success response
      let token;
      const { rows } = await sql`SELECT * FROM users WHERE publickey=${user};`;
      if(rows.length===0) {
        const result = await sql`
        INSERT INTO users (publickey) 
        VALUES (${user})
        ON CONFLICT (publickey) DO NOTHING
        RETURNING publickey;
    `;
      }
      token = generateSessionId();
      const result = await sql`
          INSERT INTO sessions (token, user_publickey) 
          VALUES (${token}, ${user}) 
          RETURNING token;
      `;

      return NextResponse.json({
        error: false,
        message: { token }
      });
  
    } catch (error) {
      console.error('Route error:', error);
      return NextResponse.json(
        { error: true, message: 'Server error' },
        { status: 500 }
      );
    }
  }