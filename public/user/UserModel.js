class UserModel extends Model {
	constructor(fb, id){
		super(fb, id);
		this.projects = this.fb.child('projects');
	}

	getProfile(){
		return new Promise(resolve => {
			this.fb.once('value')
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
			this.projects.once('value')
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
}






