
class UserWidget {
    constructor(element){
        if (!element) {
            throw new Error("empty data");
        }
        this.element = element;
    }


    update() {
        try {
            const {name} = User.current();
            const nameHTML = document.querySelector(".user-name");
            if (name) {
                nameHTML.textContent = name;
            }
        }
        catch(e) {
            alert(e.message)
        }
        
    }
}
