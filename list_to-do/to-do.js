TODO = {
	items: [],
	checkboxClick: function(){
		
	}
}


$(document).ready(function(){

	var items = [];	

	if( localStorage["items"] && localStorage["items"] != undefined && localStorage["items"] != "undefined" ){			
		items = JSON.parse(localStorage["items"]);
	}

	$.each(items, function(index, item){
		var checked = item.completed ? "checked": "";
		$("#capa").append("<div class=\"check\">"+"<input type=\"checkbox\" data-index=\""+item.index+"\" "+checked+">"+"<span>"+item.content+"</span>"+"</div>");
	});
			
	$(".submit input").click(function(){
		var index = items.length;
		var contenido = $(".input-text input").val();
		$("#capa").append("<div class=\"check\">"+"<input type=\"checkbox\" data-index=\""+index+"\">"+"<span>"+contenido+"</span>"+"</div>");			
		items.push({content: contenido, completed: false, index: index });
	        			
		localStorage["items"] = JSON.stringify(items);
		$(".input-text input").val("");

		$("#capa input[type='checkbox']").unbind().click(function(){
			var index = $(this).data("index");
			var checked = $(this).is(":checked"); 
			checkboxClick(index, checked);
		});

		if( items.length > 0 ){
			$(".text").hide();
		}
	});

	$("#capa input[type='checkbox']").click(function(){
		var index = $(this).data("index");
		var checked= $(this).is(":checked"); 
		
		checkboxClick(index, checked);
	});

	$("header a").click(function(){
		delete localStorage["items"];
	});

	var checkboxClick = function(index, checked){			
		items[index].completed = checked;  
		localStorage["items"] = JSON.stringify(items);
	}

	if (items.length > 0){
		$(".text").hide();
	}
});
