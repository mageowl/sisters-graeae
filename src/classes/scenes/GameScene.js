import { getProperty } from "../../util.js";
import Door from "../objects/Door.js";
import Sister from "../objects/Sister.js";
import Spider from "../objects/Spider.js";

export default class GameScene extends Phaser.Scene {
	updates = [];
	/**
	 * @type {Phaser.GameObjects.Container}
	 *
	 * @memberof GameScene
	 */
	container;

	sounds = {
		random: [],
		lowPatientice: [],
		spiders: [],
		roomEnter: []
	};

	constructor() {
		super("game");
	}

	preload() {
		this.load.spritesheet("sister", "sprites/sister.png", {
			frameWidth: 8,
			frameHeight: 8
		});
		this.load.image("bubble", "sprites/bubble.png");
		this.load.image("step", "sprites/step.png");
		this.load.image("spider", "sprites/spider.png");

		this.load.tilemapTiledJSON("map", "tilemaps/map.json");
		this.load.image("tileset", "sprites/tileset.png");

		this.load.audio("ah-ha", ["sounds/ah-ha.m4a"]);
		this.load.audio("are-you-sure", ["are-you-sure.m4a"]);
		this.load.audio("bathroom", ["bathroom.m4a"]);
		this.load.audio("feet-hurt", ["feet-hurt.m4a"]);
		this.load.audio("follow-me", ["follow-me.m4a"]);
		this.load.audio("give-me-the-eye", ["give-me-the-eye.m4a"]);
		this.load.audio("grunt", ["grunt.m4a"]);
		this.load.audio("hmm1", ["hmm1.m4a"]);
		this.load.audio("hmm2", ["hmm2.m4a"]);
		this.load.audio("just-tell-him", ["just-tell-him.m4a"]);
		this.load.audio("keep-up", ["keep-up.m4a"]);
		this.load.audio("my-turn-yet", ["my-turn-yet.m4a"]);
		this.load.audio("other-left", ["other-left.m4a"]);
		this.load.audio("ouch-my-foot", ["ouch-my-foot.m4a"]);
		this.load.audio("out-of-my-way", ["out-of-my-way.m4a"]);
		this.load.audio("scream1", ["scream1.m4a"]);
		this.load.audio("scream2", ["scream2.m4a"]);
		this.load.audio("secret-backdoor", ["secret-backdoor.m4a"]);
		this.load.audio("something-smells", ["something-smells.m4a"]);
		this.load.audio("spiders-hate", ["spiders-hate.m4a"]);
		this.load.audio("spiders-speeders", ["spiders-speeders.m4a"]);
		this.load.audio("spiders-tasty", ["spiders-tasty.m4a"]);
		this.load.audio("there-yet", ["there-yet.m4a"]);
		this.load.audio("toot", ["sounds/toot.m4a"]);
		this.load.audio("want-the-eye-no", ["want-the-eye-no.m4a"]);
		this.load.audio("want-the-eye", ["want-the-eye.m4a"]);
		this.load.audio("were-lost", ["were-lost.m4a"]);
		this.load.audio("what-do-you-see", ["what-do-you-see.m4a"]);
		this.load.audio("you-cant-navigate", ["you-cant-navigate.m4a"]);
	}

	create() {
		this.sounds.random.push(
			this.sound.add("ah-ha"),
			this.sound.add("are-you-sure"),
			this.sound.add("bathroom"),
			this.sound.add("feet-hurt"),
			this.sound.add("follow-me"),
			this.sound.add("give-me-the-eye"),
			this.sound.add("grunt"),
			this.sound.add("toot"),
			this.sound.add("hmm1"),
			this.sound.add("hmm2"),
			this.sound.add("out-of-my-way"),
			this.sound.add("")
		);

		const map = this.add.tilemap("map", 8, 8);
		map.addTilesetImage("tileset", "tileset");
		this.level = map.createLayer("map", "tileset");
		this.level.setCollisionByProperty({ collide: true }).setPipeline("Light2D");

		this.container = this.add.container(0, 0, [
			new Sister({
				scene: this,
				x: 1344,
				y: 840
			}),

			new Sister({
				scene: this,
				x: 1356,
				y: 840
			}),

			new Sister({
				scene: this,
				x: 1364,
				y: 840
			})
		]);

		const objs = [];

		map.getObjectLayer("objects").objects.forEach(({ type, id, x, y }) => {
			switch (type) {
				case "door":
					objs[id] = new Door({
						scene: this,
						x,
						y
					});
					break;

				case "spider":
					this.container.add(
						new Spider({
							scene: this,
							x,
							y
						})
					);
					break;

				default:
					break;
			}
		});

		map
			.getObjectLayer("objects")
			.objects.forEach(({ type, properties, id }) => {
				switch (type) {
					case "door": {
						if (getProperty(properties, "exit")) {
							objs[id].exit = objs[getProperty(properties, "exit")];
						} else {
							const door = objs[id];
							const exit = objs
								.filter((o) => o instanceof Door)
								.reduce((d1, d2, i) =>
									d2 === door
										? d1
										: d1 === door
										? d2
										: Phaser.Math.Distance.BetweenPoints(door, d1) <
										  Phaser.Math.Distance.BetweenPoints(door, d2)
										? d1
										: d2
								);
							if (exit.exit === undefined) {
								door.exit = exit;
								exit.exit = door;
							}
						}
						break;
					}

					default:
						break;
				}
			});

		this.lights.enable();

		this.target = this.add.image(100, 100);
		this.cameras.main.setZoom(5).startFollow(this.target, false);
	}

	update() {
		this.updates.forEach((o) => o.update());

		this.container.sort("y");

		this.target.setPosition(
			Math.floor(Sister.eyed.x / 160) * 160 + 80,
			Math.floor(Sister.eyed.y / 96) * 96 + 48
		);
	}
}
