class EndpointController extends Controller{
	constructor(fb, model = null, view){
		super(fb, model, view);
		if(!this.model){
			this.model = new EndpointModel(this.fb, this.id);
		}
		this.parentId = this.fb.parent.key;
		this.HTMLid = (this.id) ? this.id + '-form' : this.parentId + '-add-endpoint';
	}

	async render(){
		return '\
		<div id="' + this.HTMLid + '" class="d-none container-fluid my-2">\
			<button id="' + this.HTMLid + '-close-btn" class="close cancel-' + this.HTMLid + '" aria-label="Close">\
				<span aria-hidden="true">&times;</span>\
			</button>\
			\
			<br><br>\
			<div class="input-group mb-3">\
				<div class="input-group-prepend">\
				<label class="input-group-text" for="input-method' + this.HTMLid + '">Method</label>\
				</div>\
				<select class="custom-select" id="input-method' + this.HTMLid + '">\
				<option value="GET">GET</option>\
				<option value="POST">POST</option>\
				<option value="PUT">PUT</option>\
				<option value="DELETE">DELETE</option>\
				<option value="PATCH">PATCH</option>\
				</select>\
			</div>\
			<div class="my-3">\
				<h4>URI Path</h4>\
				<input id="input-URI-' + this.HTMLid + '" class="form-control" placeholder="Path">\
			</div>\
			\
			<div class="my-3">\
				<h4>Summary</h4>\
				<input id="input-summary-' + this.HTMLid + '" class="form-control" placeholder="Summary" >\
			</div>\
			\
			<div class="my-3">\
				<h4>Description</h4>\
				<textarea id="input-description-' + this.HTMLid + '" class="form-control rounded" placeholder="Description" rows="2"></textarea>\
			</div>\
			\
			<div class="my-3">\
				<h4>Request</h4>\
				<textarea id="input-request-' + this.HTMLid + '" class="form-control rounded" placeholder="Request body" rows="2"></textarea>\
			</div>\
			\
			<div class="my-3">\
				<h4>Response</h4>\
				<input id="input-status-code-' + this.HTMLid + '" class="form-control my-1"  placeholder="Code" maxlength="3">\
				\
				<textarea id="input-response-' + this.HTMLid +'" class="form-control rounded" placeholder="Response body" rows="2"></textarea>\
			</div>\
			\
			<div id="error-' + this.HTMLid + '-wrapper"></div>\
			<div class="d-flex justify-content-end">\
				<button id="' + this.HTMLid + '-cancel-btn" class="btn btn-secondary mx-1 cancel-' + this.HTMLid + '">\
					Cancel\
				</button>\
				<button id="' + this.HTMLid + '-save-btn" type="button" class="btn btn-primary mx-1">Save</button>\
			</div>\
		</div>';
	}

	activate(){

	}

	async submit(){
		let endpoint = {
			method: $('#input-method-' + this.id).val(),
			summary: $('#input-summary-' + this.id).val(),
			description: $('#input-description-' + this.id).val(),
			URI: $('#input-URI-' + this.id).val(),
			request: $('#input-request-' + this.id).val(),
			response: $('#input-response-' + this.id).val(),
			statusCode: $('#input-status-code-' + this.id).val(),
		}

		let response = await this.model.set(endpoint);

		if (response instanceof Error){
			this.createErrorAlert(response, 'error-' + this.HTMLid, 'error-' + this.HTMLid + '-wrapper');
		}else{
			this.hide();
		}
	}

	async reset(){
		if(this.id){
			let endpoint = await this.model.get();
			$('#input-method-' + this.id).val(endpoint.method);
			$('#input-summary-' + this.id).val(endpoint.summary);
			$('#input-description-' + this.id).val(endpoint.description);
			$('#input-URI-' + this.id).val(endpoint.URI);
			$('#input-request-' + this.id).val(endpoint.request);
			$('#input-response-' + this.id).val(endpoint.response);
			$('#input-status-code-' + this.id).val(endpoint.statusCode);
		}else{
			$('#input-method-' + this.id).val('');
			$('#input-summary-' + this.id).val('');
			$('#input-description-' + this.id).val('');
			$('#input-URI-' + this.id).val('');
			$('#input-request-' + this.id).val('');
			$('#input-response-' + this.id).val('');
			$('#input-status-code-' + this.id).val('');
		}
        $('#error-' + this.HTMLid).remove();
	}
	
}