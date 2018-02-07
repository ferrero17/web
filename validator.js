var errors = new Array();

$(function(){
	var fn = document.location.href.match(/[^\/]+$/)[0];
	switch(fn){
		case "index.html":
			checkIndex();
			break;

		case "contacte.html":
			checkContacte();
			break;

		case "referencies.html":
		case "references.html":
			checkReferencies();
			break;

		default:
			errors.push("Incorrect HTML file name: " + fn);	
			printResults(0, 0);		
			break;
	}
});
function checkIndex(){
	//check CSS files
	var css = $("link");
	var index = false;
	var layout = false;
	$("link").each(function() {
		if($(this).attr("href").includes("index.css")) index = true;
		else if($(this).attr("href").includes("layout.css")) layout = true;
	});	
	if(!index) errors.push("Unable to find the index.css file.");
	if(!layout) errors.push("Unable to find the layout.css file.");
	if($("*[style]").length > 0)  errors.push("Forbidden inline CSS detected.");

	//checking labels
	var layers = $("div");
	var abs = false;
	var rel = false;
	var float = false;
	var clear = false;

	$("div").each(function() {
		if($(this).css("float") != "") float = true;
		if($(this).css("position") == "absolute") abs = true;
		if($(this).css("position") == "relative") rel = true;
		if($(this).css("clear") != "") clear = true;
	});	
	if(!abs) errors.push("Unable to find an absolute positioned layer.");
	if(!rel) errors.push("Unable to find a relative positioned layer.");
	if(!float) errors.push("Unable to find a floating layer.");
	if(!clear) errors.push("Unable to find a clearing layer.");

	//checking headers
	if($("h1").length == 0)  errors.push("Unable to find a level 1 heading.");
	if($("h2").length == 0)  errors.push("Unable to find a level 2 heading.");

	//checking paragraphs
	var length = 0;	
	$("p").each(function() {
		length += $(this).text().length;
	});	
	if(!length) errors.push("Not enough amount of text inside the paragraphs.");	

	//javascript (pending of improvement)
	if($("[onclick]").length == 0) errors.push("Unable to find any behaviour (javascript).");

	//other checks
	if($("p > br").length == 0) errors.push("Unable to find a line break inside a paragraph.");
	if($("img").length == 0) errors.push("Unable to find any image.");
	if($("video").length == 0) errors.push("Unable to find any video.");

	//checking CSS
	var font = false;
	var border = false;
	var text = false;
	var color = false;
	var background = false;
	var float = false;
	var position = false;
	var clear = false;
	var width = false;
	var height = false;
	var margin = false;
	var padding = false;
	var border = false;
	var anchor = false;

	//WARNING: DOES NOT WORK ON GOOGLE CHROME FOR LOCAL FILES... USE --allow-file-access-from-files IN ORDER TO FIX
	$.each(document.styleSheets, function (index, cssFile) {
		var classes = cssFile.rules || cssFile.cssRules; 
		for (var x = 0; x < classes.length; x++) {		
			if($(classes[x].selectorText).length > 0){				
				//only for currently applied styles		
				font = font || classes[x].cssText.includes("font");
				border = border || classes[x].cssText.includes("border");
				text = text || classes[x].cssText.includes("text");
				color = color || classes[x].cssText.includes("color");
				background = background || classes[x].cssText.includes("background");
				float = float || classes[x].cssText.includes("float");
				position = position || classes[x].cssText.includes("position");
				clear = clear || classes[x].cssText.includes("clear");
				width = width || classes[x].cssText.includes("width");
				height = height || classes[x].cssText.includes("height");
				margin = margin || classes[x].cssText.includes("margin");
				padding = padding || classes[x].cssText.includes("padding");
				border = border || classes[x].cssText.includes("border");
				anchor = anchor || classes[x].cssText.includes("top") || classes[x].cssText.includes("right") || classes[x].cssText.includes("bottom") || classes[x].cssText.includes("top");
			}
		}
	});

	if(!font) errors.push("Unable to find a font style.");
	if(!border) errors.push("Unable to find a border style.");
	if(!text) errors.push("Unable to find a text style.");
	if(!color) errors.push("Unable to find a color style.");
	if(!background) errors.push("Unable to find a background style.");
	if(!float) errors.push("Unable to find a float style.");
	if(!position) errors.push("Unable to find a position style.");
	if(!clear) errors.push("Unable to find a clear style.");
	if(!width) errors.push("Unable to find a width style.");
	if(!height) errors.push("Unable to find a height style.");
	if(!margin) errors.push("Unable to find a margin style.");
	if(!padding) errors.push("Unable to find a padding style.");
	if(!border) errors.push("Unable to find a border style.");
	if(!anchor) errors.push("Unable to find a anchor style.");

	//display errors an mark (pending)		
	printResults(2, 30);
}
function checkContacte(){
	//check CSS files
	var css = $("link");
	var contacte = false;
	var layout = false;
	$("link").each(function() {
		if($(this).attr("href").includes("contacte.css")) contacte = true;
		else if($(this).attr("href").includes("layout.css")) layout = true;
	});	
	if(!contacte) errors.push("Unable to find the contacte.css file.");
	if(!layout) errors.push("Unable to find the layout.css file.");
	if($("*[style]").length > 0)  errors.push("Forbidden inline CSS detected.");

	//checking form
	var form = $("form");
	if(form.length == 0){
		errors.push("Unable to find any form.");
		form = $("body");
	} 
	
	//checking table
	var table = form.find("table");
	if(table.length == 0){
		errors.push("Unable to find any table.");
		table = $("body");
	} 

	//checking input fields	
	checkInputs("text", table, 2);
	checkInputs("number", table, 1);	
	checkInputs("email", table, 1);
	checkInputs("radio", table, 3);
	checkInputs("checkbox", table, 3);
	
	//check select
	var select = table.find("select");
	checkLabels(select);
	if(select.length == 0){
		 errors.push("Unable to find any select field.");
		 errors.push("Unable to find a label input for the select field.");
	}
	else{
		if(select.children().length < 3) errors.push("Unable to find all the options for the select field.");
		else if(select.children("[selected]").length == 0) errors.push("Unable to find a default option for the select field.");
		
	}

	//check textarea
	var textarea = table.find("textarea");
	checkLabels(textarea);
	if(table.find("textarea[placeholder]").length == 0) errors.push("Unable to find the placeholder attribute defined on the textarea.");

	//other checks
	if($("div").length == 0) errors.push("Unable to find any layer.");
	if($("h1").length == 0)  errors.push("Unable to find a level 1 heading.");
	if($("h2").length == 0)  errors.push("Unable to find a level 2 heading.");
	if($("p").length == 0) errors.push("Unable to find any paragraph.");

	//display errors an mark (pending)		
	printResults(2, 29);
}
function checkReferencies(){
	//check CSS files
	var css = $("link");
	var referencies = false;
	var layout = false;
	$("link").each(function() {
		if($(this).attr("href").includes("referencies.css") || $(this).attr("href").includes("references.css")) referencies = true;
		else if($(this).attr("href").includes("layout.css")) layout = true;
	});	
	if(!referencies) errors.push("Unable to find the referencies.css file.");
	if(!layout) errors.push("Unable to find the layout.css file.");
	if($("*[style]").length > 0)  errors.push("Forbidden inline CSS detected.");
	
	//check for link list (could be the menu... does'nt matter)
	var ul = $("ul");
	if(ul.length == 0) errors.push("Unable to find any unordered list.");
	if(ul.find("a").length == 0) errors.push("Unable to find any link inside a list.");

	//other checks
	if($("div").length == 0) errors.push("Unable to find any layer.");
	if($("h1").length == 0)  errors.push("Unable to find a level 1 heading.");
	if($("h2").length == 0)  errors.push("Unable to find a level 2 heading.");
	if($("p").length == 0) errors.push("Unable to find any paragraph.");

	//display errors an mark (pending)		
	printResults(2, 9);
}
function checkInputs(type, table, num){
	var input = table.find("input[type=" + type + "]");
	while(num > 0){
		if(input.length < num--){
			errors.push("Unable to find a " + type + " input field.");
			errors.push("Unable to find a label input for the " + type + " field.");
	   }
	}
	
	if(type == "radio" || type == "checkbox"){ 
		checkSharedName(input, type);	
		var def = table.find("input[type=" + type + "][checked]");
		if(def.length == 0) errors.push("Unable to find a default value for the" + type + " field.");
	}
	
	if(type != "radio" && type != "checkbox")
		checkLabels(input);	
}
function checkLabels(input){
	if(input.length > 0){
		input.each(function(){
			var label = $("label[for='"+$(this).attr('id')+"']");
			if(label.length == 0)  errors.push("Unable to find a the label related to the " + $(this).attr('id') + " field.");
		});
	}
}
function checkSharedName(input, type){
	if(input.length > 0){
		var name = input[0].name;		
		input.each(function(){
			if($(this).attr("name") != name){
				errors.push("The " + type + " buttons must share the name attribute.");
				return false;
			}
		});
	}	
}
function printResults(totalScore, parts){
	var score = totalScore;
	var errCost = score / parts;
	var errList = $("<ol></ol>");
	for(i = 0; i < errors.length; i++){
		errList.append("<li>" + errors[i] + "</li>");
		score -= errCost;
	}

	var errContainer = $("<div>", {	
		id: "errContainer",	
		css: {
			"position": "absolute",				
			"top": "100px",
			"left": "50%",
			"width": "400px",
			"margin-left": "-200px",
			"border": "1px solid black",
			"background-color": "white",
			"z-index": "99999999999999",
			"padding": "20px"				
		}
	}).appendTo("body");	
	
	var color = "red";
	if(score >= totalScore/2) color = "orange";
	if(score == totalScore) color = "green";
	errContainer.append("<p><b style='color: " + color + "'>Total score: " + score.toFixed(2) + "p (over " + totalScore + "p)</b> v1.0.2 <a href='javascript:void(0)' onclick='$(\"#errContainer\").hide();' >[close]</a></p>").append(errList);
}
