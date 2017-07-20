item_name = getItemName();
item_name_shortIntro = getShortIntroduction(item_name);
item_introduction = getIntroduction(item_name);
item_perequisites = getPerequisites(item_name);
item_image = getImageName(item_name);

function getItemName() {
	return "psql";
}

function getShortIntroduction(item_name) {
    return "Short Introduction";
}

function getIntroduction(item_name) {
    return "Introduction";
}

function getPerequisites(item_name) {
	return "perequisites";
}

function getImageName(item_name) {
	return "img/" + item_name + "-logo.png";
}

div_item_name = $( "#item_name" );
div_item_name.append( "<h3>" + item_name + "</h3>" );
div_item_name.append( "<p>" + item_name_shortIntro + "</p>" );

div_item_introduction = $( "#item_introduction" );
div_item_introduction.append( "<h3>Introduction</h3>" );
div_item_introduction.append( "<p>" + item_introduction + "</p>" );

div_item_perequisites = $( "#item_perequisites" );
div_item_perequisites.append( "<h3>Prerequisites</h3>" );
div_item_perequisites.append( "<p>" + item_perequisites + "</p>" );

div_item_image = $( "#item_image" );
div_item_image.attr("src",item_image);

function onClickDeploy() {
	alert(item_name);
}