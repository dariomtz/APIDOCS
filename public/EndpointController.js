class EndpointController extends Controller{
	constructor(firebase, username, projectId, resourceId, id){
		super(firebase);
		this.id = id;
		this.dbRef = this.db.ref(
			username + '/projects/' + projectId + '/resources/' + resourceId + '/endpoints/' + this.id);
	}

	updateEndpoint(method, summary, description, uriPath, requestBody, responseBody, responseStatus){
		return new Promise(resolve => {

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