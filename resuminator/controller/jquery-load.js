//GLOBALS
var current_primary_color = "#000000";
var current_accent_color = "#2196F3";

jQuery.loadCSS = function(href) {
	console.log(href);
	var cssLink = $("<link>");
	$("head").append(cssLink);   
	cssLink.attr({
	  rel:  "stylesheet",
	  type: "text/css",
	  href: href
	});  
  };

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

$(document).ready(function(){
	
	loadLayout(function(){
		loadView();	
		loadModel(function(){
			loadFirstProfile();		
		});
	});

	$(".accent-color").click(function(){
		current_accent_color = $(this).css("background-color");
		loadAccentColor();
	});

	$(".primary-color").click(function(){
		current_primary_color = $(this).css("background-color");
		loadPrimaryColor();
	});

	$(".select-background ").click(function(){

		var back_image = $(this).css("background-image");
		console.log(back_image);
		if(back_image && back_image != 'none'){
			$("#page").css("background-image", back_image);
			$("#page").css("background-color", 'transparent');
			return;
		} 

		var back_color = $(this).css("background-color");
		console.log(back_color);
		if(back_color){
			$("#page").css("background-color", back_color);
			$("#page").css("background-image", 'none');
			return;
		}
	});

});

function refreshProfile(){
	loadLayout(function(){
		loadCV(profile);
	});	
}


function testJSON(text){
    if (typeof text!=="string"){
        return false;
    }
    try{
        JSON.parse(text);
        return true;
    }
    catch (error){
        return false;
    }
}


function updateProfile() {
	var new_profile = $("#form_profile").val();	
	if(testJSON(new_profile)){
		new_profile = JSON.parse(new_profile);
		console.log("NEW PROFILE", new_profile);
		profile = new_profile;
		refreshProfile();
	}
}

function loadFirstProfile() {
	var obj = profile;
	var pretty = JSON.stringify(obj, undefined, 4);
	$("#form_profile").val(pretty);	
}

function prettyFormat() {
    var ugly = $('form_profile').val();
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    $("#form_profile").val(pretty);
}

function genPDF(){
	window.scrollTo({ top: 0});

	html2canvas(document.getElementById('page'), 
				{
					scale: 3,
					useCORS: true,
					logging:true
				}).then(function(canvas) {			
		var data = canvas.toDataURL();
		var docDefinition = {
			pageSize: 'LETTER',
			pageOrientation: 'portrait',
			pageMargins: [0, 0, 0, 0],
			content: [{
				image: data,
				width: 610
			}]
		};
		pdfMake.createPdf(docDefinition).download("resume.pdf");		
	});	
}

function loadLayout(callback) {
	const urlParams = new URLSearchParams(window.location.search);
	var layoutId = urlParams.get('template');
	console.log(layoutId);

	if(!layoutId) {
		layoutId = 1;
	}
	console.log("Layout", layoutId);
	$("#content").load('view/layouts/layout'+layoutId+'.html', callback);
}

function loadView(){
	const urlParams = new URLSearchParams(window.location.search);
	var styleId = urlParams.get('template');
	console.log(styleId);

	if(!styleId) {
		styleId = 1;
	}
	console.log("Style", styleId);
	$.loadCSS('view/css/style'+styleId+'.css');
}

function loadModel(callback){
	const urlParams = new URLSearchParams(window.location.search);
	var profileId = urlParams.get('profile');
	console.log(profileId);

	if(!profileId) {
		profileId = 1;
	}
	console.log("Profile", profileId);

	if (typeof profile == 'undefined'){  
		$.loadScript('model/profile'+profileId+'.js', function(){
			loadCV(profile);
			callback();
		});
	}
}


function loadCV(user) {
	$("#name").html(user.name);
	$("#role").html(user.role);				
	$("#picture").css("background-image", "url("+user.picture+")");

	$("#phone").html(user.phone);
	$("#email").html(user.email);
	$("#linkedin").html(user.linkedin);
	$("#web").html(user.web);
	$("#location").html(user.location);
	$("#summary-desc").html(user.summary);

	loadExperience(user.experience);	
	loadTechnologies(user.technologies);
	loadProjects(user.projects);
	loadEducation(user.education);
	loadAccentColor();
}

