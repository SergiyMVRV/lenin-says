var dataController, UIcontroller, globalController;

dataController = (function() {
  function generateNewString () {
    var string = '';
    for ( var j = 0; j < 4; j++) {
      string += vocabulary[j][getRandomInt(0, 10)] + ' ';
    }
    return string.trim();
  }

  function generateNewImage () {
    return leninImgesArray[getRandomInt(0, 4)];
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var leninImgesArray = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjf-h62oZ-DC5rRPEi9VE13VNUbDVLNQ-jjMXup6DYq0FsbZY7Q',
    'https://ci.memecdn.com/6516125.jpg',
    'http://images.clipartlogo.com/files/images/29/290481/lenin-gun_t',
    'http://abali.ru/wp-content/uploads/2015/04/lenin_trebuna.jpg'
  ];

  var vocabulary = [
    ['Товарищи!', 'С другой стороны', 'Равным образом', 'Не следует, однако, забывать, что', 'Таким образом', 'Повседневная практика показывает, что', 'Уважаемые коллеги!', 'Позвольте Вам напомнить, что', 'Также как', 'В целом, конечно,' ],
    ['реализация намеченных плановых заданий', 'рамки и место обучения кадров', 'постоянный количественный рост и сфера нашей активности', 'сложившаяся структура организации', 'новая модель организационной деятельности', 'дальнейшее развитие различных форм деятельности', 'перспективное планирование', 'оптимизация основных целей', 'экономическая повестка сегоднящнего дня', 'внедрение современных подходов'],
    ['играет важную роль в формировании', 'требуют от нас анализа', 'требуют определения и уточнения', 'способствует подготовке и реализации', 'обеспечивает широкому кругу (специалистов) участие в формировании', 'позволяет выполнить важные задания по разработке', 'не дает нам иного выбора, кроме определения', 'вынуждает нас объективно потребовать', 'играет определяющее значение для', 'выявляет срочную потребность'],
    ['существенных финансовых и административных условий', 'дальнейших направлений развития', 'системы массового участия', 'позиций, занимаемых участниками в отношении поставленных задач', 'новых предложений', 'направлений прогрессивного развития', 'стандартных подходов', 'нестандартных решений', 'экономических и неэкономических факторов и перспектив', 'инновационных методов управления процессами']
  ];

  return {
    publicGenerateLeninSpeech: function() {
      return generateNewString();
    },
    publicGenerateNewImage: function() {
      return generateNewImage ();
    }
  };
})();

UIcontroller = (function(dataCntr) {
    var handle,
    leninAudio = document.getElementById('lenin-audio'),
    ostanovitesAudio = document.getElementById('ostanovites-audio'),
    speechText = document.querySelector('.speech-text'),
    leninImage = document.querySelector('.img-lenin');

    function printLeninSpeech () {
      speechText.innerHTML = dataCntr.publicGenerateLeninSpeech();
      leninImage.innerHTML = '<img src="' + dataCntr.publicGenerateNewImage() + '" />';
      handle = setTimeout(printLeninSpeech, 3000);
      leninAudio.play();
    }

    function clearLeninSpeech() {
      speechText.innerHTML = '';
      clearTimeout(handle);
      leninImage.innerHTML = '<img src="https://www.sott.net/image/s10/209811/header/8876.jpg" />';
      leninAudio.pause();
      ostanovitesAudio.volume = 0.2;
      ostanovitesAudio.play();
    }

  return {
    publicPrintLeninSpeech: function() {
      printLeninSpeech();
    },
    publicClearLeninSpeech: function() {
      clearLeninSpeech();
    }
  };
})(dataController);

globalController = (function(UIcntr) {

  function init() {
    var buttonSilent = document.querySelector('button.silent');
    var buttonSay = document.querySelector('button.say');

    diasbleAndEnable(buttonSilent, buttonSay);

    buttonSay.addEventListener("click", function() {
      UIcntr.publicPrintLeninSpeech();
      diasbleAndEnable(buttonSay, buttonSilent);
    });

    buttonSilent.addEventListener("click", function() {
      UIcntr.publicClearLeninSpeech();
      diasbleAndEnable(buttonSilent, buttonSay);
    });
  }

  function diasbleAndEnable(dis, en) {
    dis.disabled = true;
    dis.style.cursor = 'auto';
    en.disabled = false;
    en.style.cursor = 'pointer';
  }

  return {
    publicInit: function() {
      return init();
    }
  };
})(UIcontroller);

globalController.publicInit();
