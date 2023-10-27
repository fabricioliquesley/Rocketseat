export let Alert = {
    messageAlert: document.querySelector(".messageAlert"),

    open(){
        Alert.messageAlert.classList.add("open");
    },

    close(){
        Alert.messageAlert.classList.remove("open");
    }
}