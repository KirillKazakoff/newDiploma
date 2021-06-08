
class Sidebar {

    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    static initToggleButton() {
        const button = document.querySelector('.sidebar-toggle');

        button.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open') ;
            document.body.classList.toggle('sidebar-collapse');
        })
    }

    static initAuthLinks() {
        const buttons = document.querySelectorAll(".menu-item");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const buttonClass = button.className.split('_').pop();
                
                if (buttonClass == "logout") {
                    const user = User.current();
                    User.logout(user, (err, response) => {
                        err ? err : App.setState('init')
                        if (response.success) App.setState('init')
                    })
                }
                else {
                    const modal = App.getModal(buttonClass);
                    modal.open();
                }
            })
        })
    }
}
