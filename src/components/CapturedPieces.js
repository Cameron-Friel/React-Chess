import React from 'react';

const CapturedPieces = ({ pieces }) => {
    const displayPieces = pieces.map((piece, index) => {
        return (
            <img 
                key={index}
                className="captured-piece"
                src={piece.backgroundImage || ""}
                alt=""
            />
        )
    })
    
    return (
        <div className="captured-piece-container" >
            {displayPieces}
        </div>
    );
}

export default CapturedPieces;