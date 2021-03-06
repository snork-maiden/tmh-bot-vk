const VkBot = require("node-vk-bot-api");
const Session = require("node-vk-bot-api/lib/session");
const Stage = require("node-vk-bot-api/lib/stage");
const { TOKEN: TOKEN } = require("./TOKEN.js");

const { scene: scene, oldDeviceScene: oldDeviceScene } = require("./scenes.js");
const bot = new VkBot({
  token: TOKEN,
});
const session = new Session();
const stage = new Stage(scene, oldDeviceScene);

bot.use(session.middleware());
bot.use(stage.middleware());

bot.on((ctx) => {
  ctx.clientInfo.keyboard
    ? ctx.scene.enter("newDevice")
    : ctx.scene.enter("oldDevice");
});

bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
  }
});

bot.startPolling((err) => {
  if (err) {
    console.error(err);
    console.error(err.response.request_params);
  }
  console.log("bot started");
});
