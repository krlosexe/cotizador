//const apiurl = 'http://localhost/cotizador-api/' // developmentt 
const apiurl = 'https://chseguros.com.co/api/cotizador-api/' // production

//const BASE_URL = 'http://localhost/cotizador/' // development
const BASE_URL = 'https://chseguros.com.co/api/cotizador/' // production

import { ApiSura, CacheSura } from './ApiSura.js';
import { ApiBolivar } from './ApiBolivar.js';
import { ApiLiberty } from './ApiLiberty.js';
import { ApiEstado } from './ApiEstado.js';

const Sura            = new ApiSura(apiurl);
const Bolivar         = new ApiBolivar(apiurl);
const Liberty         = new ApiLiberty(apiurl);
const InsuranceEstado = new ApiEstado(apiurl);

// Cada vez que se consulta una placa, lo mas probable es que haya que poner valores por default
// Este valor será para ponerlos nada mas cuando se consulte, ya que el usuario puede cambiar opciones
// en los select y eso ejecuta los mismos eventos

var placaConsultada = 1;


// Esta variable estará en 1 cuando todas las promises de los planes se ejecuten
// en el metodo de getPlanesFiltrados. Cuando se dé a cotizar en el formulario
// habrá un setInterval que estará checando esta variable cada 5 segundos  

var redirigir = 0; 

var intervalRedirect;

//variable en la cual se cuardara los atributos de la cuidad en circulación seleccionada

var ciudadescirculacionSelect = {};


var p = 0


// El frame actúa como widget dentro de wordpress, por lo tanto, solo necesitamos acceder a los elementos dentro del iframe

const documentIframe =  (window.top != window.self) ? window.parent.document.querySelector('iframe[name="nombre"]')?.contentDocument : window.document;

// event listeners
documentIframe.addEventListener('DOMContentLoaded', loaded)


// cambia tipo de persona, trae otros documentos 
// documentIframe.getElementById('tipoPersona').addEventListener('change', function(){

// 	let documentosFiltered = CacheSura.tiposdocumento.filter(item => item.tipoPersona == this.value);

// 	buildSelect('#tipoDocumento', documentosFiltered, { key: 'id', text: 'descripcion' })

// });

// obtener info desde la placa


// obtener las marcas
documentIframe.getElementById('clasevehiculo').addEventListener('change', getMarcas)
documentIframe.getElementById('modelo').addEventListener('change', getMarcas)

// obtener lineas
documentIframe.getElementById('modelo').addEventListener('change', getLineasMarca)
documentIframe.getElementById('clasevehiculo').addEventListener('change', getLineasMarca)
documentIframe.getElementById('fasecoldaMarcas').addEventListener('change', getLineasMarca)

// obtener lineas de vehiculos 
documentIframe.getElementById('modelo').addEventListener('change', getLineasCodigofasecolda)

// COTIAZARRRRRR. REVISAR EL VALIDATE2() en step.js

documentIframe.getElementById('next3').addEventListener('click', cotizar)



// document ready para los step

