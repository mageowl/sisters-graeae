export default class Sister extends Phaser.GameObjects.Container {
	static SPEED = 30;
	static PATIENTICE = 500;
	static CALMING_SPEED = 5;

	static eye = 0;
	static count = 0;
	/**
	 * @type {Sister[]}
	 *
	 * @static
	 * @memberof Sister
	 */
	static instances = [];
	static eyed = null;

	/**
	 * @type {Object<string, Phaser.Input.Keyboard.Key>}
	 *
	 * @memberof Sister
	 */
	keys;
	switchEyeNxt = false;
	anger = 0;
	wanderDirection = 0;
	patientice = Sister.PATIENTICE;
	kicking = 0;
	speedBoost = 0;

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
		/** @type {Phaser.GameObjects.Light} */
		light: null
	};

	/**
	 * Creates an instance of Sister.
	 * @param {object} config
	 * @param {Phaser.Scene} config.scene
	 * @memberof Sister
	 */
	constructor(config) {
		const light = config.scene.lights.addLight(0, 0, 50, 0xffffff, 1.1);
		const sprite = config.scene.add.sprite(0, 0, "sister");
		const bar = config.scene.add
			.rectangle(0, -6, 8, 1, [0x3245bf, 0xab492e, 0x2a6339][Sister.count])
			.setOrigin(0.5);
		const patientice = config.scene.add
			.rectangle(-4, -6, 8, 1, [0x6476e8, 0xfc6e47, 0x38ba5b][Sister.count])
			.setOrigin(0, 0.5);

		super(config.scene, config.x, config.y, [sprite, bar, patientice]);

		this.setSize(6, 8);

		config.scene.add.existing(this);
		config.scene.physics.world.enableBody(this);
		config.scene.updates.push(this);
		Sister.instances.push(this);

		config.scene.physics.add.collider(this, config.scene.level);

		this.obj.sprite = sprite;
		this.obj.patienticeBar = patientice;
		this.obj.light = light;

		this.keys = config.scene.input.keyboard.addKeys("W,A,S,D,E,space");
		this.id = Sister.count++;
		this.keys.space.on("down", this.switchEye);
		config.scene.input.on("pointerdown", this.kick);

		this.obj.sprite.setPipeline("Light2D");
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([key, { isDown }]) => [key, isDown])
		);
		const hasEye = Sister.eye === this.id;

		this.obj.light.setPosition(this.x, this.y);

		if (hasEye) {
			if (Sister.eyed !== this) Sister.eyed = this;

			this.obj.light.setIntensity(1).setRadius(50);

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
				if (closest < 40) Sister.eye = closestID;
				this.switchEyeNxt = false;
			}

			if (this.kicking) {
				this.kicking--;
				this.obj.sprite.setFlip(this.scene.input.mousePointer.worldX < this.x);
			}

			if (input.E) {
				Sister.instances.forEach((sis) => {
					const d = Phaser.Math.Distance.Between(this.x, this.y, sis.x, sis.y);
					if (d < 50 && sis !== this) {
						sis.wanderDirection = (
							sis.x - this.x < 0 !== sis.y - this.y < 0
								? Phaser.Math.Angle.Reverse
								: (v) => v
						)(Phaser.Math.Angle.Between(sis.x, sis.y, this.x, this.y));
						sis.speedBoost = 9;
						if (sis.anger < sis.patientice && sis.anger > 0)
							sis.anger -= Sister.CALMING_SPEED;
					}
				});
			}

			if (this.anger > 0) {
				this.anger -= Sister.CALMING_SPEED;
			}
		} else if (this.anger < this.patientice) {
			this.anger++;
			this.wanderDirection +=
				Math.random() > 0.99 ? Math.floor(Math.random() * 11) - 5 : 0;
			this.body.setVelocity(
				Math.sin(this.wanderDirection) *
					(Sister.SPEED / (10 - this.speedBoost)),
				Math.cos(this.wanderDirection) *
					(Sister.SPEED / (10 - Math.floor(this.speedBoost)))
			);
			if (this.speedBoost > 0) this.speedBoost -= 0.1;

			this.obj.light.setIntensity(0.5).setRadius(30);
		} else {
			this.wanderDirection +=
				Math.random() > 0.75 ? Math.floor(Math.random() * 11) - 5 : 0;
			this.body.setVelocity(
				Math.sin(this.wanderDirection) * Sister.SPEED,
				Math.cos(this.wanderDirection) * Sister.SPEED
			);
		}

		this.obj.sprite.setFrame(
			hasEye ? (this.kicking ? 1 : 0) : this.anger === this.patientice ? 3 : 2
		);
		this.obj.patienticeBar.width = 8 - (8 / this.patientice) * this.anger;
	}

	switchEye = () => {
		if (Sister.eye === this.id) this.switchEyeNxt = true;
	};

	kick = () => {
		if (Sister.eye === this.id) {
			this.kicking = 10;
		}
	};
}
