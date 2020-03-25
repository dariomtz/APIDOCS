class ResourceController{
	constructor(firebase, username, projectId, id){
		this.dbref = firebase.database().ref(username + '/projects/' + projectId + '/resources/' + id);	
	}

	updateResource(newTitle, newDescription){
		return new Promise(resolve => {
			this.resourceRef.child(resourceId).update({
				title: newTitle,
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

	deleteResource(){
		return new Promise(resolve => {
			this.dbref.remove()
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