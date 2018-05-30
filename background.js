chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'www.linkedin.com'},
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
chrome.browserAction.onClicked.addListener(function(tab) {
	// chrome.tabs.executeScript(null, {file: "getMine.js"});
});
