var curUrl = document.location.href;
if( curUrl == 'https://www.linkedin.com/mynetwork/'){
	var strConnectionNumber = $(".mn-connections-summary__count").html();
	chrome.storage.sync.set({strConnectionNumber: strConnectionNumber});
}
