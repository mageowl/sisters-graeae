import GameScene from "./classes/scenes/GameScene.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 800,
	height: 480,
	backgroundColor: 0x222323,
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		}
	},
	render: {
		pixelArt: true,
		antialias: false
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
