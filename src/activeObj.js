(function(ns) {
    var ActiveObj = ns.ActiveObj = Hilo.Class.create({
        Extends: Hilo.Sprite,
        constructor: function(properties) {
            ActiveObj.superclass.constructor.call(this, properties);

            this.interval = 3;


            this.startX = properties.startX;
            this.startY = properties.startY;
        },
        startX: 0,
        startY: 0,
        health: 1,
        atlas: null,
        onDead: null,

        beAttacked: function() {
            this.health--;
            if (this.health == 0) {
                this.onDead();
            }
        },
        isInStage: function(d, s) {

            var x = this.x;
            var y = this.y;
            var height = this.parent.height;
            var width = this.parent.width;

            switch (d) {
                case "up":
                    y -= s;
                    break;
                case "left":
                    x -= s;
                    break;
                case "down":
                    y += s;
                    break;
                case "right":
                    x += s;
                    break;
            }

            return (0 + this.width / 2 <= x) &&
                (0 - this.width / 2 + this.parent.width >= x) &&
                (0 + this.height / 2 <= y) &&
                (0 - this.height / 2 + this.parent.height >= y);
        }
    })
})(window.game)