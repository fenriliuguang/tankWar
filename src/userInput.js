(function(ns) {
    const tankDirectionControl = {
        87: 'up',
        65: 'left',
        83: 'down',
        68: 'right'
    }

    class UserInput {
        constructor(properties) {
            this.tank = properties.tank;
            this.stage = properties.stage;

        }
        initTankControl() {
            console.log(this)
            if (document.addEventListener) {
                document.addEventListener('keydown', function(e) {
                    this.tankControl(e)
                }.bind(this));
                document.addEventListener('keyup', function(e) {
                    this.tankControl(e)
                }.bind(this));
            } else {
                document.attachEvent('onkeydown', function(e) {
                    this.tankControl(e)
                }.bind(this));
                document.addEventListener('onkeyup', function(e) {
                    this.tankControl(e)
                }.bind(this));
            }
        }
        initGameControl() {

        }
        tankControl(e) {
            if (this.tank === null) return;
            if (e.keyCode == 32) {
                this.tank.shoot();
                return
            }
            if (tankDirectionControl[e.keyCode]) {
                if (e.type === 'keydown') {
                    this.tank.startMove(tankDirectionControl[e.keyCode]);
                }
                if (e.type === 'keyup') {
                    this.tank.endMove(tankDirectionControl[e.keyCode]);
                }
            }

            if (e.key === 'keydown' && e.keyCode === 32) {
                this.tank.onAttack();
            }
        }
    }

    ns.UserInput = UserInput;
})(window.game)