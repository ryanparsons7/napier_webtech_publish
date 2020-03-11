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

// Initialize rem_from_array function.
function rem_from_array(array, item) {
  var index_item = array.indexOf(item);

  while (index_item !== -1) {
    array.splice(index_item, 1);
    index_item = array.indexOf(item);
  }
}

// Initialize updateGame function.
function updateGame(id, add_inv, rem_inv) {
  const storyNode = story.find(node => node.id === id);
  if (id === 0) {
    inventory = [];
  }
  if (add_inv) {
    inventory.push(add_inv);
  }
  if (rem_inv) {
    rem_from_array(inventory, rem_inv)
  }
  if (storyNode['image']) {
    adventure_image.src = storyNode['image'];
  }
  if (storyNode['sound']) {
    // Play sound
  }
  // Remove all option buttons
  while (choice_container.firstChild) {
    choice_container.removeChild(choice_container.firstChild);
  }
  const nodeText = storyNode['text'];
  text_element.innerText = nodeText;
  const options = getOptions(storyNode);
  console.log(options)
  for (var i = 0; i < options.length; i++) {
    if (options[i]['inInventory']) {
      if (inventory.includes(options[i]['inInventory'])) {
        console.log('in inventory pass');
        createButton(options[i]['text'], options[i]['nextid'], options[i]['inventory_add'], options[i]['inventory_remove']);
        continue;
      }
      continue;
    }
    if (options[i]['notInInventory']) {
      if (!(inventory.includes(options[i]['notInInventory']))) {
        console.log('not in inventory pass');
        createButton(options[i]['text'], options[i]['nextid'], options[i]['inventory_add'], options[i]['inventory_remove']);
        continue;
      }
      continue;
    }
    createButton(options[i]['text'], options[i]['nextid'], options[i]['inventory_add'], options[i]['inventory_remove']);
  }
};

// Initialize get options function.
function getOptions(storyNode) {
  var nodeOptions = storyNode['options'];
  return nodeOptions;
}

