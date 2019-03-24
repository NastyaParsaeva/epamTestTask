const URL = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture'

// function insertElementIntoDom(id, innerHtml) {
//     document.getElementById(id).innerHTML = innerHtml;
// }

// function getUserList() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', URL, false);
//     xhr.send();
//     if (xhr.status != 200) {
//         alert( xhr.status + ': ' + xhr.statusText );
//     } else {
//         return JSON.parse(xhr.responseText);
//     }
// }

// function sortUsersAsc(userArray) {
//     return userArray.sort(function (a, b) {
//         if ((a.name.first + a.name.last) > (b.name.first + b.name.last)) {
//           return 1;
//         }
//         if ((a.name.first + a.name.last) < (b.name.first + b.name.last)) {
//           return -1;
//         }
//         return 0;
//       });
// }

function showSortedUsersDesc(userList) {
    let sortedUsersHtml = '';
    for (let i = userList.length - 1; i >= 0; i--) {
        sortedUsersHtml += this.createUserCartHtml(userList[i], i);
    }
    return sortedUsersHtml;
}

function showSortedUsersAsc(userList) {
    let id = 0;
    return userList.reduce((accum, element) => {
        return accum += this.createUserCartHtml(element, id++);
    }, '');
}

// function renderUserList(json) {
//     console.log(json);
//     const sortedUserListJson = sortUsersAsc(json.results);
//     const userListHtml = showSortedUsersAsc(sortedUserListJson);
//     // const userListHtml = sortedUserListJson.reduce((accum, element) => {
//     //     return accum += this.createUserCartHtml(element, id++);
//     // }, '');
    
//     this.insertElementIntoDom('user-list', createDropDown()+userListHtml);
// }   

// function createUserCartHtml(userData, id) {
//     return `<div class="user-cart" id = ${id}>
//                 <figure class="user-picture">
//                     <img class="round-avatar" src="${userData.picture.medium}">
//                 </figure>
//                 <div>
//                     <p class="user-full-name">${capitalizeFirstLetter(userData.name.title)}. ${capitalizeFirstLetter(userData.name.first)} ${capitalizeFirstLetter(userData.name.last)}</p>
//                 </div>
//             </div>`;
// }

// function createDropDown() {
//     return `<select>
//                 <option>A-Z, asc</option>
//                 <option>A-Z, desc</option>
//             </select>`
// }

// function renderUserPopup(userList, id) {
//     insertElementIntoDom('user-popup', createUserPopupHtml(userList.results[id]));
// }

// function showUserPopup(userList, id) {
//     document.querySelector('.overflow').style.display = 'flex';
//     renderUserPopup(userList, id)
//     document.getElementById('close-popup').addEventListener('click', closePopup);
// }



// function createUserPopupHtml(userInfo) {
//     return `<button id="close-popup"></button>            
//                 <h1 class="user-full-name">${userInfo.name.title}. ${userInfo.name.first} ${userInfo.name.last}</h1>            
//                 <div class="user-full-info">
//                     <figure>
//                         <img class="square-avatar" src='${userInfo.picture.large}' alt="">
//                     </figure>
//                     <div>
//                         <p>${userInfo.location.street}</p>
//                         <p>${userInfo.location.city}</p>
//                         <p>${userInfo.location.state}</p>
//                         <p><a href="mailto:${userInfo.email}">${userInfo.email}</a></p>
//                         <p>${userInfo.phone}</p>
//                     </div>
//                 </div>`;
// }


const mainFetcher = new Fetcher();
const mainTransformer = new Transformer();
const mainRenderer = new Renderer();


function init() {
    mainRenderer.renderMainContent();
    let userList = mainFetcher.getUserList();
    userList = mainTransformer.changeUsersData(userList);
    mainRenderer.renderUserList(userList);
    document.getElementById('sort-direction').addEventListener('change', function() {
        (event.currentTarget.value === 'A-Z, desc') ? mainRenderer.renderUserList(userList, true) : mainRenderer.renderUserList(userList);
        });
    // userCartArray = document.querySelectorAll('.user-cart');
    // userCartArray.forEach(element => {
    //     element.addEventListener('click', () => {
    //         mainRenderer.showUserPopup(userList, event.currentTarget.id);
    //     });
    // });
}

init();