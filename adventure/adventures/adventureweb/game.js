const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const textInputElement = document.getElementById('text-input');

let state = {};

var dialtone = new Audio('sounds/dialtone.mp3');

function startGame() {
  state = {};
  showTextNode(1);
}

function askName() {
  textElement.innerText = 'Welcome to AdventureWeb. My name is EagleFoot and I\'ll be your guide on your quest. What is your name traveller?';
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
}

function submitName() {
  userName = document.getElementById("nameInput").value;
  while (textInputElement.firstChild) {
    textInputElement.removeChild(textInputElement.firstChild);
  }
  textNodes[0].text = 'Greetings ' + userName + ', are you ready to begin your quest?';
  textNodes[7].text = userName + ', erm, traveller. I\'ve been instructed that this is outside my realm of influence. But if you stay on the line, one of our elves will...';
  startGame();
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  if (textNode.sound) {
    sound = textNode.sound;
    sound.play();
  }
  if (textNode.image) {
    image = textNode.image;
    document.getElementById('adv_image').src=image;
  } else {
    document.getElementById('adv_image').src='';
  }
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('adv_btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

askName();

textNodes = [{
    id: 1,
    text: '',
    options: [{
        text: 'Yes',
        setState: {
          blueGoo: true
        },
        nextText: 2
      },
      {
        text: 'No',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You awake in a castle tower.\nThere is a window.\nOn the floor is a rug',
    options: [{
        text: 'Jump out of window',
        nextText: 4
      },
      {
        text: 'Look under the rug',
        nextText: 3
      },
      {
        text: 'Right, noo, what it is. I want tae know when youse are gien ma son his money.',
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: 'Very well, Goodbye Traveller!',
    options: [{
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 4,
    text: 'You climb out of the window.\nAnd fall from the tower.\nYou are dead.',
    options: [{
        text: 'Hang up',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: '',
    sound: dialtone,
    image: 'images/limmy_hangup.gif',
    options: [{
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 6,
    text: 'I do not understand your enquiry traveller.',
    options: [{
        text: 'My son phoned your show ower two months ago and he found a black ruby on a web and he was...',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'On Varagon\'s Web. Yes, I remember.',
    options: [{
        text:
        'Right, well, you\'ll remember telling him now that was worth 50 quid and you told him to stay on the line. Now the woman who took his details, said she\'d have the cheque out nae later than 28 days, but that\'s been ower two months noo and there\'s been nae sign of a cheque and i\'ve been phoining and phoning...',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: '',
    options: [{
        text:
        'No, they\'ll just ask me to get in touch with head office, and i\'ve done that, and they\'re no getting back to me. I want you to sort this oot.',
        nextText: 9
      }
    ]
  }
]
