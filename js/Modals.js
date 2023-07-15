class PopupModal {
    static #removeModalHost(modalHost) {
        document.body.classList.remove("noscroll");
        modalHost.classList.remove("open");
        setTimeout(() => {
            try {
                document.body.removeChild(modalHost);
            } catch (error) {}
        }, 500);
    }

    /**
     * Show a message popup
     * @param {*} text popup text
     * @param {*} title popup title
     * @param {*} callBackFunction (buttonValue) true for button 1, false for button 2
     * @param {*} button1Text default button text
     * @param {*} button2Text if set to null the button is hidden
     */
    static ShowMessage(
        text,
        title,
        callBackFunction = null,
        button1Text = "OK",
        button2Text = null
    ) {
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
            if (callBackFunction) callBackFunction(true);
            PopupModal.#removeModalHost(modalHost);
        });
        popupButtons.appendChild(button1);

        const button2 = document.createElement("button");
        if (button2Text) {
            button2.classList.add("clear-button");
            button2.innerHTML = button2Text;
            button2.addEventListener("click", () => {
                if (callBackFunction) callBackFunction(false);
                PopupModal.#removeModalHost(modalHost);
            });
            popupButtons.appendChild(button2);
        }

        modalHost.addEventListener("click", (event) => {
            if (event.target !== event.currentTarget) return;
            if (button2Text) button2.click();
            else button1.click();
        });

        // Add modal to DOM
        popup.appendChild(popupButtons);
        modalHost.appendChild(popup);
        document.body.appendChild(modalHost);

        // Open modal
        setTimeout(() => {
            document.body.classList.add("noscroll");
            modalHost.classList.add("open");
            setTimeout(() => {
                button1.focus();
            }, 50);
        }, 100);
    }

    /**
     * Show a text input popup modal
     * @param {String} text modal prompt text
     * @param {String} title modal title text
     * @param {Function} callBackFunction (confirmed, text)
     * @param {String} cancelText set to null to hide the cancel option
     * @param {String} confirmText
     */
    static ShowTextPrompt(
        text,
        title,
        callBackFunction = null,
        cancelText = "Cancel",
        confirmText = "Confirm"
    ) {
        const modalHost = document.createElement("div");
        modalHost.classList.add("modal-host", "modal-popup");

        const popup = document.createElement("form");
        popup.classList.add("popup");

        const popupTitle = document.createElement("div");
        popupTitle.classList.add("popup-title");
        popupTitle.innerHTML = title;
        popup.appendChild(popupTitle);

        const popupText = document.createElement("div");
        popupText.classList.add("popup-text");
        popupText.innerHTML = text;
        popup.appendChild(popupText);

        const popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");

        const popupTextboxLabel = document.createElement("label");
        popupTextboxLabel.classList.add("textbox");
        const popupTextbox = document.createElement("input");
        popupTextbox.type = "text";
        popupTextboxLabel.appendChild(popupTextbox);

        popupContent.appendChild(popupTextboxLabel);
        popup.appendChild(popupContent);

        const popupButtons = document.createElement("div");
        popupButtons.classList.add("popup-buttons");

        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.classList.add("clear-button");
        confirmButton.innerHTML = confirmText;
        confirmButton.addEventListener("click", () => {
            if (callBackFunction) callBackFunction(true, popupTextbox.value);
            PopupModal.#removeModalHost(modalHost);
        });
        popupButtons.appendChild(confirmButton);

        const cancelButton = document.createElement("button");
        if (cancelText) {
            cancelButton.type = "reset";
            cancelButton.classList.add("clear-button");
            cancelButton.innerHTML = cancelText;
            cancelButton.addEventListener("click", () => {
                if (callBackFunction) callBackFunction(false, popupTextbox.value);
                PopupModal.#removeModalHost(modalHost);
            });
            popupButtons.appendChild(cancelButton);
        }

        popup.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        popup.addEventListener("reset", (event) => {
            event.preventDefault();
        });
        modalHost.addEventListener("click", (event) => {
            if (event.target !== event.currentTarget) return;
            if (cancelText) cancelButton.click();
        });

        // Add modal to DOM
        popup.appendChild(popupButtons);
        modalHost.appendChild(popup);
        document.body.appendChild(modalHost);

        // Open modal
        setTimeout(() => {
            document.body.classList.add("noscroll");
            modalHost.classList.add("open");
            setTimeout(() => {
                popupTextbox.focus();
            }, 50);
        }, 50);
    }
}

