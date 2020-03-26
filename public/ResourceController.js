class ResourceController extends Controller {
	constructor(firebase, username, projectId, id){
		super(firebase);
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