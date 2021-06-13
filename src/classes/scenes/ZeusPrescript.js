import createPrescriptedScene from "./PrescriptedScene.js";

export default createPrescriptedScene("zeus", {
  images: [
    { key: "zeus", url: "sprites/zeus.png" },
    { key: "sister-idle", url: "sprites/sister-idle.png" },
  ],
  sprites: [
    { key: "zeus", x: 80, y: 100 },
    { key: "sister-idle", name: "sis0" },
  ],
  bgImage: "sprites/title-bg.png",
  actions: [
    {
      type: "wait",
      delay: 500,
    },
    {
      type: "move",
      sprite: "zeus",
      time: 1000,
      x: 80,
      y: 80,
    },
    {
      type: "wait",
      delay: 5000,
    },
  ],
  next: "game",
});
