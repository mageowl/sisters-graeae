import GameScene from "./classes/scenes/GameScene.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.RESIZE
	},
	physics: {
		default: "arcade"
	},
	render: {
		pixelArt: true
	},
	scene: GameScene,
	plugins: {
		scene: [
			{
				key: "PhaserRaycaster",
				plugin: PhaserRaycaster,
				mapping: "raycasterPlugin"
			}
		]
	}
});
