import {
  Box,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLeaderboard } from '../../../classes/CheckerAreaController';
import { useCheckerAreaController } from '../../../classes/TownController';
import useTownController from '../../../hooks/useTownController';
import CheckerAreaInteractable from './CheckerArea';

export default function CheckerLeaderboardModal({
  isLeaderboardOpen,
  checkerArea,
  closeLeaderboard,
}: {
  isLeaderboardOpen: boolean;
  checkerArea: CheckerAreaInteractable;
  closeLeaderboard: () => void;
}) {
  const townController = useTownController();
  const checkerAreaController = useCheckerAreaController(checkerArea.name);
  const leaderboard = useLeaderboard(checkerAreaController);

  useEffect(() => {
    if (isLeaderboardOpen) {
      townController
        .getCheckerLeaderboard(checkerAreaController)
        .then(newLeaderboard => (checkerAreaController.leaderboard = newLeaderboard));
    }
  }, [checkerAreaController, isLeaderboardOpen, townController]);

  return (
    <Modal isOpen={isLeaderboardOpen} onClose={closeLeaderboard}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Leaderboard</ModalHeader>
        <ModalCloseButton onClick={closeLeaderboard} />
        <ModalBody>
          <Grid templateColumns='repeat(4, 1fr)' boxShadow='dark-lg'>
            <GridItem pl='1'>Position</GridItem>
            <GridItem>PlayerId</GridItem>
            <GridItem>Wins</GridItem>
            <GridItem>Losses</GridItem>
          </Grid>
          {leaderboard.length > 0 ? (
            <Grid templateColumns='repeat(4, 1fr)' boxShadow='dark-lg'>
              <GridItem>
                {leaderboard.map(player => (
                  <Box
                    pl='1'
                    key={player.playerId}
                    bgColor={player.position % 2 != 0 ? 'gray.100' : 'white'}>
                    {player.position}
                  </Box>
                ))}
              </GridItem>
              <GridItem>
                {leaderboard.map(player => (
                  <Box
                    pl='1'
                    key={player.playerId}
                    bgColor={player.position % 2 != 0 ? 'gray.100' : 'white'}>
                    {player.playerId}
                  </Box>
                ))}
              </GridItem>
              <GridItem>
                {leaderboard.map(player => (
                  <Box
                    key={player.playerId}
                    bgColor={player.position % 2 != 0 ? 'gray.100' : 'white'}>
                    {player.wins}
                  </Box>
                ))}
              </GridItem>
              <GridItem>
                {leaderboard.map(player => (
                  <Box
                    key={player.losses}
                    bgColor={player.position % 2 != 0 ? 'gray.100' : 'white'}>
                    {player.playerId}
                  </Box>
                ))}
              </GridItem>
            </Grid>
          ) : (
            <Grid>
              <GridItem pl='1'>No one has played checkers in this area yet.</GridItem>
            </Grid>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' onClick={closeLeaderboard}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
