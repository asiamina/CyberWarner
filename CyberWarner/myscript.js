var no_of_forms= document.forms.length;
var i;

for (i = 0; i < no_of_forms; i++) {
  var form = document.forms[i].querySelector("input[type='password']");
  
  
   form.onfocus=function(){
		chrome.runtime.sendMessage(" ");
		//flag=1; 
   }
}
/*
var x = document.getElementsByTagName("body");

for ( i = 0; i <x.length; i++) {



  var f = x[i].querySelector("input[type='password']");
  
	   f.onfocus=function()
	   {
		chrome.runtime.sendMessage(" ");
		//flag=1; 
	   }
   
}*/