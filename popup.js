// chrome.storage.sync.set({LeadswamiAdmin: ""});
// chrome.storage.sync.set({'SavedMyProfile': 'false'});
var myEmail = "";
setTimeout(function(){
	chrome.storage.sync.get('LeadswamiAdmin', function(data){
			if( !data.LeadswamiAdmin){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.executeScript( tabs[0].id, {file: "js/jquery.min.js"});
					chrome.tabs.executeScript( tabs[0].id, {file: "gotoMyProfilePage.js"});
				});
			} else{
				var myData = data.LeadswamiAdmin;
				myEmail = myData.Email;
				chrome.storage.sync.get('SavedMyProfile', function(data){
					if( data.SavedMyProfile == ""){
						$.ajax({
							type: "POST",
							url: "http://mytest.com:8000/api/PersonalData",
							data: {Email: myData.Email, ProfileUrl: myData.ProfileUrl, PicUrl: myData.PicUrl, Location: myData.Location},
						}).done(function(d){
							console.log("PersonalData");
							console.log(d);
							if(d.msg == 'Updated.'){
								chrome.storage.sync.set({'SavedMyProfile': 'true'});
							}
						});
					}
				});
				chrome.storage.sync.get('strConnectionNumber', function(data){
					var strConNum = data.strConnectionNumber;
					if( strConNum == ""){
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
							chrome.tabs.executeScript( tabs[0].id, {file: "js/jquery.min.js"});
							chrome.tabs.executeScript( tabs[0].id, {file: 'getMyConnectionNumber.js'});;
						});
					} else{
						$.ajax({
							type: "POST",
							url: "http://mytest.com:8000/api/ConnectionCount",
							data: {Email: myData.Email, ConnectionNumber: strConNum},
						}).done(function(d){
							console.log("ConnectionCount");
							console.log(d);
						});
					}
				});
			}
			console.log(data.LeadswamiAdmin);
	});
}, 200);

var BtnClear = document.getElementsByClassName('BtnClear')[0];

BtnClear.onclick = function(element){
	$("input").val("");
}
var BtnWorkClose = document.getElementsByClassName('WorkDone')[0].getElementsByClassName('close')[0];
BtnWorkClose.onclick = function(element){
	$(".WorkDone").addClass("HideItem");
}
var BtnPayErrorClose = document.getElementsByClassName('PaymentError')[0].getElementsByClassName('close')[0];
BtnPayErrorClose.onclick = function(element){
	$(".PaymentError").addClass("HideItem");
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
				setTimeout(function(){
					if( myEmail != ""){
						$.ajax({
							type: "POST",
							url: "http://mytest.com:8000/api/SaveProfiles",
							data: {Email: myEmail, ConnectionNumber: strConNum},
						}).done(function(d){
							console.log("ConnectionCount");
							console.log(d);
						});
					}
				}, 500);
			}
		})
	}, 1300);
}
