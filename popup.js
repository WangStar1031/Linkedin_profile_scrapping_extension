// chrome.storage.sync.set({LeadswamiAdmin: ""});
setTimeout(function(){
	chrome.storage.sync.get('LeadswamiAdmin', function(data){
		if( !data.LeadswamiAdmin){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.executeScript( tabs[0].id, {file: "js/jquery.min.js"});
				chrome.tabs.executeScript( tabs[0].id, {file: "gotoMyProfilePage.js"});
			});
		} else{
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.executeScript( tabs[0].id, {code: "alert('Now you can scrap other`s profiles.);"});
			});
		}
		console.log(data.LeadswamiAdmin);
	});
	// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 	chrome.tabs.executeScript( tabs[0].id, {file: "js/jquery.min.js"});
	// 	chrome.tabs.executeScript( tabs[0].id, {file: "getMine.js"});
	// });
}, 200);

var BtnClear = document.getElementsByClassName('BtnClear')[0];

BtnClear.onclick = function(element){
	$("input").val("");
}

var BtnCollect = document.getElementsByClassName('BtnCollect')[0];

BtnCollect.onclick = function(element){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript( tabs[0].id, {file: "scrap.js"});
	});
	setTimeout(function(){
		chrome.storage.sync.get('pageError', function(data){
			if( data.pageError != 'pageError'){
				chrome.storage.sync.get('strName', function(data) {
					var arrNames = data.strName.trim().split(" ");
					$("input[name='name']").val(arrNames.shift());
					$("input[name='lastname']").val(arrNames.join(" "));

				});
				chrome.storage.sync.get('strHeadLine', function(data) {
					$("input[name='headline']").val(data.strHeadLine.trim());
				});
				chrome.storage.sync.get('strLocation', function(data) {
					$("input[name='location']").val(data.strLocation.trim());
				});
				chrome.storage.sync.get('strProfile', function(data) {
					$("input[name='url']").val(data.strProfile.trim());
				});
				chrome.storage.sync.get('strEmail', function(data) {
					$("input[name='email']").val(data.strEmail.trim());
				});
				chrome.storage.sync.get('strTwitter', function(data) {
					$("input[name='twitter']").val(data.strTwitter.trim());
				});
				chrome.storage.sync.get('strPhoneNumber', function(data) {
					$("input[name='phonenumber']").val(data.strPhoneNumber.trim());
				});
				chrome.storage.sync.get('strLastJob', function(data) {
					$("input[name='lastjob']").val(data.strLastJob.trim());
				});
				chrome.storage.sync.get('strSite', function(data) {
					$("input[name='site']").val(data.strSite.trim());
				});
			}
		})
	}, 1300);
}
			// $("input[name='headline'").val(data.strHeadLine);
			// $("input[name='url'").val(data.strHeadLine);
			// $("input[name='email'").val(data.strHeadLine);
			// $("input[name='phonenumber'").val(data.strHeadLine);
			// $("input[name='lastjob'").val(data.strHeadLine);
			// $("input[name='twitter'").val(data.strHeadLine);
			// $("input[name='site'").val(data.strHeadLine);
			// $("input[name='tag'").val(data.strHeadLine);
