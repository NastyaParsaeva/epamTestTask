class HtmlTemplateFunctionsCreator {
    
    createMainContent() {
        return `<select id="sort-direction">
                    <option>A-Z, asc</option>
                    <option>A-Z, desc</option>
                </select>
                <div id="user-list"></div>`;
    }

    createUserCartHtml(userData, id) {
        return `<div class="user-cart" id = ${id}>
                    <figure class="user-picture">
                        <img class="round-avatar" src="${userData.picture.medium}">
                    </figure>
                    <div>
                        <p class="user-full-name">${userData.fullName}</p>
                    </div>
                </div>`;
    }
    
    createDropDown() {
        return `<select>
                    <option>A-Z, asc</option>
                    <option>A-Z, desc</option>
                </select>`;
    }

    createUserPopupHtml(userInfo) {
        return `<button id="close-popup"></button>            
                    <h1 class="user-full-name">${userInfo.fullName}</h1>            
                    <div class="user-full-info">
                        <figure>
                            <img class="square-avatar" src='${userInfo.picture.large}' alt="">
                        </figure>
                        <div>
                            <p>${userInfo.location.street}</p>
                            <p>${userInfo.location.city}</p>
                            <p>${userInfo.location.state}</p>
                            <p><a href="mailto:${userInfo.email}">${userInfo.email}</a></p>
                            <p>${userInfo.phone}</p>
                        </div>
                    </div>`;
    }
}