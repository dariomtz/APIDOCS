class View extends Showable{
	constructor(fb, id, editable, model =null){
		super();
		this.fb = fb;
		this.id = id;
		this.editable = editable;
		this.model = model;
	}

	addChild(view){
		view.appendTo($('#' + this.HTMLid + '-list'));
	}
	

}