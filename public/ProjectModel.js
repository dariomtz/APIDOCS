/**
 * Project Model:
 * @extends Model
 * 
 * A ProjectModel instance allows you to perform CRUD operations from the Firebase database related to projects.
 */
class ProjectModel extends Model{
    /**
     * Creates an instance of ProjectModel
     * @constructor
     * 
     * @param {Object} fb Firebase Reference to the projects of a user.
     * @param {String} id Identifier of the project.
     */
    constructor(fb, id = null){
        super(fb, id);
        this.user = fb.parent.key;
        this.object = null;
    }

    /**
     * If the project object passed is valid, it creates or updates the project on the database.
     * 
     * @param {Object} project A project Object.
     * 
     * @returns {Promise}
     */
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
                        URI: project.URI,
                        author: this.user,
                        created: date.toISOString(),
                        updated: date.toISOString()
                    };
                    console.log(this.object);
                    this.id = this.object.id;
                    this.fb.child(this.id).set(this.object)
                    .then(()=>{
                        window.location.href = "/" + this.user + "/" + this.id;
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

    /**
     * Gets the specified project.
     * Fails if no project has been specified.
     * 
     * @returns {Promise} 
     */
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

    /**
     * Deletes the specified project.
     * Fails if no project has been specified.
     * 
     * @returns {Promise}
     */
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

    /**
     * Checks that a project is valid.
     * 
     * @param {Object} project A project Object.
     * 
     * @returns {Error} The error of the project, otherwise null.
     */
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
            this.validateSlug(project.id, 'Project Identifier'),
            this.validateField(project.title, '', 'Invalid Title', 'The Title field cannot be empty.'),
            this.validateField(project.title, '', 'Invalid Description', 'The Description field cannot be empty.'),
        ];

        for (const validation of validations) {
            if (validation instanceof Error){
                return validation;
            }
        }

        return null;
    }

    /**
     * Checks if an Id is still available.
     * 
     * @param {String} id Identifier of a new project.
     * 
     * @returns {Promise}
     */
    available(id){
        return new Promise(resolve => {    
            this.fb.child(id).once('value')
            .then(snap => {
                if (snap.exists()) {
                    resolve(this.createError(
                        'Invalid Project Id',
                        'The Id has to be unique and this already belongs to a project you own.'
                    ));	
                }else{
                    resolve(null);
                }
                return;
            });
        });
    }
}