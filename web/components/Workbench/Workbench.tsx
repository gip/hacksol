import { Container, Text, Button, Group, Tabs, rem } from "@mantine/core";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  IconTarget,
  IconCrystalBall,
  IconPlus,
} from "@tabler/icons-react";
import { Goal } from "@/types/Goal";
import { Oracle } from "@/types/Oracle";
import { AddGoalModal } from "@/components/AddGoalModal/AddGoalModal";
import { AddOracleModal } from "@/components/AddOracleModal/AddOracleModal";
import { GoalGrid } from "@/components/GoalGrid/GoalGrid";
import { OracleGrid } from "@/components/OracleGrid/OracleGrid";
import { useState } from "react";

export function Workbench() {
  const [goalModalOpened, setGoalModalOpened] = useState(false);
  const [oracleModalOpened, setOracleModalOpened] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [oracles, setOracles] = useState<Oracle[]>([]);

  const { connected } = useWallet();

  const iconStyle = { width: rem(12), height: rem(12) };

  const handleSubmitGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
    setGoalModalOpened(false);
  };

  const handleSubmitOracle = (newOracle: Oracle) => {
    if (!oracles.some(oracle => oracle.id === newOracle.id)) {
      setOracles([...oracles, newOracle]);
    }
    setOracleModalOpened(false);
  };

  if (!connected) {
    return <Text ta="center" p="md">Disconnected</Text>;
  }

  return (
    <Container size="80rem" px={0}>
      <AddGoalModal
        opened={goalModalOpened}
        onClose={() => setGoalModalOpened(false)}
        onSubmit={handleSubmitGoal}
      />

      <AddOracleModal
        opened={oracleModalOpened}
        onClose={() => setOracleModalOpened(false)}
        onSubmit={handleSubmitOracle}
      />

      <Tabs defaultValue="goals">
        <Group justify="space-between" mb="md">
          <Tabs.List>
            <Tabs.Tab
              value="goals"
              leftSection={<IconTarget style={iconStyle} />}
            >
              Goals
            </Tabs.Tab>
            <Tabs.Tab
              value="oracles"
              leftSection={<IconCrystalBall style={iconStyle} />}
            >
              Oracles
            </Tabs.Tab>
          </Tabs.List>

          <Group>
            <Tabs.Panel value="goals">
              <Button
                size="sm"
                leftSection={<IconTarget style={iconStyle} />}
                onClick={() => setGoalModalOpened(true)}
              >
                Add Goal
              </Button>
            </Tabs.Panel>

            <Tabs.Panel value="oracles">
              <Button
                size="sm"
                leftSection={<IconPlus style={iconStyle} />}
                onClick={() => setOracleModalOpened(true)}
              >
                Add Oracle
              </Button>
            </Tabs.Panel>
          </Group>
        </Group>

        <Tabs.Panel value="goals">
          <GoalGrid goals={goals} />
        </Tabs.Panel>

        <Tabs.Panel value="oracles">
          <OracleGrid oracles={oracles} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}