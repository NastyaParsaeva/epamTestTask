class Renderer {

    constructor() {
        this.htmlTemplatesCreator = new HtmlTemplateFunctionsCreator();
    }

    insertElementIntoDom(id, innerHtml) {
        document.getElementById(id).innerHTML = innerHtml;
    }

    renderMainContent() {
        this.insertElementIntoDom('main-content', this.htmlTemplatesCreator.createMainContent());
    }

    renderUserList(userList, isDesc) {
        console.log(userList);
        const userListHtml = this.showSortedUsers(userList, isDesc);        
        this.insertElementIntoDom('user-list', userListHtml);
        this.addUserCartListener(userList);
    } 

    showSortedUsers(userList, isDesc) {     
        let id = 0;
        return userList.reduce((accum, element) => {
            return (isDesc) ? accum = (this.htmlTemplatesCreator.createUserCartHtml(element, id++) + accum) :
                    accum += this.htmlTemplatesCreator.createUserCartHtml(element, id++);
        }, '');
    }

    renderUserPopup(userList, id) {
        this.insertElementIntoDom('user-popup', this.htmlTemplatesCreator.createUserPopupHtml(userList[id]));
    }

    showUserPopup(userList, id) {
        document.querySelector('.overflow').style.display = 'flex';
        this.renderUserPopup(userList, id)
        document.getElementById('close-popup').addEventListener('click', this.closePopup);
    }

    closePopup() {
        document.querySelector('.overflow').style.display = 'none';
    }

    addUserCartListener(userList) {
        const userCartArray = document.querySelectorAll('.user-cart');
        userCartArray.forEach(element => {
            element.addEventListener('click', () => {
                this.showUserPopup(userList, event.currentTarget.id);
            })
        });
    }
}