export let Modal = {
    modalWrapper: document.querySelector("#modal"),
    buttonCloseModal: document.querySelector("#closeModal"),
    imcResult: document.querySelector("#imcResult"),

    open(){
        Modal.modalWrapper.showModal();
    },

    close(){
        Modal.modalWrapper.close();
    }
}