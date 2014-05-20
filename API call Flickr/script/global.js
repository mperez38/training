$(document).ready(function(){

	$(".button-serach").click(function(){
		var imagesToLook = $("#box-search").val();
		enviarAjax(imagesToLook);
	});
});


var enviarAjax = function(imagesToLook){
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",{
		tags: imagesToLook,
		tagmode: "any",
		format: "json"
	}, function(data){  
		$.each(data.items, function(i, item){
			$("<img>").attr("src", item.media.m).prependTo("#imagenes");
		}); 

		// var $container = $('#imagenes');
		// // initialize
		// $container.masonry({
		//   columnWidth: 200,
		//   itemSelector: 'img'
		// });
		// var msnry = $container.data('masonry');

		$("#imagenes").masonry({
	  		itemSelector: 'img'
		});
	});
};

