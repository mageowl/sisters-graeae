import Sister from "../objects/Sister.js";

export default class GameScene extends Phaser.Scene {
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
			y: 100
		});
	}
}
