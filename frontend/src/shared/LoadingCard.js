import "../App.css";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  flex-wrap: wrap;
`;



const LoadingCard = () => {
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
