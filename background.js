//Pedir lista negra
  var lista_negra=[];
	var sitio='http://app.lunave.com.mx/rs/blacklist';
    $.getJSON(sitio,function(datos){  		
            $.each(datos.blacklist,function(posicion,blacklist){
              lista_negra.push(blacklist.domain);
            });   
 });
pedirllave();
cadacinco();

 chrome.tabs.onUpdated.addListener(function(tabId , info,tab) {
    if (info.status == "complete") {
        var page=tab.url;
     $.each(lista_negra,function(posicion,lista_negra){
              var verify=page.indexOf(lista_negra)>-1;
              if(verify==true){
                 

              	chrome.cookies.get({"url": "http://lunave.com", "name": "navegacion"}, function(cookie) {
                
                    if(cookie){
                  		if(cookie.value=='true'){

                  		}
                  		else{
                  			pedirllave();
                  		}
                    	}
                    else
                    {
                    	pedirllave();
                    }
                 
    });

                }
  
            });   

    }
});

//cadacinco();

//Comprueba siempre si es una pagina prohibida
// chrome.tabs.onUpdated.addListener(function(tabId , info,tab) {
//     if (info.status == "complete") {
//         var page=tab.url;
//      $.each(lista_negra,function(posicion,lista_negra){
//               var verify=page.indexOf(lista_negra)>-1;
//               if(verify==true){
//                 pedirllave();
//                 }
  
//             });   

//     }
// });

//Comprueba si se cambio a una pagina prohibida
// chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo, tab){
//   chrome.tabs.getSelected(null, function(tab){    
//         var pagina=tab.url;
//      	$.each(lista_negra,function(posicion,lista_negra){

     		
              
//             }); 


//       });
// });





function cadacinco(){
	var cont = 0;
	var segundos=280;
	
	setInterval(function contador() { 

	if(segundos==cont){
		pedirllave();
		cont=0;
	}
console.log(cont);
	cont++;
 }, 1000);
}

// function pedirllave(){

// var pagina="llave.html";
// chrome.tabs.create({url: pagina});
// }


// //Comprueba siempre si es una pagina prohibida
// chrome.tabs.onUpdated.addListener(function(tabId , info,tab) {
//     if (info.status == "complete") {
//         var page=tab.url;
//      $.each(lista_negra,function(posicion,lista_negra){
//               var verify=page.indexOf(lista_negra)>-1;
//               if(verify==true){
//                 console.log('prohibida');
//                 }
  
//             });   

//     }
// });


// //Comprueba si se cambio a una pagina prohibida
// chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo, tab){
  

// chrome.cookies.get({"url": "http://lunave.com", "name": "navegacion"}, function(cookie) {
//                 if(cookie){
                    
//                  }
//                 else
//                 {
//                     pedirllave();
//                 }
//             });


// });

function pedirllave(){
	chrome.tabs.create({'url': 'llave.html'}, function(tab) {
    // Tab opened.
  });
}

