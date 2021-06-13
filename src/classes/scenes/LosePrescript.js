import createPrescriptedScene from "./PrescriptedScene.js";

export default createPrescriptedScene("lose", {
  images: [
    { key: "zeus", url: "sprites/zeus.png" },
    { key: "perseus", url: "sprites/perseus.png" },
    { key: "sister-idle", url: "sprites/sister-idle.png" },
    { key: "sister-ne-idle", url: "sprites/sister-no-eye.png" },
  ],
  sprites: [
    { key: "zeus", x: 80, y: 100 },
    { key: "perseus", x: 80, y: 100 },
    { key: "sister-ne-idle", name: "sis0", x: 70, y: 25 },
    { key: "sister-idle", name: "sis1", x: 80, y: 25 },
    { key: "sister-ne-idle", name: "sis2", x: 90, y: 25 },
  ],
  bgImage: "sprites/lose-bg.png",
  actions: [
    {
      type: "wait",
      delay: 50000,
    },
    // {
    //   type: "move",
    //   sprite: "zeus",
    //   time: 1000,
    //   x: 80,
    //   y: 70,
    // },
    // {
    //   type: "dialog",
    //   text: "Pemphredo: Someone comes... can you see sister?",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Zeus: Hello Sisters Graeae, Long time no see.",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "dialog",
    //   text: "Ha ha. Sorry, dad joke.",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "wait",
    //   delay: 1000,
    // },
    // {
    //   type: "dialog",
    //   text: "We have our eye and can see just fine thank you.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Perseus is foolishly looking for your sister, Medusa.",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "dialog",
    //   text: "I expect he will come to you to for help.",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "dialog",
    //   text: "He will. We have seen it.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "And I believe his quest will only end in his death.",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "dialog",
    //   text: "Perhaps...",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Help him and suffer my wrath.",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "dialog",
    //   text: "That's all. Kthxbye!",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "wait",
    //   delay: 1000,
    // },
    // {
    //   type: "move",
    //   sprite: "zeus",
    //   time: 400,
    //   x: 80,
    //   y: 100,
    // },
    // {
    //   type: "wait",
    //   delay: 1000,
    // },
    // {
    //   type: "dialog",
    //   text: "Many moons later...",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "wait",
    //   delay: 1000,
    // },
    // {
    //   type: "move",
    //   sprite: "perseus",
    //   time: 1000,
    //   x: 80,
    //   y: 70,
    // },
    // {
    //   type: "dialog",
    //   text: "Someone comes near. Is it Zeus again, sister?",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "It is I, Perseus...",
    //   speaker: "",
    //   y: 260,
    // },
    // {
    //   type: "dialog",
    //   text: "Perseus, NO! <throws rock knocking him out>",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "rotate",
    //   sprite: "perseus",
    //   rot: 1.6,
    // },
    // {
    //   type: "dialog",
    //   text: "Deino: He will wake again soon sisters.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Enyo: Yes, and then he will want our help.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Pemphredo: Let's escape through our cave's backdoor.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Sisters Graeae (all together): I'll follow you!",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "WASD to move, Space to pass eye.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Pass the eye before sisters run out of patience.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "Press shift to kick and E to call your sisters.",
    //   speaker: "",
    //   y: 195,
    // },
    // {
    //   type: "dialog",
    //   text: "You have 5 minutes to find the exit...",
    //   speaker: "",
    //   y: 195,
    // },
  ],
  next: "menu",
});
