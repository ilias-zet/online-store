import React, { useState, useEffect } from 'react'
import './LoadingTheme.css';
import styled from "styled-components"

const LoadingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
min-height: 100%;
`

const LoadingTheme = () => {
    return (
        <LoadingContainer>
            <div className="lds-default">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoadingContainer>
    )
}

export default LoadingTheme;    