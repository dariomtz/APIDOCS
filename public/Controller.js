class Controller extends Showable{
	constructor(firebase = null){
		super();
		this.firebase = firebase;
		if(firebase){
			this.db = firebase.database();
		}
	}

	createErrorAlert(error, alertId, parentId){
		var errorAlert = document.createElement('div');
		errorAlert.className = 'alert alert-danger';
		errorAlert.innerHTML = error.name + ': ' + error.message;

		if($('#' + alertId).length){
			$('#' + alertId).remove();
		}

		errorAlert.id = alertId;

		$('#' + parentId).prepend(errorAlert);
		return;
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

	validateField(fieldValue, invalidValue, errName, errMessage){
		if(fieldValue === invalidValue){
			let err = new Error();
			err.name = errName;
			err.message = errMessage;
			return err;
		}
		return null;
	}
}