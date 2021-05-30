/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
    onSubmit(data) {
        
        User.register(data, (err) => {
            if (!err) { 
                const form = App.getForm("register").element;
                form.reset();
                App.setState('user-logged');
                
                const modal = App.getModal("register");
                modal.close();
            }
            else console.log(err);
        })    
    }
     
}   




// const entries = data.entries();

// for (let item of entries) {
//     const key = item[0];
//     const value = item[1];
//     console.log(`${key}: ${value}`)
// }