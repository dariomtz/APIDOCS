class EndpointController extends Controller{
	constructor(firebase, resourceRef, id){
		super(firebase);
		this.id = id;
		this.dbRef = resourceRef.child('endpoints/' + id);
	}

	updateEndpoint(method, summary, description, uriPath, requestBody, responseBody, responseStatus){
		return new Promise(resolve => {
			
			let validations = {
				method: this.validateField(method, null, 'Invalid Method', 'You must select a method.'),
				description: this.validateField(description, '', 'Invalid description', 'The description cannot be empty'),
				uriPath: this.validateField(uriPath, '', 'Invalid URI Path', 'The URI Path cannot be empty'),
				responseStatus: this.validateField(responseStatus, '', 'Invalid Response Code', 'The Response Code cannot be empty'),
				responseStatus2: this.validateField(isNaN(responseStatus), true, 'Invalid Response Code', 'The Response Code must be a number'),
			};
			
			for (const key in validations) {
				if (validations.hasOwnProperty(key)) {
					const element = validations[key];
					if(element instanceof Error){
						resolve(element);
						return;
					}
				}
			}

			let newEndpoint = {
				method: method,
				summary: summary,
				description: description,
				uriPath: uriPath,
				requestBody: requestBody,
				responseBody: responseBody,
				responseStatus: responseStatus,
			};

			this.dbRef.update(newEndpoint)
			.then(() => {
				resolve(newEndpoint);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	deleteEndpoint(){
		return new Promise(resolve => {
			this.dbRef.remove()
			.then(() => {
				resolve(true);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		})
	}
}