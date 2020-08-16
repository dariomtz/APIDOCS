/**
 * View:
 * 
 * View is an abstract class for objects that are just a way of showing information (user interface).
 * To properly implement a view, it is necessary to understand the Showable class.
 * 
 */

class View extends Showable{
	/**
	 * Creates an instance of a View
	 * @constructor
	 * 	
	 * @param {Object} fb The Firebase Reference object pointing to the place where this data is stored.
	 * @param {String} id The identifier of the object that will be rendered.
	 * @param {Boolean} editable A boolean value that represents whether or not the logged in user has authorization to edit this object.
	 * @param {M extends Model} model Optional: The model object that is in charge of this object.
	 */
	constructor(fb, id, editable, model =null){
		super();
		this.fb = fb;
		this.id = id;
		this.editable = editable;
		this.model = model;
	}

	/**
	 * Appends a view object to the list of this object.
	 * 
	 * @param {V extends View} view A view object
	 */
	addChild(view){
		view.appendTo($('#' + this.HTMLid + '-list'));
	}
	

}