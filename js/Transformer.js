class Transformer {

    convertJsonToObject(json) {
        return JSON.parse(json);
    }

    sortUsersAsc(userArray) {
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

    changeUsersData(usersData) {
        usersData = this.convertJsonToObject(usersData).results;
        usersData.forEach(element => {
            this.capitalizeFirstLettersOfProperties(element.name);
            element.fullName = `${element.name.title}. ${element.name.first} ${element.name.last}`;
        });
        this.sortUsersAsc(usersData);
        return usersData;
    }

    showSortedUsersDesc(userList) {
        let sortedUsersHtml = '';
        for (let i = userList.length - 1; i >= 0; i--) {
            sortedUsersHtml += this.createUserCartHtml(userList[i], i);
        }
        return sortedUsersHtml;
    }

    showSortedUsersAsc(userList) {     
        let id = 0;
        return userList.reduce((accum, element) => {
            return accum += this.createUserCartHtml(element, id++);
        }, '');
    }

    capitalizeFirstLettersOfProperties(object) {
        const objectKeys = Object.keys(object);
        for (let i = 0; i < objectKeys.length; i++) {
            console.log(objectKeys[i]);
            object[objectKeys[i]] = this.capitalizeFirstLetter(object[objectKeys[i]]);
        }
    }

    capitalizeFirstLetter(string) {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    showUserPopup(userList, id) {
        document.querySelector('.overflow').style.display = 'flex';
        renderUserPopup(userList, id)
        document.getElementById('close-popup').addEventListener('click', closePopup);
    }

    closePopup() {
        document.querySelector('.overflow').style.display = 'none';
    }
}