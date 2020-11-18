import React from 'react';
import Draggable from '../components/Draggable';

const Square = ({ squareColor, imageUrl, onClick, currentPosition }) => {
    const image = () => {
        if (imageUrl !== null) {
            return (
                <Draggable currentPosition={currentPosition}>
                    <img 
                        src={imageUrl || ""}
                        alt=""
                        className="chess-piece"
                        draggable="false"
                        onClick={onClick}
                    />
                </Draggable>
            );  
        }
        else {
            return (
                <img 
                    src={"https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"}
                    alt=""
                    className="empty-square"
                    draggable="false"
                    onClick={onClick}
                />
            );
        }
    }

    return (
        <div className={squareColor}>
            { image() } 
        </div>
    );
}

export default Square;