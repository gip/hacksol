import { Table, Group, Text, Image, Avatar } from '@mantine/core';
import { Oracle } from '@/types/Oracle';

interface OracleGridProps {
  oracles: Oracle[];
}

export function OracleGrid({ oracles }: OracleGridProps) {
  if (oracles.length === 0) {
    return (
      <Text ta="center" c="dimmed" mt="xl">
        There are no oracles selected. Click "Add Oracle" to get started.
      </Text>
    );
  }

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Oracle</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {oracles.map((oracle) => (
          <Table.Tr key={oracle.id}>
            <Table.Td>
              <Group gap="sm">
                <Avatar 
                  src={oracle.imageUrl} 
                  size="md" 
                  radius="sm"
                />
                <Text fw={500}>{oracle.title}</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text size="sm" c="dimmed">
                {oracle.description}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm" c="green">Active</Text>
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                {/* Aquí puedes agregar botones de acción */}
                {/* Por ejemplo: View, Edit, Delete */}
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}