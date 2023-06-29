class MessagePopup {
    static Show(text, title, button1Text, button2Text = null, buttonCallback = null) {
        const modalHost = document.createElement("div");
        modalHost.classList.add("modal-host", "modal-popup");

        const popup = document.createElement("div");
        popup.classList.add("popup");

        const popupTitle = document.createElement("div");
        popupTitle.classList.add("popup-title");
        popupTitle.innerHTML = title;
        popup.appendChild(popupTitle);

        const popupText = document.createElement("div");
        popupText.classList.add("popup-text");
        popupText.innerHTML = text;
        popup.appendChild(popupText);

        const popupButtons = document.createElement("div");
        popupButtons.classList.add("popup-buttons");

        const button1 = document.createElement("button");
        button1.classList.add("clear-button");
        button1.innerHTML = button1Text;
        button1.addEventListener("click", () => {
            if (buttonCallback) buttonCallback(true);
            MessagePopup.#unSpawnModalHost(modalHost);
        });
        popupButtons.appendChild(button1);

        if (button2Text) {
            const button2 = document.createElement("button");
            button2.classList.add("clear-button");
            button2.innerHTML = button2Text;
            button2.addEventListener("click", () => {
                if (buttonCallback) buttonCallback(false);
                MessagePopup.#unSpawnModalHost(modalHost);
            });
            popupButtons.appendChild(button2);
        }

        // Add modal to DOM
        popup.appendChild(popupButtons);
        modalHost.appendChild(popup);
        document.body.appendChild(modalHost);

        // Open modal
        document.body.classList.add("noscroll");
        modalHost.classList.add("open");
    }

    static #unSpawnModalHost(modalHost) {
        document.body.classList.remove("noscroll");
        modalHost.classList.remove("open");
        setTimeout(() => {
            document.body.removeChild(modalHost);
        }, 500);
    }
}
