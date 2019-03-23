const URL = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture'

// class Renderer {
function insertElementIntoDom(id, innerHtml) {
    document.getElementById(id).innerHTML = innerHtml;
}

function getUserList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, false);
    xhr.send();
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        return JSON.parse(xhr.responseText);
    }
}

function sortUsersAsc(userArray) {
    return userArray.sort(function (a, b) {
        if ((a.name.first + a.name.last) > (b.name.first + b.name.last)) {
          return 1;
        }
        if ((a.name.first + a.name.last) < (b.name.first + b.name.last)) {
          return -1;
        }
        return 0;
      });
}

function renderUserList(json) {
    console.log(json);
    const sortedUserListJson = sortUsersAsc(json.results);
    
    let id = 0;
    const userListHtml = sortedUserListJson.reduce((accum, element) => {
        return accum += this.createUserCartHtml(element, id++);
    }, '');
    
    this.insertElementIntoDom('user-list', userListHtml);
}   

function createUserCartHtml(userData, id) {
    return `<div class="user-cart" id = ${id}>
                <figure class="user-picture">
                    <img class="round-avatar" src="${userData.picture.medium}">
                </figure>
                <div>
                    <p class="user-full-name">${capitalizeFirstLetter(userData.name.title)}. ${capitalizeFirstLetter(userData.name.first)} ${capitalizeFirstLetter(userData.name.last)}</p>
                </div>
            </div>`;
}


function renderUserPopup(userList, id) {
    insertElementIntoDom('user-popup', createUserPopupHtml(userList.results[id]));
}

function showUserPopup(userList, id) {
    document.querySelector('.overflow').style.display = 'flex';
    renderUserPopup(userList, id)
    addEventListener(document.getElementById('close-popup'), closePopup);
}

function closePopup() {
    document.querySelector('.overflow').style.display = 'none';
}

function createUserPopupHtml(userInfo) {
    console.log(userInfo);
    return `<button id="close-popup">close</button>            
                <h1>${userInfo.name.title}. ${userInfo.name.first} ${userInfo.name.last}</h1>            
                <div class="user-full-info">
                    <figure>
                        <img class="round-avatar" src='${userInfo.picture.large}' alt="">
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

function capitalizeFirstLetter(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1));
};

function init() {
    const userList = (getUserList());
    renderUserList(userList);
    userCartArray = document.querySelectorAll('.user-cart');
    userCartArray.forEach(element => {
        element.addEventListener('click', () => {
            console.log(event.currentTarget.id);
            console.log(userList);
            showUserPopup(userList, event.currentTarget.id);
        });
    });
}

init();