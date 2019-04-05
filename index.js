const venIdName = {
  36887729: "The Fillmore",
  1392958: "Union Transfer",
  2346454: "Boot & Saddle",
  28639: "Theatre of the Living Arts",
  1003: "Franklin Music Hall",
  2834988: "World Cafe Live"
}

if(!localStorage.notInterested){
  localStorage.notInterested={}
}

let allData = {
  
}

const venIdAddress = {
  36887729: "Fishtown",
  1392958: "Spring Garden",
  2346454: "South Philly",
  28639: "Society Hill",
  1003: "Callowhill",
  2834988: "University City"
}

function watchForm(test, date) {
  // const date = '2019-04-22'

  if (!date) {
    date = new Date();
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    date = date.getFullYear() + "-" + month + "-" + day
  }
  console.log(date);
  // console.log(test);
  getResults(date);
}

flatpickr("#js-date-input", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  defaultDate: new Date(),
  onChange: watchForm
});

function getResults(date) {
  const apiKey = 'juNYH7BHoZNewfBx';
  const searchURL1 = "https://api.songkick.com/api/3.0/venues/";
  const searchURL2 = "/calendar.json?";

  const venueID = {
    theFillmore: "36887729",
    unionTransfer: "1392958",
    bootSaddle: "2346454",
    theatreOfLivingArts: "28639",
    franklinMusicHall: "1003",
    worldCafeLive: "2834988"
  };

  const venId = Object.values(venueID)


  const params = {
    apikey: apiKey,
    min_date: date,
    max_date: date
  };
  const queryString = formatQueryParams(params)
  for (i = 0; i < venId.length; i++) {
    const url = searchURL1 + venId[i] + searchURL2 + queryString
    const callback = displayResults.bind(this, venId[i])
    // console.log(url)
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        callback(responseJson)
      console.log(venId[i],i)
      }
        )
      
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
}

function renderAll(){
  $('.venueSection').empty()

  $('.venueSection').append(allData["36887729"])
  $('.venueSection').append(allData["1392958"])
  $('.venueSection').append(allData["2346454"])
  $('.venueSection').append(allData["1003"])
  $('.venueSection').append(allData["28639"])
  $('.venueSection').append(allData["2834988"])
}

function randomNumber(){
  let randum1 = Math.floor((Math.random() * 10000) + 1);
  return(randum1)
}


function displayResults(venueTitle, responseJson) {
  console.log(responseJson)

  if (responseJson.resultsPage.totalEntries != 0) {

    let html = `<div class="venue">                
      
      <h2 class="venueName">${venIdName[venueTitle]}</h2>
      <p class="address">${venIdAddress[venueTitle]}</p>
      <div>
      </div>`
    for (let i = 0; i < responseJson.resultsPage.results.event.length; i++) {
      html += `
                <div class="showDetails"><h4 class="showTitle">${responseJson.resultsPage.results.event[i].displayName}</h4>
                    <div class="showButtons">
                       <p><a class="buttonLink" href="${'https://www.youtube.com/results?search_query=' + responseJson.resultsPage.results.event[i].performance[0].artist.displayName + ' music'}" target="_blank">Listen</a></p>
                        <p><a class="buttonLink notInterested" id="${randomNumber()}" href="#">Not Interested</a></p>
                        <p><a class="buttonLink" href="${responseJson.resultsPage.results.event[i].uri}" target="_blank">Tickets</a></p>
                    </div>
                </div>`
    }
    html += `</div>`
    allData[venueTitle]=html
  }
  
  else {
   
    allData[venueTitle]=      `<div class="venue">
    <h2>${venIdName[venueTitle]}</h2>
    <p class="address">${venIdAddress[venueTitle]}</p>
    <h3>No Show Tonight</h3>
  </div>`
  }
  if (Object.keys(allData).length==6){
    renderAll();
  }
};



function notInterested(){
  $("body").on("click", ".notInterested", function (event) {
    event.preventDefault();
    $(this).parents('.showDetails').find('.showTitle').toggleClass("intro")
  });
}



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


$(function () {
  watchForm();
  notInterested();
})