const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
var music = document.getElementById('myMusic2')
console.log(localStorage.getItem("lock_game"))
let state = {}

function startGame() {
    state = {}
    showTextNode(1, "img/location_1_start.png", "music/main_theme.mp3")
}

function continueGame() {
    state = {}
    showTextNode(28, "img/location_3_hatch.png", "music/main_theme.mp3");
}

function showTextNode(textNodeIndex, ImgUrl, MusicUrl="") {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    document.body.style.backgroundImage = "url('" + ImgUrl + "')";
    if(MusicUrl!==""){
       music.removeAttribute('src');
       music.setAttribute('src', MusicUrl);
    }
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('option')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    const nextImgUrl = option.nextImg
    const nextMusicUrl = option.nextMusic
    if (nextTextNodeId < 0) {
        return startGame()
    }
    if (nextTextNodeId === 0) {
        window.location.href="index.html";
    }
    if (nextTextNodeId === 100) {
        window.location.href="end.html";
    }
    if (nextTextNodeId === 50) {
        window.location.href="lock_game.html";
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId, nextImgUrl, nextMusicUrl)
}

const textNodes = [
    {
        id: 1,
        text: 'Вы начинаете в запертой комнате. Вы чувствуете спёртый воздух, с примесью гнили, или, быть может, гнилой древесины. Вокруг всё выглядит' +
            ' максимально изношенным, старые потресканные деревянные доски. Вы лежите на ободранной кровати, одеяла нет, она достаточно высоко поднята относительно ' +
            'пола. В обветшалой комнате кроме кровати вы видите тумбочку и шкаф. Выглядит, как будто им лет 100, непонятно, как они вообще держатся. ' +
            'Единственное окно наглухо заколочено. На удивление, доски, которыми оно заколочено, выглядят весьма новыми,' +
            ' их не получается выломать руками. Вы решаете подойти к двери. Пробуете потянуть за ручку, но дверь не поддаётся.',
        options: [
            {
                text: 'Остаться лежать на кровати',
                // setState: { item: true },  //ЗДЕСЬ УСТАНАВЛИВАЕТСЯ СОСТОЯНИЕ НОВОЙ ПЕРЕМЕННОЙ, ОТВЕЧАЮЩЕЙ ЗА НАЛИЧИЕ КАКОГО-НИБУДЬ ПРЕДМЕТА
                nextImg: "img/location_4_car.png",
                nextText: 2
            },
            {
                text: 'Осмотреть тумбочку',
                nextImg: "img/location_1_chest.png",
                nextText: 3
            },
            {
                text: 'Спрятаться в шкафу',
                nextImg: "img/location_1_closet.png",
                nextText: 4
            },
            {
                text: 'Спрятаться под кроватью',
                nextImg: "img/bed_death.jpg",
                nextMusic: "music/dead_theme.mp3",
                nextText: 5
            }
        ]
    },
    {
        id: 2,
        text: 'В комнату входит маньяк, бъет вас по голове, в глазах мутнеет... Очнулись вы в подвале, осмотревшись вы заметили,' +
            ' что находитесь в гараже, рядом с машиной, привязанные к потолку на верёвках. ' +
            'Маньяк ухмыляясь сказал, что выйдет за инструментами для пыток.',
        options: [
            {
                text: 'Попытаться выбраться',
                nextImg: "img/location_6_prisoner.png",
                nextText: 7
            },
            {
                text: 'Ничего не делать',
                nextImg: "img/basement_death.jpg",
                nextMusic: "music/dead_theme.mp3",
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: 'Открыв тумбочку вы находите в ней записку с надписью "ты обязательно выживешь..."',
        options: [
            {
                text: 'Остаться лежать на кровати',
                nextImg: "img/location_1_start.png",
                nextText: 2
            },
            {
                text: 'Спрятаться в шкафу',
                nextImg: "img/location_1_closet.png",
                nextText: 4
            },
            {
                text: 'Спрятаться под кроватью',
                nextImg: "img/bed_death.jpg",
                nextMusic: "music/dead_theme.mp3",
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: 'Вы спрятались в шкафу. В комнату заходит маньяк, подбрасывает в воздух ободранный матрас в ' +
            'попытке найти вас, но, увидев что там пусто, уходит из комнаты оставив за собой открытую дверь.',
        options: [
            {
                text: 'Выйти из шкафа и пойти к открытой двери',
                nextImg: "img/location_1_openedDoor.png",
                nextText: 21
            },
            {
                text: 'Остаться в шкафу',
                nextImg: "img/location_1_closet.png",
                nextText: 20
            }
        ]
    },
    {
        id: 5,
        text: 'Вы спрятались под кроватью. В комнату входит маньяк, он замечает вас и сразу убивает, так как кровать ободранная и вас хорошо видно.',
        options: [
            {
                text: 'Начать с начала',
                nextMusic: "music/main_theme.mp3",
                nextText: -1
            },
            {
                text: 'Выбрать другой вариант',
                nextImg: "img/location_1_start.png",
                nextMusic: "music/main_theme.mp3",
                nextText: 1
            }
        ]
    },
    {
        id: 6,
        text: 'Вы ничего не сделали, прошло 15 минут и в подвал пришел маньяк с инструментами для пыток. Вы умираете в самых страшных пытках.',
        options: [
            {
                text: 'Начать с начала',
                nextMusic: "music/main_theme.mp3",
                nextText: -1
            },
            {
                text: 'Выбрать другой вариант',
                nextImg: "img/location_4_car.png",
                nextMusic: "music/main_theme.mp3",
                nextText: 2
            }
        ]
    },
    {
        id: 7,
        text: 'Вы пытаетесь освободиться и у вас это получается, раскачивая верёвку, вы перерезаете её об острую балку под потолком.' +
            ' рядом вы видите человека, по его форме очевидно, это заключенный, но он тоже заложник, ведь у него связаны руки и заклеен рот.',
        options: [
            {
                text: 'Освободить заложника',
                nextImg: "img/location_6_prisoner.png",
                nextText: 8
            },
            {
                text: 'Оставить заложника и осмотреть машину',
                nextImg: "img/location_4_noAcum.png",
                nextText: 9
            },
        ]
    },
    {
        id: 8,
        text: 'Вы освобождаете заложника, хоть это и дается вам с трудом, чувство голода дает о себе знать. Освободив его рот, тот сразу ' +
            'начинает шепотом вас благодарить, указывая рукой на ключ от машины, который лежит под задним колесом машины, также он рассказал' +
            ' вам про план побега, который он приготовил, пока его пытал маньяк.' +
            ' По его плану вам нужно найти аккумулятор и топливо для автомобиля чтобы собрать его и заправить, а после уехать, снеся гаражную дверь.',
        setState: {prisoner: true},
        options: [
            {
                text: 'Осмотреть машину',
                setState: { carKey: true },
                nextImg: "img/location_4_noAcum.png",
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: 'Машина без аккумулятора, а в баке при раскачке машины совсем не шумит бензин.',
        options: [
            {
                text: 'Осмотреться вокруг',
                nextImg: "img/location_4_car.png",
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text: 'Осмотревшись вокруг, вы заметили шкаф с каким-то предметом на полке и стол, на котором виднеется что-то вроде канистры.',
        options: [
            {
                text: 'Подойти к шкафу',
                requiredState: (currentState) => !currentState.acum,
                nextImg: "img/location_5_acum.png",
                nextText: 11
            },
            {
                text: 'Подойти к столу',
                requiredState: (currentState) => !currentState.gas,
                nextImg: "img/gasoline.png",
                nextText: 12
            },
            {
                text: 'Искать ключ',
                requiredState: (currentState) => currentState.gas && currentState.acum && !currentState.carKey,
                nextImg: "img/location_4_car.png",
                nextText: 16
            },
            {
                text: 'Подойти к капоту машины.',
                requiredState: (currentState) => currentState.gas && currentState.acum && currentState.carKey,
                nextImg: "img/location_4_noAcum.png",
                nextText: 13
            }
        ]
    },
    {
        id: 11,
        text: 'Подойдя к шкафу вы видите параллелепипедый предмет, похожий на аккумулятор.',
        options: [
            {
                text: 'Забрать его',
                setState: { acum: true },
                nextImg: "img/location_4_noAcum.png",
                nextText: 10
            }
        ]
    },
    {
        id: 12,
        text: 'Подойдя к столу вы видите канистру, почти заполненную.',
        options: [
            {
                text: 'Забрать ее',
                setState: { gas: true },
                nextImg: "img/location_4_car.png",
                nextText: 10
            }
        ]
    },
    {
        id: 13,
        text: 'Вы стоите перед авто.',
        options: [
            {
                text: 'Вставить аккумулятор.',
                requiredState: (currentState) => !currentState.acumInCar,
                setState: { acumInCar: true },
                nextImg: "img/location_4_acum.png",
                nextText: 14
            },
            {
                text: 'Залить бензин в бак.',
                requiredState: (currentState) => !currentState.gasInCar,
                setState: { gasInCar: true },
                nextImg: "img/location_4_car.png",
                nextText: 14
            },
            {
                text: 'Вставить ключ и завести машину.',
                requiredState: (currentState) => !currentState.keyInCar && currentState.gasInCar && currentState.acumInCar,
                setState: { keyInCar: true },
                nextImg: "img/location_4_acum.png",
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        text: 'Вы стоите перед авто.',
        options: [
            {
                text: 'Вставить аккумулятор.',
                requiredState: (currentState) => !currentState.acumInCar,
                setState: { acumInCar: true },
                nextImg: "img/location_4_acum.png",
                nextText: 13
            },
            {
                text: 'Залить бензин в бак.',
                requiredState: (currentState) => !currentState.gasInCar,
                setState: { gasInCar: true },
                nextImg: "img/location_4_car.png",
                nextText: 13
            }
        ]
    },
    {
        id: 15,
        text: 'Вы завели машину.',
        options: [
            {
                text: 'Выбить дверь гаража',
                requiredState: (currentState) => currentState.prisoner,
                nextImg: "img/location_7_car.png",
                nextText: 17
            },
            {
                text: 'Выбить дверь гаража',
                requiredState: (currentState) => !currentState.prisoner,
                nextImg: "img/location_7_car.png",
                nextText: 18
            }
        ]
    },
    {
        id: 16,
        text: 'Поискав всюду, вы обнаружили ключ на полу под задним колесом машины.',
        options: [
            {
                text: 'Пойти к машине',
                setState: { carKey: true },
                nextImg: "img/location_4_car.png",
                nextText: 19
            }
        ]
    },
    {
        id: 17,
        text: 'Вы отъехали назад, разогнались и выбили гаражную дверь. Авто сильно помялось, но было все еще на ходу, вы спаслись и спасли еще одного заложника, ПОЗДРАВЛЯЕМ!',
        options: [
            {
                text: 'Поехать',
                nextText: 100
            }
        ]
    },
    {
        id: 18,
        text: 'Вы отъехали назад, разогнались и выбили гаражную дверь. Авто сильно помялось, но было все еще на ходу, вы спаслись, ПОЗДРАВЛЯЕМ!',
        options: [
            {
                text: 'Поехать',
                nextText: 100
            }
        ]
    },
    {
        id: 19,
        text: 'Собрав все части, необходимые для работы авто вы подходите к машине.',
        options: [
            {
                text: 'Подойти к капоту машины.',
                requiredState: (currentState) => currentState.gas && currentState.acum && currentState.carKey,
                nextImg: "img/location_4_noAcum.png",
                nextText: 13
            }
        ]
    },
    {
        id: 20,
        text: 'Вы остались в шкафу, прошло 15 минут, ничего не произошло...',
        options: [
            {
                text: 'Выйти из шкафа и пойти к открытой двери',
                nextImg: "img/location_1_openedDoor.png",
                nextText: 21
            }
        ]
    },
    {
        id: 21,
        text: 'Вы выходите из комнаты и видите, что находитесь на втором этаже. Перед вами лестница, а справа и слева есть комнаты. Снизу до вас доносится шум.' +
            ' Коридор открытый, на краю перила.',
        options: [
            {
                text: 'Попробовать открыть левую дверь',
                nextImg: "img/location_2_hallLeft.png",
                nextText: 24
            },
            {
                text: 'Попробовать открыть правую дверь',
                nextImg: "img/location_1_door.png",
                nextText: 22
            },
            {
                text: 'Пойти вниз',
                nextImg: "img/ladder_death.jpg",
                nextMusic: "music/dead_theme.mp3",
                nextText: 23
            }
        ]
    },
    {
        id: 22,
        text: 'Дверь, которую вы пытаетесь открыть не поддается.',
        options: [
            {
                text: 'Попробовать открыть левую дверь',
                nextImg: "img/location_2_hallLeft.png",
                nextText: 24
            },
            {
                text: 'Пойти вниз',
                nextImg: "img/ladder_death.jpg",
                nextMusic: "music/dead_theme.mp3",
                nextText: 23
            }
        ]
    },
    {
        id: 23,
        text: 'Вы спускаетесь по лестнице, она очень старая, а потому сильно скрипит, маньяк слышит эти звуки и замечает вас на лестнице, после чего вы решаете бежать обратно,' +
            ' но на верху лестницы вас настигает маньяк.',
        options: [
            {
                text: 'Начать с начала',
                nextMusic: "music/main_theme.mp3",
                nextText: -1
            },
            {
                text: 'Выбрать другой вариант',
                nextImg: "img/location_1_openedDoor.png",
                nextMusic: "music/main_theme.mp3",
                nextText: 21
            }
        ]
    },
    {
        id: 24,
        text: 'Вы дёргаете за ручку, и дверь легко открывается, но поскольку вы не ожидали, что дверь так легко поддастся, случайно дверью' +
            ' вы задеваете ведро, которое слегка звякнуло. Это было достаточно тихо, но вы боитесь, что маньяк мог услышать, поэтому вам надо торопиться.',
        options: [
            {
                text: 'Осмотреться вокруг',
                nextImg: "img/hatch_death.jpg",
                nextMusic: "music/dead_theme.mp3",
                nextText: 27
            },
            {
                text: 'Закрыть за собой дверь',
                nextImg: "img/location_1_door.png",
                nextText: 26
            }
        ]
    },
    {
        id: 25,
        text: 'Вы осматриваетесь. Посреди команты находится какой-то люк с кодовым замком, чтобы открыть его, вам нужно' +
            ' подобрать пароль. Поторопитесь, вы слышите, как в дверь начинает ломиться маньяк',
        options: [
            {
                text: 'Взломать замок',
                nextImg: "img/location_3_hatch.png",
                nextText: 50
            }
        ]
    },
    {
        id: 26,
        text: 'Вы аккуратно закрыли дверь и повернули дверной замок. Вам стало спокойнее.',
        options: [
            {
                text: 'Осмотреться вокруг',
                nextImg: "img/location_3_hatch.png",
                nextText: 25
            }
        ]
    },
    {
        id: 27,
        text: 'Вы не стали закрывать дверь и начали осматриваться. Вдруг заскрипела лестница, это маньяк поднимался проверить звук, который он услышал, когда вы входили.' +
            ' Бежать некуда, когда вы опомнились от страха маньяк был перед вашим лицом. Он убил вас.',
        options: [
            {
                text: 'Начать с начала',
                nextMusic: "music/main_theme.mp3",
                nextText: -1
            },
            {
                text: 'Выбрать другой вариант',
                nextImg: "img/location_2_hallLeft.png",
                nextMusic: "music/main_theme.mp3",
                nextText: 24
            }
        ]
    },
    {
        id: 28,
        text: 'Вы взламываете замок и открываете люк. Он ведет в какой-то глубокий туннель, вероятно подземный выход, похожие строились как способ быстро собрать' +
            ' семью и вещи в подземный бункер при ядерном ударе. Дверь в комнату сносит с петель маньяк.',
        options: [
            {
                text: 'Сбежать в люк и закрыть его на засов изнутри',
                nextText: 100
            }
        ]
    },
]

if(localStorage.getItem("lock_game") === "1"){
    // console.log(localStorage.getItem("lock_game"))
    continueGame();
} else {
    console.log(localStorage.getItem("lock_game"))
    startGame();
}


