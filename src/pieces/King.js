import Piece from './Piece';

export default class King extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg");

        this.isChecked = false;
    }

    setIsChecked(bool) {
        this.isChecked = bool;
    }

    getIsChecked() {
        return this.isChecked;
    }

    canMove(src, dest) {
        if (super.canMove(src, dest) === false) {
            return false;
        }

        if (Math.abs(src.r - dest.r) + Math.abs(src.c - dest.c) === 1 || (Math.abs(src.r - dest.r) === 1 && Math.abs(src.c - dest.c) === 1)) {
            return true;
        }

        return false;
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            if (board[dest.r][dest.c]?.getPlayer() !== this.getPlayer()) {
                return true;
            }
        }

        return false;
    }
}