class EndpointController extends Controller{
	constructor(firebase){
		super(firebase);

	}

	addEndpoint(resourceId, method, sumary, description, uriPath, requestBody, responseBody, responseStatus){
		return new Promise(resolve => {
			let push = this.resourceRef.child(resourceId + '/endpoints').push()

			push.set({
				id: push.key,
				method: method,
				sumary: sumary,
				description: description,
				uriPath: uriPath,
				requestBody: requestBody,
				responseBody: responseBody,
				responseStatus: responseStatus,
			})
			.then(() => {
				resolve(true);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	updateEndpoint(resourceId, endPointId, method, sumary, description, uriPath, requestBody, responseBody, responseStatus){
		return new Promise(resolve => {
			this.resourceRef.child(resourceId + '/endpoints/' + endPointId).update({
				method: method,
				sumary: sumary,
				description: description,
				uriPath: uriPath,
				requestBody: requestBody,
				responseBody: responseBody,
				responseStatus: responseStatus,
			})
			.then(() => {
				resolve(true);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	deleteEndpoint(resource, endPointId){
		return new Promise(resolve => {
			this.resourceRef.child(resourceId + '/endpoints' + endPointId).remove()
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