import React, { useState, useRef, useEffect } from 'react';
import Board from './Board';
import CapturedPieces from './CapturedPieces';
import King from '../pieces/King';
import Queen from '../pieces/Queen';
import Rook from '../pieces/Rook';
import Bishop from '../pieces/Bishop';
import Knight from '../pieces/Knight';
import Pawn from '../pieces/Pawn';

const PLAYERS = { White: "White", Black: "Black" };

const Game = () => {
    const [gameBoard, setGameBoard] = useState(
        [[new Rook(PLAYERS.Black), new Knight(PLAYERS.Black), new Bishop(PLAYERS.Black), new Queen(PLAYERS.Black), new King(PLAYERS.Black), new Bishop(PLAYERS.Black), new Knight(PLAYERS.Black), new Rook(PLAYERS.Black)], 
        [new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black), new Pawn(PLAYERS.Black)], 
        [null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null], 
        [new Pawn(PLAYERS.White), new Pawn(PLAYERS.White), new Pawn(PLAYERS.White), new Pawn(PLAYERS.White), new Pawn(PLAYERS.White), new Pawn(PLAYERS.White), new Pawn(PLAYERS.White), new Pawn(PLAYERS.White)], 
        [new Rook(PLAYERS.White), new Knight(PLAYERS.White), new Bishop(PLAYERS.White), new Queen(PLAYERS.White), new King(PLAYERS.White), new Bishop(PLAYERS.White), new Knight(PLAYERS.White), new Rook(PLAYERS.White)]]
    );

    const [playerTurn, setPlayerTurn] = useState(PLAYERS.White);

    const [capturedWhitePieces, setCapturedWhitePieces] = useState([]);
    const [capturedBlackPieces, setCapturedBlackPieces] = useState([]);

    const [moveList, setMoveList] = useState([]);
    const moveListRef = useRef();

    const [activePieceOffset, setActivePieceOffset] = useState(null);

    useEffect(() => {
        if (moveListRef.current) {
            moveListRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end"
            });
        }
    }, [moveList]);

    const getPieceName = (piece) => {
        switch(true) {
            case piece instanceof Bishop:
                return "B";
            case piece instanceof King:
                return "K";
            case piece instanceof Queen:
                return "Q";
            case piece instanceof Rook:
                return "R";        
            default:
                return "";
        }
    }

    const lastMoveOffset = (offset) => {
        setActivePieceOffset(offset);
    }

    const addCapturedPiece = (piece) => {
        if (piece.player === PLAYERS.White) {
            capturedWhitePieces.push(piece);
            setCapturedWhitePieces(capturedWhitePieces => [...capturedWhitePieces]);
        }
        else {
            capturedBlackPieces.push(piece);
            setCapturedBlackPieces(capturedBlackPieces => [...capturedBlackPieces]);
        }
    }

    const movePiece = (board, src, dest) => {
        board[dest.r][dest.c] = gameBoard[src.r][src.c];
        board[src.r][src.c] = null;
        setGameBoard(board => [...board]);
        setPlayerTurn(playerTurn === PLAYERS.White ? PLAYERS.Black : PLAYERS.White);
    }

    const updateMoveList = (board, src, dest) => {
        let moveString = getPieceName(board[src.r][src.c]);

        if (isCaptureMove(board, dest)) {
            if (board[src.r][src.c] instanceof Pawn) {
                moveString += String.fromCharCode(97 + src.c);
            }

            moveString += "x";
        }
        else if (isCastleMove(board, src, dest)) {
            setMoveList(moveList => [...moveList, dest.c > src.c ? "O-O" : "O-O-O"]);
            
            return;
        }

        setMoveList(moveList => [...moveList, moveString + String.fromCharCode(97 + dest.c) + (8 - dest.r)]); 
    }

    const isCaptureMove = (board, targetPosition) => {
        return (board[targetPosition.r][targetPosition.c] !== null);
    }

    const isCastleMove = (board, src, dest) => {
        return (board[src.r][src.c] instanceof King && Math.abs(dest.c - src.c) === 2 && dest.r === src.r);
    }

    const onPieceMove = (position) => {
        if (playerTurn === gameBoard[position.r][position.c].getPlayer()) {
            let targetPosition = { r: position.r + activePieceOffset.r, c: position.c + activePieceOffset.c };

            if (gameBoard[position.r][position.c].isValidMove(gameBoard, position, targetPosition)) {
                if (isCaptureMove(gameBoard, targetPosition)) {
                    addCapturedPiece(gameBoard[targetPosition.r][targetPosition.c]);
                }
                else if (isCastleMove(gameBoard, position, targetPosition)) {
                    let positionC = targetPosition.c > position.c ? 7 : 0;
                    let targetPositionC = targetPosition.c > position.c ? targetPosition.c - 1 : targetPosition.c + 1;

                    movePiece(gameBoard, { r: position.r, c: positionC }, { r: targetPosition.r, c: targetPositionC });
                    gameBoard[targetPosition.r][targetPositionC].setHasMoved(true);
                }

                updateMoveList(gameBoard, position, targetPosition);
                movePiece(gameBoard, position, targetPosition);            
            }  
        }    
    }

    const displayMoveList = moveList.map((move, index) => {
        return (
            <div key={index} className="move">{index + 1}. {move}</div>
        );
    });

    return (
        <div className="game-container">
            <Board 
                gameBoard = {gameBoard}
                lastMoveOffset={lastMoveOffset}
                onPieceMove={onPieceMove}
            />

            <section className="game-sidebar">
                <div className="player-info">
                    <h2>Black Player</h2>
                    <CapturedPieces
                        pieces={capturedBlackPieces}
                    />
                </div>

                <div className="move-list">
                    {displayMoveList}
                    <div ref={ moveListRef }></div>
                </div>

                <div className="player-info">
                    <h2>White Player</h2>
                    <CapturedPieces 
                        pieces={capturedWhitePieces}
                    />
                </div>
            </section>
        </div>
    );
}

export default Game;