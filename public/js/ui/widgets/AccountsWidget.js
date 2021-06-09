"use strict"

class AccountsWidget {
    constructor(element) {
        if (!element) {
            throw new Error("empty data");
        }
        this.element = element;
        this.accounts, this.activeAccount;

        this.update();
        this.registerEvents();
    }


    registerEvents() {
        this.element.addEventListener("click", (event) => {
            const {target} = event;
            const element = target.closest("li");

            if (element.className == "account") {
                this.onSelectAccount(element);
            }
            else if (target.classList.contains("create-account")) {
                App.getModal("createAccount").open();
            }

        })
    }

    onSelectAccount(account) {
        const {id} = account.dataset;
        const activeAccount = document.querySelector(".account.active")

        if (activeAccount) {
            this.toggleActive(activeAccount);
        }
        
        this.toggleActive(account);
        App.showPage('transactions', {account_id: id});
    }

    toggleActive(account) {
        account.classList.toggle("active");
    }

    async update() {
        const user = User.current();
        const result = await Account.list(user);

        if (result.success) {
            const {data} = result;
            this.clear()
            data.forEach(element => {
                const code = this.getAccountHTML(element)
                this.renderItem(code);
            })
        }
        else {
            console.log("something went wrong");
        }

    }

    clear() {
        const accounts = document.querySelectorAll(".account");

        accounts.forEach(element => {
            element.remove();
        });
    }
    
    getAccountHTML(item){
        const {id, name, sum} = item;

        return `
        <li class="account" data-id=${id}>
            <a href="#">
                <span>${name}/</span>
                <span>${sum} ₽</span>
            </a>
        </li>`
    }

    renderItem(data){
        this.element.insertAdjacentHTML("beforeEnd", data);
    }
}


















