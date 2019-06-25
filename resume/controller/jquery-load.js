jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

$(document).ready(function(){
	const urlParams = new URLSearchParams(window.location.search);
	var id = urlParams.get('profile');
	console.log(id);

	if(!id) {
		id = 1;
	}
	console.log(id);

	if (typeof profile == 'undefined'){  
		$.loadScript('model/profile'+id+'.js', function(){
			loadCV(profile);
		});
	}
});


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
	loadColor();
	//loadNoColor();
}

function loadExperience(experiences)
{
	var original = $("#experience-mock-data").html();				
	experiences.forEach(function(experience) {
		var experience_item = original;
			experience_item = experience_item.replace("experience-role-value", experience.role);
			experience_item = experience_item.replace("experience-web-value", experience.web);
			experience_item = experience_item.replace("experience-date-value", experience.from + " - " +experience.to);
			experience_item = experience_item.replace("experience-location-value", experience.location);
			experience_item = experience_item.replace("experience-main-desc-value", experience.main_desc);
			experience_item = experience_item.replace("experience-desc-1-value", experience.desc_1);
			experience_item = experience_item.replace("experience-desc-2-value", experience.desc_2);
			experience_item = experience_item.replace("experience-desc-3-value", experience.desc_3);
			$("#experience-desc").append(experience_item);
	});

}

function loadTechnologies(technologies)
{
	var original = $("#tech-mock-data").html();				
	technologies.forEach(function(technology) {
		var tech_item = original;
			tech_item = tech_item.replace("tech-section-value", technology.section);
			tech_item = tech_item.replace("tech-1-value", technology.techs[0].name);
			tech_item = tech_item.replace("tech-2-value", technology.techs[1].name);
			tech_item = tech_item.replace("tech-3-value", technology.techs[2].name);
			$("#tech-desc").append(tech_item);
	});
}

function loadProjects(projects)
{
	var original = $("#project-mock-data").html();				
	projects.forEach(function(project) {
		var project_item = original;
			project_item = project_item.replace("project-name-value", project.name);
			project_item = project_item.replace("project-date-value", project.date);
			project_item = project_item.replace("project-location-value", project.location);
			project_item = project_item.replace("project-main-desc-value", project.main_desc);
			project_item = project_item.replace("project-desc-1-value", project.desc_1);
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

function loadColor()
{
	//var color = "#0d47a1";
	//var color = "#03A9F4";
	var color = "#2196F3";
	$("#role").css("color", color);
	$(".tech-section").css("color", color);
	$(".experience-web").css("color", color);
	$(".project-name").css("color", color);
	$(".education-center").css("color", color);
	
}

function loadNoColor()
{
	$("#picture").css("filter", "grayscale(1.0)");
}