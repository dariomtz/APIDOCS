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

	/**
	 * When we tal about a resource we mean an object of this type:
	 * {
			id: push.key,
			method: method,
			sumary: sumary,
			description: description,
			uriPath: uriPath,
			requestBody: requestBody,
			responseBody: responseBody,
			responseStatus: responseStatus,
		}

		Set makes all this attributes available in this object.
		Ex:
			this.id;
			this.method;
			etc.

		This documentation can be deleted when this method is done.
	 */
	setEndpoint(endpoint){

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