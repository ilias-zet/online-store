import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(229, 229, 229, 0.16);
  width: 80%;
  height: 64px;
  border-radius: 10px;
  margin-top: 16px;
  overflow: hidden;
`

const InputContainer = styled.div`
  padding: 8px;
  width: 40%;
`

const Input = styled.input`
  width: 100%;
  height: 24px;
  font-size: 12px;
  background-color: rgb(48, 48, 48);
  border: 1px solid rgba(229, 229, 229, 0.16);
`

const SubmitPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  color: white;
  ${({ minValue, maxValue }) =>
    maxValue > minValue
      ? `
  cursor: pointer;
  background-color: rgb(90, 90, 90);
  `
      : `
  background-color: gray;
  color: #a7a7a7;
  `};
`

const Filter = ({ setPrice }) => {
  const [inputsValue, setInputsValue] = useState({
    minValue: 0,
    maxValue: 9999,
  })
  const { minValue, maxValue } = inputsValue
  return (
    <Container>
      <InputContainer>
        <label style={{"fontSize":"12px","color":"gray"}}>Min price</label>
        <Input
          type='number'
          min='0'
          value={minValue}
          onInput={(e) =>
            setInputsValue((prev) => ({
              ...prev,
              maxValue: Number(maxValue),
              minValue: Number(e.target.value),
            }))
          }
        />
      </InputContainer>
      <InputContainer>
        <label style={{"fontSize":"12px","color":"gray"}}>Max price</label>
        <Input
          min={Number(minValue)}
          type='number'
          value={maxValue}
          onInput={(e) =>
            setInputsValue((prev) => ({
              ...prev,
              minValue: Number(minValue),
              maxValue: Number(e.target.value),
            }))
          }
        />
      </InputContainer>
      <SubmitPrice
        minValue={Number(minValue)}
        maxValue={Number(maxValue)}
        onClick={() => {
          if (maxValue > minValue) {
            setPrice((prev) => ({
              ...prev,
              max: Number(maxValue),
              min: Number(minValue),
            }))
          }
        }}
      >
        Change
      </SubmitPrice>
    </Container>
  )
}

export default Filter
