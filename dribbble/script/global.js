$(document).ready(function(){
	$(".transition").click(function(event){
		var transitionElement = $(this);
		$(".display-table").removeClass("purple").removeClass("cian").removeClass("red");
		transitionElement.addClass("long-transition");
		transitionElement.siblings(".transition").removeClass("long-transition");		
		if(transitionElement.hasClass("purple")){
			$(".display-table").addClass("purple");
		} else if (transitionElement.hasClass("cian")){
			$(".display-table").addClass("cian");
		} else if(transitionElement.hasClass("red")){
			$(".display-table").addClass("red");		
		}		
	});
})
