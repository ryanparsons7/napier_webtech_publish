var text_element = document.getElementById('text'); // Define text element as var
var choice_container = document.getElementById("option-buttons"); // Define container that contains option buttons
var adventure_image = document.getElementById("adventure_image"); // Define image at top of body

// Function that starts at page load
function main() {
  // Hide these containers as they are not needed yet.
  // choice_container.style.display = "none";
  adventure_image.style.display = "none";
  nameEntry();
}

function nameEntry() {
  // Change text to the welcome string, asking the user for their name
  text_element.innerText = 'Welcome to AdventureWeb.\nMy name is EagleFoot and I\'ll be your guide on your quest.\nWhat is your name traveller?'
}

function submitName() {
  // Put the entered name into a var
  userName = document.getElementById("nameInput").value;
  setStory(userName);
}

function setStory(name) {
  story = [
    {
      id: 1,
      text: 'Hello ' + name + ', how are you?'
    }
  ]
}

function createButton(buttonText, nextId) {
  const button = document.createElement('button');
  button.innerText = buttonText;
  button.classList.add('buttonClass');
  choice_container.appendChild(button);
}

function testButtonCreate() {
  const listButtons = [
    {
      id: 1,
      text: 'Lolly gaggin',
      nextId: 3
    },
    {
      id: 2,
      text: 'Lolly gaggin 2',
      nextId: 3
    },
    {
      id: 4,
      text: 'Lolly gaggin 3',
      nextId: 3
    },
    {
      id: 3,
      text: 'Lolly gaggin 4',
      nextId: 3
    }
  ]
  story.forEach((item, i) => {
    createButton(item.text)
  });
};

main(); // Start the game
