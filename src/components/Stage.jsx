import React from 'react'
import Cell from './Cell'

const cell = (cell, x) => <Cell key={x} type={cell[0]} />

const column = row => row.map(cell)

const Stage = ({ stage }) => {

  return (
    <div>
      { stage.map(column) }
    </div>
  )
}

export default Stage
