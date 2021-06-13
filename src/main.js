import GameScene from "./classes/scenes/GameScene.js";
import MenuScene from "./classes/scenes/MenuScene.js";
import createPrescriptedScene from "./classes/scenes/PrescriptedScene.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 800,
	height: 480,
	backgroundColor: 0x222323,
	physics: {
		default: "arcade",
		arcade: {
			// debug: true
		}
	},
	render: {
		pixelArt: true,
		antialias: false
	},
	loader: {
		baseURL: "../../../assets"
	},
	scene: [
		MenuScene,
		createPrescriptedScene("zeus", {
			images: [{ key: "zeus", url: "sprites/zeus.png" }],
			sprites: [{ key: "zeus", x: 10, y: 30 }],
			bgImage: "sprites/title-bg.png",
			actions: [
				{
					type: "dialog",
					text: "Hello World",
					speaker: "Coder"
				},
				{
					type: "move",
					sprite: "zeus",
					time: 1000,
					x: 30,
					y: 40
				}
			],
			next: "game"
		}),
		GameScene
	]
});
