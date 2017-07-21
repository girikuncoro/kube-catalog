// standalone_service = 'mock-data/standalone-service.json';
standalone_service = 'mock-data/standalone-gitlab.json';

var service_name;
populateDetails();

function populateDetails() {
	var item_name, item_name_shortIntro, item_introduction, item_image;
	$.getJSON(standalone_service, (res) => {
		console.log(res);
		item_name = res.name;
		service_name = item_name;
		item_name_shortIntro = res.data.short_intro;
		item_introduction = res.data.introduction;
		item_image = res.imgSrc;

		// inject descriptions to html
		div_item_name = $( "#item_name" );
		div_item_name.append( "<h3>" + item_name + "</h3>" );
		div_item_name.append( "<p>" + item_name_shortIntro + "</p>" );

		div_item_introduction = $( "#item_introduction" );
		div_item_introduction.append( "<h3>Description</h3>" );
		div_item_introduction.append( "<p>" + item_introduction + "</p>" );

		div_item_image = $( "#item_image" );
		div_item_image.attr("src", item_image);
	});
}

function onClickDeploy() {
	alert(service_name);
}