import { getProperty } from "../../util.js";
import Door from "../objects/Door.js";
import Sister from "../objects/Sister.js";

export default class GameScene extends Phaser.Scene {
	updates = [];
	/**
	 * @type {Phaser.GameObjects.Container}
	 *
	 * @memberof GameScene
	 */
	container;

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

		this.load.tilemapTiledJSON("map", "tilemaps/map.json");
		this.load.image("tileset", "sprites/tileset.png");
	}

	create() {
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
						x: x + 4,
						y: y + 4
					});
					break;

				default:
					break;
			}
		});

		map
			.getObjectLayer("objects")
			.objects.forEach(({ type, properties, id }) => {
				switch (type) {
					case "door":
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
