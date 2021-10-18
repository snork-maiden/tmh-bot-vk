const Scene = require("node-vk-bot-api/lib/scene");

const {
  keyboards: keyboards,
  createKeyboard: createKeyboard,
} = require("./createKeyboard.js");
const { messageText: messageText } = require("./messageText.js");
const stepFunctions = require("./stepFunctions.js");
const stepsList = require("./stepsList.js");



const scene = new Scene(
  "newDevice",
  // 0
  (ctx) => {
    ctx.scene.next();
    ctx.reply(messageText.mainMenu, null, createKeyboard(keyboards.mainMenu));
  },
  // 1
  (ctx) => {
    stepFunctions.mainMenu(ctx);
  },
  // 2
  (ctx) => {
    if (
      ctx.message.text === keyboards.toMainMenu[0][0] ||
      ctx.message.text.toLowerCase() === "стоп"
    ) {
      ctx.scene.enter("newDevice", stepsList.enter);
    }
  },
  //3
  (ctx) => {
    stepFunctions.createPostConfirm(ctx);
  },
  //4
  (ctx) => {
    stepFunctions.createPostDevice(ctx);
  },
  //5
  (ctx) => {
    stepFunctions.mainRejectPostReasonsList(ctx);
  },
  //6
  (ctx) => {
    stepFunctions.postsForThreads(ctx);
  },
  //7
  (ctx) => {
    stepFunctions.anonConfirm(ctx);
  },
  //8
  (ctx) => {
    stepFunctions.anonPosts(ctx);
  },
  //9
  (ctx) => {
    stepFunctions.postsForThemes(ctx);
  },
  //10
  (ctx) => {
    ctx.scene.selectStep(stepsList.enter);
    ctx.reply(
      messageText.rejectPost.fullRulesLink,
      null,
      createKeyboard(keyboards.toMainMenu)
    );
    stepFunctions.mainMenu(ctx);
  },
  //11
  (ctx) => {
    stepFunctions.rejectPostGoodbye(
      ctx,
      stepFunctions.mainRejectPostReasonsList
    );
  },
  //12
  (ctx) => {
    stepFunctions.rejectPostGoodbye(ctx, stepFunctions.postsForThreads);
  },
  //13
  (ctx) => {
    stepFunctions.rejectPostGoodbye(ctx, stepFunctions.anonPosts);
  },
  //14
  (ctx) => {
    stepFunctions.rejectPostGoodbye(ctx, stepFunctions.postsForThemes);
  },
  //15
  (ctx) => {
    stepFunctions.continueOrMain(ctx);
  }
);

const oldDeviceScene = new Scene(
  "oldDevice",
  // 0
  (ctx) => {
    ctx.reply(messageText.oldDeviceWelcome);
    ctx.scene.leave();
  }
);

module.exports.scene = scene;
module.exports.oldDeviceScene = oldDeviceScene;
