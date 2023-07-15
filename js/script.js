var pageNav1;

function onload() {
    console.clear();
    pageNav1 = new PageNavigator("screen1");
}

function modalpopup(twoButton) {
    PopupModal.ShowMessage(
        "This is a popup message modal. Look in the debug console for more.",
        "Popup Modal",
        (button) => {
            console.log(`${button ? "1st" : "2nd"} button was pressed.`);
        },
        "OK",
        twoButton ? "2nd button" : null
    );
}

function modaltext() {
    AttachedModal.ShowTextPrompt(
        "Enter a string below. It will be printed in the debug console.",
        "Text Prompt",
        (confirmed, text) => {
            if (confirmed) console.log(`Text prompt was confirmed with string: \"${text}\"`);
            else console.log(`Text prompt was cancelled with string: \"${text}\"`);
        }
    );
}
