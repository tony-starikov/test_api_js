// Server url
const apiUrl = "https://jsonplaceholder.typicode.com";

// UI components
const usersList = document.querySelector(".users-list");
const userInfo = document.querySelector(".user-info");

// DOM events
usersList.addEventListener("click", onUserNameClickHandler);

// all users functions

function getUsersHTTP(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${apiUrl}/users`);

  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      console.log("Error loading all users info", xhr.status);
      return;
    }

    const result = JSON.parse(xhr.responseText);

    callback(result);
    // console.log(xhr.responseText);
  });

  xhr.send();
}

function onGetUsersCallback(users) {
  if (!users.length) {
    console.log("No users available");
    return;
  }

  renderUsersList(users);
}

function renderUsersList(users) {
  const fragment = users.reduce((acc, user) => {
    return acc + userListItemTemplate(user);
  }, "");

  // console.log(fragment);
  usersList.insertAdjacentHTML("afterbegin", fragment);
}

function userListItemTemplate(user) {
  return `
    <button data-user-id="${user.id}" type="button" class="list-group-item list-group-item-action">
      ${user.id}. ${user.name}
    </button>
  `;
}

// single user functions

function onUserNameClickHandler(e) {
  e.preventDefault();

  if (e.target.dataset.userId) {
    // console.log(e.target.dataset.userId);

    getUserInfoHTTP(e.target.dataset.userId, onGetUserInfoCallback);
  }
}

function getUserInfoHTTP(id, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${apiUrl}/users/${id}`);

  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      console.log("Error loading user info", xhr.status);
      return;
    }

    const result = JSON.parse(xhr.responseText);

    callback(result);
    // console.log(xhr.responseText);
  });

  xhr.send();
}

function onGetUserInfoCallback(user) {
  if (!user.id) {
    console.log("No user info available");
    return;
  }

  renderUserInfo(user);
}

function renderUserInfo(user) {
  userInfo.innerHTML = "";

  const template = userInfoTemplate(user);

  userInfo.insertAdjacentHTML("afterbegin", template);
}

function userInfoTemplate(user) {
  return `
    <div class="card">
      <div class="card-header">
        User ${user.id}. ${user.name} info:
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Name: ${user.name}</li>
        <li class="list-group-item">Username: ${user.username}</li>
        <li class="list-group-item">Email: ${user.email}</li>
        <li class="list-group-item">Phone: ${user.phone}</li>
        <li class="list-group-item">Website: ${user.website}</li>
      </ul>          
    </div>
  `;
}

// init app
getUsersHTTP(onGetUsersCallback);
