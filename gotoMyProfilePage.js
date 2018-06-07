function getMyDataMining(){
	var MyLastJobCtrl = document.getElementsByClassName("experience-section")[0]; 
	var strMyLastJob = ""; 
	if( MyLastJobCtrl){ 
		strMyLastJob = MyLastJobCtrl.getElementsByTagName("li")[0].getElementsByClassName("pv-entity__summary-info")[0].getElementsByTagName("h3")[0].innerHTML;
	}
	var strMyLocation = $(".pv-top-card-section__location").html();

	var strMyProfilePicUrl = $(".profile-photo-edit__preview").attr("src");
	var strMyProfile = document.location.href;

	var enInfo = $(".pv-top-card-v2-section__link--contact-info");
	var otherInfo = $(".contact-see-more-less");
	if( enInfo.length != 0){
		enInfo.click();
	} else{
		otherInfo.click();
	}
	// document.getElementsByClassName("pv-top-card-v2-section__link--contact-info")[0].click();

	setTimeout(function(){
		var MyEmailCtrl = document.getElementsByClassName("ci-email")[0]; 
		var strMyEmail = ""; 
		if( MyEmailCtrl){ 
			strMyEmail= MyEmailCtrl.getElementsByTagName("a")[0].innerHTML.trim();
		}
		var myProfileData = {Email: strMyEmail.trim(), ProfileUrl:strMyProfile.trim(), PicUrl:strMyProfilePicUrl.trim(), Location:strMyLocation.trim()};
		chrome.storage.sync.set({LeadswamiAdmin: myProfileData});
		document.getElementsByClassName("artdeco-dismiss")[0].click();
		alert("OK. Your profile data successfully taken.\nIf you want to get your connection count,\n then please you must go to your Network page and click extension.");
	}, 300);
}
jQuery("#profile-nav-item div").click();
setTimeout(function(){
	var profileUrl = document.getElementById("nav-settings__dropdown-options").getElementsByTagName("a")[0].getAttribute("href");
	console.log(profileUrl);
	if( document.location.href.indexOf( profileUrl) == -1){
		alert("You have to get your profile data first.\nGo to your profile page and then click the extension icon again.");
		document.location.href = profileUrl;
	} else{
		getMyDataMining();
	}
}, 300);