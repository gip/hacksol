import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import type { SignedPayload } from '../server/verify';

export const useJsonSigning = () => {
  const { publicKey, signMessage } = useWallet();

  const signJson = useCallback(async <T>(data: T): Promise<SignedPayload<T>> => {
    if (!publicKey || !signMessage) {
      throw new Error('Wallet not connected');
    }

    try {
      // Add timestamp to prevent replay attacks
      const payloadToSign = {
        data,
        timestamp: Date.now(),
      };

      // Create a deterministic string representation of the data
      const messageString = JSON.stringify(payloadToSign, Object.keys(payloadToSign).sort());
      const messageBytes = new TextEncoder().encode(messageString);

      // Sign the message
      const signature = await signMessage(messageBytes);

      // Create the signed payload
      return {
        data: payloadToSign,
        signature: Buffer.from(signature).toString('base64'),
        signer: publicKey.toBase58()
      };
    } catch (error) {
      console.error('Error signing JSON:', error);
      throw error;
    }
  }, [publicKey, signMessage]);

  return {
    signJson,
    isReady: !!publicKey && !!signMessage
  };
};