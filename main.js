'use strict';

const userAgent = 'benharris28';

//Make dynamic to accept input
const searchURL = 'https://api.github.com';

//Endpoint

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the response array, stopping at the max number of results
    for (let i = 0; i < responseJson.length; i++){
     
      $('#results-list').append(
        `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></h3>
        <p>${responseJson[i].html_url}</p>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };
  
  
  function getRepo(repo) {
    const url = searchURL + `/users/${repo}/repos`;
  
    console.log(url);
  
    const options = {
      headers: new Headers({
        "User-Agent": userAgent})
    };
  
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => console.log(responseJson))
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      getRepo(searchTerm);
    });
  }
  
  $(watchForm);