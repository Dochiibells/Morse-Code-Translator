// Morse code mapping
const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/', // Space between words
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
    '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.'
};

// Inverted Morse code map for decoding
const inverseMorseCodeMap = {};
for (const key in morseCodeMap) {
    inverseMorseCodeMap[morseCodeMap[key]] = key;
}

// Function to encode text into Morse Code.
function encodeToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCodeMap[char] || '').join(' ');
}

// Function to decode Morse code into text.
function decodeFromMorse(morse) {
    morse = morse.replace(/_/g, '-').replace(/\/+/g, ' / '); 
    const words = morse.split(' / '); 
    return words.map(word => word.split(' ').map(code => inverseMorseCodeMap[code] || '').join('')).join(' ');
}



// Function to play Morse code as audio
function playMorseCode(morseCode) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 0.1; // duration of a dot
    const dashDuration = 0.2; // duration of a dash
    const spaceDuration = 0.1; // duration of a space between parts of the same letter
    const letterSpaceDuration = 0.2; // duration of a space between letters
    const wordSpaceDuration = 0.5; // duration of a space between words

    let currentTime = audioContext.currentTime;

    function playTone(duration) {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime); // Frequency in Hz
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        currentTime += duration;
    }

    morseCode.split('').forEach(char => {
        switch (char) {
            case '.':
                playTone(dotDuration);
                currentTime += spaceDuration;
                break;
            case '-':
                playTone(dashDuration);
                currentTime += spaceDuration;
                break;
            case ' ':
                currentTime += letterSpaceDuration;
                break;
            case '/':
                currentTime += wordSpaceDuration;
                break;
        }
    });
}

// Function to update output based on user input in real-time
function updateOutput() {
    const inputTextBox = document.getElementById('inputtxtbox');
    const outputTextBox = document.getElementById('outtxtbox');
    const inputText = inputTextBox.value.trim();

    const isEncode = document.getElementById('toEncoder').checked;
    const isDecode = document.getElementById('toDecoder').checked;

    if (inputText === "") {
        outputTextBox.value = "";
        return;
    }

    if (isEncode) {
        outputTextBox.value = encodeToMorse(inputText);
    } else if (isDecode) {
        outputTextBox.value = decodeFromMorse(inputText);
    } else {
        outputTextBox.value = "Please select an option to encode or decode.";
    }
}

// Event listener for input box to update output in real-time
document.getElementById('inputtxtbox').addEventListener('input', updateOutput);

// Event listener for play button
document.getElementById('playbtn').addEventListener('click', () => {
    const outputText = document.getElementById('outtxtbox').value.trim();
    if (outputText) {
        playMorseCode(outputText);
    } else {
        alert('Please encode some text to Morse code first.');
    }
});
