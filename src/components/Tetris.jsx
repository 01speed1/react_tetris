import React, { useState } from 'react'

import { createStage, checkCollision } from '../gameHelper'

//components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

// Styled
import { StyledTetrisWrapper, StyledTetris } from './Styles/StyledTetris'

//Custom hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus"

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)

  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

  const updatingDrop = 400/(level+1) + 200

  const movePlayer = dir => {
    if(!checkCollision(player, stage, {x: dir, y: 0})){
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    //reset game
    setStage(createStage())
    setDropTime(1000)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(1)
  }

  const drop = () => {
    if(rows > (level +1)*2){
      setLevel(prev => prev +1)
      setDropTime(updatingDrop)
    }

    if(!checkCollision(player, stage, {x: 0, y: 1})){
      updatePlayerPos({x: 0, y:1, collided: false})
    } else {
      if(player.pos.y < 1){
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({ keyCode }) => {
    if(!gameOver){
      if( keyCode == 40 ){
        setDropTime(updatingDrop)
      }
    }
  }

  const dropPlayer = dir => {
    setDropTime(null)
    drop()
  }

  const move = ({ keyCode }) => {
    //refactorize this please Winnie del futuro
    if(!gameOver){
      if(keyCode === 37){
        movePlayer(-1)
      }else if (keyCode === 39){
        movePlayer(1)
      } else if(keyCode === 40){
        dropPlayer()
      } else if(keyCode === 38){
        playerRotate(stage, 1)
      }
    }
  }

  useInterval( () => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={ stage } ></Stage>
        <aside>
          { gameOver ? (
            <Display gameOver={gameOver} text={`Game Over: ${score}`} ></Display>
          ): (
          <div>
            <Display text={`Los poins: ${score}`} />
            <Display text={`las lineas: ${rows}`} />
            <Display text={`el mero level: ${level}`} />
          </div>
          ) }
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris