import React from 'react';
import styled from 'styled-components';
import { MyScreenDiv } from '../Main.style';
import { useSelector } from 'react-redux';
import UserVideoComponent from '../../../../../pages/Room/UserVideoComponent';

const QuestionMyScreen = styled.div`
  width: 15vw;
  height: 23vh;
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: 1vh;
  display: Flex;
  direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 1vw;
`;

export default function MyScreen() {
  const { publisher, mainStreamManager } = useSelector(state => ({
    publisher: state.MeetingRoom.publisher,
    mainStreamManager: state.MeetingRoom.mainStreamManager,
  }));

  return (
    <MyScreenDiv>
      <QuestionMyScreen>
        {publisher === undefined ? (
          <UserVideoComponent streamManager={mainStreamManager} />
        ) : (
          <UserVideoComponent streamManager={publisher} />
        )}
      </QuestionMyScreen>
    </MyScreenDiv>
  );
}
