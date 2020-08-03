class UserController extends Controller {
	constructor(firebase, userName){
		super(firebase);
		this.userName = userName;
		this.auth = false;
		this.projects = this.db.ref(this.userName + '/projects');
	}

	exists(){
		return new Promise(resolve => {
			this.db.ref(this.userName).once('value')
			.then(snap => {
				resolve(snap.exists());
				return;
			})
			.catch(error =>{
				resolve(error);
				return;
			})
		})
	}

	getProfile(){
		return new Promise(resolve => {
			this.db.ref(this.userName).once('value')
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
			this.db.ref(this.userName + '/projects').once('value')
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

	addProject(title, projectId, description = '', baseURL = 'A base URL has not been set yet.'){
		return new Promise(resolve => {
			var projectIdValidation = this.validateSlug(projectId);
			if (projectIdValidation instanceof Error) {
				projectIdValidation.name = 'Invalid project identifier';
				resolve(projectIdValidation);
				return;
			}

			this.db.ref(this.userName + '/projects').child(projectId).once('value')
			.then(snap => {
				if (snap.exists()) {
					var err =  new Error('This project identifier is already the identifier of one project you own.');
					err.name = 'Invalid Project Id';
					resolve(err);	
				}else{
					let date = new Date();
					this.db.ref(this.userName + '/projects').child(projectId).set({
						title: title,
						projectId: projectId,
						created: date.toISOString(),
						updated: date.toISOString(),
						author: this.userName,
						description: description,
						baseURL: baseURL,
					})
					.then( any => {
						window.location.href = "/" + this.userName + "/" + projectId;
					})
					.catch(error => {
						error.name = 'Invalid Project Creation';
					  	resolve(error);
					  	return;
					});
				}
			});
		});
	}
}






