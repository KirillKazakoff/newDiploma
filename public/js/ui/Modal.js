/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
    constructor(element) { 
        try {
            if (!element) throw new Error("empty object")
            this.element = element;
            this.registerEvents();
        }
        catch(e) {
            console.log(e.message);
        }
    }


  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
    registerEvents() {
        const buttons = Array.from(this.element.querySelectorAll('button[data-dismiss="modal"]'));

        // buttons.forEach(button => button.addEventListener("click", (e) => {
        //     if (button["data-dismiss"]) this.onClose(e);
        // }))
        buttons.forEach(button => button.addEventListener("click", this.onClose.bind(this)))
    }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
    close() {
        this.element.style.display = "none";
    }

    onClose(e) {
        this.close()
        e.preventDefault();
    }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
    open() {
        this.element.style.display = "block";
    }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */

}
// document.getElementsByTagName