$(document).ready(function(){
	

    // $(documentIframe).find('#cover-spin, #page-loader-wrapper').show();
    
    
    
     var delayInMiliseconds = 1000;
    var button = document.querySelector('#next1');

    setTimeout(function(){
        button.click()
    }, delayInMiliseconds);

    var current_fs, next_fs, previous_fs;
         
    $(documentIframe).find(".next").click(async function(){
         
         let str1 = "next1";
         let str2 = "next2";
         let str3 = "next3";

        console.log("NEXT")
		 if(localStorage.getItem("ceroKm") == "true"){
			$(documentIframe).find('#next1').attr('disabled', 'disabled');
            $(documentIframe).find('#cover-spin').show();

			console.log("CERO KM SI")
			val1 = true

			let dataFasecoldaEstado = false
			if(!dataFasecoldaEstado){
				localStorage.setItem('dataFasecoldaEstado', null);
				$(documentIframe).find('#cover-spin').hide();
			}else{
				$(documentIframe).find('#cover-spin').hide();
				localStorage.setItem('dataFasecoldaEstado', JSON.stringify(dataFasecoldaEstado.data.Data));
			}

		 }else
       
         if( ((str1.localeCompare($(this).attr('id')) >= 0) && documentIframe.querySelector('#placa').value != '')){
			

            $(documentIframe).find('#next1').attr('disabled', 'disabled');
            $(documentIframe).find('#cover-spin').show();


			if($('#cero_km').is(':checked')){
				console.log("CERO KM SI")
				val1 = true
			}else{
				var val1 = await getPlacaInfo();
				console.log("CERO KM NO")
			}

		//	var val1 = await getPlacaInfo();
		
			$(documentIframe).find('#cover-spin').show();


			let dataFasecoldaEstado = await InsuranceEstado.GetPlaca(documentIframe.querySelector('#placa').value);

			console.log(dataFasecoldaEstado)

			if(!dataFasecoldaEstado){
				localStorage.setItem('dataFasecoldaEstado', null);
				$(documentIframe).find('#cover-spin').hide();
			}else{
				$(documentIframe).find('#cover-spin').hide();
				localStorage.setItem('dataFasecoldaEstado', JSON.stringify(dataFasecoldaEstado.data.Data));
			}
			
			
			//console.log(dataFasecoldaEstado.data.Data)
            // Aquí va el loader
         }
         else {
            var val1 = false;
         }

         if( (str2.localeCompare($(this).attr('id')) >= 0) && validate1(0) == true) {

			
           //getPlanes();
       	   var val2 = true;
         }
         else {
           var val2 = false;
         }
         
         if( (str3.localeCompare($(this).attr('id')) >= 0) && validate2(0) == true) {
            
           $(documentIframe).find('#cover-spin, #page-loader-wrapper').show();
           var val3 = true;
         }
         else {
           var val3 = false;
         }

      
      //   console.log(val2)
        if(
         	( (str1.localeCompare($(this).attr('id')) >= 0 ) && val1 == true) || 
         	( (str2.localeCompare($(this).attr('id')) >= 0 ) && val2 == true) || 
         	( (str3.localeCompare($(this).attr('id')) >= 0 ) && val3 == true)
         ){
         	// Aqui se quita el loader del next1
         	if (val1) {
           	// $(documentIframe).find('#cover-spin').hide();
         	}

            $(documentIframe).find('#next1').removeAttr('disabled');

	         current_fs = $(this).parent().parent();
	         next_fs    = $(this).parent().parent().next();
	         
	         $(current_fs).removeClass("show");
	         $(next_fs).addClass("show");
	         
	         $(documentIframe).find("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	         
	         current_fs.animate({}, {
		         step: function() {
		       
			       current_fs.css({
			         'display': 'none',
			         'position': 'relative'
			        });
		         
			         next_fs.css({
			         	'display': 'block'
			         });
			      }
	         });

         }

     });

     $(documentIframe).find(".prev").click(function(){
     
         current_fs = $(this).parent().parent();
         previous_fs = $(this).parent().parent().prev();
         
         $(current_fs).removeClass("show");
         $(previous_fs).addClass("show");
         
         $(documentIframe).find("#progressbar li").eq($("fieldset").index(next_fs)).removeClass("active");
         
         current_fs.animate({}, {
        	 step: function() {
         
		         current_fs.css({
		         'display': 'none',
		         'position': 'relative'
		         });
		         
		         previous_fs.css({
		         'display': 'block'
		         });
        	 }
         });
     });
     
     $(documentIframe).find('.radio-group .radio').click(function(){
     	$(this).toggleClass('selected');
     });

     
         
});

// Evento que se ejecuta cuando se carga el dom

async function loaded(){

	// modelos es un rango de años. No depende de api consultarlo

	loadModelos();

	// await Sura.t();
	// await Bolivar.t();

	// ----------- DATOS PERSONALES ------------
	 Sura.tiposdocumento().then( data => {

	 	CacheSura.append('tiposdocumento', data);
	 	buildSelect('#tipoDocumento', data, { key: 'id', text: 'descripcion' })
	 }); 

	 Sura.tiposdireccion().then( data => {
	 	CacheSura.append('tiposdireccion', data);
	 }); 

	 Sura.ocupaciones().then( data => {
	 	CacheSura.append('ocupaciones', data);
	 }); 

	 Sura.tipospersona().then( data => {
	 	CacheSura.append('tipospersona', data);
	 }); 
	 

	// ------- DATOS DE VEHICULOS ---------

 	Sura.clasesvehiculo().then( data => {

	 	CacheSura.append('clasesvehiculo', data);
	 	buildSelect('#clasevehiculo', data, { key: 'codigo', text: 'descripcion' })
	 	miniLoader("clasevehiculo","hide");

 	});

 	Sura.tiposservicio().then( data => {

 		delete data[2]; // "publico especial" no irá incluido en el formulario 

	 	CacheSura.append('tiposservicio', data);
	 	buildSelect('#tiposservicio', data, { key: 'codigo', text: 'nombre' })
 	});

 	Sura.usosvehiculo().then( data => {
 		CacheSura.append('usosvehiculo', data);
 	});

 	
	asyncCiudadesCirculacion("#ciudadescirculacion")



}

// metodos para los eventos

async function getPlacaInfo(){

	let placa = documentIframe.querySelector('#placa');
	console.log(placa, "Plaquita")
	if(placa.value == '')
		return false;

	let plaquita = placa.value;
	
	let data = await Sura.placa(plaquita)
		
	placaConsultada = 1;

	CacheSura.append('fasecoldaInfo', data);

	console.log(data.fasecoldaInfo, "NAME VEHICULE")

	localStorage.setItem('name_vehiculo', `${data.fasecoldaInfo.referencia1} ${data.fasecoldaInfo.referencia2} ${data.fasecoldaInfo.referencia3}`);
	let defaultModelo = CacheSura.fasecoldaInfo.modelo == undefined? '': CacheSura.fasecoldaInfo.modelo

	if(defaultModelo == ''){
		defaultModelo = CacheSura.fasecoldaInfo.vehiculoInfo == null? '' : CacheSura.fasecoldaInfo.vehiculoInfo.model
	}
	// default modelo 
	$(documentIframe).find("#modelo").val(defaultModelo);

	// default clasevehiculo
	var clasevehiculo = documentIframe.getElementById("clasevehiculo");

	for (var option of clasevehiculo.children){

		// por ahora solo sería MOTOCARRO la que coincide
		if(option.innerHTML == CacheSura.fasecoldaInfo.fasecoldaInfo.clase)
			option.selected = true

		// aqui coincide AUTOMOVIL Y AUTOMOVILES. El replace es para quitar el acento de AUTOMÓVIL
		if(option.innerHTML.normalize('NFD').replace(/[\u0300-\u036f]/g, "") == CacheSura.fasecoldaInfo.fasecoldaInfo.clase+"ES")
			option.selected = true;

		// aqui coincide CAMPEROS
		if(option.innerHTML == 'CAMPEROS Y PICKUPS' && CacheSura.fasecoldaInfo.fasecoldaInfo.clase == 'CAMPERO')
			option.selected = true;
		
		// aqui coincide MOTOs
		if(option.innerHTML == 'MOTOS 0 - 125 CC' && CacheSura.fasecoldaInfo.fasecoldaInfo.clase == 'MOTOCICLETA')
			option.selected = true;
		

		// default tipo servicio: particular, publico, etc
		var tiposservicio = documentIframe.getElementById("tiposservicio");

		for (var option of tiposservicio.children){

			if(option.innerHTML == CacheSura.fasecoldaInfo.fasecoldaInfo.servicio)
				option.selected = true

		}

		// se ejecuta el evento para traer los planes y marcas
		// let eventChange = new Event('change');
		// documentIframe.getElementById('clasevehiculo').dispatchEvent(eventChange);

		// aqui para mostrar las lineas por vehiculo
		//getLineasCodigofasecolda();
	}

	await getMarcas();

	return true;
}

function saveCotizacionComplete(){
	let params = {
		'planes'         : localStorage.getItem('planes'),
		'planes_bolivar' : localStorage.getItem('bolivar_planes'),
		'planes_liberty' : localStorage.getItem('liberty_planes'),
		'estado_planes'  : localStorage.getItem('estado_planes'),
		'estado_planes_jr'  : localStorage.getItem('estado_planes_jr'),
		'id': localStorage.getItem('id_vehiculo_cotizacion')
	}

	return fetch(`${apiurl}sura/setJsonCotizacion`, {
		method: 'POST', 
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

function redirectResultados(){
	if(redirigir == 1){
		// aqui se quita el loader
		clearInterval(intervalRedirect);

		let id = localStorage.getItem('id_vehiculo_cotizacion');

		let str = `sodastereo$-${id}`;

		let refLink = btoa(unescape(encodeURIComponent(str)));


		const dataEmail = {
			"vehiculo"   : localStorage.getItem('auto'),
			"email"      : $("#correo").val(),
			"issue"      : "Cotización CH Seguros",
			"name"       : `${$("#cname").val()} ${$("#capellido").val()}`,
			"cotizacion" : `${BASE_URL}resultados/${refLink}`,
			"id_vehiculo_cotizacion" : localStorage.getItem("id_vehiculo_cotizacion")
		}

		sendEmail(dataEmail)



		saveCotizacionComplete().then(response => {
			sessionStorage.setItem("speaker",true);
			window.parent.location = `${BASE_URL}resultados/${refLink}`;
		})
		.catch(error => {
			alert("Ha ocurrido un error al guardar la cotización. Contactar con administración")
		})

	}
	else{
		// aqui va el loader
	}
}


 function sendEmail(data){
	console.log(data, "DATA EMAIL")

	// fetch(`https://app.chseguros.com.co/api/emailCotizador`, { 
	// 	method: 'POST', 
	// 	body: JSON.stringify(data)
	// });

	$.ajax({
		url:`https://app.chseguros.com.co/api/emailCotizador`,
		type:'POST',
		data: data,
		dataType:'JSON',
		beforeSend: function(){
		// mensajes('info', '<span>Buscando, espere por favor... <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></span>');
		},
		error: function (data) {
		//mensajes('danger', '<span>Ha ocurrido un error, por favor intentelo de nuevo</span>');         
		},
		success: function(data){

		}					
	
	});

}

async function getPlanesFiltrados(){
	
	redirigir = 0;
	
	let arrayPromises = new Array;
	let tiposservicio  = documentIframe.getElementById('tiposservicio').value;
	let codigoclasevehiculo  = documentIframe.getElementById('clasevehiculo').value;

	localStorage.setItem('planes', JSON.stringify(new Array));

	if(tiposservicio == '' || codigoclasevehiculo == '')
		return;

	let data = await Sura.planesFiltrados({ codigoclasevehiculo, tiposservicio });


 	CacheSura.append('planesFiltrados', data);

 	let params = new Object;
 		params.dataSelected = getDataForm();
 		params.fasecoldaLineas = CacheSura.fasecoldaLineas;
 		params.fasecoldaMarcas = CacheSura.fasecoldaMarcas;
 		params.fasecoldaInfo   = CacheSura.fasecoldaInfo;
 		params.tiposdocumento  = CacheSura.tiposdocumento;
 		params.tiposdireccion  = CacheSura.tiposdireccion;
 		params.ocupaciones     = CacheSura.ocupaciones;
		params.cedula          = $("#numeroDoc").val();
		params.nombre          = $("#cname").val();
		params.apellido        = $("#capellido").val();



 	for(let plan of data){

 		params.plan = plan;

		if(localStorage.getItem("ceroKm") == "true"){
			console.log("CERO KM")

			params.fasecolda      = $("#fasecoldaLineas").val().split(",")[0]
			params.dsClase        = $("#clasevehiculo option:selected").text()
			params.cdClase        = $("#clasevehiculo").val()
			params.cdMarca        = $("#fasecoldaMarcas").val()
			params.valorAsegurado = $("#fasecoldaLineas").val().split(",")[1]
			// params.dsMarca        = $("#fasecoldaLineas option:selected").text().split("-")[0]
			// params.dsLinea        = $("#fasecoldaLineas option:selected").text().split("-")[1]+" - "+$("#fasecoldaLineas option:selected").text().split("-")[2]
			params.linea          = $("#fasecoldaLineas option:selected").text()
			let respPlan = Sura.cotizarPlanCeroKm(params);
			console.log(respPlan, "respPlan")
			if(respPlan){
				arrayPromises.push(respPlan)
			}
		}else{
			console.log(plan, "DATA PLAN")
			let respPlan = Sura.cotizarPlan(params);
			console.log(respPlan, "respPlan")
			if(respPlan){
				arrayPromises.push(respPlan)
			}
		}
 	}


	Promise.all(arrayPromises)
	  .then(respPlan => {
 		if(localStorage.getItem('planes') != null){

 			localStorage.setItem('planes', JSON.stringify(respPlan));

		 	redirigir = 1;
 		}
	 }).catch(res => {
	  	localStorage.setItem('planes', null);
	 })



}

async function getMarcas(){
	 console.log("WAIT")
	 $(documentIframe).find('#cover-spin').show();
	let modelovehiculo = documentIframe.getElementById('modelo').value;
	let codigoclasevehiculo = documentIframe.getElementById('clasevehiculo').value;

	if(modelovehiculo == '' || codigoclasevehiculo == ''){
		$(documentIframe).find('#cover-spin').hide();
		return;
	}
		

	let data = await Sura.fasecoldaMarcas({ codigoclasevehiculo, modelovehiculo })
	console.log("READY")
	$(documentIframe).find('#cover-spin').hide();
 	CacheSura.append('fasecoldaMarcas', data);

 	buildSelect('#fasecoldaMarcas', data, { key: 'codigoMarca', text: 'descripcion' })

 	// default marca. Esta info viene cuando se consulta la placa, recordar

 	let marcaElement = documentIframe.getElementById('fasecoldaMarcas');

	for (var option of marcaElement.children){

		if(option.innerHTML == CacheSura.fasecoldaInfo.fasecoldaInfo.marca)
			option.selected = true
		
	}

	await getLineasMarca();

	return true;	
}

async function getLineasMarca(){
	let codigomodelo = documentIframe.getElementById('modelo').value;
	let codigoclase = documentIframe.getElementById('clasevehiculo').value;

	let marcaElement = documentIframe.getElementById('fasecoldaMarcas');

	let codigomarca = marcaElement.value;
	let dsmarca = marcaElement.options[marcaElement.selectedIndex].innerHTML;

	if(codigomodelo == '' || codigoclase == '' || codigomarca == '')
		return;

	// Indica si el vehículo posee un código fasecolda manual o real.
	// esmanual puede ser N, A, M. En la documentación no se especifica. Se utiliza la novedad del fasecolda

	let params = {
		codigomodelo,
		codigoclase,
		codigomarca,
		dsmarca,
		fechaAlta: new Date().getTime(),
		esmanual: CacheSura.fasecoldaInfo.fasecoldaInfo.novedad
	}
	$(documentIframe).find('#cover-spin').show();
	let data = await Sura.fasecoldaLineas(params)
	//$(documentIframe).find('#cover-spin').hide();
	data = data.map( item => {
		item.descripcionselect = `${item.descripcionLineaVehiculo} - ${item.descripcionLineaEspecificaVehiculo}`;

		return item;
	})

 	CacheSura.append('fasecoldaLineas', data);

	 $(documentIframe).find('#cover-spin').hide();

 	buildSelect('#fasecoldaLineas', data, { key: 'descripcionselect', text: 'descripcionselect' })


 	if(placaConsultada){

	 	let fasecoldaLineas = documentIframe.getElementById('fasecoldaLineas');
	 	let referencia3Linea = CacheSura.fasecoldaInfo.fasecoldaInfo.referencia3;
	 	let findReferenciaLinea = CacheSura.fasecoldaLineas.find(item => item.descripcionCaracteristicas == referencia3Linea);
	 	
	 	if(findReferenciaLinea != undefined){

			for (var option of fasecoldaLineas.children){

				if(option.innerHTML == findReferenciaLinea.descripcionselect){
					option.selected = true
				}
				
			}

	 	}
		placaConsultada = 0;
 	}

	return true;
}



$("#fasecoldaMarcas").change(async function (e) { 


	let codigomodelo = documentIframe.getElementById('modelo').value;
	let codigoclase = documentIframe.getElementById('clasevehiculo').value;

	let marcaElement = documentIframe.getElementById('fasecoldaMarcas');

	let codigomarca = $(this).val();
	let dsmarca = $("#fasecoldaMarcas option:selected").text()



	let params = {
		codigomodelo,
		codigoclase,
		codigomarca,
		dsmarca,
		fechaAlta: new Date().getTime(),
		//esmanual: CacheSura.fasecoldaInfo.fasecoldaInfo.novedad
	}
	
	$(documentIframe).find('#cover-spin').show();
	let data = await Sura.fasecoldaLineas(params)
	//$(documentIframe).find('#cover-spin').hide();




	$ ("#fasecoldaLineas option").remove();
      $("#fasecoldaLineas").append($('<option>',
      {
        value: "null",
        text : "Seleccione"
      }));

      $.each(data, function(i, item){
          $("#fasecoldaLineas").append($('<option>',
          {
            value: `${item.codigoFasecolda},${item.valorAsegurado}`,
            text : `${item.descripcionLineaVehiculo} - ${item.descripcionLineaEspecificaVehiculo}`
          }));
      });



	data = data.map( item => {
		item.descripcionselect = `${item.descripcionLineaVehiculo} - ${item.descripcionLineaEspecificaVehiculo}`;

		return item;
	})

 	CacheSura.append('fasecoldaLineas', data);

	 $(documentIframe).find('#cover-spin').hide();

 	//buildSelect('#fasecoldaLineas', data, { key: 'descripcionselect', text: 'descripcionselect' })

});

// Método se ejecuta si la placa consultada tiene una descripcion seleccionada en marca
function getPlanes(){
	return getPlanesFiltrados()
}


function getLineasCodigofasecolda(){
	let modelo = documentIframe.getElementById('modelo').value;
	let fechaAlta = new Date().getTime();
	let esmanual = CacheSura.fasecoldaInfo.fasecoldaInfo.novedad;
	let codigofasecolda  = CacheSura.fasecoldaInfo.fasecolda;

	esmanual = esmanual == undefined? true : false;
	codigofasecolda = codigofasecolda == undefined? '9817140' : codigofasecolda;

	let params = { modelo, fechaAlta, esmanual, codigofasecolda }

	Sura.fasecoldaModelo(params).then( data => { 

	 	CacheSura.append('fasecoldaModelo', data);

	 //	buildSelect('#fasecoldaModelo', data, { key: 'codigomarca', text: 'descripcion' })

	});
}


// AÑADIRRRRRRRR el nombre de la ciudad a este objeto

function getDataForm(){
	return {
		placa: documentIframe.getElementById('placa').value.toUpperCase(),
		modelo: documentIframe.getElementById('modelo').value,
		clasevehiculo: documentIframe.getElementById('clasevehiculo').value,
		tiposservicio: documentIframe.getElementById('tiposservicio').value,
		fasecoldaMarcas: documentIframe.getElementById('fasecoldaMarcas').value,
		fasecoldaLineas: documentIframe.getElementById('fasecoldaLineas').value,
		ciudadescirculacion: ciudadescirculacionSelect.codigoCiudad,
		ciudadescirculacion_bolivar: ciudadescirculacionSelect.codigoCiudadBolivar,
		nombreCiudad: ciudadescirculacionSelect.nombreCiudad,
		nombreDepartamento: ciudadescirculacionSelect.nombreDepartamento,
		cname: documentIframe.getElementById('cname').value.toUpperCase(),
		capellido: documentIframe.getElementById('capellido').value.toUpperCase(),
		tipoPersona: findTipoPersonaDocumento(),
		tipoDocumento: documentIframe.getElementById('tipoDocumento').value,
		numeroDoc: documentIframe.getElementById('numeroDoc').value,
		correo: documentIframe.getElementById('correo').value.toUpperCase(),
		phone: documentIframe.getElementById('number_phone').value,
		uso: findTipoServicioUso(),
		feinivigencia: (new Date).getTime()
	}
}



async function cotizar(){

	/*Inciio los planes en sura api*/
//	getPlanes(async() => {

		if(!validate2(0))
			return;
		
		// guardar la cotizacion en un log

		let params = new Object
		params.dataSelected          = getDataForm();
		params.fasecoldaLineas       = CacheSura.fasecoldaLineas;
		params.fasecoldaMarcas       = CacheSura.fasecoldaMarcas;
		params.fasecoldaInfo         = CacheSura.fasecoldaInfo;
		params.tiposdocumento        = CacheSura.tiposdocumento;
		params.ocupaciones           = CacheSura.ocupaciones;
		params.clasesvehiculo        = CacheSura.clasesvehiculo;
		// params.ciudadescirculacion   = CacheSura.ciudadescirculacion
		params.tipospersona          = CacheSura.tipospersona;
		params.descuento             = $("#valid_discount").val();
		params.agencia             =  "CH SEGUROS"


		var ObjetFasecoldaEstado = JSON.parse(localStorage.getItem('dataFasecoldaEstado'))

		console.log(ObjetFasecoldaEstado)

		let DataEstado

		if(ObjetFasecoldaEstado != null){
			console.log("PAPAPAPA")
			DataEstado = {
				"type_document"    : params.dataSelected.tipoDocumento,
				"document"         : params.dataSelected.numeroDoc,
				"name"             : params.dataSelected.cname,
				"last_name"        : params.dataSelected.capellido,
				"gender"           : 1,
				"birthday"         : "15/08/1990",
				"marital_status"   : 1,
				"product"          : 3,
				"circulation_zone" : params.dataSelected.nombreDepartamento,
				"placa"            : params.dataSelected.placa,
				"email"            : params.dataSelected.correo,
				"brand"            : {
					"Details": null,
					"Nombre": "BRAND",
					"Descripcion": "Marca",
					"Valor": ObjetFasecoldaEstado.Brand,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"line" : {
					"Details": null,
					"Nombre": "BRANDLINE",
					"Descripcion": "L�nea",
					"Valor": ObjetFasecoldaEstado.BrandLine,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"clase" : {
					"Details": null,
					"Nombre": "CLASE",
					"Descripcion": "Clase",
					"Valor": ObjetFasecoldaEstado.ClassId,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"fasecolda" : {
					"Details": null,
					"Nombre": "CODIGOFASECOLDA",
					"Descripcion": "C�digo Fasecolda",
					"Valor": ObjetFasecoldaEstado.CodigoFasecolda,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"model" :  {
					"Details": null,
					"Nombre": "MODELO",
					"Descripcion": "Modelo",
					"Valor": ObjetFasecoldaEstado.Modelo,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				  },
				"valor_asegurado" :  {
					"Details": null,
					"Nombre": "VALORASEGURADO",
					"Descripcion": "Valor Asegurado",
					"Valor": ObjetFasecoldaEstado.ValorAsegurado,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"cobertura" : {
					"Details": null,
					"Nombre": "TIPO_COBERTURA",
					"Descripcion": "Tipo de Cobertura",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"limite_rce" : {
					"Details": null,
					"Nombre": "LIMITE_RC",
					"Descripcion": "LIMITE DE RCE (Millones $)",
					"Valor": "21",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
	
				"mayor_cuantia_deducible_0" :  {
					"Details": null,
					"Nombre": "mayor_cuantia_deducible_0",
					"Descripcion": "mayor_cuantia_deducible_0",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"amparo_asistente_viaje" :  {
					"Details": null,
					"Nombre": "ASISTENCIA_VIAJES",
					"Descripcion": "Asistencia en Viajes",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"llantas_estalladas" : {
					"Details": null,
					"Nombre": "LLANTAS_ESTALLADAS",
					"Descripcion": "VALOR LLANTAS ESTALLADAS",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"vehiculo_reemplazo" : {
					"Details": null,
					"Nombre": "VEHICULO_REEMPLAZO",
					"Descripcion": "VEHICULO_REEMPLAZO",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				}
			}
		}

		 getPlanes();

		timeout_trigger();


		if(localStorage.getItem("ceroKm") == "true"){
			const fasecoldaInfo = {
				"fasecoldaInfo" : {
					"clase" : $("#clasevehiculo option:selected").text()
				}
			}
			params.fasecoldaInfo = fasecoldaInfo
		}
	   	let result  = await Sura.insertDataCotizacion(params);
		   
	   	localStorage.setItem("id_vehiculo_cotizacion", result["id_vehiculo_cotizacion"])
	   	
   	// uso de la liquidación y cotizacion de la api de bolivar (se hace aquí para obtener datos reales)
	  
	   
	   
	   timeout_trigger2();
		//let dataLibertyPlan          = await Liberty.cotizarPlan(params);
		let dataLibertyPlan          = [];


		
		

		timeout_trigger3()



		if(ObjetFasecoldaEstado != null){
			params.fasecoldaEstado = ObjetFasecoldaEstado.CodigoFasecolda
		}else{
			params.fasecoldaEstado  = 0
		}
		

		let respLiquidacionBolivar   = await Bolivar.liquidar(params);

		console.log(respLiquidacionBolivar, "respLiquidacionBolivar")


		if(respLiquidacionBolivar){

			console.log(respLiquidacionBolivar.data.length, "respLiquidacionBolivar.length")


			if(respLiquidacionBolivar.data.length > 0){
				console.log("ITERANDO BOLIVAR")
				let dataBolivar = respLiquidacionBolivar.data.map(item => item.responseData)
	
				console.log(dataBolivar)
				localStorage.setItem('bolivar_planes', JSON.stringify(dataBolivar));
			}
		}



		let CalculosEstado   
		if(ObjetFasecoldaEstado != null){
			 CalculosEstado           = await InsuranceEstado.Cotizar(DataEstado);
			 console.log(CalculosEstado, "CALULOS ESTADO")
		}

		console.log($("#clasevehiculo").val())
		let rce = 4
		if($("#clasevehiculo").val() == 2){
			rce = 16
		}

		console.log(rce)
		let CalculosEstadoJr  
		if(ObjetFasecoldaEstado != null){
			const DataEstadoJr = {
				"type_document"    : params.dataSelected.tipoDocumento,
				"document"         : params.dataSelected.numeroDoc,
				"name"             : params.dataSelected.cname,
				"last_name"        : params.dataSelected.capellido,
				"gender"           : 1,
				"birthday"         : "15/08/1990",
				"marital_status"   : 1,
				"product"          : 3,
				"circulation_zone" : params.dataSelected.nombreDepartamento,
				"placa"            : params.dataSelected.placa,
				"email"            : params.dataSelected.correo,
				"brand"            : {
					"Details": null,
					"Nombre": "BRAND",
					"Descripcion": "Marca",
					"Valor": ObjetFasecoldaEstado.Brand,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"line" : {
					"Details": null,
					"Nombre": "BRANDLINE",
					"Descripcion": "L�nea",
					"Valor": ObjetFasecoldaEstado.BrandLine,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"clase" : {
					"Details": null,
					"Nombre": "CLASE",
					"Descripcion": "Clase",
					"Valor": ObjetFasecoldaEstado.ClassId,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"fasecolda" : {
					"Details": null,
					"Nombre": "CODIGOFASECOLDA",
					"Descripcion": "C�digo Fasecolda",
					"Valor": ObjetFasecoldaEstado.CodigoFasecolda,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"model" :  {
					"Details": null,
					"Nombre": "MODELO",
					"Descripcion": "Modelo",
					"Valor": ObjetFasecoldaEstado.Modelo,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				  },
				"valor_asegurado" :  {
					"Details": null,
					"Nombre": "VALORASEGURADO",
					"Descripcion": "Valor Asegurado",
					"Valor": ObjetFasecoldaEstado.ValorAsegurado,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"cobertura" : {
					"Details": null,
					"Nombre": "TIPO_COBERTURA",
					"Descripcion": "Tipo de Cobertura",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"limite_rce" : {
					"Details": null,
					"Nombre": "LIMITE_RC",
					"Descripcion": "LIMITE DE RCE (Millones $)",
					"Valor": `${rce}`,
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
	
				"mayor_cuantia_deducible_0" :  {
					"Details": null,
					"Nombre": "mayor_cuantia_deducible_0",
					"Descripcion": "mayor_cuantia_deducible_0",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"amparo_asistente_viaje" :  {
					"Details": null,
					"Nombre": "ASISTENCIA_VIAJES",
					"Descripcion": "Asistencia en Viajes",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"llantas_estalladas" : {
					"Details": null,
					"Nombre": "LLANTAS_ESTALLADAS",
					"Descripcion": "VALOR LLANTAS ESTALLADAS",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				},
				"vehiculo_reemplazo" : {
					"Details": null,
					"Nombre": "VEHICULO_REEMPLAZO",
					"Descripcion": "VEHICULO_REEMPLAZO",
					"Valor": "1",
					"ParentAttributeId": null,
					"DetailId": null,
					"DocumentsDetailId": null
				}
			}

			
			CalculosEstadoJr  = await InsuranceEstado.Cotizar(DataEstadoJr);

			console.log(CalculosEstadoJr, "CALCULOS ESTADO JR")


		}
		
		
	
		timeout_trigger4()

		
		
		if(dataLibertyPlan){
			localStorage.setItem('liberty_planes', JSON.stringify(dataLibertyPlan));
		}
		
		
		if(ObjetFasecoldaEstado != null){
			if(CalculosEstado){
				localStorage.setItem('estado_planes', JSON.stringify(CalculosEstado.Data));
			}
			
		}

		if(ObjetFasecoldaEstado != null){
			if(CalculosEstadoJr){
				localStorage.setItem('estado_planes_jr', JSON.stringify(CalculosEstadoJr.Data));
			}
		}



		intervalRedirect = setInterval(redirectResultados, 5000);

//	})

}



		
	   function timeout_trigger() {
		 //$(".progress").css("max-width",p+"%");
		 
		 if(p<=50) {
			$(".progress-view").text(p+"%");
			setTimeout(function(){ timeout_trigger(); }, 190);

			// setTimeout('timeout_trigger()', 50);
		 }
		 p++;
	   }


	   function timeout_trigger2() {
		//$(".progress").css("max-width",p+"%");
		
		if(p <=60) {
			$(".progress-view").text(p+"%");
		   setTimeout(function(){ timeout_trigger2(); }, 500);

		   // setTimeout('timeout_trigger()', 50);
		}
		p++;
	  }



	  function timeout_trigger3() {
		//$(".progress").css("max-width",p+"%");
		
		if(p<=90) {
			$(".progress-view").text(p+"%");
		   setTimeout(function(){ timeout_trigger3(); }, 1000);

		   // setTimeout('timeout_trigger()', 50);
		}
		p++;
	  }


	  function timeout_trigger4() {
		//$(".progress").css("max-width",p+"%");
		
		if(p<=100) {
			$(".progress-view").text(p+"%");
		   setTimeout(function(){ timeout_trigger4(); }, 80);

		   // setTimeout('timeout_trigger()', 50);
		}
		p++;
	  }










function findTipoPersonaDocumento(){
	
	let tipodoc = documentIframe.getElementById('tipoDocumento').value;

	tipodoc = tipodoc != ''? tipodoc : 'N' // si no hay nada seleccionado, se pone personal natural

	let objectTipodoc = CacheSura.tiposdocumento.find( item => item.id == tipodoc);
	let objectTipoPersona = CacheSura.tipospersona.find( item => item.codigo == objectTipodoc.tipoPersona);

	return objectTipoPersona.codigo;
}

function findTipoServicioUso(){
	
	let tiposervicio = documentIframe.getElementById('tiposservicio').value;

	tiposervicio = tiposervicio == 'Particular'? 'Familiar' : 'DeTrabajo';

	let uso = CacheSura.usosvehiculo.find(uso => (uso.cdUsoVehiculo == tiposervicio))

	return uso == undefined? 'Familiar' : uso.dsUsoVehiculo;
}



// algunos helpers

// constructor de selects
function buildSelect(select, data, { key, text }){

	let selectElement    = documentIframe.querySelector(select);
	selectElement.value  = '';
	selectElement.length = 1;

	data.forEach(option => {

		let format = typeof text == 'string'? option[text] : `${option[text[0]]} — ${option[text[1]]}`

		let optionElement = new Option(format, option[key], false, false); 
		
		documentIframe.querySelector(select).appendChild(optionElement) 

	})
}

// carga un rango de fecha 
function loadModelos(){
	Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
	
	Array.range(1970, 2023).forEach(option => {

		let optionElement = new Option(option, option, false, false); 
		
		documentIframe.querySelector('#modelo').appendChild(optionElement) 

	})

	miniLoader("modelo","hide");

}


function asyncCiudadesCirculacion(select){
			// $('#policie').select2('destroy');
		      /*if(defaultPolicie != undefined){
		      	$(select).append(`<option value="${defaultPolicie.id}">${defaultPolicie.text}</option>`).trigger('change')
		      }*/

				$(select).select2({
				  width: '100%',
				  language: {
					  noResults: function() {
					    return "No hay resultadosssssssss";        
					  },
					  searching: function() {
					    return "Buscando..";
					  },
					  inputTooShort: function () {
					    return "Colocar mínimo 2 caracteres para buscar...";
					  }
				  },
				  ajax: {
				  	delay: 100,
				    url: `${apiurl}/select2cuidadesCirculacion`,
				    data(params) {
				      return {
				      	search: params.term,
				      	type: 'public'
				      }
				    },
				    processResults(data) {
				      let results = data.map(item => ({
				      		id: item.codigoCiudad,
				      		text: item.ciudadCirculacion
				      	}))

				      return { results };
				    }
				  }
				})


				$(select).on('select2:select', function (e) {

					$.ajax({
		               headers: {
		                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		                },
		                url: `${apiurl}/getCuidadesCirculacion`,
		                data: {"codigoCiudad" : $(this).val()},
		                type: 'POST',
		                dataType: 'JSON',
		                success(data){

		                  ciudadescirculacionSelect = data;

		                },
		                error(response){

		                  console.log(response);
		                }
		            });
 					
 					

				});


		
			}


	function is_numeric(value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}