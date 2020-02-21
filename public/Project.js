class Project {
	constructor(firebase, username, projectId){
		this.db = firebase.databse();
		this.user = username;
		this.project = projectId;
	}

	getProject(){
		return new Promise(resolve => {
			this.db.ref(this.user + '/projects/' + this.project).once('value')
			.then(snap => {
				resolve(snap.val());
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	updateProject(title, description){
		return new Promise(resolve => {
			this.db.ref(this.user + '/projects/' + this.project).update({
				updated: Date.now().toISOString(),
				title: title,
				description, description,
			})
			.then()
			.catch();
		});
	}


}