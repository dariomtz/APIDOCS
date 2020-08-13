class EndpointModel extends Model{
    constructor(fb, id = null){
        super(fb, id);
        this.object = null;
    }

    set(endpoint){
        let validation = this.validate(endpoint);

        if (validation instanceof Error){
            return validation;
        }

        if (!this.id){
			//create new endpoint
			let push = this.fb.push();
			endpoint.id = push.key;
			
			return new Promise(resolve => {
				push.set(endpoint)
				.then(()=>{
					this.id = endpoint.id;
					this.object = endpoint;
					resolve(null);
					return;
				})
				.catch(err =>{
					resolve(err);
					return;
				})
			});

		}else{
			//update existing endpoint
			return new Promise(resolve =>{
				this.fb.child(this.id).update(endpoint)
				.then(()=>{
					endpoint.id = this.id;
					this.object = endpoint;
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
            throw Error('No endpoint specified');
        }

        if (!this.object){
            //retreive from firebase
            return new Promise(resolve => {
                this.fb.child(this.id).once('value')
                .then(snap => {
                    this.object = snap.val();
                    resolve(this.object);
                    return 
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
        if (!this.id){
            throw Error('No endpoint specified');
        }

        return new Promise(resolve => {
            this.fb.child(this.id).remove()
            .then(()=>{
                resolve(null);
                return;
            })
            .catch(err => {
                resolve(err)
                return;
            })
        })
    }

    validate(endpoint){
        let fields = [
            'method',
            'summary',
            'description',
            'URI',
            'statusCode',
            'request',
            'response'
        ];
		
        let validations = [
            this.validateField(endpoint.method, null, 'Invalid Method', 'You must select a method.'),
            this.validateField(endpoint.description, '', 'Invalid description', 'The description cannot be empty'),
            this.validateField(endpoint.summary, '', 'Invalid Summary', 'The Summary field cannot be empty'),
            this.validateField(endpoint.URI, '', 'Invalid URI Path', 'The URI Path cannot be empty'),
            this.validateField(endpoint.statusCode, '', 'Invalid Response Code', 'The Response Code cannot be empty'),
            this.validateField(isNaN(endpoint.statusCode), true, 'Invalid Response Code', 'The Response Code must be a number'),
        ];
        
        this.validateObject(endpoint, fields, validations);
    }
}
