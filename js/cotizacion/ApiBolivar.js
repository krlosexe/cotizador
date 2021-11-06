export class ApiBolivar {

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

	async ciudadescirculacion(params){

		let request = await fetch(`${this.apiurl}bolivar/listaCiudades`, {
			headers: this.headers
		});

		return Object.values(await request.json());
	}

	async liquidar(params){

		
		let request = await fetch(`${this.apiurl}bolivar/liquidar`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		}).catch(function(error) {
			console.log('Hubo un problema con la petición Fetch:' + error.message);
		  })

		  if(request.ok){
			return await request.json();
		  }else{
			  return await false
		  }
	}

	async cotizarPlan(params){

		let request = await fetch(`${this.apiurl}bolivar/cotizar`, { 
			method: 'POST', 
			body: JSON.stringify(params),
		    headers: this.headers,
		});

		return await request.json();
	}


}

