class EndpointView extends View{
	constructor(controller, endpoint, parentId,  editable = false){
		super(controller);

		this.setEndpoint(endpoint);

		$('#endpoints-' + parentId).append(this.createHTML());

		this.populateEndpoint();

		if(editable){
			//on-click events for features that only the owner of the project should have access to must go here

		}else{
			$('.edit-endpoint').remove();
		}
	}

	setEndpoint(endpoint){
		this.id = endpoint.id;
		this.method = endpoint.method;
		this.summary = endpoint.summary;
		this.description = endpoint.description;
		this.uriPath = endpoint.uriPath;
		this.requestBody = endpoint.requestBody;
		this.responseBody = endpoint.responseBody;
		this.responseStatus = endpoint.responseStatus;
	}

	/** 
	 * makes the html match the values of the endpoint.
	 * The values of the endpoint must be set before this method is used.
	 * */
	populateEndpoint(){
			
	}

	createHTML(){
		return '\
		<div id="' + this.id + '">\
			<span class="h4">Method: </span>\
			<span id="endpoint-method' + this.id + '" class="h4"></span>\
			<span class="h4">URI Path: </span>\
			<span id="endpoint-uriPath-' + this.id + '" class="h4"></span>\
			<span >Summary: </span>\
			<span id="endpoint-summary-' + this.id + '"></span>\
			<span >Description: </span>\
			<span id="endpoint-description-' + this.id + '"></span>\
			<span >Request Body: </span>\
			<span id="endpoint-req-body-' + this.id + '"></span>\
			<span >Response Body: </span>\
			<span id="endpoint-res-body-' + this.id + '"></span>\
			<span >Response Status Code: </span>\
			<span id="endpoint-res-status-' + this.id + '"></span>\
		</div>\
		';
	}

	
}