import { Grid, Text } from "@mantine/core";
import { GoalCard } from "@/components/GoalCard/GoalCard";
import { Goal } from "@/types/Goal";

interface GoalGridProps {
  goals: Goal[];
}

export function GoalGrid({ goals }: GoalGridProps) {
  if (goals.length === 0) {
    return (
      <Text ta="center" c="dimmed" mt="xl">
        There are no goals. Click "Add Goal" to get started.
      </Text>
    );
  }
  return (
    <Grid justify="center" align="stretch" gutter={{ base: 30 }} mt={30}>
      {goals.map((goal, index) => (
        <Grid.Col span={3} key={index}>
          <GoalCard goal={goal} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
