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
		this.container = this.add.container(0, 0, [
			new Sister({
				scene: this,
				x: 100,
				y: 100
			}),

			new Sister({
				scene: this,
				x: 300,
				y: 300
			}),

			new Sister({
				scene: this,
				x: 400,
				y: 400
			})
		]);
		this.lights.enable().setAmbientColor(0x8f8f8f);
	}

	update() {
		this.updates.forEach((o) => o.update());

		this.container.sort("y");
	}
}
