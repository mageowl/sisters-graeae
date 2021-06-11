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
	}

	update() {
		this.updates.forEach((o) => o.update());

		this.container.sort("y");
	}
}
