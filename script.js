// Function to toggle audio playback and manage visual feedback
function toggleAudio(audio, button, newAudio) {
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        button.classList.remove('playing');
    }

    if (newAudio.paused) {
        newAudio.currentTime = 0;
        newAudio.play();
        button.classList.add('playing');
    } else {
        newAudio.pause();
        newAudio.currentTime = 0;
        button.classList.remove('playing');
    }
}

// Function to handle transitionend event
function removeTransition(event) {
    if (event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

// Function to stop all audio playback and remove visual feedback
function stopAllAudio() {
    document.querySelectorAll('.string').forEach(string => {
        const note = string.getAttribute('data-note');
        const audio = document.querySelector(`audio[data-note="${note}"]`);
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        string.classList.remove('playing');
    });
}

// Event listener for string buttons (click and touch events)
document.querySelectorAll('.string').forEach(string => {
    string.addEventListener('click', handleButtonClick);
    string.addEventListener('touchstart', handleButtonClick);
});

function handleButtonClick(event) {
    event.preventDefault(); // Prevent default action for touch events
    const note = this.getAttribute('data-note');
    const audio = document.querySelector('.playing audio');
    const newAudio = document.querySelector(`audio[data-note="${note}"]`);
    toggleAudio(audio, document.querySelector('.playing'), newAudio, this); // Toggle playback and visual feedback
}

// Event listener for transitionend event to remove visual feedback
const strings = document.querySelectorAll('.string');
strings.forEach(string => string.addEventListener('transitionend', removeTransition));

// Event listener to stop audio playback when window loses focus
window.addEventListener('blur', stopAllAudio);
