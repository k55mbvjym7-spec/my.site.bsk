const speakButton = document.getElementById("speak-button");
const stopButton = document.getElementById("stop-button");

let savedText = "";

function getSelectedText() {
    const selection = window.getSelection().toString().trim();

    if (selection) {
        return selection;
    }

    const activeElement = document.activeElement;

    if (
        activeElement &&
        (activeElement.tagName === "TEXTAREA" ||
         activeElement.tagName === "INPUT")
    ) {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;

        return activeElement.value.substring(start, end).trim();
    }

    return "";
}

if (speakButton) {
    speakButton.addEventListener("pointerdown", () => {
        savedText = getSelectedText();
    });

    speakButton.addEventListener("click", () => {
        const selectedText = savedText || getSelectedText();

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

        savedText = "";
    });
}

if (stopButton) {
    stopButton.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });
}
