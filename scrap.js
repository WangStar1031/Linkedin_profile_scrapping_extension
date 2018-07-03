
var docmentUrl = document.location.href;
if( docmentUrl.indexOf("linkedin.com/in/") == -1) { 
	alert("This is not profile page.");
	// chrome.storage.sync.set({pageError: "pageError"});
}
else {
	// chrome.storage.sync.set({pageError: "pageOK"});
	var strName = document.getElementsByClassName("pv-top-card-section__name")[0].innerHTML;
	chrome.storage.sync.set({strName: strName});

	var HeadLineCtrl = document.getElementsByClassName("pv-top-card-section__headline")[0];
	var strHeadLine = "";
	if( HeadLineCtrl){
		strHeadLine = HeadLineCtrl.innerHTML;
	}
	chrome.storage.sync.set({strHeadLine: strHeadLine});

	var LocationCtrl = document.getElementsByClassName("pv-top-card-section__location")[0];
	var strLocation = "";
	if( LocationCtrl){
		strLocation = LocationCtrl.innerHTML;
	}
	chrome.storage.sync.set({strLocation: strLocation});

	var LastJobCtrl = document.getElementsByClassName("experience-section")[0]; 
	var strLastJob = ""; 
	if( LastJobCtrl){ 
		strLastJob = LastJobCtrl.getElementsByTagName("li")[0].getElementsByClassName("pv-entity__summary-info")[0].getElementsByTagName("h3")[0].innerHTML;
	}
	chrome.storage.sync.set({strLastJob: strLastJob});

	var strImgStyle = $(".pv-top-card-section__photo").attr("style");
	chrome.storage.sync.set({strImgUrl: ""});
	var arrStyles = strImgStyle.split(";");
	for( var i = 0; i < arrStyles.length; i++){
		var strStyle = arrStyles[i];
		var arrOneStyle = strStyle.split(":");
		if( arrOneStyle[0] == 'background-image'){
			arrOneStyle.shift();
			var strUrlFunc = arrOneStyle.join(':').trim();
			var strImgUrl = strUrlFunc.replace('url("', '');
			strImgUrl = strImgUrl.replace('")', '');
			chrome.storage.sync.set({strImgUrl: strImgUrl});
			break;
		}
	}
	var enInfo = $(".pv-top-card-v2-section__link--contact-info");
	var otherInfo = $(".contact-see-more-less");
	if( enInfo.length != 0){
		enInfo.click();
	} else{
		otherInfo.click();
	}
	document.getElementsByClassName("pv-top-card-v2-section__link--contact-info")[0].click();

	setTimeout(function(){
		var strProfile = document.getElementsByClassName("ci-vanity-url")[0].getElementsByTagName("a")[0].getAttribute("href");
		chrome.storage.sync.set({strProfile: strProfile});

		var EmailCtrl = document.getElementsByClassName("ci-email")[0]; 
		var strEmail = ""; 
		if( EmailCtrl){ 
			strEmail= EmailCtrl.getElementsByTagName("a")[0].innerHTML;
		}
		chrome.storage.sync.set({strEmail: strEmail});

		var TwitterCtrl = document.getElementsByClassName("ci-twitter")[0]; 
		var strTwitter = "";
		if(TwitterCtrl){ 
			strTwitter = TwitterCtrl.getElementsByTagName("a")[0].getAttribute("href");
		}
		chrome.storage.sync.set({strTwitter: strTwitter});

		var PhoneCtrl = document.getElementsByClassName("ci-phone")[0]; 
		var strPhoneNumber = ""; 
		if( PhoneCtrl){ 
			strPhoneNumber = PhoneCtrl.getElementsByTagName("li")[0].getElementsByTagName("span")[0].innerHTML;
		}
		chrome.storage.sync.set({strPhoneNumber: strPhoneNumber});

		var SiteCtrl = document.getElementsByClassName("ci-websites")[0]; 
		var strSite = ""; 
		if( SiteCtrl){ 
			strSite = SiteCtrl.getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("href");
		}
		chrome.storage.sync.set({strSite: strSite});

		document.getElementsByClassName("artdeco-dismiss")[0].click();

	}, 300);
}