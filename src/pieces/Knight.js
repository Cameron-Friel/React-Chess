import Piece from './Piece';

export default class knight extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg");
    }

    canMove(src, dest) {
        if (super.canMove(src, dest) === false) {
            return false;
        }

        if ((src.r === dest.r - 2 || src.r === dest.r + 2) && (src.c === dest.c - 1 || src.c === dest.c + 1)) {
            return true;
        }

        if ((src.r === dest.r - 1 || src.r === dest.r + 1) && (src.c === dest.c - 2 || src.c === dest.c + 2)) {
            return true;
        }

        return false;
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            if (board[src.r][src.c]?.getPlayer() !== board[dest.r][dest.c]?.getPlayer()) {
                return true;
            }
        }

        return false;
    }
}