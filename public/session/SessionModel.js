class SessionModel extends Model{
    constructor(fb, listener){
        super(null, null);
        this.auth = fb.auth();
        this.db = fb.database();
        this.listener = document.getElementById(listener);
		this.observer();
		this.user = null;
		this.logged = false;
    }

    signUp(email, password, confirmation, username, photoURL = null){
		return new Promise(resolve => {
            this.available(username)
            .then(available => {
                var validations = [
                    this.validateSlug(username, 'Username'),
                    available,
                    this.validateField(password === confirmation, false, 'Invalid Password', 'The password does not match with the confirmation.')
                ];

                for (const validation of validations) {
                    if (validation instanceof Error) {
                        resolve(validation);
                        console.log(validation);
                        return;
                    }
                }

                return this.auth.createUserWithEmailAndPassword(email, password)
            })
			.then(UserCrendential => {
				this.user = this.auth.currentUser;
				return this.user.updateProfile({
					displayName: username,
					photoURL: photoURL,
				});
			})
			.then(v => {
				this.user = this.auth.currentUser;
				return this.db.ref(this.user.displayName).set({
					userName: this.user.displayName,
					userId: this.user.uid,
					email: this.user.email,
					photoURL: this.user.photoURL,
					projects: null,
				});
			})
			.then(() => {
				window.location.href = "/" + this.user.displayName;
				resolve(true);
				return;
			})
			.catch(error => {
				error.name = 'Invalid Sign up'
			  resolve(error);
			  return;
			});
		});
	}

	signIn(email, password){
		return new Promise(resolve => {
			this.auth.signInWithEmailAndPassword(email, password)
			.then((UserCrendential) => {
				window.location.href = "/" + UserCrendential.user.displayName;
				resolve(true);
				return;
			})
			.catch((error) => {
				error.name = 'Invalid Sign in'
				if(error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
					error.message = 'There is no user record corresponding to this email.';
				}else if (error.message === 'The password is invalid or the user does not have a password.') {
					error.message = 'The password is invalid.';
				}

				resolve(error);
			  	return;
			});
		});
    }
    
    signOut(){
		this.auth.signOut();
		window.location.reload();
	}

    observer(){
		this.auth.onAuthStateChanged((user) => {
			if (user) {
				this.logged = true;
				this.user = this.auth.currentUser;
				this.listener.checked = true;
				this.listener.onchange();

			} else {
				this.logged = false;
				this.user = null;
				this.listener.checked = false;
				this.listener.onchange();
			}
		});
    }
    
    available(username){
        return new Promise(resolve => {   
            if(username === "") {
                resolve(null);
                return;
            }
            this.db.ref(username).once('value')
            .then(snap => {
                if (snap.exists()) {
                    resolve(this.createError(
                        'Invalid Project Username',
                        'The Username has to be unique and this already belongs to a project you own.'
                    ));	
                }else{
                    resolve(null);
                }
                return;
            });
        });
    }
}