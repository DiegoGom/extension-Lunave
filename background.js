
var dominios=[];
var sitioparacorreo="http://app.lunave.com.mx/rs/auth"

var sitio='http://app.lunave.com.mx/rs/blacklist';
    
    $.getJSON(sitio,function(datos){  		
            $.each(datos.blacklist,function(posicion,blacklist){
              dominios.push(blacklist.domain);
            });   
});

window.setTimeout(function() { 
	inicio(); 
}, 1000);


function inicio(){
	var email=prompt('dame tu correo de lunave');

	if(!email){
		eliminarcookies();
	}
	else{
		enviarcorreo(email);
	}
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
function enviarcorreo(email){
	var request = $.ajax({
		  	url: sitioparacorreo,
		  	data:{mail:email},
		  	type: 'POST',	
		  	"text json": jQuery.parseJSON,
		  	dataType: 'json',
		});
		 
		request.done(function( json_response ) {
			if(json_response.authorization==false){
				eliminarcookies();
				inicio();
			}
			else{
				password(json_response.authorization.code,json_response.authorization.expires_at);
			console.log(json_response);
			}
			

		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Ocurrio un error se borraran las cookies por seguridad");
		  eliminarcookies();
		  inicio();
		});

}


function password(codigo,expira){
	//Faltaria validar la fecha de expiracion.
	 
setInterval(function cada5minutos() { 

	pass=prompt('Ingresa tu password');
	if(pass==codigo){
		alert('correcto');
	}
	else
	{
		alert('pasword incorrecto');
		eliminarcookies();

	}
}, 3000000);
	

}