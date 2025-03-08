/*
  Name: jahsiyah varona
  Date: 03.07.2025
  CSC 372-01

  This is the script.js file for the github gallery assignment.
  It uses the fetch API to retrieve a user's repositories and displays them in a gallery.
*/

/**
 * Creates an element with specified attributes and appends it to a parent.
 * @param {Element} parent - The parent element to append to.
 * @param {string} type - The type of element to create.
 * @param {Object} attributes - Key-value pairs for attributes.
 * @param {string} [textContent] - Optional text content.
 * @return {Element} The created element.
 */
function createElementWithAttributes(parent, type, attributes, textContent) {
    let element = document.createElement(type);
    for (let attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
    if (textContent) {
      element.textContent = textContent;
    }
    parent.appendChild(element);
    return element;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('search-form');
    let usernameInput = document.getElementById('username');
    let gallery = document.getElementById('gallery');
  
    /**
     * Loads repositories for a given GitHub username and populates the gallery.
     * @param {string} username - The GitHub username.
     */
    async function loadRepos(username) {
      // Clear gallery container.
      gallery.innerHTML = '';
      createElementWithAttributes(gallery, 'p', {}, 'Loading repositories...');
      try {
        let reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        if (!reposResponse.ok) {
          throw new Error('User not found or API error');
        }
        let repos = await reposResponse.json();
        gallery.innerHTML = '';
  
        // For each repository, create a repository card.
        for (let repo of repos) {
          let repoCard = document.createElement('div');
          repoCard.classList.add('repo-card');
  
          // Repository name.
          createElementWithAttributes(repoCard, 'h3', {}, repo.name);
          // Repository description.
          createElementWithAttributes(repoCard, 'p', {}, repo.description || 'No description provided.');
          // Creation date.
          let createdDate = new Date(repo.created_at).toLocaleDateString();
          createElementWithAttributes(repoCard, 'div', { class: 'repo-info' }, `Created: ${createdDate}`);
          // Update date.
          let updatedDate = new Date(repo.updated_at).toLocaleDateString();
          createElementWithAttributes(repoCard, 'div', { class: 'repo-info' }, `Updated: ${updatedDate}`);
          // Watchers count.
          createElementWithAttributes(repoCard, 'div', { class: 'repo-info' }, `Watchers: ${repo.watchers_count}`);
          // Languages placeholder.
          let languagesElem = createElementWithAttributes(repoCard, 'div', { class: 'repo-languages' }, 'Languages: Loading...');
          // Commits placeholder.
          let commitsElem = createElementWithAttributes(repoCard, 'div', { class: 'repo-info' }, 'Commits: Loading...');
          // Repository link.
          createElementWithAttributes(repoCard, 'a', { class: 'repo-link', href: repo.html_url, target: '_blank' }, 'View on GitHub');
  
          gallery.appendChild(repoCard);
  
          // Fetch languages and update card.
          getLanguages(username, repo.name)
            .then((languages) => {
              languagesElem.textContent = `Languages: ${languages.length ? languages.join(', ') : 'None'}`;
            })
            .catch((error) => {
              console.error('Error fetching languages:', error);
            });
  
          // Fetch commit count and update card.
          getCommitCount(username, repo.name)
            .then((commitCount) => {
              commitsElem.textContent = `Commits: ${commitCount}`;
            })
            .catch((error) => {
              console.error('Error fetching commits:', error);
            });
        }
      } catch (error) {
        gallery.innerHTML = '';
        createElementWithAttributes(gallery, 'p', {}, `Error: ${error.message}`);
      }
    }
  
    /**
     * Fetches the languages used in a repository.
     * @param {string} username - The GitHub username.
     * @param {string} repoName - The repository name.
     * @return {Promise<Array>} A promise that resolves to an array of language names.
     */
    async function getLanguages(username, repoName) {
      let url = `https://api.github.com/repos/${username}/${repoName}/languages`;
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching languages');
      }
      let data = await response.json();
      return Object.keys(data);
    }
  
    /**
     * Fetches the commit count for a repository.
     * @param {string} username - The GitHub username.
     * @param {string} repoName - The repository name.
     * @return {Promise<number>} A promise that resolves to the commit count.
     */
    async function getCommitCount(username, repoName) {
      let url = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1`;
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching commits');
      }
      let linkHeader = response.headers.get('Link');
      if (linkHeader) {
        let match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (match && match[1]) {
          return parseInt(match[1]);
        }
      }
      let commits = await response.json();
      return commits.length;
    }
  
    // Listen for form submissions to search for a new GitHub username.
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let username = usernameInput.value.trim();
      if (username) {
        loadRepos(username);
      }
    });
  
    // Load the default user's repositories when the page loads.
    loadRepos(usernameInput.value.trim());
  });
  