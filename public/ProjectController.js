class ProjectController extends Controller {
	constructor(firebase, owner, projectId){
		super(firebase);
		this.owner = owner;
		this.id = projectId;
		this.firebaseRef = this.db.ref(this.owner + '/projects/' + this.id);
	}

	exists(){
		return new Promise(resolve => {
			this.firebaseRef.once('value')
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

	updateProject(title = null, projectId = null, description = null, baseURL = null){
		return new Promise(resolve => {
			if (projectId && projectId !== this.id) {
				let validation = this.validateSlug(projectId);
				if (validation instanceof Error) {
					validation.name = 'Invalid Project Id'
					resolve(validation);
					return;
				}
				this.db.ref(this.owner + '/projects').child(projectId).once('value')
				.then(snap => {
					if (snap.exists()) {
						var err =  new Error('This project identifier is already the identifier of one project you own.');
						err.name = 'Invalid Project Id';
						resolve(err);
						return;
					}else{
						let date = new Date();
						this.firebaseRef.once('value')
						.then(snap => {

							var project = snap.val();
							console.log(project);
							project.title = title ? title : project.title;
							project.description = description ? description : project.description;
							project.projectId = projectId ? projectId : project.projectId;
							project.baseURL = baseURL ? baseURL : project.baseURL;

							this.db.ref(this.owner + '/projects').child(projectId).set(project)
							.then(() => {
								this.firebaseRef.remove();
								window.location.href = "/" + this.owner + "/" + projectId;
							})
							.catch(err => {
								resolve(err);
								return;
							});
						})
						
					}
				});
			}else{
				let date = new Date();
				this.firebaseRef.update({
					updated: date.toISOString(),
					title: title,
					description: description,
					projectId : projectId,
					baseURL: baseURL,
				})
				.then(() => {
					resolve(true);
					return;
				})
				.catch(err => {
					resolve(err);
					return;
				})
			}
		});
	}

	deleteProject(){
		return new Promise(resolve => {
			this.firebaseRef.remove()
			.then(() => {
				window.location.href = '/' + this.owner;
				resolve(true);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

	updateAuthorization(authDescription){

	}

	addResource(resourceTitle, resourceDescription){
		return new Promise(resolve => {
			let push = this.firebaseRef.child('resources').push();

			let validations = {
				title: this.validateField(resourceTitle, '', 'Invalid Title', 'The title field cannot be empty'),
				description: this.validateField(resourceDescription, '', 'Invalid Description', 'The description field cannot be empty')
			}

			for (const key in validations) {
				if (validations.hasOwnProperty(key)) {
					const element = validations[key];
					if (element instanceof Error){
						resolve(element);
						return;
					}
				}
			}

			push.set({
				title: resourceTitle,
				description: resourceDescription,
				id: push.key,
			})
			.then(() => {
				resolve({
					title: resourceTitle,
					description : resourceDescription,
					id :  push.key,
				});
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			});
		});
	}

}
