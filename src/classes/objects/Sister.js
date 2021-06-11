export default class Sister extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 200;
	static eye = 0;
	static count = 0;
	static instances = [];

	/**
	 * @type {Object<string, Phaser.Input.Keyboard.Key>}
	 *
	 * @memberof Sister
	 */
	keys;
	switchEyeNxt = false;
	anger = 0;

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
		Sister.instances.push(this);

		this.keys = config.scene.input.keyboard.addKeys("W,A,S,D");
		this.id = Sister.count++;
		config.scene.input.on("pointerdown", this.switchEye);

		this.setScale(5);
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([key, { isDown }]) => [key, isDown])
		);
		const hasEye = Sister.eye === this.id;

		if (hasEye) {
			this.setVelocity(
				(input.D + -input.A) * Sister.SPEED,
				(input.S + -input.W) * Sister.SPEED
			);

			if (this.switchEyeNxt) {
				let closest = Infinity;
				let closestID = null;
				Sister.instances.forEach((sis) => {
					const d = Phaser.Math.Distance.Between(this.x, this.y, sis.x, sis.y);
					if (d < closest && sis !== this) {
						closest = d;
						closestID = sis.id;
					}
				});
				Sister.eye = closestID;
				this.switchEyeNxt = false;
				this.setVelocity(0);
			}
		} else this.anger++;

		this.setFrame(hasEye ? 0 : this.anger > 1000 ? 2 : 1);
	}

	switchEye = (e) => {
		if (Sister.eye === this.id) this.switchEyeNxt = true;
	};
}
