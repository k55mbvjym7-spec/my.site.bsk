const speakButton = document.getElementById("speak-button");
const stopButton = document.getElementById("stop-button");

speakButton.addEventListener("click", () => {
    const selectedText = window.getSelection().toString().trim();

    if (!selectedText) {
        alert("Сначала выделите текст, который хотите прослушать.");
        return;
    }

    if (!("speechSynthesis" in window)) {
        alert("Ваш браузер не поддерживает озвучивание.");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(selectedText);
    speech.lang = "ru-RU";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
});

stopButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});