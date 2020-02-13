/**
The UserController class helps you
**/


class UserController {
	constructor(firebase){
		this.auth = firebase.auth();
		this.db = firebase.database();
		this.user = null;
		this.logged = false;
		this.observer();
	}

	async signUp(email, password, username){

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
			.then((UserCrendential) => {
				this.user = this.auth.currentUser;
				this.user.updateProfile({
					displayName: username,
				})
				.then(() => {
					this.db.ref(this.user.displayName).set({
						userName: this.user.displayName,
						userId: this.user.uid,
						email: this.user.email,
						photoURL: this.user.photoURL,
						projects: null,
					})

					//return true on success
					resolve(true);
					return;
				})
			})
			.catch((error) => {
			  resolve(error);
			  return;
			});
		});
	}

	async signIn(email, password){
		this.auth.signInWithEmailAndPassword(email, password)
		.then((UserCrendential) => {
			return UserCrendential.user;
		})
		.catch((error) => {
		  return error;
		});
	}

	signOut(){
		this.auth.signOut();
		this.user = null;
	}

	observer(){
		this.auth.onAuthStateChanged((user) => {
		  if (user) {
		    this.logged = true;
		  } else {
		    this.logged = false;
		  }
});
	}
}