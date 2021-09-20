const {
  keyboards: keyboards,
  createKeyboard: createKeyboard,
} = require("./createKeyboard.js");
const {
  messageImgDesktop: messageImgDesktop,
  messageImgMobile: messageImgMobile,
} = require("./messageImg.js");
const {
  messageText: messageText,
  // OldDeviceMessageText: OldDeviceMessageText,
} = require("./messageText.js");

function mainMenu(ctx) {
  if (!ctx.clientInfo.keyboard) {
    ctx.reply(messageText.oldDeviceRecognise);
    ctx.scene.leave();
  }
  switch (ctx.message.text) {
    case keyboards.mainMenu[0][0]:
      ctx.scene.selectStep(3);
      ctx.reply(
        messageText.createPost.askUser,
        null,
        createKeyboard(keyboards.confirm)
      );
      break;
    case keyboards.mainMenu[1][0]:
      ctx.scene.selectStep(5);
      ctx.reply(
        messageText.rejectPost.mainReasons,
        null,
        createKeyboard(keyboards.rulesConfirm)
      );
      break;
    case keyboards.mainMenu[2][0]:
      ctx.scene.selectStep(2);
      ctx.reply(
        messageText.connectAdmin,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    default:
      ctx.reply(messageText.default);
  }
}

function createPostConfirm(ctx) {
  switch (ctx.message.text) {
    case keyboards.confirm[0][0]:
      ctx.scene.selectStep(0);
      ctx.reply(
        messageText.createPost.answerYes,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.confirm[1][0]:
      ctx.scene.selectStep(4);
      ctx.reply(
        messageText.createPost.answerNo,
        null,
        createKeyboard(keyboards.yourDevice)
      );
      break;
    default:
      mainMenu(ctx);
  }
}


function createPostDevice(ctx) {
  switch (ctx.message.text) {
    case keyboards.yourDevice[0][0]:
      ctx.scene.selectStep(0);
      ctx.reply(
        messageText.createPost.howTo,
        messageImgMobile,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.yourDevice[1][0]:
      ctx.scene.selectStep(0);
      ctx.reply(
        messageText.createPost.howTo,
        messageImgDesktop,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    default:
      mainMenu(ctx);
  }
}

function mainRejectPostReasonsList (ctx) {
  switch (ctx.message.text) {
    case keyboards.rulesConfirm[0][0]:
      ctx.scene.selectStep(11);
      ctx.reply(
        messageText.rejectPost.goodbye,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.rulesConfirm[1][0]:
      ctx.scene.next();
      ctx.reply(
        messageText.rejectPost.postsForThreads,
        null,
        createKeyboard(keyboards.rulesConfirm)
      );
      break;
    default:
      mainMenu(ctx);
  }
}

function postsForThreads(ctx) {
  switch (ctx.message.text) {
    case keyboards.rulesConfirm[0][0]:
      ctx.scene.selectStep(12);
      ctx.reply(
        messageText.rejectPost.goodbye,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.rulesConfirm[1][0]:
      ctx.scene.next();
      ctx.reply(
        messageText.rejectPost.isAnon,
        null,
        createKeyboard(keyboards.confirm)
      );
      break;
    default:
      mainMenu(ctx);
  }
}

function anonConfirm(ctx) {
  switch (ctx.message.text) {
    case keyboards.confirm[0][0]:
      ctx.scene.next();
      ctx.reply(
        messageText.rejectPost.anonPosts,
        null,
        createKeyboard(keyboards.rulesConfirm)
      );
      break;
    case keyboards.confirm[1][0]:
      ctx.scene.selectStep(9);
      ctx.reply(
        messageText.rejectPost.isTheme,
        null,
        createKeyboard(keyboards.themes)
      );
      break;
    default:
      mainMenu(ctx);
  }
}

function anonPosts(ctx) {
  switch (ctx.message.text) {
    case keyboards.rulesConfirm[0][0]:
      ctx.scene.selectStep(13);
      ctx.reply(
        messageText.rejectPost.goodbye,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.rulesConfirm[1][0]:
      ctx.scene.next();
      ctx.reply(
        messageText.rejectPost.isTheme,
        null,
        createKeyboard(keyboards.themes)
      );
      break;
    default:
      mainMenu(ctx);
  }
}

function postsForThemes(ctx) {
  switch (ctx.message.text) {
    case keyboards.themes[0][0]:
      ctx.scene.selectStep(0);
      ctx.reply(
        messageText.rejectPost.fundraising,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.themes[1][0]:
      ctx.scene.next();
      ctx.reply(
        messageText.rejectPost.animals,
        null,
        createKeyboard(keyboards.rulesConfirm)
      );
      break;
    case keyboards.themes[2][0]:
      ctx.scene.selectStep(0);
      ctx.reply(
        messageText.rejectPost.fullRulesLink,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    default:
      mainMenu(ctx);
  }
}

function rejectPostGoodbye(ctx, func) {
  if (ctx.message.text === keyboards.toMainMenu[0][0]) {
    ctx.scene.selectStep(0);
    return;
  }
  func(ctx);
}

module.exports.mainMenu = mainMenu;
module.exports.createPostConfirm = createPostConfirm;
module.exports.createPostDevice = createPostDevice;
module.exports.mainRejectPostReasonsList = mainRejectPostReasonsList;
module.exports.postsForThreads = postsForThreads;
module.exports.anonConfirm = anonConfirm;
module.exports.anonPosts = anonPosts;
module.exports.postsForThemes = postsForThemes;
module.exports.rejectPostGoodbye = rejectPostGoodbye;


/* function createOldDeviceSceneStep(ctx, array) {
  console.log(array[0]);
  for (let i = 0; i <= array.length; i++) {
    console.log(array[i]);
    let a = 0;
    if (ctx.message.text === String(i + 1)) {
      console.log(a++);
      ctx.scene.selectStep(array[i].step);
      console.log(a++);
      ctx.reply(array[i].message);
      console.log(a++);
      return;
    }
  }
  ctx.reply(OldDeviceMessageText.default);
} */

