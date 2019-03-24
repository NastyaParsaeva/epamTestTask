class Transformer {

    get usersData() {
        return this._usersData;
    }

    set usersData(usersData) {
        usersData = this.convertJsonToObject(usersData).results;
        usersData.forEach(element => {
            this.capitalizeFirstLettersOfProperties(element.name);
            element.fullName = `${element.name.title}. ${element.name.first} ${element.name.last}`;
        });
        
        this._usersData = usersData;
        this.sortUsersAsc();
    }

    convertJsonToObject(json) {
        return JSON.parse(json);
    }

    sortUsersAsc() {
        this._usersData.sort(function (a, b) {
            if ((a.name.first + a.name.last) > (b.name.first + b.name.last)) {
              return 1;
            }
            if ((a.name.first + a.name.last) < (b.name.first + b.name.last)) {
              return -1;
            }
            return 0;
          });
    }

    showUserPopup() {
        document.querySelector('#overflow').style.display = 'flex';
        document.getElementById('overflow').addEventListener('click', this.overflowClickHandler);
        document.getElementById('close-popup').addEventListener('click', this.closePopup.bind(this));
    }

    capitalizeFirstLettersOfProperties(object) {
        const objectKeys = Object.keys(object);
        for (let i = 0; i < objectKeys.length; i++) {
            object[objectKeys[i]] = this.capitalizeFirstLetter(object[objectKeys[i]]);
        }
    }

    capitalizeFirstLetter(string) {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    overflowClickHandler = (event) => {
        if (event.target.id === 'overflow') {
            this.closePopup();
        }
    }

    closePopup = () => {
        document.querySelector('#overflow').style.display = 'none';
        document.getElementById('overflow').removeEventListener('click', this.overflowClickHandler);
        console.log(this);
    }

}