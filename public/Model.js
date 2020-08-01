/**
 * Model:
 * 
 * Model represents the shape of the data. Model objects store data retrieved from the database.
 * This Model class is abstract, meaning that it should not be used by itself, 
 * but rather other classes that will work as a Model should inherit from it. 
 * 
 */
class Model{
    /**
     * Creates an instance of Model.
     * @constructor
     * 
     * @param {Object} fb 
     * The firebase reference object in which the model should be added (parent reference).
     * @param {String} id Identifier for the object.
     */
    constructor(fb, id = null){
        this.fb = fb;
        this.id = id;
    }

    /**
     * Validates that a value is not invalid.
     * 
     * @param {String} fieldValue The value of the field.
     * @param {String} invalidValue The value that must not be in this field.
     * @param {String} errName Name of the error.
     * @param {String} errMessage Details of the error.
     * 
     * @returns {Error} An instance of error if it is invalid, null otherwise.
     */
    validateField(fieldValue, invalidValue, errName, errMessage){
		if(fieldValue === invalidValue){
			return this.createError(errName, errMessage);
		}
		return null;
    }

    /**
     * Creates an instance of Error with the name and message passed.
     * 
     * @param {String} name Name of the error.
     * @param {String} message Details of the error.
     * 
     * @returns {Error} An instance of Error with the name and message passed.
     */
    createError(name, message){
        let err = new Error();
        err.name = name;
        err.message = message;
        return err;
    }
    
    /**
     * Checks if slug is a valid slug.
     * 
     * @param {String} slug The String to check
     * @param {String} field The name of the field to check
     * 
     * @returns {Error} An instance of error if it is invalid, null otherwise.
     */

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
                    'The ' + field + ' field can have only lower case letters, numbers and hyphens.'
                )
			}
		}

		return null;
    }
}