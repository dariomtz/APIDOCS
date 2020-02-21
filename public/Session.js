/**
The session handles everything that has to do with user accounts
**/

class Session {
	constructor(firebase){
		this.auth = firebase.auth();
		this.db = firebase.database();
		this.user = null;
		this.logged = false;
		this.observer();
	}

	signUp(email, password, username, photoURL = null){

		return new Promise(resolve => {
		    if(typeof username !== "string"){
				resolve(false);
				return;
			}
			
			var validCharacters = '1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM';

			for (var i = 0; i < username.length; i++) {
				var flag = false;

				for (var j = 0; j < validCharacters.length; j++) {
					if(username[i] == validCharacters[j]){
						flag = true
					}
				}

				if (!flag) {
					resolve(false);
					return;
				}
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
				resolve(true);
				return;
			})
			.catch(error => {
			  resolve(error);
			  return;
			});
		});
	}

	signIn(email, password){
		return new Promise(resolve => {
			this.auth.signInWithEmailAndPassword(email, password)
			.then((UserCrendential) => {
				resolve(true);
				return;
			})
			.catch((error) => {
				resolve(error);
			  	return;
			});
		});
	}

	signOut(){

		this.auth.signOut();
	}

	observer(){
		this.auth.onAuthStateChanged((user) => {
		  if (user) {
		    this.logged = true;
		    this.user = this.auth.currentUser;
		  } else {
		    this.logged = false;
		    this.user = null;
		  }
		});
	}
}