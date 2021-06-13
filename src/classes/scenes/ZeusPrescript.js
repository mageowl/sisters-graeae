import createPrescriptedScene from "./PrescriptedScene.js";

export default createPrescriptedScene("zeus", {
  images: [
    { key: "zeus", url: "sprites/zeus.png" },
    { key: "sister-idle", url: "sprites/sister-idle.png" },
    { key: "sister-ne-idle", url: "sprites/sister-no-eye.png" },
  ],
  sprites: [
    { key: "zeus", x: 80, y: 100 },
    { key: "sister-ne-idle", name: "sis0", x: 70, y: 25 },
    { key: "sister-idle", name: "sis1", x: 80, y: 25 },
    { key: "sister-ne-idle", name: "sis2", x: 90, y: 25 },
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
      y: 70,
    },
    {
      type: "dialog",
      text: "Testing stuff",
      speaker: "Zeus",
    },
    {
      type: "wait",
      delay: 10000,
    },
  ],
  next: "game",
});
