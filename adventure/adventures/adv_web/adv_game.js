// Define variables that point to elements on page
var text_element = document.getElementById('text');
var choice_container = document.getElementById("option-buttons");
var adventure_image = document.getElementById("adventure_image");
var textInputElement = document.getElementById("text-input");
var story = [];
var userName;

// Initialize main function
function main() {
  // Hide the choice container as it's not needed yet.
  choice_container.style.display = "none";

  text_element.innerText = 'Welcome to AdventureWeb.\nMy name is EagleFoot and I\'ll be your guide on your quest.\nWhat is your name traveller?'

}

// Initialize updateGame function.
function updateGame(id) {
  while (choice_container.firstChild) {
    choice_container.removeChild(choice_container.firstChild);
  }
  const storyNode = story.find(node => node.id === id);
  const nodeText = storyNode['text'];
  const options = storyNode['options'];
  text_element.innerText = nodeText;
  options.forEach((item, i) => {
    createButton(item[0], item[1])
  });
  if (storyNode['image']) {
    adventure_image.src = storyNode['image'];
  }
}

// Initialize startGame function.
function startGame(name) {
  submitName(name);
  choice_container.style.display = "grid";
  updateGame(1);
}

// Initialize submitName function, gets called when user presses submit.
function submitName() {
  // Name submitted gets placed into a variable.
  userName = document.getElementById("nameInput").value;

  // Hide the text entry container as it's not needed anymore.
  textInputElement.style.display = "none";

  // Call setStory function to set the story strings to use the appropriate name.
  setStory(userName);
}

// Initialize setStory function, takes in a name string
function setStory(name) {
  // Define story variable with appropriate name of user
  story = [
    {
      id: 1,
      text: 'Hello ' + name + ', how are you?',
      options: [
        ['I am doing fine', 3],
        ['I am doing terrible', 2]
      ]
    },
    {
      id: 2,
      text: 'Well that sucks bro',
      image: "images/nodes/sad.png",
      options: [
        ['I am doing fine', 3],
        ['I am doing terrible', 2]
      ]
    },
    {
      id: 3,
      text: 'That\'s great, now go away',
      image: 'images/nodes/happy.png',
      options: [
        ['I am doing fine', 3],
        ['I am doing terrible', 2]
      ]
    }
  ]
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

// Call main function
main();
