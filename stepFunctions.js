const {USER_TOKEN: USER_TOKEN} = require("./TOKEN.js");
const api = require('node-vk-bot-api/lib/api');

const {
  keyboards: keyboards,
  createKeyboard: createKeyboard,
} = require("./createKeyboard.js");
const {
  messageImgDesktop: messageImgDesktop,
  messageImgMobile: messageImgMobile,
} = require("./messageImg.js");
const { messageText: messageText } = require("./messageText.js");
const stepsList = require("./stepsList.js");



function mainMenu(ctx) {
  if (!ctx.clientInfo.keyboard) {
    ctx.reply(messageText.oldDeviceRecognise);
    ctx.scene.leave();
  }
  switch (ctx.message.text) {
    case keyboards.mainMenu[0][0]:
      ctx.scene.selectStep(stepsList.createPostConfirm);
      ctx.reply(
        messageText.createPost.askUser,
        null,
        createKeyboard(keyboards.confirm)
      );
      break;
    case keyboards.mainMenu[1][0]:
      postponeCheck(ctx);
      // ctx.scene.selectStep(stepsList.mainRejectPostReasonsList);
      // ctx.reply(
      //   messageText.rejectPost.mainReasons,
      //   null,
      //   createKeyboard(keyboards.rulesConfirm)
      // );
      break;
    case keyboards.mainMenu[2][0]:
      ctx.scene.selectStep(stepsList.chat);
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
      ctx.scene.selectStep(stepsList.enter);
      ctx.reply(
        messageText.createPost.answerYes,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.confirm[1][0]:
      ctx.scene.selectStep(stepsList.createPostDevice);
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
      ctx.scene.selectStep(stepsList.enter);
      ctx.reply(
        messageText.createPost.howTo,
        messageImgMobile,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.yourDevice[1][0]:
      ctx.scene.selectStep(stepsList.enter);
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

function mainRejectPostReasonsList(ctx) {
  switch (ctx.message.text) {
    case keyboards.rulesConfirm[0][0]:
      ctx.scene.selectStep(stepsList.rejectPostGoodbye.mainRejectPostReasonsList);
      ctx.reply(
        messageText.rejectPost.goodbye,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.rulesConfirm[1][0]:
      ctx.scene.selectStep(stepsList.postsForThreads);
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
      ctx.scene.selectStep(stepsList.rejectPostGoodbye.postsForThreads);
      ctx.reply(
        messageText.rejectPost.goodbye,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.rulesConfirm[1][0]:
      ctx.scene.selectStep(stepsList.anonConfirm);
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
      ctx.scene.selectStep(stepsList.anonPosts);
      ctx.reply(
        messageText.rejectPost.anonPosts,
        null,
        createKeyboard(keyboards.rulesConfirm)
      );
      break;
    case keyboards.confirm[1][0]:
      ctx.scene.selectStep(stepsList.postsForThemes);
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
      ctx.scene.selectStep(stepsList.rejectPostGoodbye.anonPosts);
      ctx.reply(
        messageText.rejectPost.goodbye,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.rulesConfirm[1][0]:
      ctx.scene.selectStep(stepsList.postsForThemes);
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
      ctx.scene.selectStep(stepsList.rejectPostGoodbye.postsForThemes);
      ctx.reply(
        messageText.rejectPost.fundraising,
        null,
        createKeyboard(keyboards.toMainMenu)
      );
      break;
    case keyboards.themes[1][0]:
      ctx.scene.selectStep(stepsList.fullRulesLink);
      ctx.reply(
        messageText.rejectPost.animals,
        null,
        createKeyboard(keyboards.rulesConfirm)
      );
      break;
    case keyboards.themes[2][0]:
      ctx.scene.selectStep(stepsList.rejectPostGoodbye.postsForThemes);
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
    ctx.clientInfo.keyboard
      ? ctx.scene.enter("newDevice")
      : ctx.scene.enter("oldDevice");
    return;
  }
  func(ctx);
}

async function postponeCheck(ctx) {
  const posts = await getPostponePosts(ctx);
  console.log(posts);
  if(posts.length === 0) {
    ctx.scene.selectStep(15); //!!!!
    ctx.reply(
      messageText.rejectPost.rejected,
      null,
      createKeyboard(keyboards.rulesNext),
    );
    return;
  }

 let ids = posts.filter( item => item.signer_id).map( item => item.signer_id);
//  let ids = posts.reduce( (acum,item) => {
//     if (item.signer_id) {
//       acum.push(item.signer_id);
//       return acum;
//     }
//   }, []);

console.log(ids);

  if(ids.includes(ctx.message.from_id)) {
    ctx.scene.selectStep(stepsList.enter);
    ctx.reply(
      messageText.rejectPost.timer,
      null,
      createKeyboard(keyboards.toMainMenu),
    );
    return;
  }

  ctx.scene.selectStep(15); //!!!!
  ctx.reply(
    messageText.rejectPost.rejectedOrAnon,
    null,
    createKeyboard(keyboards.rulesNext),
  );
}

async function getPostponePosts(ctx) {
  try {
    data = await api('wall.get', {
      owner_id: '-' + ctx.groupId,
      access_token: USER_TOKEN,
      filter: 'postponed',
      count: 100,
    });
  } catch(err) {
    console.log(err);
    return [];
  }

 return data.response.items;
}

function continueOrMain(ctx) {
  switch (ctx.message.text) {
    case keyboards.rulesNext[0][0]:
      ctx.scene.selectStep(stepsList.mainRejectPostReasonsList);
      ctx.reply(
        messageText.rejectPost.mainReasons,
        null,
        createKeyboard(keyboards.rulesConfirm)
        );
        break;
        case keyboards.rulesNext[1][0]:
          ctx.scene.enter("newDevice", stepsList.enter);
          break;
    default:
      mainMenu(ctx);
  }
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
module.exports.continueOrMain = continueOrMain;



