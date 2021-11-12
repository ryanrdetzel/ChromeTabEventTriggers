// background.js

const Temperature = 174;
const Brightness = 25;

chrome.tabs.onRemoved.addListener((tab) => {
  checkTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status === "complete"){
    checkTabs();
  }
});

const checkTabs = () => {
  chrome.tabs.query({"url":"*://meet.google.com/*"}, (tabs) => {
    if (tabs.length > 0){
      putRequest({"Lights":[{"Temperature":Temperature,"Brightness":Brightness,"On":1}]});
    } else {
      putRequest({"Lights":[{"Temperature":Temperature,"Brightness":Brightness,"On":0}]});
    }
  });
}

const putRequest = (payload) => {
  const url = "http://192.168.1.150:9123/elgato/lights";

  fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
  .then(response => {
    console.log("done");
  })
  .catch(error => {
    console.log(error);
  });
}