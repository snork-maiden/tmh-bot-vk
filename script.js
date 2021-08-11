const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const { keyboards: keyboards, createKeyboard: createKeyboard } = require('./createKeyboard.js');
const messageText = require('./messageText.js');

const bot = new VkBot({
  token: '***REMOVED***'
});
const session = new Session();

const scene = new Scene('meet',
  (ctx) => {
    ctx.scene.next();
    ctx.reply(messageText.mainMenu, null, createKeyboard(keyboards.mainMenu));
  },
  (ctx) => {
    ctx.scene.next();
    if (ctx.message.text == 'Написать пост') {
      ctx.reply(messageText.createPost.askUser, null, keyboards.confirm);
    }
  },
  (ctx) => {
    ctx.session.name = ctx.message.text;

    ctx.scene.leave();
    ctx.reply(`Nice to meet you, ${ctx.session.name} (${ctx.session.age} years old)`);
  });

const stage = new Stage(scene);

bot.use(session.middleware());
bot.use(stage.middleware());

bot.on((ctx) => {
  ctx.scene.enter('meet');
});

bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
  }
});

function mainMenu(ctx) {
  return VkBotClientInfo.keyboard ? mainMenuButtons(ctx) : mainMenuNumbers(ctx);
}

bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
  console.log('bot started');
});