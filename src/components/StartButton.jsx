import React from 'react'
import { StyledStartButton } from './Styles/StyledStartButton'

const StartButton = ({ callback }) => {
    return (
        <StyledStartButton onClick={callback}>
            Apachurrale Estarp
        </StyledStartButton>
    )
}

export default StartButton
