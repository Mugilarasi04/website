let lightState = {
    isOn: false,
    color: 'transparent'
};

const lightElement = document.getElementById('light');
const statusElement = document.getElementById('status');
const startListeningBtn = document.getElementById('start-listening');

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
}

function updateLight() {
    if (lightState.isOn) {
        lightElement.style.backgroundColor = lightState.color;
        lightElement.classList.add('on'); 
    } else {
        lightElement.style.backgroundColor = 'transparent';
        lightElement.classList.remove('on'); 
    }
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!window.SpeechRecognition) {
    alert('Speech recognition is not supported in this browser. Please try Chrome.');
}

const recognition = new SpeechRecognition();
recognition.onstart = function() {
    statusElement.innerText = "Listening for commands...";
    speak("Listening for commands.");
};

recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase().trim();
    console.log(`Command received: ${command}`);

    if (command.includes("turn") && command.includes("on")) {
        lightState.isOn = true;
        lightState.color = 'yellow';  
        statusElement.innerText = "Light turned on! Color: Yellow";
        speak("Light turned on. Color is yellow.");
    } else if (command.includes("turn") && command.includes("off")) {
        lightState.isOn = false;
        statusElement.innerText = "Light turned off!";
        speak("Light turned off.");
    } else if (command.includes("change") && command.includes("red")) {
        if (lightState.isOn) {
            lightState.color = 'red';  
            statusElement.innerText = "Light color changed to red!";
            speak("Light color changed to red.");
        } else {
            statusElement.innerText = "Please turn on the light first!";
            speak("Please turn on the light first.");
        }
    } else if (command.includes("change")) {
        if (lightState.isOn) {
            lightState.color = 'blue';  
            statusElement.innerText = "Light color changed to blue!";
            speak("Light color changed to blue.");
        } else {
            statusElement.innerText = "Please turn on the light first!";
            speak("Please turn on the light first.");
        }
    } else {
        statusElement.innerText = "Unrecognized command!";
        speak("Unrecognized command.");
        console.log("Command didn't match any expected phrases.");
    }

    updateLight();
};

// Now the listener function will be executed when the button is clicked
startListeningBtn.addEventListener('click', () => {
    recognition.start();
});

updateLight();
