import { Input, Text, Button, Row, Column, Logo, Icon } from 'components';
import { List } from 'components/List';
import { useState } from 'react';

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);

  const handleOKButton = () => {
    if (!taskName) return;
    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });
    setTaskName('');
  };

  return (
    <Column width="600px" margin="0 auto">
      <Column py={'25px'} width="100%" alignItems="center">
        <Logo />
      </Column>

      <Column width="100%" minHeight="300px" bg="rgba(225, 225, 225, 0.1)" borderRadius="4px" alignItems={'center'}>
        <Text fontSize={'bodyExtraLarge'} fontFamily="secondary">
          Ready
        </Text>
        <Text fontFamily={'secondary'} fontWeight={'bold'} fontSize={'displayExtraLarge'}>
          25:00
        </Text>

        <Button variant="primary">
          <Text fontFamily="secondary" fontSize={'bodyExtraLarge'} color="primary" fontWeight={'bold'}>
            {'start'.toUpperCase()}
          </Text>
        </Button>

        <Row py={'20px'}>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="play" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="pause" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="stop" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="restart" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="done" />
          </Button>
        </Row>
      </Column>

      <Text fontWeight={'bold'} fontSize="bodyLarge" my="10px" pl={'10px'}>
        Tasks
      </Text>
      <Row width="100%">
        <Input
          flex={1}
          placeholder="Enter a task name here"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <Button onClick={handleOKButton}>OK</Button>
      </Row>
      <List items={tasks} />
    </Column>
  );
};
