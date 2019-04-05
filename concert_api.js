'use strict';

const apiKey = 'juNYH7BHoZNewfBx'; 
const searchURL = 'https://api.songkick.com/api/3.0/venues/1392958/calendar.json?apikey=';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {

  $('#results-list').empty();
  if (responseJson.total!=0){
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">URL</a>`
    )};
  $('#results').removeClass('hidden');
  }
  else{
     $('#results-list').append('<h3 class="no_results">No Results Found!!</h3>')
    $('#results').removeClass('hidden');

  }
};

function getResults(date) {
  const params = {
    api_key: apiKey,
    min_date: date,
    max_date: date
  };
  const queryString = formatQueryParams(params)
  const url = searchURL  + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
//   $('form').submit(event => {
//     event.preventDefault();
    // const date = $('#js-date-input').val();
    const date = '2019-04-06'
    getResults(date);
//   });
}

$(watchForm);