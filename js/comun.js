function borrarImagen(e,t){var n={borrarImagen:1,imagenId:e};$.getJSON("php/controles/controlImagen.php",n,function(e){console.log(e);if(e){location.reload(true)}else alertify.error("no se ha podido borrar!")})}function recibirMnsj(e){var t={user:e,verMnsjRec:1};$.getJSON("php/controles/controlMensajes.php",t,function(e){var t="";if(e){for(var n=0;n<e.length;n++){t+="de: "+e[n].nomRemitente+"<br>";t+="mensaje: "+e[n].texto+"<br>";t+="fecha: "+e[n].fecha+"<br>";t+="<hr>"}}alertify.alert(t)})}function reportarImagen(e,t){var n=e;var r=t;var i={reportarImg:1,imgId:n,userId:r};$.getJSON("php/controles/controlReporte.php",i,function(e){console.log(e);if(e){location.reload(true);alertify.success("imagen reportada! Gracias por tu ayuda!")}else{alertify.error("no se ha podido reportar :(")}})}function enviarValoracion(e,t,n,r){switch(e){case"comment":var i={userId:n,coment:r,valorComent:t};$.getJSON("php/controles/controlValoracionComent.php",i,function(e){console.log(e);if(e){alertify.success("Genial! sigue valorando! :)")}else{alertify.error("no ha podido guardarse la valoracion :(")}});break;case"img":var s=r;var o=n;var i={valorimg:t,imagenId:s,userId:o};$.getJSON("php/controles/controlValoracionImg.php",i,function(e){console.log(e);if(e){alertify.success("Genial! sigue valorando! :)")}else{alertify.error("no ha podido guardarse la valoracion :(")}});break;case"pregunta":var i={userId:n,pregunta:r,valorPregunta:t};$.getJSON("php/controles/controlValoracionPregunta.php",i,function(e){console.log(e);if(e){alertify.success("Genial! sigue valorando! :)")}else{alertify.error("no ha podido guardarse la valoracion :(")}});break;case"respuesta":var i={userId:n,respuesta:r,valorRespuesta:t};$.getJSON("php/controles/controlValoracionRespuesta.php",i,function(e){console.log(e);if(e){alertify.success("Genial! sigue valorando! :)")}else{alertify.error("no ha podido guardarse la valoracion :(")}});break;default:break}}function imgDialog(e,t,n){$("#"+t).html("");var r="";var i={verValor:1,userId:e,img:t};$.getJSON("php/controles/controlValoracionImg.php",i,function(i){r='<button title="me gusta" class="meGusta"><span id="countPos">'+i.valores.valorPos+"</span>";if(i.valorUsu){if(i.valorUsu.valor==2)r+='<img src="img/hand_pro_verde.png" >';else r+='<img src="img/hand_pro.png" >'}else r+='<img src="img/hand_pro.png" >';r+="</button>";r+='<button title="no me gusta" class="noMeGusta"><span id="countNeg">'+i.valores.valorNeg+"</span>";if(i.valorUsu){if(i.valorUsu.valor==1)r+='<img src="img/hand_contra_roja.png" >';else r+='<img src="img/hand_contra.png" >'}else r+='<img src="img/hand_contra.png" >';r+="</button>";if(n)r+='<input type="button" class="borrarImg" value="borrar" name="'+t+'"/>';r+='<input type="button" class="reportarImg" value="reportar" name="'+t+'"/>';$("#"+t).html($("#"+t).html()+r);$(".meGusta").click(function(){$("#"+t).dialog("close");enviarValoracion("img",2,e,t);imgDialog(e,t,n)});$(".noMeGusta").click(function(){$("#"+t).dialog("close");enviarValoracion("img",1,e,t);imgDialog(e,t,n)});$(".borrarImg").click(function(){borrarImagen(t);$("#"+t).dialog("close","duration",1e3)});$(".reportarImg").click(function(){reportarImagen(t,e);$("#"+t).dialog("close","duration",1e3)})});$("#"+t).append($("img[name='"+t+"']").clone());$("#"+t+">img").addClass("imagen-dialogo");$("#"+t).dialog({modal:false,title:"Caja con opciones",width:720,minWidth:720,maxWidth:1080,maxHeight:1080,show:"fold",hide:"scale"})}$(function(){$("#bg-cuadro").hide();$("#cuadro-foto").hide();$("#mapa-ubicacion").hide();$("#subir-foto").click(function(){$("#bg-cuadro").show();$("#cuadro-foto").show()});$("#miUbicacion").click(function(){$("#bg-cuadro").show();$("#mapa-ubicacion").append("<iframe src='geolocalizacion.php' id='geolocalizacion'></iframe>");$("#mapa-ubicacion").show()});$(".cerrar-cuadro").click(function(){$("#bg-cuadro").hide();$("#cuadro-foto").hide();$("#mapa-ubicacion").hide();$("#geolocalizacion").remove()});$("#buscar").autocomplete({source:buscador,select:function(){var e=document.getElementById("id").value;if(e.indexOf("[perfil")>1){var t=e.substr(0,e.indexOf("[perfil"));var n='<form method="post" action="perfil.php" class="envioPerfil">';n+='<input type="hidden" value="'+t+'" name="user"/></form>';$(this).html(n);$(".envioPerfil").submit()}else{window.location=e}}});$("#hide-show-menu").click(function(){$("#barra-menu").toggle("slow",function(){var e=$("#ico-menu").attr("src")==="img/33.png"?"img/32.png":"img/33.png";$("#ico-menu").attr("src",e)})});$("#mensajes").click(function(){var e=$("#userIdForImg").val();recibirMnsj(e)})})