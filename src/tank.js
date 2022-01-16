(function(ns) {

    const SLICE_LEN = 34;

    var Tank = ns.Tank = Hilo.Class.create({
        Extends: ns.ActiveObj,
        constructor: function(properties) {
            Tank.superclass.constructor.call(this, properties);

            this.addFrame(properties.atlas.getSprite('up')).stop();
            this.pivotX = 17;
            this.pivotY = 17;
            this.width = 34;
            this.height = 34;

            this.bulletAtlas = properties.bulletAtlas;
            this.atlas = properties.atlas;
            this.type = properties.type;
            this.isMe = properties.isMe;
            this.controller = properties.controller;
        },

        type: 0,
        isDead: false,
        speed: 0,
        isRun: false,
        direction: 'up',
        bullet: 0,
        cold: 10,
        coldTime: 0,
        isMe: false,
        controller: null,
        title: null,
        nameColor: '',

        getReady: function() {

            this.title = new Hilo.Text({
                text: this.id,
                width: 50,
                pivotX: 25,
                textAlign: 'center',

                x: this.startX,
                y: this.startY - 27,
                color: this.nameColor
            })



            this.x = this.startX;
            this.y = this.startY;

            switch (this.type) {
                case 0:
                    this.speed = 2;
                    this.health = 1;
                    break;
                case 1:
                    this.speed = 1;
                    this.health = 2;
                    break;
                case 2:
                    this.speed = 0.5;
                    this.health = 3;
                    break;
            }

            this.coldTime = this.cold;
        },

        setCold(e) {
            this.cold = e;
        },

        startMove: function(direction) {
            if (!this.isDead) {
                this.isRun = true;
                this.direction = direction;
                this.setFrame(this.atlas.getSprite(this.direction));
                this.play();
            }
        },

        endMove: function(direction) {
            if (!this.isDead) {

                if (this.direction == direction) {
                    this.isRun = false;
                    this.stop();
                    this.direction = direction;
                }

            }
        },

        shoot() {
            var bullet;
            if (this.bullet == 0 && this.coldTime >= this.cold) {
                this.coldTime = 0;
                bullet = new game.Bullet({
                    id: this.id + "_" + "bullet",

                    startX: this.checkDirection(this.direction).dX * 19 + this.x,
                    startY: this.checkDirection(this.direction).dY * 19 + this.y,
                    atlas: this.bulletAtlas,
                    direction: this.direction,
                    tank: this,
                })

                bullet.init();
                bullet.addTo(this.parent);

                this.bullet++;
            }
        },

        onDead() {
            this.isDead = true;
            this.removeFromParent();
            this.title.removeFromParent();
            if (!this.isMe) {
                this.controller.onEnemyDead();
            } else {
                this.controller.onMeDead();
            }
        },

        onUpdate: function() {
            if (this.health === 0) {
                this.isDead = true;
            }
            if (this.isDead) {

            } else {

                if (this.coldTime < this.cold) this.coldTime++;
                if (this.isRun) {

                    for (var i = 0, len = this.parent.children.length; i < len; i++) {
                        if (this.checkCollision(this.parent.children[i]) &&
                            this.id != this.parent.children[i].id &&
                            this.parent.children[i].color == undefined) {
                            return;
                        }
                    }
                    if (!this.isInStage(this.direction, this.speed)) return;
                    this.x += this.checkDirection(this.direction).dX * this.speed;
                    this.y += this.checkDirection(this.direction).dY * this.speed;
                    this.title.x = this.x;
                    this.title.y = this.y - 27;
                }
            }
        },
        bulletDead() {
            this.bullet--;
        },
        checkCollision: function(obj) {
            var XY = this.checkDirection(this.direction);

            return Math.abs(this.x + XY.dX * this.speed - obj.x) < (SLICE_LEN / 2 + obj.width / 2 - 5) &&
                Math.abs(this.y + XY.dY * this.speed - obj.y) < (SLICE_LEN / 2 + obj.height / 2 - 5);
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
})(window.game);