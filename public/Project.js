class Project {
	constructor(firebase, username, projectId){
		this.db = firebase.database();
		this.user = username;
		this.project = projectId;
		this.firebaseRef = this.db.ref(this.user + '/projects/' + this.project);
		this.resourceRef = this.firebaseRef.child('resources');
	}

	getProject(){
		return new Promise(resolve => {
			this.firebaseRef.once('value')
			.then(snap => {
				resolve(snap.val());
			})
			.catch(err => {
				resolve(err);
			});
		});
	}

	updateProject(title, description){
		return new Promise(resolve => {
			let date = new Date();
			this.firebaseRef.update({
				updated: date.toISOString(),
				title: title,
				description, description,
			})
			.then(() => {
				resolve(true);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			})
		});
	}

	deleteProject(){
		return new Promise(resolve => {
			this.firebaseRef.remove()
			.then(() => {
				window.location.href = '/' + this.user;
				resolve(true);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	getAuthorization(){

	}

	updateAuthorization(authDescription){

	}

	addResource(resourceTitle, resourceDescription){
		return new Promise(resolve => {
			let push = this.resourceRef.push();

			push.set({
				title: resourceTitle,
				description: resourceDescription,
				id: push.key,
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

	getResources(){
		return new Promise(resolve => {
			this.resourceRef.once('value')
			.then(snap => {
				resolve(snap.val());
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	updateResource(resourceId, newResourceTitle, newDescription){
		return new Promise(resolve => {
			this.resourceRef.child(resourceId).update({
				title: newResourceTitle,
				description: newDescription,
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

	deleteResource(resourceId){
		return new Promise(resolve => {
			this.resourceRef.child(resourceId).remove()
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
