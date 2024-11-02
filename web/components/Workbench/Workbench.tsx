import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { useEffect } from 'react';
import { useJsonSigning } from '@/lib/client/useJsonSigning';

export function Workbench({ connected, publicKey }: any) {
    const { signJson, isReady } = useJsonSigning();

    useEffect(() => {
        if(!isReady || !publicKey) {
            console.log('NRR Not ready');
        };
        const f = async () => {
            const payload = await signJson({});
            const r = await fetch("/api/auth", {
                method: 'POST',
                body: JSON.stringify({
                    user: publicKey.toBase58(),
                    payload
                })
            });
            console.log('RRR', r);
        };
        f();
    }, [publicKey]);

    return (
    <>
      <Text>Connected {publicKey.toBase58()}</Text>
    </>
  );
}