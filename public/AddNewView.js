class AddNewView extends View {
    constructor(fb, id, parentView){
        super(fb, id);
        this.HTMLid = 'btn-add-' + this.id;
        this.parentView = parentView;
        if (this.fb.key === 'resources'){
            this.model = new ResourceModel(this.fb);
            this.controller = new ResourceController(this.fb, this.model, this);
        } else {
            //model and controller for endpoint
        }
        
    }

    async render(){
        return '\
        <div id="' + this.HTMLid +'-wrapper">\
            <button id="' + this.HTMLid + '" type="button" class="edit btn btn-outline-primary btn-block my-3">\
                <span class="h3">+</span>\
            </button>\
        </div>';
    }

    activate(){
        $('#' + this.HTMLid).on('click', $.proxy(this.showController, this));
        this.controller.appendTo($('#' + this.HTMLid + '-wrapper'));
    }

    showController(){
        this.controller.show();
    }

    show(){
        super.show();
        if (this.controller.model.id){
            //create new resource
            let resource = new ResourceView(null, null, true, this.model);
            this.parentView.addChild(resource);
            this.model = new ResourceModel(this.fb);
            this.controller.model = this.model;
        }
    }
}