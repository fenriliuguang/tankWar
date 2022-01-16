(function(ns) {

    class Level {
        constructor(properties) {
            this.gateNumber = properties.level.gateNumber;
            this.levels = properties.level.levels;
            this.maps = properties.maps;
        };

        gateNumber = null;
        levels = null;
        stage = null;
        input = null;
        asset = null;
        maps = null;
        myTankNum = 3;
        enemyNumber = null;
        gate = 0;
        enemies = null;
        AIPlayer = null;
        score = 0;
        enemyType = 0;
        base = null;
        username = null;

        init(stage, input, asset, username) {
            this.username = username;
            this.stage = stage;
            this.input = input;
            this.asset = asset;
            console.log(game)
            this.AIPlayer = new game.AIPlayer();
        };

        reset() {
            if (localStorage.getItem(this.username) != undefined) {
                var s = parseInt(localStorage.getItem(this.username));
                if (s <= this.score) localStorage[this.username] = this.score;
            } else {
                localStorage.setItem(this.username, this.score);
            }
            this.gate = 0;
            this.score = 0;
            this.myTankNum = 3;
            this.start();
        };

        start() {
            if (this.gate < this.gateNumber) {

                this.enemyNumber = this.levels[this.gate].enemyNumber;
                this.enemies = this.levels[this.gate].enemies;

                console.log(this);

                this.stage.removeAllChildren();

                this.initBlocks();
                this.initBase();
                this.initMe();
                this.initEnemy();
                this.upData();

            } else {
                alert("游戏结束了");
            }
        };

        initBlocks() {
            var block;

            for (var i = 0; i < 26; i++) {
                for (var j = 0; j < 26; j++) {
                    if (this.maps[0].map[j][i] != 0) {
                        block = new game.Block({
                            id: "block_" + i + "_" + j,

                            atlas: this.asset.blocks,
                            startX: 17 / 2 + 17 * i,
                            startY: 17 / 2 + 17 * j,
                            type: this.maps[0].map[j][i]
                        });

                        block.init();
                        block.addTo(this.stage);
                    }
                }
            }
        };

        initBase() {
            this.base = new game.Base({
                id: "base",

                atlas: this.asset.base,
                startX: this.maps[0].bornPoint.base[0] * 34 + 17,
                startY: this.maps[0].bornPoint.base[1] * 34 + 17,
                controller: this
            });

            this.base.init();
            this.base.addTo(this.stage);
        };

        onEnemyDead() {
            this.score += this.enemyType + 1;
            this.enemyNumber--;

            this.AIPlayer.stop();

            if (this.enemyNumber === 0) {
                alert("通关");
                this.gate++;
                this.start();
            } else {
                this.initEnemy();
            }

            this.upData();
        };

        onMeDead() {
            this.myTankNum--;
            if (this.myTankNum === 0) {
                alert("失败");
                alert("重新开始游戏");

                this.reset();
            } else {
                this.initMe();
            }

            this.upData();
        };

        onBaseDead() {
            alert("失败");
            alert("重新开始游戏");

            this.reset();
        };

        upData() {
            document.getElementById("user").innerHTML = this.username;
            document.getElementById("level").innerHTML = this.gate + 1;
            document.getElementById("score").innerHTML = this.score;
            document.getElementById("enemy").innerHTML = this.enemyNumber;
            document.getElementById("myTank").innerHTML = this.myTankNum;
        };

        initMe() {
            var tank = new game.Tank({
                id: this.username,
                atlas: this.asset.tank_me_simple,
                startX: this.maps[0].bornPoint.me[0] * 34 + 17,
                startY: this.maps[0].bornPoint.me[1] * 34 + 17,

                bulletAtlas: this.asset.bulletAtlas,
                type: 1,
                isMe: true,
                controller: this,
                nameColor: 'yellow'
            });

            tank.getReady();
            tank.addTo(this.stage);
            tank.title.addTo(tank.parent);
            this.input.tank = tank;
        };

        initEnemy() {
            var i = 0;
            var atlasName = null;
            for (i = 0; i < 3; i++) {
                if (this.levels[this.gate].enemies[i] != 0) break;
            }
            this.enemyType = i;
            switch (i) {
                case 0:
                    atlasName = 'tank_enemy_light';
                    break;
                case 1:
                    atlasName = 'tank_enemy_simple';
                    break;
                case 2:
                    atlasName = 'tank_enemy_heavy';
                    break;
            }
            var tank = new game.Tank({
                id: "enemy_" + this.enemyNumber,
                atlas: this.asset[atlasName],
                startX: this.maps[0].bornPoint.enemy[0] * 34 + 17,
                startY: this.maps[0].bornPoint.enemy[1] * 34 + 17,

                bulletAtlas: this.asset.bulletAtlas,
                type: i,
                isMe: false,
                controller: this,
                nameColor: 'red'
            });
            tank.getReady();
            tank.addTo(this.stage);
            tank.title.addTo(tank.parent);
            this.AIPlayer.init(tank);
            this.AIPlayer.autoMove();
            this.AIPlayer.autoShoot();
        }

    }

    ns.Level = Level;

})(window.game)