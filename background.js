
	var dominios=[];
	var sitioparacorreo="http://app.lunave.com.mx/rs/auth"
	var sitio='http://app.lunave.com.mx/rs/blacklist';

    $.getJSON(sitio,function(datos){  		
            $.each(datos.blacklist,function(posicion,blacklist){
              dominios.push(blacklist.domain);
            });   
	});
    
    pedircorreo();

    chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo, tab){
    	chrome.tabs.getSelected(null, function(tab) {
 		var pagina=tab.url;
 		
 		 $.each(dominios,function(posicion,dominios){
              var verify=pagina.indexOf(dominios)>-1;
              if(verify==true){
              	console
              	       pedircorreo();
              	}
  
            });   
 		

 		
	});
});



function pedircorreo(){
	var email=prompt('dame tu correo de lunave');
	if(!email){
		alert('correo vacio');
		eliminarcookies();
		pedircorreo();
	}
	else{
		enviarcorreo(email);
	}
}

function enviarcorreo(email){
	var request = $.ajax({
		  	url: sitioparacorreo,
		  	data:{
		  		mail:email},
		  	type: 'POST',	
		  	"text json": jQuery.parseJSON,
		  	dataType: 'json',
	});
		 
	request.done(function( json_response ) {
			if(json_response.authorization==false){
				eliminarcookies();
				alert('correo invalido');
				pedircorreo();
			}
			else{
				alert(json_response.authorization.code);
				password(json_response.authorization.code,json_response.authorization.expires_at)
				
			}
	});
		 
	request.fail(function( jqXHR, textStatus ) {
		  alert( "Ocurrio un error se borraran las cookies por seguridad");
		  eliminarcookies();
		  pedircorreo();
	});

}

function password(codigo,expira){
	var f = new Date();
	var mes=f.getMonth() +1;
	 
	if(mes <=9){
		var dia=f.getFullYear()+"-0" + (f.getMonth() +1) + "-" +f.getDate() 
	}
	else{
	 	var dia=f.getFullYear()+"-" + (f.getMonth() +1) + "-" +f.getDate()
	}
	
	var pass=prompt('dame la llave magica');

	if(pass==codigo && dia<=expira){
	 	contador();
	}
	else
	{
	 	eliminarcookies();
	 	pedircorreo();
	}
}

function contador(codigo,expira,dia){
	var cont = 0;
	var segundos=300;
	
setInterval(function contador(codigo,expira,dia) { 

	if(segundos==cont){
		var pass=prompt('dame otra vez la llave');
		if(pass==codigo && dia<= expira){
			cont = 0;
		}
		if(pass!=codigo && dia>= expira){
			eliminarcookies();
			cont=0;
		}
		if(!pass){
			eliminarcookies();
			cont=0;
		}
		cont=0;
	}
console.log(cont);
	cont++;
 }, 1000);
	
}


function eliminarcookies(){

    $.each(dominios,function(posicion,dominio){
            
        chrome.cookies.getAll({domain: dominio}, function(cookies) {
    			for(var i=0; i<cookies.length;i++) {
        			chrome.cookies.remove({url: "https://"+dominio + cookies[i].path, name: cookies[i].name});
    			}
		});
    });
}


