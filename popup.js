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
							chrome.storage.sync.set({'strConnectionNumber':''});
						});
					}
				});
			}
			// console.log(data.LeadswamiAdmin);
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
var objProfile = {strName:'', strLastName:'', strHeadLine:'', strLocation:'', strProfile:'', strEmail:'', strImgUrl:'', strTwitter:'', strPhoneNumber:'', strLastJob:'', strSite:'', strTag:''};
var BtnSend = document.getElementsByClassName('BtnSend')[0];
BtnSend.onclick = function(element){
	objProfile.strTag = $("input[name=tag]").val();
	console.log(objProfile);
	if( myEmail != ""){
		$.ajax({
			type: "POST",
			url: "http://mytest.com:8000/api/SaveProfiles",
			data: {Email: myEmail, objProfile: objProfile},
		}).done(function(d){
			console.log("ConnectionCount");
			console.log(d);
		});
	}
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
					objProfile.strName = arrNames.shift();
					$("input[name='name']").val(objProfile.strName);
					objProfile.strLastName = arrNames.join(" ");
					$("input[name='lastname']").val(objProfile.strLastName);
				});
				chrome.storage.sync.get('strHeadLine', function(data) {
					objProfile.strHeadLine = data.strHeadLine.trim();
					$("input[name='headline']").val(objProfile.strHeadLine);
				});
				chrome.storage.sync.get('strLocation', function(data) {
					objProfile.strLocation = data.strLocation.trim();
					$("input[name='location']").val(objProfile.strLocation);
				});
				chrome.storage.sync.get('strProfile', function(data) {
					objProfile.strProfile = data.strProfile.trim();
					$("input[name='url']").val(objProfile.strProfile);
				});
				chrome.storage.sync.get('strEmail', function(data) {
					objProfile.strEmail = data.strEmail.trim();
					$("input[name='email']").val(objProfile.strEmail);
				});
				chrome.storage.sync.get('strImgUrl', function(data) {
					objProfile.strImgUrl = data.strImgUrl.trim();
				});
				chrome.storage.sync.get('strTwitter', function(data) {
					objProfile.strTwitter = data.strTwitter.trim();
					$("input[name='twitter']").val(objProfile.strTwitter);
				});
				chrome.storage.sync.get('strPhoneNumber', function(data) {
					objProfile.strPhoneNumber = data.strPhoneNumber.trim();
					$("input[name='phonenumber']").val(objProfile.strPhoneNumber);
				});
				chrome.storage.sync.get('strLastJob', function(data) {
					objProfile.strLastJob = data.strLastJob.trim();
					$("input[name='lastjob']").val(objProfile.strLastJob);
				});
				chrome.storage.sync.get('strSite', function(data) {
					objProfile.strSite = data.strSite.trim();
					$("input[name='site']").val(objProfile.strSite);
				});
			}
		})
	}, 1300);
}
