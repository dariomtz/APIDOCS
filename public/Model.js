class Model{
    constructor(fb, id = null){
        this.fb = fb;
        this.id = id;
    }

    validateField(fieldValue, invalidValue, errName, errMessage){
		if(fieldValue === invalidValue){
			return this.createError(errName, errMessage);
		}
		return null;
    }

    createError(name, message){
        let err = new Error();
        err.name = name;
        err.message = message;
        return err;
    }
    
    validateSlug(slug, field){
		if(typeof slug !== "string"  || slug === ''){
            return this.createError(
                'Invalid ' + field,
                'The ' + field + 'field can have only lower case letters, numbers and hyphens.'
            )
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
				return this.createError(
                    'Invalid ' + field,
                    'The ' + field + 'field can have only lower case letters, numbers and hyphens.'
                )
			}
		}

		return null;
    }
}