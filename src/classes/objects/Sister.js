export default class Sister extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 200;

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
		config.scene.updates.push(this);

		this.keys = config.scene.input.keyboard.addKeys("W,A,S,D");

		this.setScale(5);
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([key, { isDown }]) => [key, isDown])
		);

		this.setVelocity(
			(input.D + -input.A) * Sister.SPEED,
			(input.S + -input.W) * Sister.SPEED
		);
	}
}
