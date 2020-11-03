import Piece from './Piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg");
    
        this.hasMoved = false;
    }

    setHasMoved(bool) {
        this.hasMoved = bool;
    }

    getHasMoved() {
        return this.hasMoved;
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

        return false;
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            let directions = { r: src.r === dest.r ? 0 : src.r < dest.r ? 1 : -1, c: src.c === dest.c ? 0 : src.c < dest.c ? 1 : -1 };

            for (let i = 1; i < Math.max(Math.abs(dest.r - src.r), Math.abs(dest.c - src.c)); i++) {
                if (board[src.r + (i * directions.r)][src.c + (i * directions.c)] !== null) {
                    return false;
                }
            }

            if (board[src.r][src.c]?.getPlayer() !== board[dest.r][dest.c]?.getPlayer()) {
                if (!this.getHasMoved()) {
                    this.setHasMoved(true);
                }
                
                return true;
            }
        }

        return false;
    }
}