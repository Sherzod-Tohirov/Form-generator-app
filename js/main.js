// All elements definition 

const fragment = new DocumentFragment();
const elSidebar = document.querySelector('.js-sidebar');
const elHeaderBtn = document.querySelector('.js-header-btn');
const elUserListTemp = document.querySelector('.js-user-list-temp');
const elUsersList = document.querySelector('.js-users-list');
const elDataTemp = document.querySelector('.js-data-temp');
const elForm = document.querySelector('.js-el-form');

// Move sidebar 

elHeaderBtn.addEventListener('click', (evt) => {
    elSidebar.classList.toggle('move');
});


// Fetch users data functions 

async function getUsersData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderUsers(data, elUsersList);
    }catch(e) {
        console.log(e);
    }
}

function renderUsers(data, node) {
    node.innerHTML = '';

    data.forEach((item, index) => {
        const temp = elUserListTemp.content.cloneNode(true);
        if(index == 0) {
            temp.querySelector('.sidebar__item').classList.add('active-item');
        }
        temp.querySelector('.sidebar__btn').textContent = `${item.firstName} ${item.lastName}`;
        temp.querySelector('.sidebar__item').dataset.id = item.id;
        fragment.appendChild(temp);
    });

    node.appendChild(fragment);

}

// Fetch user data with id 

async function getUserData(url, id) {
    try {
        const res = await fetch(url);
        let data = await res.json();
        data = data.filter(item => item.id === id);
        if(data?.length == 1) {
            renderUserData(data, elForm);
        }
    }catch(e) {
        console.log(e);
    }
}

function renderUserData(data, node) {
    node.innerHTML = '';
    data.forEach(item => {

        const temp = elDataTemp.content.cloneNode(true);
        temp.querySelector('.js-code-phrase').value = item.keyword;
        temp.querySelector('.js-name-inp').value = item.firstName;
        temp.querySelector('.js-name').textContent = item.firstName;
        temp.querySelector('.js-name').title = item.firstName;
        temp.querySelector('.js-surname-inp').value = item.lastName;
        temp.querySelector('.js-surname').textContent = item.lastName;
        temp.querySelector('.js-surname').title = item.lastName;
        temp.querySelector('.js-age-inp').value = item.age;
        temp.querySelector('.js-age').textContent = item.age;
        temp.querySelector('.js-age').title = item.age;
        temp.querySelector('.js-job-inp').value = item.jobTitle;
        temp.querySelector('.js-company-inp').value = item.keyword;
        temp.querySelector('.js-country-inp').value = item.country;
        temp.querySelector('.js-city-inp').value = item.city;
        temp.querySelector('.js-region-inp').value = item.state;
        temp.querySelector('.js-address-inp').value = item.address;

        fragment.appendChild(temp);

    });

    node.appendChild(fragment);
}






// Fetch users data 

getUsersData('http://localhost:3000/users');



//Fill the form 


const sidebarItemHandler = setInterval(() => {

    let elUserListItems = document.querySelectorAll('.sidebar__item');
    if(elUserListItems.length > 0) {
        elUserListItems = Array.from(elUserListItems);
        const activeItem = elUserListItems.filter(item => item.classList.contains('active-item'))[0];
        if(activeItem.dataset.id) {
            getUserData('http://localhost:3000/users', activeItem.dataset.id);
        }
        
        const elUserDataBtns = document.querySelectorAll('.js-user-data-btn');

        if(elUserDataBtns.length > 0) {
            Array.from(elUserDataBtns).forEach(btn => {
               btn.addEventListener('click', (evt) => {
                    Array.from(elUserDataBtns).forEach(btn => {
                        btn.parentElement.classList.remove('active-item');
                    });
                    evt.target.parentElement.classList.add('active-item');
                    if(evt.target.parentElement.dataset.id) {
                        getUserData('http://localhost:3000/users', evt.target.parentElement.dataset.id);
                    }
               });
            });
        }

        
        clearInterval(sidebarItemHandler);
    }
}, 50);


// Get user data if button clicks 











