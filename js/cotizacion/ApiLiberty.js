export class ApiLiberty{

	constructor(apiurl){
	 	this.apiurl  = apiurl;
	 	this.headers = new Headers();
	 	this.headers.append('Content-Type', 'application/json');
	}

	async cotizarPlan(params){

		let request = await fetch(`${this.apiurl}liberty/cotizar`,{
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

	
}

