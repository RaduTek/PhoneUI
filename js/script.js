var pageNav1;

function onload() {
    console.clear();
    pageNav1 = new PageNavigator("screen1");
}

function modalpopup() {
    MessagePopup.Show(
        "Sample text string is here",
        "Sample title",
        "OK",
        "2nd button",
        (button) => {
            console.log("Button pressed: " + (button ? "1" : "2"));
        }
    );
}
