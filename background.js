var dominios=[];
listanegra();
window.setTimeout(console.log(dominios), 8000); //A los 3 segundos ejecutar la funcion.

function enviarcorreo(){
	var sitio='http://app.lunave.com.mx/rs/auth';
	email=prompt('Ingresa tu correo de Lunave');
	if(!email){
				verdominios();
	}
	else
	{
		$.ajax({
  		type: "POST",
  		url:sitio ,
  		data: email,
  		success: success,
  			dataType: dataType
		});
		
	}

}

//Funcion para obtener los dominios que se borraran
function listanegra(){
	var sitio='http://app.lunave.com.mx/rs/blacklist';
	
		$.getJSON(sitio,function(datos){
       			$.each(datos.blacklist,function(posicion,blacklist){
       				dominios.push(blacklist.domain);
       			});		
     	});
}
//EndFunction

function eliminarcookies(){

	
	//chrome . cookies . remove ({ "url" :  "https://facebook.com" ,  "name" :  "c_user" },  function ( deleted_cookie )  { console . log ( deleted_cookie );  });

}

function verdominios(){
console.log(dominios);
}






//chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo, tab){

	//	chrome.cookies.get({url:  "https://facebook.com" ,  name :  "c_user"}, function(cookie) {
    //    alert(cookie.value);
  //  });
//});



    





//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
//});

//chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
   
//});

//chrome.browserAction.onClicked.addListener(function() { 
	
//chrome.tabs.query({'active': true}, function (tabs) {
 //   var url = tabs[0].url;
//    alert(url);
//});
  //chrome . cookies . remove ({ "url" :  "https://facebook.com" ,  "name" :  "c_user" },  function ( deleted_cookie )  { console . log ( deleted_cookie );  });
 //})

