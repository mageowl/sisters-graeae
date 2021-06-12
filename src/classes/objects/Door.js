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
		super(config.scene, config.x, config.y);

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this, true);

		Sister.instances.forEach((sis) => {
			config.scene.physics.add.overlap(sis, this, this.teleport);
		});

		this.setSize(8, 8);
	}

	teleport = (obj) => {
		if (this.exit && !obj.inDoor) {
			obj.setPosition(this.exit.x, this.exit.y);
			obj.inDoor = true;
		}
	};
}
