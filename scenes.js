const Scene = require("node-vk-bot-api/lib/scene");
const {
  keyboards: keyboards,
  createKeyboard: createKeyboard,
} = require("./createKeyboard.js");

const {
  messageText: messageText,
  // OldDeviceMessageText: OldDeviceMessageText,
} = require("./messageText.js");

const stepFunctions = require("./stepFunctions.js");

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
      ctx.scene.enter("newDevice", 0);
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
    ctx.scene.selectStep(0);
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
//   (ctx) => {
//     ctx.reply(OldDeviceMessageText.mainMenu);
//     ctx.scene.enter("oldDevice", 1);
//   },
//   // 1
//   (ctx) => {
//     console.log("a");
//     createOldDeviceSceneStep(ctx, [
//       {
//         message: OldDeviceMessageText.createPost.askUser,
//         step: 3,
//       },
//       {
//         message: OldDeviceMessageText.rejectPost.mainReasons,
//         step: 5,
//       },
//       {
//         message: OldDeviceMessageText.connectAdmin,
//         step: 2,
//       },
//     ]);
//     switch (ctx.message.text) {
//         case 1:
//             ctx.scene.selectStep(3);
//             ctx.reply(OldDeviceMessageText.createPost.askUser);
//             break;
//         case 2:
//             ctx.scene.selectStep(5);
//             ctx.reply(OldDeviceMessageText.rejectPost.mainReasons);
//             break;
//         case 3:
//             ctx.scene.selectStep(2);
//             ctx.reply(OldDeviceMessageText.connectAdmin);
//             break;
//         default:
//             ctx.reply(OldDeviceMessageText.default);
// }
//   },
//   // 2
//   (ctx) => {
//     if (ctx.message.text == keyboards.toMainMenu[0][0]) {
//       ctx.scene.enter("oldDevice", 0);
//     }
//     mainMenu(ctx);
//   },
//   //3
//   (ctx) => {
//     createOldDeviceSceneStep(ctx, [
//       {
//         message: OldDeviceMessageText.connectAdmin,
//         step: 0,
//       },
//     ]);
//   },
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.confirm[0][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.createPost.answerYes,
//           null,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       case keyboards.confirm[1][0]:
//         ctx.scene.selectStep(4);
//         ctx.reply(
//           messageText.createPost.answerNo,
//           null,
//           createKeyboard(keyboards.yourDevice)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //4
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.yourDevice[0][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.createPost.howTo,
//           messageImgMobile,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       case keyboards.yourDevice[1][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.createPost.howTo,
//           messageImgDesktop,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //5
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.rulesConfirm[0][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.rejectPost.goodbye,
//           null,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       case keyboards.rulesConfirm[1][0]:
//         ctx.scene.next();
//         ctx.reply(
//           messageText.rejectPost.postsForThreads,
//           null,
//           createKeyboard(keyboards.rulesConfirm)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //6
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.rulesConfirm[0][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.rejectPost.goodbye,
//           null,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       case keyboards.rulesConfirm[1][0]:
//         ctx.scene.next();
//         ctx.reply(
//           messageText.rejectPost.isAnon,
//           null,
//           createKeyboard(keyboards.confirm)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //7
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.confirm[0][0]:
//         ctx.scene.next();
//         ctx.reply(
//           messageText.rejectPost.anonPosts,
//           null,
//           createKeyboard(keyboards.rulesConfirm)
//         );
//         break;
//       case keyboards.confirm[1][0]:
//         ctx.scene.selectStep(9);
//         ctx.reply(
//           messageText.rejectPost.isTheme,
//           null,
//           createKeyboard(keyboards.themes)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //8
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.rulesConfirm[0][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.rejectPost.goodbye,
//           null,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       case keyboards.rulesConfirm[1][0]:
//         ctx.scene.next();
//         ctx.reply(
//           messageText.rejectPost.isTheme,
//           null,
//           createKeyboard(keyboards.themes)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //9
//   (ctx) => {
//     switch (ctx.message.text) {
//       case keyboards.themes[0][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.rejectPost.fundraising,
//           null,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       case keyboards.themes[1][0]:
//         ctx.scene.next();
//         ctx.reply(
//           messageText.rejectPost.animals,
//           null,
//           createKeyboard(keyboards.rulesConfirm)
//         );
//         break;
//       case keyboards.themes[2][0]:
//         ctx.scene.selectStep(0);
//         ctx.reply(
//           messageText.rejectPost.fullRulesLink,
//           null,
//           createKeyboard(keyboards.toMainMenu)
//         );
//         break;
//       default:
//         mainMenu(ctx);
//     }
//   },
//   //10
//   (ctx) => {
//     ctx.scene.selectStep(0);
//     ctx.reply(
//       messageText.rejectPost.fullRulesLink,
//       null,
//       createKeyboard(keyboards.toMainMenu)
//     );
//     mainMenu(ctx);
//   }
// );

module.exports.scene = scene;
module.exports.oldDeviceScene = oldDeviceScene;
