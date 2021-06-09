class RegisterForm extends AsyncForm {

    async onSubmit(data) {
        const result = await User.register(data);

        if (result.success) {
            User.setCurrent(result.user);

            const form = this.element;
            form.reset();
            App.setState('user-logged');
            
            const modal = App.getModal("register");
            modal.close();
        }
        else {
            console.log(result.error);
        }

    }
     
}   
