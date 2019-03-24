class Renderer {

    constructor() {
        this._htmlTemplatesCreator = new HtmlTemplateFunctionsCreator();
    }

    insertElementIntoDom(id, innerHtml) {
        document.getElementById(id).innerHTML = innerHtml;
    }

    renderMainContent() {
        this.insertElementIntoDom('main-content', this._htmlTemplatesCreator.createMainContent());
    }

    renderUserList(userList, isDesc) {
        const userListHtml = this.showSortedUsers(userList, isDesc);        
        this.insertElementIntoDom('user-list', userListHtml);
    } 

    showSortedUsers(userList, isDesc) {     
        let id = 0;
        return userList.reduce((accum, element) => {
            return (isDesc) ? accum = (this._htmlTemplatesCreator.createUserCartHtml(element, id++) + accum) :
                accum += this._htmlTemplatesCreator.createUserCartHtml(element, id++);
        }, '');
    }

    renderUserPopup(userData) {
        this.insertElementIntoDom('user-popup', this._htmlTemplatesCreator.createUserPopupHtml(userData));
    }

}