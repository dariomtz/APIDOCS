class Controller {
	constructor(firebase){
		this.firebase = firebase;
		this.db = firebase.database();
	}

	validateSlug(slug){
		if(typeof slug !== "string"  || slug === ''){
	    	var e = new Error('This field must be a non empty string with only lower case letters, numbers and hyphens.');
			return e;
		}
		
		var validCharacters = '1234567890qwertyuiopasdfghjklzxcvbnm-';

		for (var i = 0; i < slug.length; i++) {
			var flag = false;

			for (var j = 0; j < validCharacters.length; j++) {
				if(slug[i] == validCharacters[j]){
					flag = true
				}
			}

			if (!flag) {
				var e = new Error('This field must have only lower case letters, numbers and hyphens.');
				return e;
			}
		}

		return true;
	}
}