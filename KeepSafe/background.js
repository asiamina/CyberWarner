
//*************************** Detecting Dangerous files ***************************

chrome.downloads.onCreated.addListener(function (DownloadItem) {
  var myAudio = new Audio(); 
  var f=0;
  var dangerous=["application/x-research-info-systems","application/x-msdownload","application/x-msdos-program","application/x-msdownload",,"application/pdf","application/java-archive","application/x-shockwave-flash","application/x-shockwave-flash2-preview","application/futuresplash","application/x-msdownload","application/x-ms-shortcut","application/x-javascript","application/javascript","application/wmf","application/vnd.ms-htmlhelp","text/scriplet","application/excel","application/x-excel","application/x-msexcel","application/vnd.ms-excel","application/bat","application/x-bat","application/octet-stream","application/x-vbs","application/java-vm","text/x-java-source,java","application/java-serialized-object","application/x-java-jnlp-file","application/json","image/x-pgm","image/x-portable-anymap","image/x-portable-graymap","image/x-portable-bitmap","application/hta","text/x-component","application/cpl+xml","application/postscript","application/x-rar-compressed"];
  var i;
   for(i in dangerous)
   {
		if(DownloadItem.mime===dangerous[i])
		{
			f=1;
			break;
		}
   }

   
 if(f==1) //Found potential dangerous file type
 {
	myAudio.src = "siren_malware.mp3"; // assign the audio file to it
	myAudio.play();
 }
});




//*************************** Play sound for password fields ***************************
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
	
var myAudio = new Audio(); 
myAudio.src = "form_filling.mp3"; // assign the audio file to it
myAudio.play();
});



//*************************** URL Heuristic ***************************

chrome.tabs.onCreated.addListener(function (f1) 
{
        
	chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab)
	{      
		var weight=0;
		//changeInfo.status == "complete" && 
			if(tab.status === "complete" && tab.url!=="chrome://newtab/" && tab.url!=="chrome://settings/") 
			{ 
    
				//chrome.tabs.get(tabId, function(t)
               // {

					//alert(t.title);
					if(tab.title==="Privacy error")
					{
					//alert("Privacy prob");
					var myAudio = new Audio(); 
					myAudio.src = "phishing.mp3"; // assign the audio file to it
					myAudio.play();
					}
				//});

				if(tab.url.includes("https://accounts.google.com")) //Special Case
				{
					
					if(tab.url.endsWith("ServiceLogin"))   //if(tab.url.endsWith("#password")) 
					{
					   var myAudio = new Audio(); 
					   myAudio.src = "form_filling.mp3"; // assign the audio file to it
					   myAudio.play();
					}
				}

				




				var protocol=tab.url.split('://')[0];
				var url = tab.url.split('/')[2];
                var tld= url.substring(url.lastIndexOf("."));
				
				var noOfDots=url.match(/\./g).length;
				var urllength=tab.url.length-1;
				
				//alert("dots "+noOfDots);
				//alert("TLD="+tld);
				//alert(protocol);
				if(noOfDots>=5)
				{
					weight+=1;
				}
				
				if(urllength>=75)
				{
					weight+=1;
				}
				
				/*if(url.includes("//")) || url.includes('\')) || url.includes("@"))
				{
					weight+=3;
				}*/
				
				var regx=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
				if(regx.test(url))
				{
					weight+=3;
				}
				
				if(tld===".biz" || tld===".ws" || tld===".bz"  || tld===".ru" || tld===".download" || tld===".review"  || tld===".diet"  || tld===".click" || tld===".work"  || tld===".tokyo" || tld===".racing"  || tld===".science" || tld===".xyz"  || tld===".email" || tld===".cm"  || tld===".gq"  || tld===".link" || tld===".guru")
				{
					weight+=2;
				}
				
				if(protocol==="http")
				{
					weight+=1;
				}
				
				//alert(weight);
				if(weight>=4)
				{
					var myAudio = new Audio();        // create the audio object
					myAudio.src = "phishing.mp3"; // assign the audio file to it
					myAudio.play();
					
				}
			}
		
	});
});
