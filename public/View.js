class View extends Showable{
	constructor(fb, id){
		super();
		this.fb = fb;
		this.id = id;
	}

	addChild(view){
		view.appendTo($('#' + this.HTMLid + '-list'));
	}
	

}