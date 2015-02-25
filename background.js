
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
				console.log(json_response.authorization.code);
				password(json_response.authorization.code,json_response.authorization.expires_at)
				
			}
			

		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Ocurrio un error se borraran las cookies por seguridad");
		  eliminarcookies();
		  inicio();
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
	 	cadacinco(codigo,expira,dia);
	 }
	 else
	 {
	 	eliminarcookies();
	 	inicio();
	 }
}


//5minutos=3000000
function cadacinco(codigo,expira,dia){
	setInterval(function cadacinminutos() { 
	
		var pass5= prompt('dame otra vez la llave magica.');
		if(pass5==codigo && dia<= expira){
		   return ;
		}
		else
		{
		alert('pasword incorrecto se boraran las cookies');
		eliminarcookies();
		inicio
		}
	
}, 10000);

}