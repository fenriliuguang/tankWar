(function(ns) {
    const SLICE_LEN = 34;

    var Asset = ns.Asset = Hilo.Class.create({
        Mixes: Hilo.EventMixin,

        queue: null,
        tank_enemy_light: null,
        tank_enemy_simple: null,
        tank_enemy_heavy: null,
        tank_me_simple: null,
        blocks: null,
        base: null,

        load() {
            var resources = [
                { id: 'all', src: 'images/all.png' }
            ];

            this.queue = new Hilo.LoadQueue();
            this.queue.add(resources);
            this.queue.on('complete', this.onComplete.bind(this));
            this.queue.start();
            console.log(this)
        },

        onComplete(e) {
            this.bulletAtlas = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [0, 5 * SLICE_LEN, SLICE_LEN / 4, SLICE_LEN / 4],
                    [SLICE_LEN / 4, 5 * SLICE_LEN, SLICE_LEN / 4, SLICE_LEN / 4],
                    [0, 5 * SLICE_LEN + SLICE_LEN / 4, SLICE_LEN / 4, SLICE_LEN / 4],
                    [SLICE_LEN / 4, 5 * SLICE_LEN + SLICE_LEN / 4, SLICE_LEN / 4, SLICE_LEN / 4]
                ],
                sprites: {
                    up: [0],
                    right: [3],
                    down: [1],
                    left: [2]
                }
            });
            this.tank_enemy_light = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [0 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [1 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [2 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [3 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [4 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [5 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [6 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [7 * SLICE_LEN, 0 * SLICE_LEN, SLICE_LEN, SLICE_LEN]
                ],
                sprites: {
                    up: [0, 1],
                    right: [2, 3],
                    down: [4, 5],
                    left: [6, 7]
                }
            });
            this.tank_me_simple = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [8 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [9 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [10 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [11 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [12 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [13 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [14 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [15 * SLICE_LEN, 1 * SLICE_LEN, SLICE_LEN, SLICE_LEN]
                ],
                sprites: {
                    up: [0, 1],
                    right: [2, 3],
                    down: [4, 5],
                    left: [6, 7]
                }
            });
            this.tank_enemy_heavy = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [16 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [17 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [18 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [19 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [20 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [21 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [22 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [23 * SLICE_LEN, 2 * SLICE_LEN, SLICE_LEN, SLICE_LEN]
                ],
                sprites: {
                    up: [0, 1],
                    right: [2, 3],
                    down: [4, 5],
                    left: [6, 7]
                }
            });
            this.tank_enemy_simple = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [8 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [9 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [10 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [11 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [12 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [13 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [14 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                    [15 * SLICE_LEN, 3 * SLICE_LEN, SLICE_LEN, SLICE_LEN]
                ],
                sprites: {
                    up: [0, 1],
                    right: [2, 3],
                    down: [4, 5],
                    left: [6, 7]
                }
            });
            this.blocks = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [0 * SLICE_LEN, 6 * SLICE_LEN, SLICE_LEN / 2, SLICE_LEN / 2],
                    [18 * SLICE_LEN, 5 * SLICE_LEN, SLICE_LEN / 2, SLICE_LEN / 2]
                ],
                sprites: {
                    1: [1],
                    2: [0]
                }
            });
            this.base = new Hilo.TextureAtlas({
                image: this.queue.get('all').content,
                frames: [
                    [19 * SLICE_LEN, 5 * SLICE_LEN, SLICE_LEN, SLICE_LEN],
                ],
                sprites: {
                    base: [0]
                }
            });

            this.queue.off('complete');
            this.fire('complete');
        }
    })
})(window.game)