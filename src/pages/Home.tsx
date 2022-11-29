import { Input, Text, Button, Row, Column, Logo, Icon } from 'components';
import { List } from 'components/List';
import { Fragment, useCallback, useMemo, useState } from 'react';

const SECONDS_DEFAULT = 5;

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);
  const [seconds, setSeconds] = useState(SECONDS_DEFAULT);
  const [timer, setTimer] = useState<any>();
  const [stage, setStage] = useState('ready');

  const handleOKButton = () => {
    if (!taskName) return;

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });

    setTaskName('');
  };

  const secondsToTime = (secs: number) => {
    const divisorMinute = secs % 3600;

    const minutes = Math.floor(divisorMinute / 60);
    const seconds = Math.floor(divisorMinute % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    setStage('in_progress');

    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          setTimer(undefined);
          setStage('finished');
          return 0;
        }
        return previousSeconds - 1;
      });
    }, 1000);

    setTimer(timerInterval);
  };

  const handleRestartButton = useCallback(() => {
    setStage('ready');
    setSeconds(SECONDS_DEFAULT);
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handlePauseButton = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handleStopButton = useCallback(() => {
    handlePauseButton();
    setSeconds(SECONDS_DEFAULT);
    setStage('ready');
  }, [handlePauseButton]);

  const handleStageStatus = useMemo(() => {
    switch (stage) {
      case 'ready':
        return 'Ready';

      case 'in_progress':
        return 'Time to work';

      case 'finished':
        return 'Finished';

      default:
        return 'Ready';
    }
  }, [stage]);

  const handleStageButtons = useMemo(() => {
    switch (stage) {
      case 'ready':
        return (
          <Fragment>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" fontSize={'bodyExtraLarge'} color="primary" fontWeight={'bold'}>
                {'Start'.toUpperCase()}
              </Text>
            </Button>
          </Fragment>
        );

      case 'in_progress':
        return (
          <Fragment>
            <Row py={'20px'}>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={startTimer}>
                <Icon variant="play" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handlePauseButton}>
                <Icon variant="pause" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleStopButton}>
                <Icon variant="stop" />
              </Button>
            </Row>
          </Fragment>
        );

      case 'finished':
        return (
          <Fragment>
            <Row py={'20px'}>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleRestartButton}>
                <Icon variant="restart" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px">
                <Icon variant="done" />
              </Button>
            </Row>
          </Fragment>
        );

      default:
        return (
          <Fragment>
            <Button variant="primary" onClick={() => startTimer()}>
              <Text fontFamily="secondary" fontSize={'bodyExtraLarge'} color="primary" fontWeight={'bold'}>
                {'Start'.toUpperCase()}
              </Text>
            </Button>
          </Fragment>
        );
    }
  }, [handlePauseButton, handleStopButton, handleRestartButton, stage]);

  return (
    <Column width="600px" margin="0 auto">
      <Column py={'25px'} width="100%" alignItems="center">
        <Logo />
      </Column>

      <Column width="100%" minHeight="300px" bg="rgba(225, 225, 225, 0.1)" borderRadius="4px" alignItems={'center'}>
        <Text fontSize={'bodyExtraLarge'} fontFamily="secondary">
          {handleStageStatus}
        </Text>
        <Text fontFamily={'secondary'} fontWeight={'bold'} fontSize={'displayExtraLarge'}>
          {secondsToTime(seconds)}
        </Text>

        {handleStageButtons}
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
