class ResourceModel extends Model {
	constructor(fb, id = null){
		super(fb, id);
		this.object = null;
	}

	set(resource){
		let validation = this.validate(resource);
		if(validation instanceof Error){
			return validation
		}

		if (!this.id){
			//create new resource
			let push = this.fb.push();
			resource.id = push.key;
			
			return new Promise(resolve => {
				push.set(resource)
				.then(()=>{
					this.id = resource.id;
					this.object = resource;
					resolve(null);
					return;
				})
				.catch(err =>{
					resolve(err);
					return;
				})
			});

		}else{
			//update existing resource
			return new Promise(resolve =>{
				this.fb.child(this.id).update(resource)
				.then(()=>{
					resource.id = this.id;
					this.object = resource;
					resolve(null);
					return;
				})
				.catch(err => {
					resolve(err);
					return;
				});
			});
		}
	}

	get(){
		if (!this.id){
			throw new Error('No resource specified');
		}

		if (!this.object){
			return new Promise(resolve => {
				this.fb.child(this.id).once('value')
				.then(snap => {
					this.object = snap.val();
					resolve(this.object);
					return;
				})
				.catch(err =>{
					resolve(err);
					return;
				});
			});
		}

		return this.object;
	}

	delete(){
		if (!this.id){
			throw new Error('No resource specified');
		}

		return new Promise(resolve => {
			this.fb.child(this.id).remove()
			.then(() => {
				resolve(null);
				return;
			})
			.catch(err => {
				resolve(err);
				return;
			})
		});
	}

	validate(resource){
		const fields = [
            'title',
            'description',
		];
		
		for (const field of fields){
			if (!field in resource){
                return this.createError(
                    'Missing ' + field,
                    'A project must have an ' + field + 'field.'
                );
            }
		}
		
		let validations = [
			this.validateField(resource.title, '', 'Invalid Title', 'The Title field cannot be empty.'),
			this.validateField(resource.description, '', 'Invalid Description', 'The Description field cannot be empty.'),
		]

		for (const validation of validations) {
			if (validation instanceof Error){
				return validation;
			}	
		}

		return null;
	}
}