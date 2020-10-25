import Piece from './Piece';

export default class Bishop extends Piece {
    constructor(player) {
        super(player, player === "White" ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg");
    }

    canMove(src, dest) {
        if (super.canMove(src, dest) === false) {
            return false;
        }
        if (Math.abs(src.r - dest.r) === Math.abs(src.c - dest.c)) {
            return true;
        }
  
        return false;
    }

    isValidMove(board, src, dest) {
        if (this.canMove(src, dest)) {
            let direction = { r: dest.r > src.r ? 1 : -1, c: dest.c > src.c ? 1 : -1 };

            for (let i = 1; i < Math.abs(dest.c - src.c); i++) {
                if (board[src.r + i * direction.r][src.c + i * direction.c] !== null) {
                    return false;
                } 
            }

            if (board[src.r][src.c]?.getPlayer() !== board[dest.r][dest.c]?.getPlayer()) {
                return true;
            }
        }

        return false;
    }
}