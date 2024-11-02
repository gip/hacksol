import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Workbench({ connected, publicKey }: any) {


    return (
    <>
      <Text>Connected {publicKey.toBase58()}</Text>
    </>
  );
}