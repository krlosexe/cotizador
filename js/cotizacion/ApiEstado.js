export class ApiEstado{

	constructor(apiurl){
	 	this.apiurl  = apiurl;
	 	this.headers = new Headers();
	 	this.headers.append('Content-Type', 'application/json');
	}

	async GetPlaca(placa){

		let request = await fetch(`${this.apiurl}insurance/estado/getPlaca/${placa}`,{
			method: 'GET', 
		    headers: this.headers,
		}); 

		console.log(request)
		if(request.ok){
			return await request.json();
		}else{
			return false;
		}
		
    }
    

    async Cotizar(params){

		let request = await fetch(`${this.apiurl}insurance/estado/cotizar`,{
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
