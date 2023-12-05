import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConnectedUsers from "./ConnectedUsers";
import MessageArea from "./MessageArea";

import socketIO from 'socket.io-client'
import { onConnect, onDisconnect } from "./ChatFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: 60px;
`;

const Title = styled.h1`
  width: 100%;
  height: 16px;
  margin: 10px;
`;

const ChatArea = styled.div`
  display: flex;
  /* flex: 1; */
  width: 100%;
  height: 500px;
  padding: 20px;
  gap: 16px;
`;

const Chat = ({user, setUser, isConnected, setIsConnected}) => {
  const [socket, setSocket] = useState(socketIO.connect('http://localhost:7000'))
  console.log("chat")
  useEffect(() => {
    socket.on('connect', () => onConnect(setIsConnected));
    socket.on('disconnect', () => onDisconnect(setIsConnected));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);
  return (
    <Container>
      <Title>Chat</Title>
      <ChatArea>
        <ConnectedUsers socket={socket}></ConnectedUsers>
        <MessageArea user={user} socket={socket}></MessageArea>
      </ChatArea>
    </Container>
  );
};

export default Chat;
