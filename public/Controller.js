/**
 * Controller
 * 
 * Controller is an abstract class for objects that manage user input.
 * 
 * All classes that extend Controller must implement the following methods:
 * 
 * - reset(): A method that will clean the form and will be automatically
 * 			 ran every time the form is hidden and shown.
 * 
 * - All methods that Showable must implement.
 */
class Controller extends Showable{
	/**
	 * Creates an instance of a Controller
	 * @constructor
	 * 
	 * @param {Object} fb The Firebase Reference object pointing to the place where this data is stored.
	 * @param {M extends Model} model Optional: The model object that is in charge of this object.
	 * @param {V extends View} view Optional: The view object that shows this object.
	 */
	constructor(fb, model = null,  view = null){
		super();
		this.fb = fb;
		this.view = view;
		this.model = model;

		if (model){	
			this.id = this.model.id;
        }else{
			this.id = null;
		}
	}

	/**
	 * Creates an alert showing the user the error and how to correct it.
	 * 
	 * @param {Error} error The error to show.
	 * @param {String} alertId The id of the alert.
	 * @param {String} parentId The id of the alert wrapper.
	 */
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

	show(){
		super.show();
		this.reset();
		
		if (this.view){
			this.view.hide();
		}
	}
	
    hide(){
        super.hide();
		this.reset();

		if (this.view){
			this.view.show();
		}
	}
	
	pressKey(e){
		if(e.which === 13){
			this.submit();
		}
	}

	activate(){
		this.hide();
	}
}