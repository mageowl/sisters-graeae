import Sister from "./Sister.js";

export default class Spider extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 5;

	deathTimer = -1;
	noiseLevel;

	constructor(config) {
		super(config.scene, config.x + 4, config.y + 4, "spider");

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);
		config.scene.updates.push(this);

		config.scene.physics.add.collider(this, config.scene.level);

		this.noiseLevel = Math.random() * 30;

		this.setPipeline("Light2D");
	}

	update() {
		if (this.deathTimer === -1) {
			if (
				this.scene.target.x === Math.floor(this.x / 160) * 160 + 80 &&
				this.scene.target.y === Math.floor(this.y / 96) * 96 + 48
			) {
				const sis = Sister.instances.reduce((s1, s2) =>
					Phaser.Math.Distance.BetweenPoints(s1, this) <
					Phaser.Math.Distance.BetweenPoints(s2, this)
						? s1
						: s2
				);
				const angle = Phaser.Math.Angle.BetweenPoints(this, sis);
				this.setVelocity(
					Math.cos(angle) * Spider.SPEED,
					Math.sin(angle) * Spider.SPEED
				);

				if (
					Phaser.Math.Distance.BetweenPoints(this, sis) < this.noiseLevel &&
					sis.id !== Sister.id
				) {
					sis.kicking = 8;
				}

				if (this.scene.physics.overlap(this, sis)) {
					if (sis.kicking) {
						this.setVelocity((this.x - sis.x) * 10, -50).setGravity(0, 100);
						this.deathTimer = 30;
					} else {
						sis.patientice -= 50;
						sis.obj.sprite.setTint(0xff0000);
						this.setVelocity(
							Math.cos(angle) * -Spider.SPEED * 50,
							Math.sin(angle) * -Spider.SPEED * 50
						);
					}
				}
			}
		} else {
			this.deathTimer--;
			this.setAlpha(this.deathTimer / 30);
			console.log(this.deathTimer);
			if (this.deathTimer === 0) {
				this.scene.updates.splice(this.scene.updates.indexOf(this), 1);
				this.destroy();
			}
		}
	}
}
