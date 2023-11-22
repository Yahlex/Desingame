document.addEventListener('DOMContentLoaded', function () {
    var generateButton = document.getElementById('generateButton');
    var letterDisplay = document.getElementById('letterDisplay');
    var timerElement = document.getElementById('timer');
    var timer2Element = document.getElementById('timer2');
    var malusElement = document.getElementById('malus');
    var bonusElement = document.getElementById('bonus');
    var audio = document.getElementById('audio');
    var audioDuringCountdown = document.getElementById('audioDuringCountdown');
    var audioBonus = document.getElementById('audioBonus');
    var audioMalus = document.getElementById('audioMalus');
    var audioEndBonus = document.getElementById('audioEndBonus');
    var countdown;
    var isBonusActivated = false;
    var isMalusActivated = false;

    var activateBonusButton = document.getElementById('activateBonus');
    var activateMalusButton = document.getElementById('activateMalus');

    generateButton.addEventListener('click', generateLetter);
    activateBonusButton.addEventListener('click', activateBonus);
    activateMalusButton.addEventListener('click', activateMalus);

    function generateLetter() {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomIndex = Math.floor(Math.random() * alphabet.length);
        var randomLetter = alphabet.charAt(randomIndex);

        letterDisplay.textContent = randomLetter;
        resetCountdown();
    }

    function activateBonus() {
        isBonusActivated = true;
        generateLetter(); // Appeler la fonction pour générer la lettre
        resetCountdown();
    }

    function activateMalus() {
        isMalusActivated = true;
        generateLetter(); // Appeler la fonction pour générer la lettre
        resetCountdown();
    }

    function resetCountdown() {
        var seconds = 45;
        timerElement.textContent = seconds;
        timer2Element.textContent = 10;

        clearInterval(countdown);
        malusElement.style.display = 'none';
        bonusElement.style.display = 'none';

        countdown = setInterval(function () {
            seconds--;
            timerElement.textContent = seconds;

            if (seconds <= 0) {
                clearInterval(countdown);
                audio.play();
                audioDuringCountdown.pause();
                audioDuringCountdown.currentTime = 0;

                if (isBonusActivated) {
                    setTimeout(function () {
                        startBonusTimer();
                    }, 1000);
                } else if (isMalusActivated) {
                    malusElement.style.display = 'block';
                    audioMalus.play();
                    isMalusActivated = false; // Réinitialiser la variable pour le prochain tour
                }
            } else {
                audioDuringCountdown.play();

                if (seconds === 10 && isMalusActivated) {
                    malusElement.style.display = 'block';
                    audioMalus.play();
                    isMalusActivated = false; // Réinitialiser la variable pour le prochain tour
                } else {
                    malusElement.style.display = 'none';
                }
            }
        }, 1000);
    }

    function startBonusTimer() {
        var bonusSeconds = 10;
        timer2Element.textContent = bonusSeconds;
        bonusElement.style.display = 'block';
        audioBonus.play();

        var bonusCountdown = setInterval(function () {
            bonusSeconds--;
            timer2Element.textContent = bonusSeconds;

            if (bonusSeconds <= 0) {
                clearInterval(bonusCountdown);
                bonusElement.style.display = 'none';
                audioEndBonus.play(); // Ajouter le son de fin de bonus ici
                isBonusActivated = false; // Réinitialiser la variable pour le prochain tour
            }
        }, 1000);
    }
});
