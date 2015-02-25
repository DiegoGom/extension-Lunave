
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
		  	data:email,
		  	type: 'POST',	
		  	"text json": jQuery.parseJSON,
		  	dataType: 'json',
		});
		 
		request.done(function( json_response ) {
			
			console.log(json_response.status);

		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Ocurrio un error se borraran las cookies por seguridad");
		  eliminarcookies();
		});

}