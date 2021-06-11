import GameScene from "./classes/scenes/GameScene.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 800,
	height: 496,
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