class AttachedModal {
    static #removeModalHost(modalHost) {
        document.body.classList.remove("noscroll");
        modalHost.classList.remove("open");
        setTimeout(() => {
            try {
                document.body.removeChild(modalHost);
            } catch (error) {}
        }, 500);
    }

    /**
     * Show a text input modal
     * @param {String} text modal prompt text
     * @param {String} title modal title text
     * @param {Function} callBackFunction (confirmed, text)
     * @param {String} cancelText set to null to hide the cancel option
     * @param {String} confirmText
     */
    static ShowTextPrompt(
        text,
        title,
        callBackFunction = null,
        cancelText = "Cancel",
        confirmText = "Confirm"
    ) {
        const modalHost = document.createElement("div");
        modalHost.classList.add("modal-host", "modal-attached");

        const modal = document.createElement("form");
        modal.classList.add("modal");

        const modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");

        const headerLeft = document.createElement("div");
        headerLeft.classList.add("header-left");
        const cancelButton = document.createElement("button");
        if (cancelText) {
            cancelButton.type = "reset";
            cancelButton.classList.add("clear-button");
            cancelButton.innerHTML = `<iconify-icon icon="ph:x"></iconify-icon><span>${cancelText}</span>`;
            cancelButton.addEventListener("click", () => {
                if (callBackFunction) callBackFunction(false, inputTextbox.value);
                AttachedModal.#removeModalHost(modalHost);
            });
            headerLeft.appendChild(cancelButton);
        }
        modalHeader.appendChild(headerLeft);

        const headerCenter = document.createElement("div");
        headerCenter.classList.add("header-center");
        const modalTitle = document.createElement("span");
        modalTitle.classList.add("header-textbox");
        modalTitle.innerHTML = title;
        headerCenter.appendChild(modalTitle);
        modalHeader.appendChild(headerCenter);

        const headerRight = document.createElement("div");
        headerRight.classList.add("header-right");
        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.classList.add("clear-button");
        confirmButton.innerHTML = `<iconify-icon icon="tabler:check"></iconify-icon><span>${confirmText}</span>`;
        confirmButton.addEventListener("click", () => {
            if (callBackFunction) callBackFunction(true, inputTextbox.value);
            AttachedModal.#removeModalHost(modalHost);
        });
        headerRight.appendChild(confirmButton);
        modalHeader.appendChild(headerRight);

        modal.appendChild(modalHeader);

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const promptText = document.createElement("p");
        promptText.classList.add("popup-text");
        promptText.innerHTML = text;
        modalContent.appendChild(promptText);

        const inputTextboxLabel = document.createElement("label");
        inputTextboxLabel.classList.add("textbox");
        const inputTextbox = document.createElement("input");
        inputTextbox.type = "text";
        inputTextboxLabel.appendChild(inputTextbox);
        modalContent.appendChild(inputTextboxLabel);

        modal.appendChild(modalContent);

        const popupButtons = document.createElement("div");
        popupButtons.classList.add("popup-buttons");

        // popupButtons.appendChild(confirmButton);

        modal.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        modal.addEventListener("reset", (event) => {
            event.preventDefault();
        });
        modalHost.addEventListener("click", (event) => {
            if (event.target !== event.currentTarget) return;
            if (cancelText) cancelButton.click();
        });

        // Add modal to DOM
        modal.appendChild(popupButtons);
        modalHost.appendChild(modal);
        document.body.appendChild(modalHost);

        // Open modal
        setTimeout(() => {
            document.body.classList.add("noscroll");
            modalHost.classList.add("open");
            setTimeout(() => {
                inputTextbox.focus();
            }, 50);
        }, 50);
    }
}
