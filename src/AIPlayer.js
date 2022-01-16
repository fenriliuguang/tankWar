(function(ns) {
    class AIPlayer {
        constructor() {
            this.tank = null;
            this.isPlaying = false;
            this.move = null;
            this.shoot = null;
        };

        init(t) {
            this.tank = t;
        };
        tankMove() {
            if (this.isPlaying) {
                var direction = Math.floor(Math.random() * 4);
                switch (direction) {
                    case 0:
                        direction = "up";
                        break;
                    case 1:
                        direction = "down";
                        break;
                    case 2:
                        direction = "left";
                        break;
                    case 3:
                        direction = "right";
                        break;
                }
                if (this.tank != null) {
                    this.tank.startMove(direction);
                }
            }
        };

        autoMove() {
            this.isPlaying = true;
            this.tankMove();
            this.move = setInterval(() => {
                this.tankMove();
            }, 1000);
        };
        autoShoot() {
            this.tank.setCold(10);
            this.shoot = setInterval(() => {
                this.tank.shoot();
            }, 5);
        };
        stop() {
            console.log(this.shoot)
            clearInterval(this.move);
            clearInterval(this.shoot);
            this.isPlaying = false;
            this.tank = null;
        };
    }
    ns.AIPlayer = AIPlayer;
})(window.game);