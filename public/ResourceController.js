class ResourceController extends Controller {
	constructor(firebase, username, projectId, id){
		super(firebase);
		this.id = id;
		this.dbRef = this.db.ref(username + '/projects/' + projectId + '/resources/' + this.id);	
	}

	updateResource(newTitle, newDescription){
		return new Promise(resolve => {
			this.dbRef.update({
				title: newTitle,
				description: newDescription,
			})
			.then(() => {
				resolve({
					title: newTitle,
					description: newDescription,
					id: this.id,
				});
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	deleteResource(){
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
		});
	}

	addEndpoint(method, sumary, description, uriPath, requestBody, responseBody, responseStatus){
		return new Promise(resolve => {
			let push = this.dbRef.child('/endpoints').push()

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
}