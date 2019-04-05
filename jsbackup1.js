flatpickr("#js-date-input", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        minDate: "today"
});

function watchForm  () {
    const date = '2019-04-19'
    console.log(date);
    getResults(date);
}

function getResults(date) {
    const apiKey = 'juNYH7BHoZNewfBx'; 
    const searchURL = 'https://api.songkick.com/api/3.0/venues/1392958/calendar.json?';

    const params = {
        apikey: apiKey,
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

function displayResults(responseJson) {
    if (responseJson.resultsPage.totalEntries!=0){
        for (let i = 0; i < responseJson.resultsPage.results.event.length; i++){
            $('#append-UnionTransfer').append(
                `<div class="showDetails"><h4>${responseJson.resultsPage.results.event[i].displayName}</h4>
                <div class="showButtons">
                    <p>Listen</p>
                    <p>Not Interested</p>
                    <p>Tickets</p>
                </div>
            </div>`
            )
        };
    }
    else{
        $('#append-UnionTransfer').append(
            `<div class="noShow"><h4>No events playing on this date</h4>

        </div>`
        )
    }



};

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
      
$(watchForm);