import Piece from './Piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg");
    }

    canMove(src, dest) {
        if (super.canMove(src, dest) === false) {
            return false;
        }

        if (src.r === dest.r) {
            return true;
        }
        if (src.c === dest.c) {
            return true;
        }
        if (Math.abs(src.r - dest.r) === Math.abs(src.c - dest.c)) {
            return true;
        }
    
        return false;
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            if (src.r === dest.r || src.c === dest.c) {
                let directions = { r: src.r === dest.r ? 0 : src.r < dest.r ? 1 : -1, c: src.c === dest.c ? 0 : src.c < dest.c ? 1 : -1 };

                for (let i = 1; i < Math.max(Math.abs(dest.r - src.r), Math.abs(dest.c - src.c)); i++) {
                    if (board[src.r + (i * directions.r)][src.c + (i * directions.c)] !== null) {
                        return false;
                    }
                }
            }
            else {
                let direction = { r: dest.r > src.r ? 1 : -1, c: dest.c > src.c ? 1 : -1 };

                for (let i = 1; i < Math.abs(dest.c - src.c); i++) {
                    if (board[src.r + i * direction.r][src.c + i * direction.c] !== null) {
                        return false;
                    } 
                }
            }
            
            if (board[src.r][src.c]?.getPlayer() !== board[dest.r][dest.c]?.getPlayer()) {
                return true;
            }
        }

        return false;
    }
}