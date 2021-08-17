 const messageText = {
    welcome: `Приветствуем вас в сообщениях сообщества сестра сестре! взаимопомощь.

    Здесь есть бот, который может помочь с частыми вопросами, а также возможность связаться с администрацией напрямую.`,
    mainMenu: `Выберите одну из кнопок ниже:

    🟢 «Написать пост», если вам нужна помощь в написании поста.
    
    🔴 «Пост отклонили», если ваш пост пропал из предложки, и вы не знаете, почему.
    
    ⚪ «Связь с админками», если вам нужно связаться с администрацией по другому вопросу. 
    
    ⚫ «Я вижу в комментах говно и хочу сообщить» — тоже кнопка «Связь с админками».`,
    connectAdmin: `Отправьте свой вопрос и ожидайте ответа.`,
    createPost: {
        askUser:`Пост нужно отправить в «Предложенные новости». 
        Вы знаете, как это делается?`,
        answerYes:`Отлично! Тогда отправляйтесь в «Предложенные новости».
        Не забудьте, что использование тегов из списка тегов (vk.cc/c4HHRT) и соблюдение правил сообщества (https://vk.cc/c4HI0S и https://vk.cc/c4HNOo) обязательны!`,
        answerNo: `Окей, тогда сейчас объясним! С какого вы устройства?`,
        howTo: `Cледуйте инструкциям на картинках`
    },
    rejectPost: {
        goodbye: 'Отлично, рады помочь!',
        mainReasons: `Давайте разберемся, почему! Вот самые распространенные причины:

        ⌛ Пост не удален, а стоит на таймере, то есть, будет опубликован через несколько часов. Скорее всего, ваш вариант, если пост был прислан меньше 48 часов назад.
        
        #️⃣ Не было тегов из списка тегов (ссылка).
        
        💲 В посте была продажа.
        
        ❓ В посте не было запроса (мы не «Подслушано», просто выговориться — не к нам).
        
        💅 Пост про бьюти-практики (макияж, эпиляция, похудение и т.п.).
        
        🔮 Пост про эзотерику или псевдонауку.
        
        👨 Вы цис-мужчина или искали помощи для дееспособного цис-мужчины (наше сообщество для женщин, небинарных и трансгендерных людей).`,
        postsForThreads: `Также мы не публикуем на стене записи на темы, для которых есть темы, а именно:

        👩‍🏫 Репетиторство 
        
        📖 Услуги по написанию учебных работ
        
        👭 Поиск подруг
        
        🎨 Художницы, хендмейд, пошив одежды (кроме поиска услуг)
        
        📸 Поиск/ услуги фотографинь`,
        isAnonimus: `Пост был прислан анонимно?`,
        anonimusPosts: `Записи на некоторые темы анонимно не публикуются:

        🔘 Поиск услуг (кроме врачинь, психологинь и юристок);
        
        🔘 Предложение работы;
        
        🔘 Отдача животных`,
        isTheme: `Может быть, пост был на одну из следующих тем?`,
        aminmals: `🔘 Мы не публикуем покупку и продажу животных, поиск питомников.

        🔘 Посты о пристройстве животных публикуются ТОЛЬКО при наличии приписки, что животное отдается с условием обязательной кастрации/стерилизации (если, конечно, позволяет вид и животное не стерилизовано).`,
        fundraising: `У нас есть подробные правила по публикации материальной помощи: https://vk.cc/c4HQKh

        Кроме того, мы бы рекомендовали вам открыть личные сообщения, чтобы администрация могла с вами связаться.`,
        fullRulesLink: `Кажется, всё-таки придётся прочитать правила нашего сообщества целиком! Вот они: https://vk.cc/c4HI0S и https://vk.cc/c4HNOo

        Если ничего не найдется и там, вернитесь в главное меню и свяжитесь с админками.`
    },
    
};

module.exports = messageText;