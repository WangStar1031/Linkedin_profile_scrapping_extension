var strCode = '';
// var currentUrl;
chrome.storage.sync.get('LeadswamiAdmin', function(data) {
	// if( data.LeadswamiAdmin == ""){
		currentUrl = document.location.href;
		chrome.storage.sync.set({currentUrl: currentUrl});
		console.log(currentUrl);
		console.log("You have to grab your profile first.");
		jQuery("#profile-nav-item div").click();
		// document.getElementById("profile-nav-item").getElementsByTagName("div")[0].click();
		setTimeout(function(){
			var profileUrl = document.getElementById("nav-settings__dropdown-options").getElementsByTagName("a")[0].getAttribute("href");
			document.location.href = profileUrl;
			setTimeout(function(){
				var MyLastJobCtrl = document.getElementsByClassName("experience-section")[0]; 
				var strMyLastJob = ""; 
				if( MyLastJobCtrl){ 
					strMyLastJob = MyLastJobCtrl.getElementsByTagName("li")[0].getElementsByClassName("pv-entity__summary-info")[0].getElementsByTagName("h3")[0].innerHTML;
				}
				chrome.storage.sync.set({strMyLastJob: strMyLastJob});

				document.getElementsByClassName("pv-top-card-v2-section__link--contact-info")[0].click();

				setTimeout(function(){
					var strMyProfile = document.getElementsByClassName("ci-vanity-url")[0].getElementsByTagName("a")[0].getAttribute("href");
					chrome.storage.sync.set({strMyProfile: strMyProfile});

					var MyEmailCtrl = document.getElementsByClassName("ci-email")[0]; 
					var strMyEmail = ""; 
					if( MyEmailCtrl){ 
						strMyEmail= MyEmailCtrl.getElementsByTagName("a")[0].innerHTML;
					}
					chrome.storage.sync.set({strMyEmail: strMyEmail});
					chrome.storage.sync.set({LeadswamiAdmin: strMyEmail});
					console.log(strMyEmail);
					// setCookie("LeadswamiAdmin", strMyEmail, 30);

					var MyTwitterCtrl = document.getElementsByClassName("ci-twitter")[0]; 
					var strMyTwitter = "";
					if(MyTwitterCtrl){ 
						strMyTwitter = MyTwitterCtrl.getElementsByTagName("a")[0].getAttribute("href");
					}
					chrome.storage.sync.set({strMyTwitter: strMyTwitter});

					var MyPhoneCtrl = document.getElementsByClassName("ci-phone")[0]; 
					var strMyPhoneNumber = ""; 
					if( MyPhoneCtrl){ 
						strMyPhoneNumber = MyPhoneCtrl.getElementsByTagName("li")[0].getElementsByTagName("span")[0].innerHTML;
					}
					chrome.storage.sync.set({strMyPhoneNumber: strMyPhoneNumber});

					var MySiteCtrl = document.getElementsByClassName("ci-websites")[0]; 
					var strMySite = ""; 
					if( MySiteCtrl){ 
						strMySite = MySiteCtrl.getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("href");
					}
					chrome.storage.sync.set({strMySite: strMySite});

					document.getElementsByClassName("artdeco-dismiss")[0].click();
					chrome.storage.sync.get('currentUrl', function(data) {
						document.location.href = data.currentUrl;
					});
				}, 300);

			}, 1500);

		}, 300);
	// }
});
