import Sister from "../objects/Sister.js";

export default class GameScene extends Phaser.Scene {
	updates = [];
	/**
	 * @type {Phaser.GameObjects.Container}
	 *
	 * @memberof GameScene
	 */
	container;

	constructor() {
		super("game");
	}

	preload() {
		this.load.setBaseURL("../../../assets");

		this.load.spritesheet("sister", "sprites/sister.png", {
			frameWidth: 8,
			frameHeight: 8
		});

		this.load.tilemapTiledJSON("map", "tilemaps/map.json");
		this.load.image("tileset", "sprites/tileset.png");
	}

	create() {
		const map = this.add.tilemap("map", 8, 8);
		map.addTilesetImage("tileset", "tileset");
		this.level = map.createLayer("map", "tileset");
		this.level.setCollisionByProperty({ collide: true }).setPipeline("Light2D");

		map.getObjectLayer("objects").objects.forEach(({}) => {});

		this.container = this.add.container(0, 0, [
			new Sister({
				scene: this,
				x: 1344,
				y: 840
			}),

			new Sister({
				scene: this,
				x: 1356,
				y: 840
			}),

			new Sister({
				scene: this,
				x: 1364,
				y: 840
			})
		]);

		this.lights.enable();

		this.target = this.physics.add.image(100, 100);
		this.cameras.main.setZoom(5).startFollow(this.target, false);
	}

	update() {
		this.updates.forEach((o) => o.update());

		this.container.sort("y");

		this.target.setPosition(
			Math.floor(Sister.eyed.x / 160) * 160 + 80,
			Math.floor(Sister.eyed.y / 96) * 96 + 48
		);
	}
}