// Initialize startGame function.
function startGame() {
  if (!submitName()) {
    alert('Enter a name');
    return;
  }
  choice_container.style.display = "grid";
  updateGame(0);
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
function createButton(buttonText, nextId, add_inv, rem_inv) {
  // Create variable "button", to create an element of button.
  const button = document.createElement('button');

  // Set the button's text to inputted string.
  button.innerText = buttonText;

  // Add the buttonClass to the button's class list.
  button.classList.add('buttonClass');

  button.addEventListener('click', () => updateGame(nextId, add_inv, rem_inv))


  // Append the new button to the choice container as a child.
  choice_container.appendChild(button);
}

// Initialize setStory function, takes in a name string
function setStory(name) {
  // Define story variable with appropriate name of user in required strings
  story = [{
      id: 0,
      text: 'You are laying face first on a stone floor.',
      options: [{
        text: 'Get up',
        nextid: 1
      }]
    },
    {
      id: 1,
      text: 'You are inside a small dungeon cell.\nThere is a closed cell door, a bed and bar window.',
      options: [{
          text: 'Try to open the cell door.',
          nextid: 2
        },
        {
          text: 'Look out of the window.',
          nextid: 3
        },
        {
          text: 'Check under the bed.',
          nextid: 4,
          notInInventory: 'glass_shard'
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
      }]
    },
    {
      id: 4,
      text: 'You find a broken piece of glass.',
      options: [{
          text: 'Pick up piece of glass.',
          nextid: 1,
          inventory_add: 'glass_shard'
        },
        {
          text: 'Leave the piece of glass.',
          nextid: 1
        }
      ]
    },
    {
      id: 5,
      text: 'You shout at the person approaching to lure them to the cell door.\nThey approach and it looks like a guard.\nThey yell at you: "Why are you trying to escape prisoner?"',
      options: [{
          text: 'Attempt to kill the guard through the bars with the glass shard.',
          inInventory: 'glass_shard',
          nextid: 6
        },
        {
          text: 'Attempt to knock out the guard through the bars.',
          nextid: 8
        }
      ]
    },
    {
      id: 6,
      text: 'You successfully killed the guard by throwing the glass shard at them.\nThey have dropped to the floor in front of the cell door.',
      options: [{
        text: 'Take the key from the guard, unlock the door and leave the cell.',
        nextid: 16
      }]
    },
    {
      id: 7,
      text: 'You hide under the bed.\nThe person approaches and it looks like a dungeon guard.\nThey notice noone in the cell, unlock the cell door and enter the cell to look for you.',
      options: [{
          text: 'Come out from under the bed and attempt to knock out the guard',
          nextid: 10
        },
        {
          text: 'Crawl from under the bed and run for the cell door',
          nextid: 9
        }
      ]
    },
    {
      id: 8,
      text: 'You attempt to knock out the guard through the bars.\nYour attempt fails and you get subdued by the guard.\nThe guard chains you to the wall for the rest of the night and you are executed in the morning.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 9,
      text: 'You attempt to run for the cell door, but the guard\'s great perception makes him aware of you as soona as you crawl from under the bed. Your attempt fails and you get subdued by the guard. The guard chains you to the wall for the rest of the night and you are executed in the morning.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 10,
      text: 'You crawl from under the bed, the guard notices you and immeditely draws his sword upon you.',
      options: [{
          text: 'Surrender',
          nextid: 20
        },
        {
          text: 'Fight',
          nextid: 12,
          inInventory: 'glass_shard'
        },
        {
          text: 'Fight',
          nextid: 11,
          notInInventory: 'glass_shard'
        }
      ]
    },
    {
      id: 11,
      text: 'You attempt to fight the guard with your bare fists. You get cut down with the guard\'s sword almost immediately.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 12,
      text: 'You attempt to fight the guard with the glass shard you found.',
      options: [{
          text: 'Slash',
          nextid: 13
        },
        {
          text: 'Throw',
          nextid: 14
        }
      ]
    },
    {
      id: 13,
      text: 'You slash at the guard with the glass shard. The glass shard breaks when hitting the guard\'s armour, the guard then strikes you down with his sword',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 14,
      text: 'You throw the glass shard at the guard, it lands directly into the guard\'s eye, killing him.',
      options: [{
        text: 'Leave the cell',
        nextid: 16
      }]
    },
    {
      id: 16,
      text: 'You\'re in a hallway, to the west you see a door and to the east, you see another door.',
      options: [{
          text: 'Go West',
          nextid: 17
        },
        {
          text: 'Go East',
          nextid: 21
        }
      ]
    },
    {
      id: 17,
      text: 'You are at the end of the hall, there is a hardwood door to your direct west and the hallway continues to the east.',
      options: [{
          text: 'Open the door with the guard key',
          nextid: 19,
          inInventory: 'guardKey'
        },
        {
          text: 'Open the door',
          nextid: 18
        },
        {
          text: 'Go East',
          nextid: 16
        }
      ]
    },
    {
      id: 18,
      text: 'You try to open the door, but it is locked.',
      options: [{
        text: 'Come away from the door',
        nextid: 17
      }]
    },
    {
      id: 19,
      text: 'You are at the end of a hallway, to your direct east, is a door. In the distance to the west, you see a light source.',
      options: [{
          text: 'Head West',
          nextid: 30
        },
        {
          text: 'Open the door',
          nextid: 17
        }
      ]
    },
    {
      id: 20,
      text: 'You surrender to the guard. The guard chains you to the wall for the rest of the night and you are executed in the morning',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 21,
      text: 'You reach a 3 way junction of hallways, there is a hallway going North, South and West.',
      options: [{
          text: 'Go West',
          nextid: 16
        },
        {
          text: 'Go South',
          nextid: 22
        },
        {
          text: 'Go North',
          nextid: 26
        }
      ]
    },
    {
      id: 22,
      text: 'You are at a door at the end of a hallway. The hallway leads North.',
      options: [{
          text: 'Go North',
          nextid: 21
        },
        {
          text: 'Open the door with the castle key',
          nextid: 24,
          inInventory: 'castleKey'
        },
        {
          text: 'Open the door',
          nextid: 23
        }
      ]
    },
    {
      id: 23,
      text: 'You try to open the door, but it is locked.',
      options: [{
        text: 'Come away from the door',
        nextid: 22
      }]
    },
    {
      id: 24,
      text: 'You unlock the door with the castle key. You open the door and see the outside world.',
      options: [{
        text: 'Run away',
        nextid: 25
      }]
    },
    {
      id: 25,
      text: 'You successfully escape the castle grounds and live happily ever after.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 26,
      text: 'You are at a door at the end of a hallway, the hallway leads south',
      options: [{
          text: 'Go South',
          nextid: 21
        },
        {
          text: 'Open the door and enter',
          nextid: 27
        }
      ]
    },
    {
      id: 27,
      text: 'You are inside what looks like guard sleeping quarters. There are multiple beds, a door and a wooden box.',
      options: [{
          text: 'Check under the beds',
          nextid: 28
        },
        {
          text: 'Check inside the wooden box',
          nextid: 29,
          notInInventory: 'guardKey'
        },
        {
          text: 'Go through the door',
          nextid: 26
        }
      ]
    },
    {
      id: 28,
      text: 'You look under every bed in the room, you find nothing but dust and cobwebs.',
      options: [{
        text: 'Come away from the beds',
        nextid: 27
      }]
    },
    {
      id: 29,
      text: 'You open the wooden box to find a Steel Sword and a Key',
      options: [{
        text: 'Take Steel Sword and the Key.',
        nextid: 27,
        inventory_add: ['guardKey','sword']
      }]
    },
    {
      id: 30,
      text: 'You are at a corner of a hallway, in the corner on the wall is a torch holder containin lit torches. The hallway leads North into the distance and to the east to a door.',
      options: [{
          text: 'Go East',
          nextid: 19
        },
        {
          text: 'Take Torch',
          nextid: 31,
          notInInventory: 'torch'
        },
        {
          text: 'Head North',
          nextid: 32
        }
      ]
    },
    {
      id: 31,
      text: 'You take one of the torches off the wall.',
      options: [{
        text: 'Come away from the wall',
        nextid: 30,
        inventory_add: 'torch'
      }]
    },
    {
      id: 32,
      text: 'You are at a T-Junction of hallways. The hallways lead West, South and East. To the east, there is a no light sources to be seen,',
      options: [{
          text: 'Go South',
          nextid: 30
        },
        {
          text: 'Go East',
          nextid: 33
        },
        {
          text: 'Go East with the lit torch',
          nextid: 36,
          inInventory: 'torch'
        },
        {
          text: 'Go West',
          nextid: 34
        }
      ]
    },
    {
      id: 33,
      text: 'You venture in into the dark passage with no light source. You suddenly get jumped by an unknown monster. You quickly die.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 34,
      text: 'You are inside what looks like a storage room. There are multiple boxes scattered around the room.',
      options: [{
          text: 'Leave the room',
          nextid: 32
        },
        {
          text: 'Open the boxes',
          nextid: 35,
          notInInventory: 'potion'
        }
      ]
    },
    {
      id: 35,
      text: 'You open the various boxes in the room and come across a potion. It reads on the label: "Light-Foot Potion"',
      options: [{
        text: 'Take the potion',
        nextid: 34,
        inventory_add: 'potion'
      }]
    },
    {
      id: 36,
      text: 'You are inside a dark hallway with your trusty torch as a light source. The hallway leads West and North.',
      options: [{
          text: 'Go North',
          nextid: 41
        },
        {
          text: 'Go West',
          nextid: 32
        }
      ]
    },
    {
      id: 37,
      text: 'You approach the shiny object. Due to your noisey movements, the dragon awakens and you get killed in a burst of fire.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 38,
      text: 'To make your movements quiet, you take the potion and move quietly to the shiny object on the pile of Skeletons. You notice the shiny object is a key, possibly for the entire castle.',
      options: [{
        text: 'Pick up the key',
        nextid: 43,
        inventory_add: 'castleKey'
      }]
    },
    {
      id: 39,
      text: 'You attack the dragon with your bear fists and get incinerated in a gust of fire.',
      options: [{
        text: 'Restart',
        nextid: 0
      }]
    },
    {
      id: 40,
      text: 'You attack the dragon with your sword, with a few quick strikes at it\'s head, the dragon dies.',
      options: [{
        text: 'Step back from the dead dragon',
        nextid: 42
      }]
    },
    {
      id: 41,
      text: 'You are inside a massive cavern, in the center is a sleeping dragon. Surrounding the room is piles of Skeletons, one of the piles seem to have a shiny item upon it.',
      options: [{
          text: 'Attack the dragon with your bare fists',
          nextid: 39
        },
        {
          text: 'Attack the dragon your sword',
          nextid: 40,
          inInventory: 'sword'
        },
        {
          text: 'Investigate the shiny item',
          nextid: 37,
          notInInventory: ['potion','castlekey']
        },
        {
          text: 'Take the potion and investigate the shiny item',
          nextid: 38,
          inInventory: 'potion',
          notInInventory: 'castleKey'
        }
      ]
    },
    {
      id: 42,
      text: 'You are inside a massive cavern, in the center is a dead dragon. Surrounding the room is piles of Skeletons, one of the piles seem to have a shiny item upon it.',
      options: [{
          text: 'Leave the cavern',
          nextid: 36
        },
        {
          text: 'Investigate the shiny item',
          nextid: 45,
          notInInventory: 'castleKey'
        }
      ]
    },
    {
      id: 43,
      text: 'You collect the key',
      options: [{
        text: 'Go back to the center of the cavern',
        nextid: 41
      }]
    },
    {
      id: 44,
      text: 'You collect the key',
      options: [{
        text: 'Go back to the center of the cavern',
        nextid: 42
      }]
    },
    {
      id: 45,
      text: 'You move to the shiny object on the pile of Skeletons. You notice the shiny object is a key, possibly for the entire castle.',
      options: [{
        text: 'Collect the key',
        nextid: 44,
        inventory_add: 'castleKey'
      }]
    }
  ]
}
