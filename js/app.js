// Global bindings
const container = document.querySelector('#container');
const navTitle = document.querySelector('.nav-title');

// Retrieve users
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => displayUsers(json))
  .catch((err) => console.log('Error parsing data: ', err));

/**
 * Display Users
 * Loop through each user and create HTML
 * @param {object} json
 */
function displayUsers(json) {
  const userData = [...json];
  let userHTML = '';

  // Set title when users are displayed
  navTitle.innerHTML = 'Ksense';

  userData.forEach((user, index) => {
    const { name, username, website, email } = user;

    userHTML += `
        <div class="user-card" data-index="${index}">
            <h2 class="user-card--name">${name}</h2> 
            <p class="user-card--username">📛 ${username}</p>
            <p class="user-card--website">💻 ${website}</p>
            <p class="user-card--email">✉️ ${email}</p>
        </div>
    `;
  });

  container.innerHTML = userHTML;
}

/**
 * Retrieves user index by clicking on individual user cards
 * @param {object} e
 */
function selectUser(e) {
  const userCard = e.target.closest('.user-card');

  if (userCard) {
    const userIndex = +userCard.getAttribute('data-index');
    const userName = userCard.firstElementChild.innerText;
    retrievePosts(userIndex, userName);
  }
}

/**
 * Retrieve user posts
 * @param {number} index
 * @param {string} name
 */
function retrievePosts(index, name) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${index + 1}`)
    .then((response) => response.json())
    .then((json) => displayPosts(json, name))
    .catch((err) => console.log('Error parsing data: ', err));
}

/**
 * Display Posts
 * Loop through each post and create HTML for the user that was clicked
 * @param {object} json
 */
function displayPosts(posts, name) {
  const postsData = [...posts];
  let postsHTML = '';

  // Change title to users name
  navTitle.innerHTML = `${name}'s Posts`;

  postsData.forEach((post, index) => {
    const { title, body } = post;

    postsHTML += `
          <div class="post-card" data-index="${index}">
              <h2 class="post-card--title">#${index + 1} ${title}</h2>
              <p class="post-card--body">📄 ${body}</p>
          </div>
      `;
  });

  container.innerHTML = postsHTML;
}

// Event listeners
container.addEventListener('click', selectUser);
