import createPrescriptedScene from "./PrescriptedScene.js";

export default createPrescriptedScene("zeus", {
	images: [
		{ key: "zeus", url: "sprites/zeus.png" },
		{ key: "sister-idle", url: "sprites/sister-idle.png" },
		{ key: "sister-ne-idle", url: "sprites/sister-no-eye.png" }
	],
	sprites: [
		{ key: "zeus", x: 80, y: 100 },
		{ key: "sister-ne-idle", name: "sis0", x: 70, y: 25 },
		{ key: "sister-idle", name: "sis1", x: 80, y: 25 },
		{ key: "sister-ne-idle", name: "sis2", x: 90, y: 25 }
	],
	bgImage: "sprites/title-bg.png",
	actions: [
		{
			type: "wait",
			delay: 500
		},
		{
			type: "move",
			sprite: "zeus",
			time: 1000,
			x: 80,
			y: 70
		},
		{
			type: "dialog",
			text: "Zeus: Hello Greaea Sisters, Long time no see.",
			speaker: "",
			y: 260
		},
		{
			type: "dialog",
			text: "Ha ha. Sorry, dad joke.",
			speaker: "",
			y: 260
		},
		{
			type: "wait",
			delay: 1000
		},
		{
			type: "dialog",
			text: "We have our eye and can see just fine thank you.",
			speaker: "",
			y: 195
		},
		{
			type: "dialog",
			text: "Perseus is foolishly looking for your sister, Medusa.",
			speaker: "",
			y: 260
		},
		{
			type: "dialog",
			text: "I expect he will come to you to for help.",
			speaker: "",
			y: 260
		},
		{
			type: "dialog",
			text: "He will. We have seen it.",
			speaker: "",
			y: 195
		},
		{
			type: "dialog",
			text: "And I believe his quest will only end in his death.",
			speaker: "",
			y: 260
		},
		{
			type: "dialog",
			text: "Perhaps...",
			speaker: "",
			y: 195
		},
		{
			type: "dialog",
			text: "Help him and suffer my wrath.",
			speaker: "",
			y: 260
		},
		{
			type: "dialog",
			text: "That's all. Kthxbye!",
			speaker: "",
			y: 260
		},
		{
			type: "wait",
			delay: 1000
		},
		{
			type: "move",
			sprite: "zeus",
			time: 1000,
			x: 80,
			y: 100
		},
		{
			type: "wait",
			delay: 10000
		}
	],
	next: "game"
});
