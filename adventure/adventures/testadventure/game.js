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
  startGame();
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  if (textNode.sound) {
    sound = textNode.sound;
    sound.play();
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
        nextText: 3
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
    sound: 'dialtone',
    options: [{
        text: 'Restart',
        nextText: 1
      }
    ]
  }
]
