import Piece from './Piece';
import Rook from './Rook';

export default class King extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg");

        this.isChecked = false;
        this.hasMoved = false;
    }

    setIsChecked(bool) {
        this.isChecked = bool;
    }

    getIsChecked() {
        return this.isChecked;
    }

    setHasMoved(bool) {
        this.hasMoved = bool;
    }

    getHasMoved() {
        return this.hasMoved;
    }

    isCastlingMove(src, dest) {
        return (!this.getHasMoved() && Math.abs(dest.c - src.c) === 2 && dest.r === src.r);
    }

    isValidCastlingMove(board, src, dest) {
        if (dest.c > src.c) {
            return (board[src.r][src.c + 1] === null && board[src.r][src.c + 2] === null && board[src.r][src.c + 3] instanceof Rook && !board[src.r][src.c + 3]?.getHasMoved());
        }   
        else {
            return (board[src.r][src.c - 1] === null && board[src.r][src.c - 2] === null && board[src.r][src.c - 3] === null && board[src.r][src.c - 4] instanceof Rook && !board[src.r][src.c - 4]?.getHasMoved());
        }
    }

    canMove(src, dest) {
        if (super.canMove(src, dest) === false) {
            return false;
        }

        return (Math.abs(src.r - dest.r) + Math.abs(src.c - dest.c) === 1 || (Math.abs(src.r - dest.r) === 1 && Math.abs(src.c - dest.c) === 1) || this.isCastlingMove(src, dest));
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            if ((board[dest.r][dest.c]?.getPlayer() !== this.getPlayer() && !this.isCastlingMove(src, dest)) || this.isValidCastlingMove(board, src, dest)) {
                if (!this.getHasMoved()) {
                    this.setHasMoved(true);
                }

                return true;
            }
        }

        return false;
    }
}