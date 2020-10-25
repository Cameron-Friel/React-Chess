import React, { useState, useRef } from 'react';
import Square from '../components/Square';
import '../App.css';

const Board = ({ gameBoard, lastMoveOffset, onPieceMove }) => {
    const [board] = useState(gameBoard);
    const ref = useRef(null);

    const getCurrentPosition = (coordinates) => {
        let squareDimension = ref.current.clientHeight * .125;
 
        lastMoveOffset({ r: Math.round(coordinates.y / squareDimension), c: Math.round(coordinates.x / squareDimension) });
    } 

    const displayBoard = board.map((row, r) => {
        return (
            row.map((_, c) => {
                return (
                    <Square
                        key={r.toString() + c.toString()}
                        squareColor={((r % 2 === 0 && c % 2 === 0) || (r % 2 !== 0 && c % 2 !== 0) ? 'dark-square' : 'light-square')}
                        imageUrl={board[r][c] !== null ? board[r][c].backgroundImage : null}
                        currentPosition={getCurrentPosition}
                        onClick={event => onPieceMove({ r, c })}
                    />
                )
            })
        );
    });

    return (
        <div className="board-container" ref={ref}>
            { displayBoard }
        </div>
    );
}

export default Board;