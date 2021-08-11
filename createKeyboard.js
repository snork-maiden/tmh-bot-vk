const Markup = require('node-vk-bot-api/lib/markup');
const colorEnum = {
    RED : 'negative',
    GREEN : 'positive',
    BLUE : 'primary',
    WHITE : 'secondary' 
}



const keyboards = {
    mainMenu: [
        ['Написать пост', colorEnum.GREEN],
        ['Пост отклонили', colorEnum.RED],
        ['Связь с админками', colorEnum.WHITE],
    ],
    confirm: [
        ['да', colorEnum.GREEN],
        ['нет', colorEnum.RED],
    ],
    toMainMenu: [
        ['Главное меню', colorEnum.BLUE],
    ],
    yourDevice: [
        ['мобильный', colorEnum.BLUE],
        ['компьютер', colorEnum.BLUE],
    ],
    themes: [
        ['сбор денег', colorEnum.BLUE],
        ['животные', colorEnum.BLUE],
    ],
    roolsConfirm: [
        ['Да, дело в этом!', colorEnum.GREEN],
        ['Нет, не то', colorEnum.RED],
    ],
}
// const keyboards = {
//     mainMenu: createKeyboard([
//         ['Написать пост', colorEnum.GREEN],
//         ['Пост отклонили', colorEnum.RED],
//         ['Связь с админками', colorEnum.WHITE],
//     ]),
//     confirm: createKeyboard([
//         ['да', colorEnum.GREEN],
//         ['нет', colorEnum.RED],
//     ]),
//     toMainMenu: createKeyboard([
//         ['Главное меню', colorEnum.BLUE],
//     ]),
//     yourDevice: createKeyboard([
//         ['мобильный', colorEnum.BLUE],
//         ['компьютер', colorEnum.BLUE],
//     ]),
//     themes: createKeyboard([
//         ['сбор денег', colorEnum.BLUE],
//         ['животные', colorEnum.BLUE],
//     ]),
//     roolsConfirm: createKeyboard([
//         ['Да, дело в этом!', colorEnum.GREEN],
//         ['Нет, не то', colorEnum.RED],
//     ]),
// }


function createKeyboard (buttons) {
    let keyboard = [];
    for (let button of buttons) {
        keyboard.push(
            Markup.button(button[0], button[1])
        );
        // keyboard.push( createButton(button[0], button[1]) );
    }

    return Markup.keyboard(keyboard, { columns: 1 })
    .inline();
}

//  function createButton(label, color) {
//     return {
//         action: {
//             type: 'callback',
//             label: label,
//             payload: `{"label": \"${label}\"}`,
//           },
//           color: color
//     }
//     }


module.exports.keyboards = keyboards;
module.exports.createKeyboard = createKeyboard;