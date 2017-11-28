var readline = require('readline');
const axios = require('axios');
var start = new Date();
var hrstart = process.hrtime();

var url = [];
for (i = 0; i < 500; i++) { 
    api = 'https://jira.spartez.com/rest/api/2/issue/SUPPORT-' + i;
    url.push(axios.get(api, {
        auth: {
            username: 'username',
            password: 'password'
          },
          validateStatus: function (status) {
            return status==404 || status >= 200 && status < 300;
          }   
    }));
}

  axios.all(url)
    .then(function (response=[]) {
      console.log(typeof(response));
    //   console.log(response[1].data);
      console.log(response.length);

      
        for (j = 0; j < response.length; j++) { 
            
            console.log(j + ': ' + response[j].status);
        }
        var end = new Date() - start,
        hrend = process.hrtime(hrstart);

        console.info("Execution time: %dms", end);
        console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
        console.info("Time avg per issue: %dms", end/response.length);

    }).catch(error => {
        console.log(error.response)
    });



    