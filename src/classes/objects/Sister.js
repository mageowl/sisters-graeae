export default class Sister extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Creates an instance of Sister.
	 * @param {object} config
	 * @param {Phaser.Scene} config.scene
	 * @memberof Sister
	 */
	constructor(config) {
		super(config.scene, config.x, config.y, "sister");

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.keys = config.scene.input.keyboard.addKeys("wasd");

		this.setScale(5);
	}

	update() {
		// use this.keys to control movement
	}
}
