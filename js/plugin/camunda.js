(function() {
    const refIdList = window.refIdList; // Retrieve refId from the window object
    if (refIdList) {
        console.log('Received refIdList:', refIdList);
        getDmnListByRefId(refIdList);
    } else {
        console.error('RefId not found');
    }
})();

function getDmnListByRefId(refIdList) {
    //fetch URL till /app/cockpit/default
    //search by index /app/cockpit/default
    const pageURL = window.location.href;
    const url = pageURL.substring(0, pageURL.indexOf("/camunda/app/cockpit/default"));
    console.log('Received refIdList:', refIdList);
    console.log(url);

    getAllDMN(url, refIdList);

    //get all dmn LIST
}

result={};


function getAllDMN(baseURL, refIdList){
    fetch(baseURL + '/camunda/api/engine/engine/default/decision-definition?latestVersion=true&sortBy=name&sortOrder=asc&firstResult=0&maxResults=10000', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        checkReferences(data,baseURL, refIdList);
        console.log('Success:', data);
    });
}

function checkReferences(dt, baseURL, refIdList){
    for (let i = 0; i < dt.length; i++) {
    const url = baseURL + `/camunda/api/engine/engine/default/decision-definition/${dt[i].id}/xml`;
      fetch(url)
      .then(response => response.text())
      .then(data => {
          let matchedReferences = refIdList.filter(refId => data.includes(refId));
          if (matchedReferences.length > 0) {
              console.log(dt[i].key, matchedReferences);
              result[dt[i].key] = {
                  dt:dt,
                  matchedReferences: matchedReferences
              };
          }      
      })
      .catch(error => console.error('Error fetching URL:', error));
  }
  console.log(result);
  openDashboard();

  sendDatatoGetExcel(result);
}

function sendDatatoGetExcel(data) {
    chrome.runtime.sendMessage({ action: 'getExcel', data: data }, function (response) {
        console.log('Response:', response);
    }
    );
}


function openDashboard() {
    chrome.runtime.sendMessage({ action: 'openPage', data: 'dashboard.html' }, function (response) {
        console.log('Response:', response);
    });
}
