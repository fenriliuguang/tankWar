(function(ns) {
    var Base = ns.Base = Hilo.Class.create({
        Extends: ns.ActiveObj,
        constructor: function(properties) {
            Base.superclass.constructor.call(this, properties);


            this.pivotX = 17;
            this.pivotY = 17;
            this.width = 34;
            this.height = 34;
            this.loop = false;
            this.controller = properties.controller;

        },

        controller: null,

        init() {
            this.health = 1;

            this.x = this.startX;
            this.y = this.startY;

            this.addFrame(this.atlas.getSprite('base'));
        },

        onDead() {
            this.removeFromParent();
            this.controller.onBaseDead();
            console.log("dd");
        }
    })
})(window.game)