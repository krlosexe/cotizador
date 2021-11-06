export class ApiSura {

	 constructor(apiurl){
	 	this.apiurl = apiurl;
	 	this.headers = new Headers();
	 	this.headers.append('Content-Type', 'application/json');
	 }

    async t(){
		let request = await fetch(`${this.apiurl}t`);

		let token = Object.values(await request.json());

		this.headers.append('X-TOKEN', token)
    } 

	async tiposdocumento(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/tiposdocumento`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async genero(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/genero`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async estadocivil(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/estadocivil`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async tipospersona(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/tipospersona`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async tiposdireccion(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/tiposdireccion`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async ocupaciones(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/ocupaciones`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async ciudades(){

		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/ciudades`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async clasesvehiculo(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/clasesvehiculo`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async tiposservicio(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/tiposservicio`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async usosvehiculo(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/usosvehiculo`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async dispositivosseguridad(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/dispositivosseguridad`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async ciudadescirculacion(){
		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/ciudadescirculacion`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}


	async planesFiltrados({ codigoclasevehiculo, tiposservicio }){
		let request = await fetch(`${this.apiurl}sura/getPlanesFiltrados/${codigoclasevehiculo}/${tiposservicio}`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async fasecoldaMarcas({ codigoclasevehiculo, modelovehiculo }){

		let request = await fetch(`${this.apiurl}sura/getFasecoldaMarcas/${codigoclasevehiculo}/${modelovehiculo}`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async fasecoldaLineas(params){

		let request = await fetch(`${this.apiurl}sura/getFasecoldaLineas`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers
		});

		return Object.values(await request.json());
	}

	async fasecoldaModelo(params){

		let request = await fetch(`${this.apiurl}sura/getFasecoldaModelo`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers
		});

		return await request.json();
	}

	async coberturas(params){

		let request = await fetch(`${this.apiurl}sura/getCoberturas`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers
		});

		return await request.json();
	}

	async financiacionCompanias(params){

		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/financiacionCompanias`, {
			headers: this.headers
		});

		return await request.json();
	}

	async financiacionTiposcuenta(params){

		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/financiacionTiposcuenta`, {
			headers: this.headers
		});

		return await request.json();
	}

	async financiacionBancos(params){

		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/financiacionBancos`, {
			headers: this.headers
		});

		return await request.json();
	}

	async concesiorios(params){

		let request = await fetch(`${this.apiurl}sura/getNodosMaestros/concesiorios`, {
			headers: this.headers
		});

		return await request.json();
	}


	async inspeccion(params){

		let request = await fetch(`${this.apiurl}sura/inspeccion`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers
		});

		return await request.json();
	}

	async sarlaft(params){

		let request = await fetch(`${this.apiurl}sura/sarlaft`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		});

		return await request.json();
	}

	// Método para buscar la fasecolda de la placa. Permitirá tener valores por default y que el usuario no tenga que
	// rellenar tanta informacion

	async placa(placa){

		let request = await fetch(`${this.apiurl}sura/getPlaca/${placa}`, {
			headers: this.headers
		});
		
		console.log(request);
		
		if(request.status == 500){
		    return {
                'mensaje': 'No se encontró la placa: '.$placa, 
                'encontrado': false,
                'clase': '',
                'vehiculoInfo': null,
                'fasecoldaInfo': new Array  
		        
		    };
		}
		
		return await request.json();
	}


	// Método para cotizar de una vez. Este requerira mucha info para procesar 
	
	async cotizarPlanes(params){

		let request = await fetch(`${this.apiurl}sura/cotizarPlanes`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		});

		return await request.json();
	}

	async cotizarPlan(params){

		let request = await fetch(`${this.apiurl}sura/cotizarPlan`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		});

		if(request.ok){
			return await request.json();
		  }else{
			  return await false
		  }
	}



	async cotizarPlanCeroKm(params){

		let request = await fetch(`${this.apiurl}sura/cotizarPlanCeroKm`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		});

		if(request.ok){
			return await request.json();
		  }else{
			  return await false
		  }
	}



	async insertDataCotizacion(params){
		console.log(params)
		let request = await fetch(`${this.apiurl}sura/insertDataCotizador`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		});

		return await request.json();
	}


}

export var CacheSura = {
	append(key, data){
		this[key] = data
	}
}

