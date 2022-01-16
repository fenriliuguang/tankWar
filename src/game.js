(function(ns) {
    window.onload = function() {
        game.init();
        console.log(CONFIG)
    };
    var game = ns.game = {

        asset: null,
        sliceSize: 34,
        height: 0,
        width: 0,
        stage: null,
        scale: 0,
        input: null,
        level: null,
        username: null,

        init() {
            this.asset = new game.Asset();
            this.asset.on('complete', function(e) {
                this.asset.off('complete');
                this.initStage();
                console.log("asset")
            }.bind(this));
            this.asset.load();
        },

        initStage: function() {
            console.log(game)
            this.width = this.sliceSize * 13;
            this.height = this.sliceSize * 13;
            this.scale = 1;

            var renderType = location.search.indexOf('dom') != -1 ? 'dom' : 'canvas';

            this.stage = new Hilo.Stage({
                renderType: renderType,
                width: this.width,
                height: this.height,
                scaleX: this.scale,
                scaleY: this.scale,
                background: 'black'
            });

            document.body.appendChild(this.stage.canvas);

            this.ticker = new Hilo.Ticker(60);
            this.ticker.addTick(Hilo.Tween);
            this.ticker.addTick(this.stage);
            this.ticker.start(true);


        },

        start(name) {
            this.username = name;
            this.initUserInput();
            this.initLevel();
            this.level.init(this.stage, this.input, this.asset, this.username);
            this.level.start();
        },

        initUserInput() {
            this.input = new game.UserInput({
                myTank: null,
                stage: this.stage
            })

            this.input.initTankControl()
        },

        initLevel() {
            this.level = new game.Level(CONFIG);
        },

        //init
    }
})(window)