'use client';

import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { useWallet } from '@solana/wallet-adapter-react';
import { Welcome } from '@/components/Welcome/Welcome';
import { Workbench } from '@/components/Workbench/Workbench';

export function Home() {

    const { 
        publicKey,
        connected,
        connecting,
        disconnecting,
        select,
        disconnect,
        wallet,
        wallets,
        signMessage,
        signTransaction 
    } = useWallet();


    return (
    <>
      {connected && <Workbench />}
      {!connected && <Welcome />}
    </>
  );
}