class Transformer {

    get usersData() {
        return this._usersData;
    }

    set usersData(usersData) {
        usersData = this.convertJsonToObject(usersData).results;
        usersData.forEach(element => {
            this.capitalizeFirstLettersOfProperties(element.name);
            this.capitalizeFirstLettersOfProperties(element.location);
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
        document.getElementById('close-popup').addEventListener('click', this.closePopup.bind(this));
        // document.getElementById('overflow').addEventListener('click', function _overflowClickHandler() {
        //     if (event.target.id === 'overflow') {
        //         document.getElementById('overflow').removeEventListener('click', _overflowClickHandler);
        //         this.closePopup.bind(Transformer);
        //     }
        // });
    }

    capitalizeFirstLettersOfProperties(object) {
        const objectKeys = Object.keys(object);
        for (let i = 0; i < objectKeys.length; i++) {
            if (objectKeys[i] === 'street') {
                object[objectKeys[i]] = this.capitalizeFirstLettersInSentence(object[objectKeys[i]]);
            }
            if (objectKeys[i] !== 'postcode') {
                object[objectKeys[i]] = this.capitalizeFirstLetter(object[objectKeys[i]]);
            } 
            
        }
    }

    capitalizeFirstLettersInSentence(string) {
        return string.split(' ')
            .reduce((accum, word) => {
                return accum += (` ${this.capitalizeFirstLetter(word)}`);
            });
    }

    capitalizeFirstLetter(string) {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    };

    closePopup() {
        document.querySelector('#overflow').style.display = 'none';
    }
}