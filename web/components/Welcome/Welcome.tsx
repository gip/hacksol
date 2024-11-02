import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { useWallet } from '@solana/wallet-adapter-react';

export function Welcome() {

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
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Hacksol
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>
      {connected && <Text>Connected</Text>}
      {!connected && <Text>Disconnected</Text>}
    </>
  );
}