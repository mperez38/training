var items = [];
var itemsProject = [];
$(document).ready(function(){

	$("header a").mouseenter(function(){
		$(this).css('background-color','#FF8484');
	});

	$("header a").mouseleave(function(){
		$(this).css('background-color','#7ebbe6');
	});


	if( localStorage["items"] && localStorage["items"] != undefined && localStorage["items"] != "undefined" ){			
		items = JSON.parse(localStorage["items"]);
	}

	$.each(items, function(index, item){
		$(".post").after("<div class='posting' data-projects=\""+item.project+"\" data-content=\""+item.content+"\" data-index=\""+item.index+"\">"+"<a class='edit' href=''>"+"Edit"+"</a>"+"<div class='close-post'>"+"<span id='span-close'>"+"x"+"</span>"+"</div>"+"<p class='name-project'>"+item.project+"</p>"+"<hr>"+"<p class=\"title\">"+item.content+"</p>"+"<p class=\"content\">"+item.text+"</p>"+"</div>");
	});

	if( localStorage["itemsProject"] && localStorage["itemsProject"] != undefined && localStorage["itemsProject"] != "undefined" ){			
		itemsProject = JSON.parse(localStorage["itemsProject"]);
	}

	$.each(itemsProject, function(index, item){
		$("#select-projects").append("<option value=\""+item+"\">"+item+"</option>");
	});

	$(".button-add").click(function(){
		var index = items.length;
		var contentPostTitle = $("#addPostit").val();
		var contentPostText	= $("#text-postick").val();
		var nameProject = $("#project").val();
		$(".post").after("<div class='posting' data-projects=\""+nameProject+"\" data-content=\""+contentPostTitle+"\" data-index=\""+index+"\">"+"<a class='edit' href=''>Edit</a>"+"<div class='close-post'>"+"<span id='span-close'>"+"x"+"</span>"+"</div>"+"<p class='name-project'>"+nameProject+"</p>"+"<hr>"+"<p class=\"title\">"+contentPostTitle+"</p>"+"<p class=\"content\">"+contentPostText+"</p>"+"</div>");
		
		if(itemsProject.indexOf(nameProject) == -1){
			$("#select-projects").append("<option value=\""+index+"\">"+nameProject+"</option>");
			itemsProject.push(nameProject);
		}else{
			alert("a project already exists with that name");
		}
	
		items.push({content: contentPostTitle, text: contentPostText, index: index, project: nameProject});
		localStorage["items"] = JSON.stringify(items);
		localStorage["itemsProject"] = JSON.stringify(itemsProject);
		$("#addPostit").val("");
		$("#text-postick").val("");
		$("#project").val("");

		closePost();

		editPostick();
	});

	$("#search").click(function(){
		var searchTag = $("#box-search").val().trim();
		var projectNameToSearch = $("#select-projects").find(":selected").text();
		if(projectNameToSearch != "All projects"){
			if( searchTag.length > 0 ){
				$(".posting").hide();
				$(".posting[data-content*='"+searchTag+"']"+"[data-projects*='"+projectNameToSearch+"']").show();		
			} else {
				$(".posting").show();		
			}	
			$("#box-search").val("");
		}else{
			$(".posting").hide();
			$(".posting[data-content*='"+searchTag+"']").show();
			$("#box-search").val("");
		}
		
	});

	$("#clear-all").click(function(){
		delete localStorage["items"];
		delete localStorage["itemsProject"];
	});

	$(".button-close").click(function(){
		$(this).parents(".post").addClass("hide");
		$("#new-post").removeClass("hide");
	});

	$("#new-post").click(function(event){
		event.preventDefault();
		$(".post").removeClass("hide");
		$(this).addClass("hide");
	});	

	closePost();

	editPostick();

	$(".close-post").mouseenter(function(){
        $(this).addClass('resaltar');
    });

    $(".close-post").mouseleave(function(){
        $(this).removeClass('resaltar');
    });

    $("#select-projects").change(function(){
    	var value = $(this).find(":selected").text();
    	$(".posting").hide();		
		$(".posting[data-projects*=\""+value+"\"]").show();
		if(value == "All projects"){
			$(".posting").show();
		}
    });
});

var closePost = function(){
	$(".close-post").unbind().click(function(){
		var index = $(this).parents(".posting").data("index");
		var projectNameToDelete = $(this).siblings(".name-project").html();
		var optionToDelete = $("option[value=\""+projectNameToDelete+"\"]");		
		$(this).parents(".posting").remove();
		items.splice(index, 1);
		localStorage["items"] = JSON.stringify(items);		
		
		var stillExists = false;
		$.each(items, function(index, item){
			if( item.project ===  projectNameToDelete ){
				stillExists = true;				
			}
		});

		if(!stillExists){
			optionToDelete.remove();
			
		}	
		itemsProject.splice(index, 1);	
		localStorage["itemsProject"] = JSON.stringify(itemsProject);
	});
}

var editPostick =  function(){
	$(".posting .edit").click(function(){
		event.preventDefault();
		$(this).addClass("edit-hide");
		var index = $(this).parents(".posting").data("index");
		var title = $(this).siblings(".title").html();
		var text_post = $(this).siblings(".content").html();
		var namePro = $(this).siblings(".name-project").html();
		$(this).siblings("p").remove();
		$(this).siblings("hr").remove();
		$(this).parents(".posting").append("<span>Title post-it:</span>"+"<input type='text' name='edit-postick' value=\""+title+"\">"+"<span>text post-it:</span>"+"<textarea id='text-postick'>"+text_post+"</textarea>"+"<span>Name project:</span>"+"<input type='text' id='project' name='add-project' value=\""+namePro+"\">"+"<div class='button-add button-save'><p>Save</p></div>");

		$(".button-save").click(function(){
			var index = $(this).parents(".posting").data("index");
			var saveTitle = $(this).siblings("input[name='edit-postick']").val();
			var saveText = $(this).siblings("textarea").val();
			var saveProject = $(this).siblings("input[name='add-project']").val();
			$(this).siblings("input").remove();
			$(this).siblings("textarea").remove();
			$(this).siblings("span").remove();
			$(this).parents(".posting").append("<p>"+saveProject+"</p>"+"<hr>"+"<p>"+saveTitle+"</p>"+"<p>"+saveText+"</p>")
			
			if(itemsProject.indexOf(saveProject) == -1){
				$("#select-projects").append("<option value=\""+index+"\">"+saveProject+"</option>");
				itemsProject.push(saveProject);
			}else{
				alert("a project already exists with that name");
			}

			$(this).remove();
			items.splice(index, 1);
			items.push({content: saveTitle, text: saveText, index: index, project: saveProject});
			localStorage["items"] = JSON.stringify(items);
			itemsProject.splice(index, 1);
			localStorage["itemsProject"] = JSON.stringify(itemsProject);
		});	
	});
}