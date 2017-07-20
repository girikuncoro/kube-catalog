json = '{' + 
			'"0": {"name": "psql", "id": "id1", "data": {"bundle": "bundle1", "access_url": "www.vmware.com", "credential": "credential1", "status": "starting"}},' + 
			'"1": {"name": "tomcat", "id": "id2", "data": {"bundle": "bundle2", "access_url": "www.tomcat.com", "credential": "credential2", "status": "finished"}}' + 
		'}';
services = getServiceName();
num_rows = services.length;
num_cols = 5;
populateTable();

function getServiceName() {
	json_obj = JSON.parse(json);
	num_items = Object.keys(json_obj).length;
	services = [];
	for (i = 0; i < num_items; i++) {
		services.push(json_obj[i]);
	}
	return services;
}


function populateTable() {
	table = document.getElementById("statusTable");
	for (var i = 0; i < num_rows; i++) {
		row = table.insertRow(i);

		j = 0;
		cell0 = row.insertCell(j++);
	    cell0.innerHTML= services[i].name;

	    data = services[i].data;
	    cell1 = row.insertCell(j++);
	    cell1.innerHTML= data.bundle;

	    cell2 = row.insertCell(j++);
	    cell2.innerHTML= data.access_url;

	    cell3 = row.insertCell(j++);
	    cell3.innerHTML= data.credential;

	    cell4 = row.insertCell(j++);
	    cell4.innerHTML= data.status;
	}
}

function getJson() {

}





