/**
 * ProjectPreView:
 * 
 * A View that shows the core information of a project.
 */
class ProjectPreView extends View {

	/**
	 * Creates an instance of ProjectPreview.
	 * @constructor
	 * 
	 * @param {Object} fb Firebase Reference to the project.
	 */
    constructor(fb){
        super(fb);
        this.model = new ProjectModel(fb.parent, fb.key);
		this.id = this.model.id;
		this.HTMLid = this.id;
	}
	
	/**
     * Creates the HTML of this Object.
	 * @async
     * 
     * @returns {HTMLElement} 
     */
    async render(){
        let project = await this.model.get();

        let tooLong = '';
		if(project.description.length > 110){
			tooLong += '...';
		}

		return '<div id="'+ this.id +'" class="col p-2"><div class="card m-auto" style="height: 15rem;">' +
	  		'<div class="card-body">' +
	   			'<h5 class="card-title">' + project.title + '</h5>' +
	    		'<h6 class="card-subtitle mb-2 text-muted">' + project.id + '</h6>' +
	    		'<p class="card-text text-justify">' + project.description.substring(0,110) + tooLong + '</p>' +	
	  		'</div>' +
	  		'<div class="card-footer d-flex justify-content-end">'+
	    		'<a href="/' + project.author + '/' + project.id + '" class="card-link">View Project</a>' +
			'</div>' +
		'</div></div>';
    }

}