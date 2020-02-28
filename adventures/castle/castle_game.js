// Define variables that point to elements on page
var text_element = document.getElementById('text');
var choice_container = document.getElementById("option-buttons");
var adventure_image = document.getElementById("adventure_image");
var textInputElement = document.getElementById("text-input");

// Define empty story var to be populated once user gives their name
var story = [];

// Define empty username to be populated once user gives their name
var userName;

// Define empty inventory array that will store items the character has.
var inventory = [];


// Initialize validateInput function that checks if a string input contains a value
function validateInput(input) {
  if (input == "") {
    return false;
  } else {
    return true;
  }
}

// Initialize updateGame function.
function updateGame(id) {
  if (id === 1) {
    inventory = [];
  }
  while (choice_container.firstChild) {
    choice_container.removeChild(choice_container.firstChild);
  }
  const storyNode = story.find(node => node.id === id);
  const nodeText = storyNode['text'];
  const options = storyNode['options'];
  text_element.innerText = nodeText;
  options.forEach((item, i) => {
    createButton(item['text'], item['nextid'])
  });
  if (storyNode['image']) {
    adventure_image.src = storyNode['image'];
  }
  if (storyNode['inventory_add']) {
    inventory.push(storyNode['inventory_add']);
  }
  if (storyNode['inventory_remove']) {
    inventory = inventory.filter(e => e !== storyNode['inventory_remove']);
  }
}

// Initialize startGame function.
function startGame() {
  if (!submitName()) {
    alert('Enter a name');
    return;
  }
  choice_container.style.display = "grid";
  updateGame(1);
}

// Initialize submitName function, gets called when user presses submit.
function submitName() {
  // Name submitted gets placed into a variable.
  userName = document.getElementById("nameInput").value;

  if (validateInput(userName)) {
    // Hide the text entry container as it's not needed anymore.
    textInputElement.style.display = "none";

    // Call setStory function to set the story strings to use the appropriate name.
    setStory(userName);

    return true;
  }

}

// Initialize createButton function, takes in the button options.
function createButton(buttonText, nextId) {
  // Create variable "button", to create an element of button.
  const button = document.createElement('button');

  // Set the button's text to inputted string.
  button.innerText = buttonText;

  // Add the buttonClass to the button's class list.
  button.classList.add('buttonClass');

  button.addEventListener('click', () => updateGame(nextId))

  // Append the new button to the choice container as a child.
  choice_container.appendChild(button);
}

// Initialize setStory function, takes in a name string
function setStory(name) {
  // Define story variable with appropriate name of user in required strings
  story = [{
      id: 1,
      text: 'You are inside a small dungeon cell.\nThere is a closed cell door, a bed and bar window.',
      options: [{
          text: 'Look out the window.',
          nextid: 3
        },
        {
          text: 'Check under the bed.',
          nextid: 4
        },
        {
          text: 'Try to open the cell door.',
          nextid: 2
        }
      ]
    },
    {
      id: 2,
      text: 'You attempt to open the cell door,\nthe door creates a metal clanking sound.\nIt is locked shut.\nYou suddenly hear a person approaching.',
      options: [{
          text: 'Hide under the bed.',
          nextid: 7
        },
        {
          text: 'Lure the person to the cell door.',
          nextid: 5
        }
      ]
    },
    {
      id: 3,
      text: 'It is dark and very cold outside, not a light to be seen.',
      options: [{
          text: 'Come away from the window',
          nextid: 1
        }
      ]
    },
    {
      id: 4,
      text: 'You find a broken piece of glass.',
      options: [{
          text: 'Pick up piece of glass.',
          inventory_add: 'glass',
          nextid: 1
        },
        {
          text: 'Leave the piece of glass.',
          nextid: 1
        }
      ]
    }
  ]
}
