class Session {
	constructor(firebase, listener){
		this.auth = firebase.auth();
		this.db = firebase.database();
		this.observer();
		this.user = null;
		this.logged = false;
		this.listener = document.getElementById(listener);
	}

	signUp(email, password, username, photoURL = null){

		return new Promise(resolve => {
		    var usernameValidation = validateSlug(username);

		    if (usernameValidation instanceof Error) {
		    	resolve(usernameValidation);
		    	usernameValidation.name = 'Invalid user name';
		    	return;
		    }

			this.auth.createUserWithEmailAndPassword(email, password)
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
				error.name = 'Invalid sign up'
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
				error.name = 'Invalid sign in'
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
}