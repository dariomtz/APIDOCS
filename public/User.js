class User {
	constructor(firebase, username){
		this.db = firebase.database();
		this.user = username;
	}

	getProfile(){
		return new Promise(resolve => {
			this.db.ref(this.user).once('value')
			.then(snap => {
				let profile = snap.val();
				delete profile.projects;
				resolve(profile);
				return;
			})
			.catch(error => {
			  	resolve(error);
			  	return;
			});
		});
	}

	getProjects(){
		return new Promise(resolve => {
			this.db.ref(this.user + '/projects').once('value')
			.then(snap => {
				resolve(snap.val());
				return;
			})
			.catch(error => {
			  	resolve(error);
			  	return;
			});
		})
	}

	addProject(title, projectId, description = ''){
		let date = new Date();
		this.db.ref(this.user + '/projects').child(projectId).set({
			title: title,
			projectId: projectId,
			created: date.toISOString(),
			updated: date.toISOString(),
			author: this.user,
			description: description,
		})
		.then( any => {
			window.location.href = "/" + this.user + "/" + projectId;
		})
		.catch(error => {
		  	console.error(error);
		});
	}
}






