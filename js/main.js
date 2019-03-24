
const mainFetcher = new Fetcher();
const mainTransformer = new Transformer();
const mainRenderer = new Renderer();


function init() {
    mainRenderer.renderMainContent();
    let userList = mainFetcher.getUserList();
    mainTransformer.usersData = userList;
    mainRenderer.renderUserList(mainTransformer.usersData);
    addUserCartListener();
    sortDirectionListener();
    overflowListener();
}

function addUserCartListener() {
    const userCartArray = document.querySelectorAll('.user-cart');
    userCartArray.forEach(element => {
        element.addEventListener('click', (event) => {
            mainRenderer.renderUserPopup(mainTransformer.usersData[event.currentTarget.id]);
            mainTransformer.showUserPopup();
        });
    });
}

function overflowListener() {
    document.getElementById('overflow').addEventListener('click', mainTransformer.overflowClickHandler);
}

function sortDirectionListener() {
    document.getElementById('sort-direction').addEventListener('change', (event) => {
        (event.currentTarget.value === 'A-Z, desc') ? mainRenderer.renderUserList(mainTransformer.usersData, true) : mainRenderer.renderUserList(mainTransformer.usersData);
        addUserCartListener();
    });
}

init();