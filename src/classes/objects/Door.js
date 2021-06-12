import Sister from "./Sister.js";

export default class Door extends Phaser.Physics.Arcade.Image {
	/**
	 * @type {Door}
	 *
	 * @memberof Door
	 */
	exit;

	/**
	 * Creates an instance of Sister.
	 * @param {object} config
	 * @param {Phaser.Scene} config.scene
	 * @memberof Sister
	 */
	constructor(config) {
		super(config.scene, config.x + 4, config.y + 4);

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this, true);

		Sister.instances.forEach((sis) => {
			config.scene.physics.add.overlap(sis, this, this.teleport);
		});

		this.setSize(4, 4);
	}

	/**
	 * @param {Sister} obj
	 * @memberof Door
	 */
	teleport = (obj) => {
		if (this.exit) {
			obj.setPosition(
				this.exit.x + obj.body.velocity.x / 4,
				this.exit.y + obj.body.velocity.y / 4
			);
		}
	};
}
