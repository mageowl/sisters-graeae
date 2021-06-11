import Sister from "../objects/Sister.js";

export default class GameScene extends Phaser.Scene {
	updates = [];

	constructor() {
		super("game");
	}

	preload() {
		this.load.setBaseURL("../../../assets");

		this.load.spritesheet("sister", "sister.png", {
			frameWidth: 8,
			frameHeight: 8
		});
	}

	create() {
		new Sister({
			scene: this,
			x: 100,
			y: 100,
			eye: false
		});

		new Sister({
			scene: this,
			x: 300,
			y: 300,
			eye: false
		});

		new Sister({
			scene: this,
			x: 400,
			y: 400,
			eye: true
		});
	}

	update() {
		this.updates.forEach((o) => o.update());
	}
}
