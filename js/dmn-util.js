document.getElementById('getDmnListByRefId').addEventListener('click', () => {
    const refId = document.getElementById('refId').value; // Assuming there's an input field with id 'refId'
    const refIdList = [refId]; // Assuming refIdList is an array
    executeScript(refIdList);
});


document.getElementById('getrefIdList').addEventListener('click', () => {
    let refIdList = document.getElementById('refIdList').value; // Assuming there's an input field with id 'refId'
    console.log(refIdList);
    refIdList = JSON.parse(refIdList); // Assuming refIdList is an array
    executeScript(refIdList);
});
function executeScript(refIdList) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (refIdList) => {
                    window.refIdList = refIdList; // Store refId in the window object
                },
                args: [refIdList]
            }, () => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['js/plugin/camunda.js']
                });
            });
        } else {
            console.error('No active tab found');
        }
    });
}

