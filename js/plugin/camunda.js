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
matchedDmnList = [];


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


// Utility function to introduce a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Fetch decision definitions with a delay between requests
const fetchDecisionDefinitions = async (dt, refIdList, baseURL) => {
    const matchedDmnList = []; // Initialize the matched DMN list

    for (const decision of dt) {
        const url = `${baseURL}/camunda/api/engine/engine/default/decision-definition/${decision.id}/xml`;
        
        try {
            // Fetch the data
            const response = await fetch(url);
            const data = await response.text();

            // Check for matched references
            const matchedReferences = refIdList.filter(refId => data.search(refId) > 0);
            if (matchedReferences.length > 0) {
                matchedDmnList.push([decision.key, decision.resource, decision.name, matchedReferences]);
            }
        } catch (error) {
            console.error('Error fetching URL:', error);
        }
    }

    return matchedDmnList; // Return the results
};

// Main function to process data and open dashboard
async function checkReferences(dt, baseURL, refIdList) {
    try {
        // Open the dashboard after all HTTP requests complete
        openDashboard();
        const result = await fetchDecisionDefinitions(dt, refIdList, baseURL);
        console.log('Matched DMN List:', result);
        // Send data to generate an Excel file or further processing
        sendDatatoGetExcel(result);
    } catch (error) {
        console.error('Error in checkReferences:', error);
    }
}

function sendDatatoGetExcel(data) {
    chrome.runtime.sendMessage({ action: 'getExcel', data: data }, function (response) {
        console.log('Response:', response);
    }
    );
}


function openDashboard() {
    chrome.runtime.sendMessage({ action: 'openPage', data: 'dashboard.html' }, function (response) {
    });
}
