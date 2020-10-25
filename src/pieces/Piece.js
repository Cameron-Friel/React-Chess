export default class Piece {
    constructor(player, imageUrl) {
        this.player = player;
        this.backgroundImage = imageUrl;
    }

    getPlayer() {
        return this.player;
    }

    canMove(src, dest) {
        if (src.r === dest.r && src.c === dest.c) {
            return false;
        }

        if (src.r > 7 || src.r < 0 || src.c < 0 || src.c > 7 || dest.r > 7 || dest.r < 0 || dest.c < 0 || dest.c > 7) {
            return false;
        }
    }
}