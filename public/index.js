var session = new Session(firebase);
var locationList = window.location.pathname.toString().split('/');
var username = null,
 projectId = null,
 user = null,
 project = null;

switch(locationList.length){
	case 3:
		projectId = locationList[2];
	case 2:
		username = locationList[1];
		break;
}

if(username){
	user = new User(firebase, username);
}

if(projectId){
	project = new Project(firebase, username, projectId);
}
