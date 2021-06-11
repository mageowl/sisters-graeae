export default class Sister extends Phaser.GameObjects.Container {
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
	patientice = Sister.PATIENTICE;

	/**
	 * @type {Phaser.Physics.Arcade.Body}
	 *
	 * @memberof Sister
	 */
	body = null;

	obj = {
		/** @type {Phaser.GameObjects.Sprite} */
		sprite: null,
		/** @type {Phaser.GameObjects.Rectangle} */
		patienticeBar: null,
		light: null
	};

	/**
	 * Creates an instance of Sister.
	 * @param {object} config
	 * @param {Phaser.Scene} config.scene
	 * @memberof Sister
	 */
	constructor(config) {
		const light = config.scene.lights.addLight(0, 0, 75).setVisible(false);
		const sprite = config.scene.add.sprite(0, 0, "sister");
		const bar = config.scene.add
			.rectangle(0, -6, 8, 1, 0xffffff)
			.setOrigin(0.5);
		const patientice = config.scene.add
			.rectangle(-4, -6, 8, 1, 0xff0000)
			.setOrigin(0, 0.5);

		super(config.scene, config.x, config.y, [sprite, bar, patientice]);

		config.scene.add.existing(this);
		config.scene.physics.world.enableBody(this);
		config.scene.updates.push(this);
		Sister.instances.push(this);

		this.obj.sprite = sprite;
		this.obj.patienticeBar = patientice;

		this.keys = config.scene.input.keyboard.addKeys("W,A,S,D,space");
		this.id = Sister.count++;
		this.keys.space.on("down", this.switchEye);

		this.setScale(4).setPipeline("Light2D");
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([key, { isDown }]) => [key, isDown])
		);
		const hasEye = Sister.eye === this.id;

		if (hasEye) {
			this.body.setVelocity(
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
			}

			if (this.anger > 0) {
				this.anger -= 10;
			}
		} else if (this.anger < this.patientice) {
			this.anger++;
			this.direction +=
				Math.random() > 0.99 ? Math.floor(Math.random() * 11) - 5 : 0;
			this.body.setVelocity(
				Math.sin(this.direction) * (Sister.SPEED / 10),
				Math.cos(this.direction) * (Sister.SPEED / 10)
			);
		} else {
			this.direction +=
				Math.random() > 0.99 ? Math.floor(Math.random() * 11) - 5 : 0;
			this.body.setVelocity(
				Math.sin(this.direction) * Sister.SPEED,
				Math.cos(this.direction) * Sister.SPEED
			);
		}

		this.obj.sprite.setFrame(
			hasEye ? 0 : this.anger === this.patientice ? 3 : 2
		);
		this.obj.patienticeBar.width = (8 / this.patientice) * this.anger;
	}

	switchEye = (e) => {
		if (Sister.eye === this.id) this.switchEyeNxt = true;
	};
}
