const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const { keyboards: keyboards, createKeyboard: createKeyboard } = require('./createKeyboard.js');
const { messageImgDekstop: messageImgDekstop, messageImgMobile: messageImgMobile } = require('./messageImg.js');
const messageText = require('./messageText.js');

const bot = new VkBot({
  token: '***REMOVED***'
});
const session = new Session();

const scene = new Scene('meet',
// 0
  (ctx) => {
    ctx.scene.next();
    ctx.reply(messageText.mainMenu, null, createKeyboard(keyboards.mainMenu));
  },
  // 1
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.mainMenu[0][0]:
        ctx.scene.selectStep(3);
        ctx.reply(messageText.createPost.askUser, null, createKeyboard(keyboards.confirm));
        break;
      case keyboards.mainMenu[1][0]:
        ctx.scene.selectStep(5);
        ctx.reply(messageText.rejectPost.mainReasons, null, createKeyboard(keyboards.roolsConfirm));
        break;
      case keyboards.mainMenu[2][0]:
        ctx.scene.next();
        ctx.reply(messageText.connectAdmin, null, createKeyboard(keyboards.toMainMenu));
        break;
      default:
        ctx.reply('Нажмите на кнопку');
    } 
      
  },
  // 2
  (ctx) => {
    if (ctx.message.text == keyboards.toMainMenu[0][0]) {
      ctx.scene.enter('meet', 0);
    }
  },
  //3
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.confirm[0][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.createPost.answerYes, null, createKeyboard(keyboards.toMainMenu));
        break;
      case keyboards.confirm[1][0]:
        ctx.scene.selectStep(4);
        ctx.reply(messageText.createPost.answerNo, null, createKeyboard(keyboards.yourDevice));
        break;
      default:
        ctx.reply('Нажмите на кнопку');
    } 
  },
  //4
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.yourDevice[0][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.createPost.howTo, messageImgMobile, createKeyboard(keyboards.toMainMenu));
        break;
      case keyboards.yourDevice[1][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.createPost.howTo, messageImgDekstop, createKeyboard(keyboards.toMainMenu));
        break;
      default:
          ctx.reply('Нажмите на кнопку');
    } 
  },
  //5
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.roolsConfirm[0][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.rejectPost.goodbye, null, createKeyboard(keyboards.toMainMenu));
        break;
      case keyboards.roolsConfirm[1][0]:
        ctx.scene.next();
        ctx.reply(messageText.rejectPost.postsForThreads, null, createKeyboard(keyboards.roolsConfirm));
        break;
      default:
        ctx.reply('Нажмите на кнопку');    
      } 
  },
  //6
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.roolsConfirm[0][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.rejectPost.goodbye, null, createKeyboard(keyboards.toMainMenu));
        break;
      case keyboards.roolsConfirm[1][0]:
        ctx.scene.next();
        ctx.reply(messageText.rejectPost.isAnonimus, null, createKeyboard(keyboards.confirm));
        break;
      default:
        ctx.reply('Нажмите на кнопку');    
      } 
  },
  //7
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.confirm[0][0]:
        ctx.scene.next();
        ctx.reply(messageText.rejectPost.anonimusPosts, null, createKeyboard(keyboards.roolsConfirm));
        break;
      case keyboards.confirm[1][0]:
        ctx.scene.selectStep(9);
        ctx.reply(messageText.rejectPost.isTheme, null, createKeyboard(keyboards.themes));
        break;
      default:
        ctx.reply('Нажмите на кнопку');
    } 
  },
  //8
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.roolsConfirm[0][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.rejectPost.goodbye, null, createKeyboard(keyboards.toMainMenu));
        break;
      case keyboards.roolsConfirm[1][0]:
        ctx.scene.next();
        ctx.reply(messageText.rejectPost.isTheme, null, createKeyboard(keyboards.themes));
        break;
      default:
        ctx.reply('Нажмите на кнопку');    
      } 
  },
  //9
  (ctx) => {
    switch (ctx.message.text) {
      case keyboards.themes[0][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.rejectPost.fundraising, null, createKeyboard(keyboards.toMainMenu));
        break;
      case keyboards.themes[1][0]:
        ctx.scene.next();
        ctx.reply(messageText.rejectPost.aminmals, null, createKeyboard(keyboards.roolsConfirm));
        break;
      case keyboards.themes[2][0]:
        ctx.scene.selectStep(0);
        ctx.reply(messageText.rejectPost.fullRulesLink, null, createKeyboard(keyboards.toMainMenu));
        break;
      default:
        ctx.reply('Нажмите на кнопку');    
      } 
  },
  //10
  (ctx) => {
    ctx.scene.selectStep(0);
    ctx.reply(messageText.rejectPost.fullRulesLink, null, createKeyboard(keyboards.toMainMenu));

    // ctx.session.name = ctx.message.text;

    // ctx.scene.leave();
    // ctx.reply(`Nice to meet you, ${ctx.session.name} (${ctx.session.age} years old)`);
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