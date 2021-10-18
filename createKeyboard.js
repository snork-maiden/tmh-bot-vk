const Markup = require('node-vk-bot-api/lib/markup');
const colorEnum = {
    RED: 'negative',
    GREEN: 'positive',
    BLUE: 'primary',
    WHITE: 'secondary'
}

const keyboards = {
    mainMenu: [
        ['Написать пост', colorEnum.GREEN],
        ['Где мой пост?', colorEnum.RED],
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
        ['компьютер', colorEnum.WHITE],
    ],
    themes: [
        ['Сбор денег', colorEnum.BLUE],
        ['Животные', colorEnum.WHITE],
        ['Нет, не то', colorEnum.RED],
    ],
    rulesConfirm: [
        ['Да, дело в этом!', colorEnum.GREEN],
        ['Нет, не то', colorEnum.RED],
    ],
    rulesNext: [
        ['Далее', colorEnum.GREEN],
        ['Главное меню', colorEnum.BLUE],
    ],
}

function createKeyboard(buttons) {
    let keyboard = [];
    for (let button of buttons) {
        keyboard.push(
            Markup.button(button[0], button[1])
        );
    }
    let columnCount = 1;
    if (buttons.length === 2 && (buttons[0][0].length < 5 && buttons[1][0].length < 5)) {
        columnCount = 2;
    }
        return Markup.keyboard(keyboard, { columns: columnCount })
        .inline();
}

module.exports.keyboards = keyboards;
module.exports.createKeyboard = createKeyboard;