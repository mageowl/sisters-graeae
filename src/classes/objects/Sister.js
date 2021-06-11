export default class Sister extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 200;
	static PATIENTICE = 500;

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
	direction = 0;

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

			if (this.anger > 0) {
				this.anger--;
			}
		} else if (this.anger < Sister.PATIENTICE) {
			this.anger++;
			this.direction +=
				Math.random() > 0.99 ? Math.floor(Math.random() * 11) - 5 : 0;
			this.setVelocity(
				Math.sin(this.direction) * (Sister.SPEED / 10),
				Math.cos(this.direction) * (Sister.SPEED / 10)
			);
		} else {
			this.direction +=
				Math.random() > 0.99 ? Math.floor(Math.random() * 11) - 5 : 0;
			this.setVelocity(
				Math.sin(this.direction) * (Sister.SPEED / 10),
				Math.cos(this.direction) * (Sister.SPEED / 10)
			);
		}

		this.setFrame(hasEye ? 0 : this.anger === Sister.PATIENTICE ? 2 : 1);
	}

	switchEye = (e) => {
		if (Sister.eye === this.id) this.switchEyeNxt = true;
	};
}
