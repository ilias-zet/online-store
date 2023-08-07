import "./LoadingCard.css";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  /* margin-left: 25%; */
  min-height: 100%;
  flex-wrap: wrap;
`;



const LoadingCard = ({ loadingCardFor }) => {
  return (
    <LoadingContainer>
      <div className="loading-block">
        <div className="loader"></div>
      </div>
      <div className="loading-block">
        <div className="loader"></div>
      </div>
      <div className="loading-block">
        <div className="loader"></div>
      </div>
      <div className="loading-block">
        <div className="loader"></div>
      </div>
      <div className="loading-block">
        <div className="loader"></div>
      </div>
      <div className="loading-block">
        <div className="loader"></div>
      </div>
    </LoadingContainer>
  );
};

export default LoadingCard;
