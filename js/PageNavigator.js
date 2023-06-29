class PageNavigator {
    #screenObj;
    #pages;
    #buttons;
    #pageNames = [];
    #activePage;
    #activeButton;

    constructor(screenId) {
        this.#screenObj = document.getElementById(screenId);
        this.#pages = this.#screenObj.querySelector(".pagenav-pages");
        this.#buttons = this.#screenObj.querySelector(".pagenav-buttons");

        this.#hideAllPages();
        this.#loadAllPageNames();
        this.#initialiseButtons();

        this.selectPage(0);
    }

    #loadAllPageNames() {
        for (let page of this.#pages.children) {
            if (page.dataset.pageName) {
                this.#pageNames[this.#pageNames.length] = page.dataset.pageName;
            }
        }
    }

    #hideAllPages(doAnimation = false, resetGlobal = true) {
        for (let page of this.#pages.children) {
            if (doAnimation) page.classList.add("hidden");
            else page.classList.add("noanimate", "hidden");
            page.classList.remove("visible");
        }
        setTimeout(() => {
            for (let page of this.#pages.children) {
                if (!doAnimation) page.classList.remove("noanimate");
                if (page.classList.contains("hidden")) page.classList.add("noheight");
            }
        }, 500);
        if (resetGlobal) this.#activePage = -1;
    }

    #setSlidingDirection(activePage) {
        for (let index = 0; index < this.#pages.children.length; index++) {
            if (index == activePage) continue;
            const page = this.#pages.children[index];
            page.classList.remove("slide-left", "slide-right");
            let direction;
            if (index < activePage) direction = "left";
            else direction = "right";
            page.classList.add("slide-" + direction);
        }
    }

    #scrollToTop() {
        this.#pages.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    selectPage(pageIndex) {
        if (this.#activePage == pageIndex) {
            this.#scrollToTop();
            return;
        }
        window.scrollTo(0, 0);
        const page = this.#pages.children[pageIndex];
        this.#setSlidingDirection(pageIndex);
        this.#hideAllPages(true, false);
        page.classList.remove("hidden", "noheight");
        page.classList.add("visible");
        this.#selectButton(pageIndex);
        this.#activePage = pageIndex;
    }

    #selectButton(buttonIndex) {
        if (this.#activeButton == buttonIndex) return;
        this.#unselectAllButtons();
        this.#buttons.children[buttonIndex].classList.add("selected");
        this.#activeButton = buttonIndex;
    }

    #unselectAllButtons() {
        for (let button of this.#buttons.children) {
            button.classList.remove("selected");
        }
        this.#activeButton = -1;
    }

    #initialiseButtons() {
        for (let button of this.#buttons.children) {
            button.addEventListener("click", () => this.#buttonClicked(button));
        }
    }

    #buttonClicked(button) {
        const index = this.#pageNames.findIndex((element) => element == button.dataset.pageName);
        this.selectPage(index);
    }
}
