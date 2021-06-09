"use strict"
class AsyncForm {
    constructor(element) {
        if (!element) {
            throw new Error("empty data");
        }
        this.element = element;
        this.registerEvents();
    }


    registerEvents() {
        this.element.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submit();
        })
        
    }

    onSubmit(options) {
        
    }

    submit() {
        const data = new FormData(this.element);
        this.onSubmit(data)
    }
}