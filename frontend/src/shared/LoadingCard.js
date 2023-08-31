import styled, {keyframes} from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  flex-wrap: wrap;
`;

const GradientAnimation = keyframes` 
  0% {background-position: 0% 100%;}
  100% {background-position: 100% 0%;}
`
const GradientDelay = keyframes` 
  0%, 100% {background-position: 0% 100%;}
  50% {background-position: 100% 0%;}
`

const LoadingBlock = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  width:230px;
  height:350px;
  background-color: rgb(184, 184, 184);
  margin: 10px;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #b1b1b1 0%, #f0f0f0 50%, #b1b1b1 100%);
  background-size: 200% 200%;
  animation: ${GradientAnimation} 1s linear infinite, ${GradientDelay} 1s linear infinite;
`

const LoadingCard = () => {
  const cardsCounterArr = [1,1,1,1,1,1,];
  return (
    <LoadingContainer>
      {cardsCounterArr.map(() => <LoadingBlock><div></div></LoadingBlock>)}
    </LoadingContainer>
  );
};

export default LoadingCard;
