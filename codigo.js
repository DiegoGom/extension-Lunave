var dominios=[];
	var sitioparacorreo="http://app.lunave.com.mx/rs/auth"
	var sitio='http://app.lunave.com.mx/rs/blacklist';

    $.getJSON(sitio,function(datos){  		
            $.each(datos.blacklist,function(posicion,blacklist){
              dominios.push(blacklist.domain);
            });   
	});
chrome.cookies.remove({url: "http://lunave.com", name: "navegacion"});
    


document.write("<div class='login' id='enviarllave'>");
document.write("<label>LLAVE DE ACCESSO A REDES SOCIALES:</label><br><input type='text' placeholder='llave enviada por correo' id='llave'><br>");
document.write("<input type='button' id='validar' value='Validar'>");
document.write("<input type='button' id='olvidar' value='Olvide mi llave'></div>");
document.write("<div class='login' id='recordar' style='display:none'><label>INGRESA TU CORREO ELECTRONICO:</label><br><input type='text' placeholder='tucorreo@lunave.com' id='correo'><br>");
document.write("<input type='button' id='enviar' value='Enviar'></div>");


var sitioparacorreo= "http://app.lunave.com.mx/rs/auth";

leercookie();

function leercookie(){
    chrome.cookies.get({"url": "http://lunave.com", "name": "llave"}, function(cookie) {
                if(cookie){
                	var llave=cookie.value;
                    $('#enviarllave').css('display', 'block');
					$('#recordar').css('display', 'none');
					console.log(llave);
                 }
                else
                {
                    $('#enviarllave').css('display', 'none');
					$('#recordar').css('display', 'block');
                }
    });
}

//Boton Olvidar							
$("#olvidar" ).click(function() {
	$('#enviarllave').css('display', 'none');
	$('#recordar').css('display', 'block');
});

//enviar correo
$("#enviar" ).click(function() {
	var correo=$("#correo").val();
	if(correo){
		recordar(correo);
	}
	else{
		eliminarcookies();
		alert('correo vacio, se borraran los datos.');
		
	}
	//recordar(correo);
});

$("#validar" ).click(function() {
	var llave=$("#llave").val();
	chrome.cookies.get({"url": "http://lunave.com", "name": "llave"}, function(cookie) {
                
                    if(cookie.value==llave){
                    	chrome.cookies.set({ url: "http://lunave.com/", name: "navegacion", value: "true" });
                    	alert('llave correcta sigue navegando');
                    	}
                    else
                    {
                    	alert('llave incorrecta');
                    	eliminarcookies();
                    	location.reload();
                    }
                 
    });
});

function recordar(email){

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
				leercookie();
			}
			else{
				alert('se te envio la llave a tu correo.');
				var llave=json_response.authorization.code;
				chrome.cookies.set({ url: "http://lunave.com/", name: "llave", value: llave });
				leercookie();
				
			}
	});
		 
	request.fail(function( jqXHR, textStatus ) {
		  alert( "Ocurrio un error se borraran las cookies por seguridad");
		  eliminarcookies();
		  leercookie();
	});

}




function eliminarcookies(){

				
    $.each(dominios,function(posicion,dominio){
            
        chrome.cookies.getAll({domain: dominio}, function(cookies) {
    			for(var i=0; i<cookies.length;i++) {
        			chrome.cookies.remove({url: "https://"+dominio + cookies[i].path, name: cookies[i].name});
    			}
		});
    });
    chrome.cookies.remove({url: "http://lunave.com", name: "navegacion"});
    
    
}




