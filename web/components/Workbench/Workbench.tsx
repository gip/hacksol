import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { useWallet } from '@solana/wallet-adapter-react';

export function Workbench() {

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
      {connected && <Text>Connected</Text>}
      {!connected && <Text>Disconnected</Text>}
    </>
  );
}