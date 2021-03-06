import React from 'react';
import styled from 'styled-components';

const YellowDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 36%;
  width: 28%;
  height: 35vh;
  border-radius: 3vh;
  background-color: yellow;
  box-shadow: 0.306vh 0.306vh black;
  animation: fadein 1s;
  -moz-animation: fadein 1s;
  -webkit-animation: fadein 1s;
  -o-animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const WarningComment = styled.div`
  position: absolute;
`

export default function YelloCard() {
  return (
    <div>
      <YellowDiv></YellowDiv>
      <WarningComment>
        <p>부적절한 행위 및 언행으로 경고 1회를 받으셨습니다.</p>
        <p>경고 2회 누적 시 강퇴 및 재입장이 불가합니다.</p>
      </WarningComment>
    </div>);
}
