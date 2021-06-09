
class LoginForm extends AsyncForm {

    async onSubmit(data) {
        const result = await User.login(data);

        if (result.success) {
            User.setCurrent(result.user);

            const form = this.element;
            form.reset();
            App.setState('user-logged');

            const modal = App.getModal("login");
            modal.close();
        }
        else {
            alert(result.error);
        }

    }

}