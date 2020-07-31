class ProjectModel extends Model{
    constructor(fb, id = null){
        super(fb, id);
        this.user = fb.key;
        this.object = null;
    }

    set(project){
        let validation = this.validate(project);
        if(validation instanceof Error){
            return validation;
        }

        let date = new Date()
        //create
        if(this.id === null){
            return new Promise(resolve => {    
                this.available(project.id)
                .then(()=>{
                    this.object = {
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        URI: project.uri,
                        author: this.user,
                        created: date.toISOString(),
                        updated: date.toISOString()
                    };
                    this.id = this.object.id;
                    this.fb.child(this.id).set(this.object)
                    .then(()=>{
                        resolve(true);
                        return;
                    }).catch(err => {
                        resolve(err);
                        return;
                    });
                }).catch(err=>{
                    resolve(err);
                    return;
                });
            });

        }

        //update
        if (this.id !== project.id){
            return new Promise(resolve => {    
                this.available(project.id)
                .then(()=> this.delete(this.id))
                .then(()=>{
                    this.object = {
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        URI: project.uri,
                        author: this.object.author,
                        created: this.object.created,
                        updated: date.toISOString()
                    };
                    this.id = this.object.id;
                    return this.fb.child(this.id).update(this.object);
                })
                .then(()=>{
                    resolve(true);
                    return;
                }).catch(err => {
                    resolve(err);
                    return;
                });
            });

        }else{
            this.object.title = project.title;
            this.object.description = project.description;
            this.object.URI = project.URI;
            this.object.updated = date.toISOString();

            return new Promise(resolve => {    
                this.fb.child(this.id).update(this.object)
                .then(()=>{
                    resolve(true);
                    return;
                }).catch(err => {
                    resolve(err);
                    return;
                });
            });
        }
        
    }

    get(){
        if(this.id === null){
            throw new Error('No project specified');
        }

        if (this.object === null){
            //go to firebase
            return new Promise(resolve => {
                this.fb.child(this.id).once('value')
                .then(snap => {
                    this.object = snap.val();
                    resolve(this.object);
                })
                .catch(err => {
                    resolve(err);
                    return;
                });
            });
        }

        return this.object;
    }

    delete(){
        if(this.id === null){
            throw new Error('No project specified');
        }

        return new Promise(resolve => {
			this.fb.child(this.id).remove()
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

    validate(project){
        const fields = [
            'id',
            'title',
            'description',
            'URI',
        ];

        fields.forEach((field)=>{
            if (!field in project){
                return this.createError(
                    'Missing ' + field,
                    'A project must have an ' + field + 'field.'
                );
            }
        });

        let validations = [
            this.validateSlug(project.id),
            this.validateField(project.title, '', 'Invalid Title', 'The Title cannot be empty.'),
        ];

        validations.forEach((validation)=>{
            if (validation instanceof Error){
                return validation;
            }
        });
    }

    available(){
        return new Promise(resolve => {    
            this.fb.child(this.object.id).once('value')
            .then(snap => {
                if (snap.exists()) {
                    resolve(this.createError(
                        'Invalid Project Id',
                        'The Id has to be unique and this already belongs to a project you own.'
                    ));	
                }else{
                    resolve(true);
                }
                return;
            });
        });
    }
}