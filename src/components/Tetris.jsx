import React from 'react'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

//Helper
import { createStage } from '../gameHelper'

const Tetris = () => {
  return (
    <div>
      <Stage stage={createStage()} ></Stage>
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
        </div>
        <StartButton></StartButton>
      </aside>
    </div>
  )
}

export default Tetris