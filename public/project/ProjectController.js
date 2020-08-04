/**
 * ProjectController:
 * 
 * The form to create or to save a project.
 */
class ProjectController extends Controller{

    /**
     * Creates an instance of Project Controller
     * @constructor
     * 
     * @param {Object} fb Firebase Reference to a user's projects
     * @param {String} id Optional identifier for a project
     * @param {Objec} model Optional model object.
     */
    constructor(fb, model = null, view = null){
        super(fb, model, view);
        if(!model){
            this.model = new ProjectModel(this.fb, this.id);
        }
        this.HTMLid = (this.id) ? this.id + '-project-form' : 'project-form';
    }

    /**
     * Creates the HTML of this Object.
	 * @async
     * 
     * @returns {HTMLElement} 
     */
    render(){
        let saveBtn = (this.id) ? 'Save' : 'Create';
        return '\
        <div id="' + this.HTMLid + '" class="pb-2">\
            <button id="btn-close-project-form" class="close close-project-form" aria-label="Close">\
                <span aria-hidden="true">&times;</span>\
            </button>\
            <div class="my-3">\
                <h4>Title</h4>\
                <input id="input-title" class="form-control" placeholder="Title" maxlength="70">\
            </div>\
            \
            <div class="my-3">\
                <h4>Project Identifier</h4>\
                <input id="input-id" class="form-control" placeholder="Project ID" maxlength="30">\
                <small id="emailHelp" class="form-text text-muted">This ID will show up in your Project URL.</small>\
            </div>\
            \
            <div class="my-3">\
                <h4>Description</h4>\
                <textarea id="input-description" class="form-control rounded"  placeholder="Description" rows="2"></textarea>\
            </div>\
            \
            <div class="my-3">\
                <h4>Base URI</h4>\
                <input id="input-URI" class="form-control" placeholder="Base URI" maxlength="30">\
                <small class="form-text text-muted">This is where your API lives.</small>\
            </div>\
            \
            <div class="d-flex justify-content-end">\
                <button class="btn btn-outline-danger mx-2 close-project-form">Cancel</button>\
                <button id="save-project" class="btn btn-primary">'+ saveBtn +'</button>\
            </div>\
        </div>\
        ';
    }

    /**
     * Sends the content of the form to the ProjectModel Object.
     * @async
     */
    async submit(){
        let project = {
            title: $('#input-title').val(),
            id: $('#input-id').val(),
            description: $('#input-description').val(),
            URI: $('#input-URI').val(),
        }
        
        let response = await this.model.set(project);

        if (response instanceof Error){
            this.createErrorAlert(response, 'edit-project-alert', 'project-form');
        }else{
            this.hide();
        }
    }

    /**
     * Function that will run when the object is appended or prepended.
     */
    activate(){
        super.activate();
        $('.close-project-form').on('click', $.proxy(this.hide, this));
        $('#save-project').on('click', $.proxy(this.save, this));
    }

    /**
     * Function that will run when the form is hiden and shown.
     * @async
     */
    async reset(){
        if(this.id){
            //reset to object values
            $('#input-title').val(this.model.object.title);
            $('#input-id').val(this.model.object.id);
            $('#input-description').val(this.model.object.description);
            $('#input-URI').val(this.model.object.URI);
        }else{
            //reset to empty
            $('#input-title').val('');
            $('#input-id').val('');
            $('#input-description').val('');
            $('#input-URI').val('');
        }
        $('#input-title').focus();
        $('#edit-project-alert').remove();
    }
}