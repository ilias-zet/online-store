import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  width: 80%;
  height: 100%;
  padding: 20px;
  border: 1px solid rgb(229 229 229 / 16%);
  background-color: rgb(48, 48, 48);
`;

const MessageBlock = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid rgb(229 229 229 / 16%);
  background-color: #1a1a1a;
`;

const SendMessageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  border: 1px solid rgb(229 229 229 / 16%);
  background-color: #1a1a1a;
  padding: 16px;
  gap: 8px;
`;

const InputMsg = styled.input`
  width: 80%;
  height: 100%;
  padding: 8px;
  background-color: rgb(48, 48, 48);
  border: none;
`;

const SendMsgBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  background-color: rgb(44, 101, 71);
`;

const MessageContainer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
  justify-content: ${({ sender }) =>
    sender ? "flex-end" : "flex-start"};
  width: 100%;
  min-height: 32px;
  padding: 16px;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 75px;
  max-width: 250px;
  border: 1px solid rgb(229 229 229 / 16%);
  border-radius: 8px;
  padding: 8px;
`;

const MessageArea = ({ user, socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() && socket.connected) {
      socket.emit("message", {
        message,
        id: user._id + Date.now(),
        userID: user._id,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  useEffect(() => {
      socket.on("message_response", (data) => {
        // setMessages([...messages, data]);
        console.log(data)
      });
  }, []);

  return (
    <Container>
      <MessageBlock>
        {messages && messages.length
          ? messages.map((message) => (
              <MessageContainer sender={message.userID === user._id}>
                <Message>Hello</Message>
              </MessageContainer>
            ))
          : "Messages is empty"}
      </MessageBlock>
      <SendMessageContainer>
        <InputMsg
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></InputMsg>
        <SendMsgBtn onClick={handleSend}>Send</SendMsgBtn>
      </SendMessageContainer>
    </Container>
  );
};

export default MessageArea;
