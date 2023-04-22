const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1, "../img/location_1_start.jpg")
}

function showTextNode(textNodeIndex, ImgUrl) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    document.body.style.backgroundImage = "url('" + ImgUrl + "')";
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
    if (nextTextNodeId < 0) {
        return startGame()
    }
    if (nextTextNodeId === 0) {
        window.location.href="index.html";
    }
    if (nextTextNodeId === 100) {
        window.location.href="end.html";
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId, nextImgUrl)
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
                nextImg: "/hahaton/img/location_4_car.jpg",
                nextText: 2
            },
            {
                text: 'Осмотреть тумбочку',
                nextImg: "/hahaton/img/location_1_chest.jpg",
                nextText: 3
            },
            {
                text: 'Спрятаться в шкафу',
                nextImg: "/hahaton/img/location_1_closet.jpg",
                nextText: 4
            },
            {
                text: 'Спрятаться под кроватью',
                nextImg: "/hahaton/img/location_1_underBed.jpg",
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
                nextImg: "/hahaton/img/location_6_prisoner.jpg",
                nextText: 7
            },
            {
                text: 'Ничего не делать',
                nextImg: "/hahaton/img/location_4_car.jpg",
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
                nextImg: "/hahaton/img/location_1_start.jpg",
                nextText: 2
            },
            {
                text: 'Спрятаться в шкафу',
                nextImg: "/hahaton/img/location_1_closet.jpg",
                nextText: 4
            },
            {
                text: 'Спрятаться под кроватью',
                nextImg: "/hahaton/img/location_1_underBed.jpg",
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
                nextImg: "/hahaton/img/location_1_openedDoor.jpg",
                nextText: 21
            },
            {
                text: 'Остаться в шкафу',
                nextImg: "/hahaton/img/location_1_closet.jpg",
                nextText: 20
            }
        ]
    },
    {
        id: 5,
        text: 'Вы спрятались под кроватью. В комнату входит маньяк, он замечает вас и сразу убивает, так как кровать ободранная и вас хорошо видно.',
        options: [
            {
                text: 'Начать заново',
                nextText: -1
            },
            {
                text: 'Вернуться в меню',
                nextText: 0
            }
        ]
    },
    {
        id: 6,
        text: 'Вы ничего не сделали, прошло 15 минут и в подвал пришел маньяк с инструментами для пыток. Вы умираете в самых страшных пытках.',
        options: [
            {
                text: 'Начать заново',
                nextText: -1
            },
            {
                text: 'Вернуться в меню',
                nextText: 0
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
                nextImg: "/hahaton/img/location_6_prisoner.jpg",
                nextText: 8
            },
            {
                text: 'Оставить заложника и осмотреть машину',
                nextImg: "/hahaton/img/location_4_noAcum.jpg",
                nextText: 9
            },
            // {
            //     text: 'Try to run',
            //     nextText: 8
            // },
            // {
            //     text: 'Attack it with your sword',
            //     requiredState: (currentState) => currentState.sword,
            //     nextText: 9
            // },
            // {
            //     text: 'Hide behind your shield',
            //     requiredState: (currentState) => currentState.shield,
            //     nextText: 10
            // },
            // {
            //     text: 'Throw the blue goo at it',
            //     requiredState: (currentState) => currentState.blueGoo,
            //     nextText: 11
            // }
        ]
    },
    {
        id: 8,
        text: 'Вы освобождаете заложника, хоть это и дается вам с трудом, чувство голода дает о себе знать. Освободив его рот, тот сразу ' +
            'начинает шепотом вас благодарить, протягивая руку с ключом от машины, также он рассказал вам про план побега, который он приготовил, пока его пытал маньяк.' +
            ' По его плану вам нужно найти аккумулятор и топливо для автомобиля чтобы собрать его и заправить, а после уехать, снеся гаражную дверь.',
        setState: {prisoner: true},
        options: [
            {
                text: 'Осмотреть машину',
                nextImg: "/hahaton/img/location_4_noAcum.jpg",
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
                nextImg: "/hahaton/img/location_4_car.jpg",
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
                nextImg: "/hahaton/img/location_5_acum.jpg",
                nextText: 11
            },
            {
                text: 'Подойти к столу',
                requiredState: (currentState) => !currentState.gas,
                nextImg: "/hahaton/img/gasoline.jpg",
                nextText: 12
            },
            {
                text: 'Искать ключ',
                requiredState: (currentState) => currentState.gas && currentState.acum && !currentState.carKey,
                nextImg: "/hahaton/img/location_4_car.jpg",
                nextText: 16
            },
            {
                text: 'Подойти к капоту машины.',
                requiredState: (currentState) => currentState.gas && currentState.acum && currentState.carKey,
                nextImg: "/hahaton/img/location_4_noAcum.jpg",
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
                nextImg: "/hahaton/img/location_4_noAcum.jpg",
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
                nextImg: "/hahaton/img/location_4_car.jpg",
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
                nextImg: "/hahaton/img/location_4_acum.jpg",
                nextText: 14
            },
            {
                text: 'Залить бензин в бак.',
                requiredState: (currentState) => !currentState.gasInCar,
                setState: { gasInCar: true },
                nextImg: "/hahaton/img/location_4_car.jpg",
                nextText: 14
            },
            {
                text: 'Вставить ключ и завести машину.',
                requiredState: (currentState) => !currentState.keyInCar && currentState.gasInCar && currentState.acumInCar,
                setState: { keyInCar: true },
                nextImg: "/hahaton/img/location_4_acum.jpg",
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
                nextImg: "/hahaton/img/location_4_acum.jpg",
                nextText: 13
            },
            {
                text: 'Залить бензин в бак.',
                requiredState: (currentState) => !currentState.gasInCar,
                setState: { gasInCar: true },
                nextImg: "/hahaton/img/location_4_car.jpg",
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
                nextImg: "/hahaton/img/location_7_car.jpg",
                nextText: 17
            },
            {
                text: 'Выбить дверь гаража',
                requiredState: (currentState) => !currentState.prisoner,
                nextImg: "/hahaton/img/location_7_car.jpg",
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
                nextImg: "/hahaton/img/location_4_car.jpg",
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
                nextImg: "/hahaton/img/location_4_noAcum.jpg",
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
                nextImg: "/hahaton/img/location_1_openedDoor.jpg",
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
                nextImg: "/hahaton/img/location_2_hallLeft.jpg",
                nextText: 24
            },
            {
                text: 'Попробовать открыть правую дверь',
                nextImg: "/hahaton/img/location_1_door.jpg",
                nextText: 22
            },
            {
                text: 'Пойти вниз',
                nextImg: "/hahaton/img/location_2.jpg",
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
                nextImg: "/hahaton/img/location_2_hallLeft.jpg",
                nextText: 24
            },
            {
                text: 'Пойти вниз',
                nextImg: "/hahaton/img/location_2.jpg",
                nextText: 23
            }
        ]
    },
    {
        id: 23,
        text: 'Вы спускаетесь по лестнице, она очень старая, а потому сильно скрипит, маньяк слышит эти звуки и замечает вас на лестнице, после чего вы решаете бежать обратно,' +
            ' но со страху оступаетесь падаете на лестницу, которая полностью рушится из-за дряхлой древесины, вы падаете головой вниз' +
            ' с высоты около 3 метров на бетонный пол в подвале и ломаете себе шею.',
        options: [
            {
                text: 'Начать заново',
                nextText: -1
            },
            {
                text: 'Вернуться в меню',
                nextText: 0
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
                nextImg: "/hahaton/img/location_3_hatch.jpg",
                nextText: 27
            },
            {
                text: 'Закрыть за собой дверь',
                nextImg: "/hahaton/img/location_1_door.jpg",
                nextText: 26
            }
        ]
    },
    {
        id: 25,
        text: 'Вы осматриваетесь. Посреди команты находится какой-то люк с кодовым замком, чтобы открыть его, вам нужно подобрать пароль.',
        options: [
            {
                text: 'Осмотреться вокруг',
                nextImg: "/hahaton/img/location_3_hatch.jpg",
                nextText: 28
            }
        ]
    },
    {
        id: 26,
        text: 'Вы аккуратно закрыли дверь и повернули дверной замок. Вам стало спокойнее.',
        options: [
            {
                text: 'Осмотреться вокруг',
                nextImg: "/hahaton/img/location_3_hatch.jpg",
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
                text: 'Начать заново',
                nextText: -1
            },
            {
                text: 'Вернуться в меню',
                nextText: 0
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

startGame()