function loadExperience(experiences)
{
	var original = $("#experience-mock-data").html();				
	experiences.forEach(function(experience) {

		const bullet = "&#8226; ";
		var experience_item = original;
			experience_item = experience_item.replace("experience-role-value", experience.role);
			experience_item = experience_item.replace("experience-web-value", experience.web);
			experience_item = experience_item.replace("experience-date-value", experience.from + " - " +experience.to);
			experience_item = experience_item.replace("experience-location-value", experience.location);
			experience_item = experience_item.replace("experience-main-desc-value", experience.main_desc);
			experience_item = experience_item.replace("experience-desc-1-value", bullet + experience.desc_1);
			experience_item = experience_item.replace("experience-desc-2-value", bullet + experience.desc_2);
			experience_item = experience_item.replace("experience-desc-3-value", bullet + experience.desc_3);
			$("#experience-desc").append(experience_item);
	});

}

function loadTechnologies(technologies)
{
	var original = $("#tech-mock-data").html();				
	technologies.forEach(function(technology) {
		var tech_item = original;

		tech_item = tech_item.replace("tech-section-value", technology.section);
		tech_item = tech_item.replace("tech-1-value", technology.techs[0].name + appendBullets(technology.techs[0].ranking));
		tech_item = tech_item.replace("tech-2-value", technology.techs[1].name + appendBullets(technology.techs[1].ranking));
		tech_item = tech_item.replace("tech-3-value", technology.techs[2].name + appendBullets(technology.techs[2].ranking));
		$("#tech-desc").append(tech_item);
	});
}

function appendBullets(ranking){
	var rank_html = "";
	if(ranking){			
		rank_html = "&#9679;&nbsp;".repeat(ranking);
		rank_html += "&#9675;&nbsp;".repeat(5 - ranking);
	}		

	if(rank_html)
		return "<br/><div class='bullets'>" + rank_html+"</div>";

	return "";
}


function loadProjects(projects)
{
	var original = $("#project-mock-data").html();				
	projects.forEach(function(project) {
		const bullet = "&#8226; ";
		
		var project_item = original;
			project_item = project_item.replace("project-name-value", project.name);
			project_item = project_item.replace("project-date-value", project.date);
			project_item = project_item.replace("project-location-value", project.location);
			project_item = project_item.replace("project-main-desc-value", project.main_desc);

			if(project.desc_1){
				project_item = project_item.replace("project-desc-1-value", bullet + project.desc_1);
			} else {
				project_item = project_item.replace("project-desc-1-value", "");
			}
			$("#project-desc").append(project_item);
	});				
}

function loadEducation(education)
{
	var original = $("#education-mock-data").html();				
	education.forEach(function(education) {
		var education_item = original;
			education_item = education_item.replace("education-name-value", education.name);
			education_item = education_item.replace("education-center-value", education.center);
			education_item = education_item.replace("education-date-value", education.date);
			education_item = education_item.replace("education-location-value", education.location);
			$("#education-desc").append(education_item);
	});					
}

function loadAccentColor()
{
	$("#role").css("color", current_accent_color);
	$(".tech-section").css("color", current_accent_color);
	$(".experience-web").css("color", current_accent_color);
	$(".project-name").css("color", current_accent_color);
	$(".education-center").css("color", current_accent_color);	
	$(".bullets").css("color", current_accent_color);
}

function loadPrimaryColor() 
{
	$("#name").css("color", current_primary_color);
	$(".experience-role").css("color", current_primary_color);
	$(".secondary-title").css("color", current_primary_color);
	$(".education-name").css("color", current_primary_color);
	$(".border-title").css("background-color", current_primary_color);
	$(".tech-data").css("border-color", current_primary_color);
	$(".tech-data").css("color", current_primary_color);

}

function convertImgToBase64URL(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
