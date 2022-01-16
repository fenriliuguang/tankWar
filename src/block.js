(function(ns) {
    var Block = ns.Block = Hilo.Class.create({
        Extends: ns.ActiveObj,
        constructor: function(properties) {
            Block.superclass.constructor.call(this, properties);


            this.pivotX = 17 / 2;
            this.pivotY = 17 / 2;
            this.width = 17;
            this.height = 17;
            this.loop = false;

            this.type = properties.type;
        },

        init() {
            if (this.type == 1) this.health = 1;
            if (this.type == 2) this.health = -1;

            this.x = this.startX;
            this.y = this.startY;

            this.addFrame(this.atlas.getSprite(this.type));
        },

        onDead() {
            this.removeFromParent();
            console.log("dd");
        }
    })
})(window.game)