class MessageBox {
    constructor(typeMessage) {
        this.typeMessage = typeMessage
        this.durationId = null;
    }

    calcProgressBar() {
        let width = 100

        this.durationId = setInterval(() => {
            this.progressBar.style.width = `${width}%`;

            if (width < 0) {
                this.close()
            }

            width--;
        }, 50)
    }

    open() {
        clearInterval(this.durationId);

        const divMessageBox = this.createBoxMessage(this.typeMessage);

        document.body.append(divMessageBox);

        this.boxContainer = document.querySelector(".boxWrapper");
        this.progressBar = this.boxContainer.querySelector(".progressBar");

        this.boxContainer.style.animationName = "appear";

        this.calcProgressBar();

        divMessageBox.querySelector('#close')
            .addEventListener('click', () => this.close())
    }

    close() {
        clearInterval(this.durationId);

        this.boxContainer.style.animationName = "vanish";
    }

    removeBoxMessage() {
        document.querySelectorAll('.boxMessage').forEach(div => {
            div.remove();
        })
    }

    createBoxMessage(typeMessage) {
        this.removeBoxMessage();

        const typeMessages = {
            success: {
                title: "Sucesso",
                description: "Usuário cadastrado"
            },
            alert: {
                title: "Alerta",
                description: "Usuário ja cadastrado"
            },
            error: {
                title: "Erro",
                description: "Usuário não encontrado"
            }
        }

        const div = document.createElement('div');

        div.classList.add('boxMessage')

        div.innerHTML = `
            <div class="boxWrapper ${typeMessage}">
                <div class="content">
                    <h2>${typeMessages[typeMessage].title}</h2>
                    <p>${typeMessages[typeMessage].description}</p>
                </div>
                <div class="progressBar"></div>
                <ion-icon name="close-outline" id="close"></ion-icon>
            </div>
        `

        return div;
    }
}

export const MessageAlert = new MessageBox('alert');

export const MessageError = new MessageBox('error');

export const MessageSuccess = new MessageBox('success');