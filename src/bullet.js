(function(ns) {
    var bullet = ns.Bullet = Hilo.Class.create({
        Extends: ns.ActiveObj,
        constructor: function(properties) {
            bullet.superclass.constructor.call(this, properties);


            this.pivotX = 17 / 4;
            this.pivotY = 17 / 4;
            this.width = 17 / 2;
            this.height = 17 / 2;
            this.loop = false;
            this.tank = properties.tank;
            this.direction = properties.direction;
        },

        direction: null,
        speed: 5,
        tank: null,
        isDead: false,

        init() {

            this.x = this.startX;
            this.y = this.startY;

            this.addFrame(this.atlas.getSprite(this.direction));
        },

        onDead() {
            if (!this.isDead) {
                this.tank.bulletDead();
                this.removeFromParent();
                this.isDead = true;
            }
        },

        onUpdate: function() {

            this.x += this.checkDirection(this.direction).dX * this.speed;
            this.y += this.checkDirection(this.direction).dY * this.speed;

            if (!this.isInStage(this.direction, this.speed)) {
                this.onDead();
            }

            if (!this.isDead) {
                for (var i = 0, len = this.parent.children.length; i < len; i++) {
                    if (this.hitTestObject(this.parent.children[i]) &&
                        this.id != this.parent.children[i].id &&
                        this.parent.children[i].color == undefined) {
                        this.parent.children[i].beAttacked();
                        this.onDead();
                        return
                    }
                }
            }
        },
        checkDirection: function(d) {
            var dX = 0;
            var dY = 0;

            switch (d) {
                case 'up':
                    dY = -1;
                    break;
                case 'down':
                    dY = 1;
                    break;
                case 'left':
                    dX = -1;
                    break;
                case 'right':
                    dX = 1;
                    break;
            };

            return { dX, dY };
        }
    })
})(window.game)