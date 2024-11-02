import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';

export interface SignedPayload<T> {
  data: {
    data: T;
    timestamp: number;
  };
  signature: string;
  signer: string;
}

export interface VerificationResult<T> {
  isValid: boolean;
  signerPublicKey: PublicKey;
  data: T;
}

/**
 * Checks if a timestamp is within the allowed age
 */
const isTimestampValid = (timestamp: number, maxAge: number): boolean => {
  return Date.now() - timestamp < maxAge;
};

/**
 * Converts a message object to bytes for verification
 */
const messageToBytes = (message: any): Uint8Array => {
  const messageString = JSON.stringify(message, Object.keys(message).sort());
  return new TextEncoder().encode(messageString);
};

/**
 * Converts a base64 signature to bytes
 */
const signatureToBytes = (signature: string): Uint8Array => {
  return Uint8Array.from(Buffer.from(signature, 'base64'));
};

/**
 * Verifies a signed payload
 */
export const verifySignedJson = async <T>(
  signedPayload: SignedPayload<T>,
  maxAge: number = 1000 * 60 * 5 // 5 minutes default
): Promise<VerificationResult<T>> => {
  const { data, signature, signer } = signedPayload;

  if (!isTimestampValid(data.timestamp, maxAge)) {
    throw new Error('Signature has expired');
  }

  const messageBytes = messageToBytes(data);
  const signatureBytes = signatureToBytes(signature);
  const signerPublicKey = new PublicKey(signer);

  const isValid = nacl.sign.detached.verify(
    messageBytes,
    signatureBytes,
    signerPublicKey.toBytes()
  );

  return {
    isValid,
    signerPublicKey,
    data: data.data
  };
};

/**
 * Verifies a signed payload against a specific public key
 */
export const verifySignerIs = async <T>(
  signedPayload: SignedPayload<T>,
  expectedSigner: string | PublicKey,
  maxAge?: number
): Promise<{ isValid: boolean; data: T }> => {
  const result = await verifySignedJson(signedPayload, maxAge);
  const expectedPublicKey = typeof expectedSigner === 'string' 
    ? new PublicKey(expectedSigner)
    : expectedSigner;

  return {
    isValid: result.isValid && result.signerPublicKey.equals(expectedPublicKey),
    data: result.data
  };
};