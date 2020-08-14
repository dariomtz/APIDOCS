class AddNewView extends View {
    constructor(fb, id, parentView){
        super(fb, id);
        this.HTMLid = 'btn-add-' + this.id;
        this.parentView = parentView;
        if (this.fb.key === 'resources'){
            this.type = 'resource';
            this.model = new ResourceModel(this.fb);
            this.controller = new ResourceController(this.fb, this.model, this);
        } else {
            this.type = 'endpoint';
            this.model = new EndpointModel(this.fb);
            this.controller = new EndpointController(this.fb, this.model, this);
        }
        
    }

    async render(){
        return '\
        <div id="' + this.HTMLid +'-wrapper">\
            <button id="' + this.HTMLid + '" type="button" class="edit btn btn-outline-primary btn-block">\
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
        if (this.model.id){
            let view;
            if(this.type === 'resource'){
                view = new ResourceView(this.fb, this.model.id, true, this.model);
                this.model = new ResourceModel(this.fb);
                this.controller.model = this.model;
            }else{
                view = new EndpointView(this.fb, this.model.id, true, this.model);
                this.model = new EndpointModel(this.fb);
                this.controller.model = this.model;
            }

            this.parentView.addChild(view);
            
        }
    }
}