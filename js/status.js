const services_status = 'mock-data/status.json';
const NUM_COLS = 5;

getServiceData();


function getServiceData() {
	$.getJSON(services_status, (res) => {
		console.log(res);
		services = [];
		for (i = 0; i < res.results.length; i++) {
			services.push(res.results[i]);
		}
		num_rows = services.length;
		num_cols = NUM_COLS;

		populateTable(services, num_rows, num_cols);
	});
}


function populateTable(services, num_rows, num_cols) {
	debugger;
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




