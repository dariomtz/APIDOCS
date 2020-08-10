class ResourceController extends Controller {
    constructor(fb, model = null, view = null){
        super(fb, model, view);
        if(!model){
            this.model = new ResourceModel(fb, null);
        }

        this.HTMLid = (this.id) ? this.id + '-resource-form': 'add-resource-form';
    }

    render(){
        return '\
        <div id="' + this.HTMLid + '" class="container-fluid my-2">\
            <button id="close-' + this.HTMLid + '" type="button" class="close" aria-label="Close">\
                <span aria-hidden="true">&times;</span>\
            </button>\
            <div class="my-3">\
                <h4>Title</h4>\
                <input id="input-title-' + this.HTMLid + '" class="form-control" placeholder="Title" maxlength="70">\
            </div>\
            \
            <div class="my-3">\
                <h4>Description</h4>\
                <textarea id="input-description-' + this.HTMLid + '" class="form-control rounded" placeholder="Description" rows="2">\
                </textarea>\
            </div>\
            \
            <div class="d-flex justify-content-end">\
                <button id="cancel-' + this.HTMLid + '" type="button" class="btn btn-secondary mx-1">Cancel</button>\
                <button id="save-' + this.HTMLid + '" type="button" class="btn btn-primary mx-1"></button>\
            </div>\
        </div>\
        ';
    }

    activate(){
        super.activate();
        $('#close-' + this.HTMLid).on('click', $.proxy(this.hide, this));
        $('#cancel-' + this.HTMLid).on('click', $.proxy(this.hide, this));
        $('#save-' + this.HTMLid).on('click', $.proxy(this.submit, this));
        if (this.id){
            $('#save-' + this.HTMLid).html('Save');
        }else{
            $('#save-' + this.HTMLid).html('Add');
        }
    }

    async submit(){
        let resource = {
            title: $('#input-title-' + this.HTMLid).val(),
            description : $('#input-description-' + this.HTMLid).val()
        }

        let response = await this.model.set(resource);

        if (response  instanceof Error){
            this.createErrorAlert(response, 'error-' + this.HTMLid, this.HTMLid);
        }else{
            this.hide();
        }
    }

    async reset(){
        if (this.id){
            let resource = await this.model.get();
            $('#input-title-' + this.HTMLid).val(resource.title);
            $('#input-description-' + this.HTMLid).val(resource.description);
        }else{
            $('#input-title-' + this.HTMLid).val('');
            $('#input-description-' + this.HTMLid).val('');
        }
        $('#input-title-' + this.HTMLid).focus();
        $('#error-' + this.HTMLid).remove();
    }
}