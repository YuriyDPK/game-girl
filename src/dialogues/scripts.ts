import type { DialogueScript } from "./types";

export const dialogueScripts: Record<string, DialogueScript> = {
  "cafe-first-meeting": {
    id: "cafe-first-meeting",
    start: "start",
    onCompleteTransition: {
      targetLocation: "cafe-cozy-table",
      spawnX: 430,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Лиза",
        text: "Привет.",
        next: "boy-hello",
      },
      "boy-hello": {
        id: "boy-hello",
        speaker: "Юра",
        text: "Привет. Как добралась?",
        next: "liza-arrived",
      },
      "liza-arrived": {
        id: "liza-arrived",
        speaker: "Лиза",
        text: "Все хорошо.",
        next: "liza-table",
      },
      "liza-table": {
        id: "liza-table",
        speaker: "Лиза",
        text: "Мы еще ждем кого-то? Давай пересядем? Вон там как будто уютнее.",
        next: "boy-table",
      },
      "boy-table": {
        id: "boy-table",
        speaker: "Юра",
        text: "Мне почему-то показался необычным этот стол... но я не против. Давай в более интимную обстановку.",
      },
    },
  },
  "cafe-yura-table-choice": {
    id: "cafe-yura-table-choice",
    start: "start",
    onCompleteTransition: {
      targetLocation: "cafe-cozy-talk",
      fadeOutMs: 900,
      fadeInMs: 1100,
      switchDelayMs: 500,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "Давай вот сюда? Тут тише, и как будто можно спокойно поговорить.",
        next: "liza",
      },
      liza: {
        id: "liza",
        speaker: "Лиза",
        text: "Да, здесь правда уютнее.",
      },
    },
  },
  "cafe-cozy-talk": {
    id: "cafe-cozy-talk",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-museum",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "Тебе не кажется, что всё это уже было? Что мы знакомы уже очень давно?",
        next: "liza-yes",
      },
      "liza-yes": {
        id: "liza-yes",
        speaker: "Лиза",
        text: "Как будто я уже жила этот вечер.",
        next: "yura-moments",
      },
      "yura-moments": {
        id: "yura-moments",
        speaker: "Юра",
        text: "Да, так и есть. Я просто хотел, чтобы ты ещё раз увидела те моменты, в которых я влюбился в тебя.",
        next: "liza-close",
      },
      "liza-close": {
        id: "liza-close",
        speaker: "Лиза",
        text: "Тогда давай не торопиться. Я хочу запомнить каждый из них.",
      },
    },
  },
  "memory-museum": {
    id: "memory-museum",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-park",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "Помнишь, куда мы пошли в первый раз после кафе? В музей.",
        next: "liza-museum",
      },
      "liza-museum": {
        id: "liza-museum",
        speaker: "Лиза",
        text: "Конечно... Мы тогда болтали несколько часов, как будто знали друг друга всю жизнь.",
        next: "yura-museum",
      },
      "yura-museum": {
        id: "yura-museum",
        speaker: "Юра",
        text: "Я тогда понял, что мне не хочется, чтобы этот день заканчивался.",
        next: "liza-museum-close",
      },
    },
  },
  "memory-park": {
    id: "memory-park",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-cafe-samurai",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "Вспомни парк, в котором мы так часто гуляли?",
        next: "liza-park",
      },
      "liza-park": {
        id: "liza-park",
        speaker: "Лиза",
        text: "Конечно... Там всегда пахло зимней прохладой, и мы гуляли без маршрута.",
        next: "yura-park",
      },
      "yura-park": {
        id: "yura-park",
        speaker: "Юра",
        text: "Я помню когда уже потеплело мы сидели на лавке и обнимались",
        next: "liza-park-close",
      },
      "liza-park-close": {
        id: "liza-park-close",
        speaker: "Лиза",
        text: "Дя",
      },
    },
  },
  "memory-cafe-samurai": {
    id: "memory-cafe-samurai",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-home",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "А вот кафе «Самурай» — где мы так часто обедали и столько болтали.",
        next: "liza-cafe",
      },
      "liza-cafe": {
        id: "liza-cafe",
        speaker: "Лиза",
        text: "Да... Там всегда пахло супом и теплом. Мы садились на одно и то же место.",
        next: "yura-cafe",
      },
      "yura-cafe": {
        id: "yura-cafe",
        speaker: "Юра",
        text: "И разговоры тянулись дольше, чем остывал глинтвейн. Мне не хотелось, чтобы вечер заканчивался.",
        next: "liza-cafe-close",
      },
      "liza-cafe-close": {
        id: "liza-cafe-close",
        speaker: "Лиза",
        text: "Я тоже. Там было легко быть собой.",
      },
    },
  },
  "memory-home": {
    id: "memory-home",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-entrance",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "А помнишь наш диван? Где мы постоянно валялись, няшились и смотрели что-нибудь.",
        next: "liza-home",
      },
      "liza-home": {
        id: "liza-home",
        speaker: "Лиза",
        text: "Помню... Там было так тепло, что можно было забыть про весь мир.",
        next: "yura-home",
      },
      "yura-home": {
        id: "yura-home",
        speaker: "Юра",
        text: "Мне нравилось, провожать тебя потом поздей ночью домой и чувствовать что ты в безопасности.",
        next: "liza-home-close",
      },
      "liza-home-close": {
        id: "liza-home-close",
        speaker: "Лиза",
        text: "Но я помню когда ты меня отправил на такси потому что устал и хотел спать",
      },
      "yura-home-close": {
        id: "yura-home-close",
        speaker: "Юра",
        text: "Чщ, здесь только хорошие воспоминания.",
      },
    },
  },
  "memory-bar": {
    id: "memory-bar",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-airport",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "И вот бар, где мы играли в бильярд. Я даже не поддавался а ты все равно часто выигрывала",
        next: "liza-bar",
      },
      "liza-bar": {
        id: "liza-bar",
        speaker: "Лиза",
        text: "L",
        next: "yura-bar",
      },
      "yura-bar": {
        id: "yura-bar",
        speaker: "Юра",
        text: "Хехе, малышка моя.",
        next: "liza-bar-close",
      },
      "liza-bar-close": {
        id: "liza-bar-close",
        speaker: "Лиза",
        text: "Давай ещё одну партию... хотя бы в памяти.",
      },
    },
  },
  "memory-airport": {
    id: "memory-airport",
    start: "start",
    onCompleteTransition: {
      targetLocation: "rainy-street",
      spawnX: 160,
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "А вот аэропорт, где мы прощались. Ты улетала в Нью-Йорк.",
        next: "liza-airport",
      },
      "liza-airport": {
        id: "liza-airport",
        speaker: "Лиза",
        text: "Я тогда так боялась, что расстояние всё испортит.",
        next: "yura-airport",
      },
      "yura-airport": {
        id: "yura-airport",
        speaker: "Юра",
        text: "А я знал, что мы ещё обязательно увидимся. Даже не сомневался.",
        next: "liza-airport-close",
      },
      "liza-airport-close": {
        id: "liza-airport-close",
        speaker: "Лиза",
        text: "Теперь я тоже верю что мы увидимся.",
      },
    },
  },
  "memory-entrance": {
    id: "memory-entrance",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-sovok",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "Помнишь подъезд у твоего дома? Мы стояли, смеялись и никак не могли расстаться.",
        next: "liza-entrance",
      },
      "liza-entrance": {
        id: "liza-entrance",
        speaker: "Лиза",
        text: "Да... Я всё тянула время, чтобы остаться ещё чуть-чуть.",
        next: "yura-entrance",
      },
      "yura-entrance": {
        id: "yura-entrance",
        speaker: "Юра",
        text: "А потом я всё равно пошел домой с улыбкой, и каждый раз так.",
        next: "liza-entrance-close",
      },
    },
  },
  "memory-sovok": {
    id: "memory-sovok",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-not-kiss",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "А вот наш любимый Совок — где мы ели вкусные вафли и лапшу.",
        next: "liza-sovok",
      },
      "liza-sovok": {
        id: "liza-sovok",
        speaker: "Лиза",
        text: "Мм, вафли... Там всегда были самые вкусные.",
        next: "yura-sovok",
      },
      "yura-sovok": {
        id: "yura-sovok",
        speaker: "Юра",
        text: "Вафли в прикуску, лапша, мы рядом — я не знаю, почему это кажется таким важным воспоминанием.",
        next: "liza-sovok-close",
      },
    },
  },
  "memory-not-kiss": {
    id: "memory-not-kiss",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-jumpers",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "Здесь мы ждали такси. Был момент, когда мы должны были поцеловаться.",
        next: "liza-not-kiss",
      },
      "liza-not-kiss": {
        id: "liza-not-kiss",
        speaker: "Лиза",
        text: "Да... я тоже помню этот момент.",
        next: "yura-not-kiss",
      },
      "yura-not-kiss": {
        id: "yura-not-kiss",
        speaker: "Юра",
        text: "Мы оба чувствовали это, но просто... не решились.",
        next: "liza-not-kiss-close",
      },
      "liza-not-kiss-close": {
        id: "liza-not-kiss-close",
        speaker: "Лиза",
        text: "Иногда несостоявшееся запоминается ярче, чем то, что было.",
      },
    },
  },
  "memory-jumpers": {
    id: "memory-jumpers",
    start: "start",
    onCompleteTransition: {
      targetLocation: "memory-bar",
      fadeOutMs: 900,
      fadeInMs: 1000,
      switchDelayMs: 450,
    },
    nodes: {
      start: {
        id: "start",
        speaker: "Юра",
        text: "А помнишь мультик Прыгуны? Ты пошла с сомнениями, но нам обоим очень понравился.",
        next: "liza-jumpers",
      },
      "liza-jumpers": {
        id: "liza-jumpers",
        speaker: "Лиза",
        text: "Я не ждала такого... Очень классный мультик.",
        next: "yura-jumpers",
      },
      "yura-jumpers": {
        id: "yura-jumpers",
        speaker: "Юра",
        text: "Мы потом смеялись над бревнышками всю дорогу домой.",
        next: "liza-jumpers-close",
      },
    },
  },
};
