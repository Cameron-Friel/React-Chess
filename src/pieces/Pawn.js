import Piece from './Piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg");
    
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

        if ((Math.abs(src.r - dest.r) === 1 && Math.abs(src.c - dest.c) === 1) || (Math.abs(src.r - dest.r) === 1 && Math.abs(src.c - dest.c === 0)) || (Math.abs(src.r - dest.r) === 2 && (src.c - dest.c === 0) && !this.getHasMoved())) {
            if (!this.getHasMoved()) {
                this.setHasMoved(true);
            }
    
            return true;
        }
    
        return false;
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            if (Math.abs(src.r - dest.r) === 1 && Math.abs(src.c - dest.c) === 1) {
                if (board[dest.r][dest.c] !== null && this.getPlayer() !== board[dest.r][dest.c].getPlayer()) {
                    return true;
                }
            }
            else if (board[dest.r][dest.c] === null) {
                return true;
            }
        }

        return false;
    }
}