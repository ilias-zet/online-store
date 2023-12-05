import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  padding: 20px;
  border: 1px solid rgb(229 229 229 / 16%);
  background-color: rgb(48, 48, 48);
`;

const Ul = styled.ul`
width: 100%;
list-style-type: none;
padding-left: 0;
`

const Li = styled.li`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 32px;
border-radius: 8px;
background-color: #1a1a1a;
border: 1px solid rgb(229 229 229 / 16%);
margin-top: 8px;
`

const ConnectedUsers = () => {
  return (
    <Container>
      <Ul>
        <Li>User</Li>
        <Li>User</Li>
        <Li>User</Li>
        <Li>User</Li>
      </Ul>
    </Container>
  );
};

export default ConnectedUsers;
