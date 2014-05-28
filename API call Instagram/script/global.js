var user_id;
$(document).ready(function(){
	$("#button").click(function(){
		var name_user = $("#box").val();
		$.ajax({
			url: "https://api.instagram.com/v1/users/search?q="+name_user+"&access_token=868960614.1fb234f.2ce568f7f9604b8c9cfbe429e3d2ee96",
			type: "GET",
			dataType: 'jsonp', 
		}).done(function(data){
			var userId = data.data[0].id;

			$.ajax({
				url: "https://api.instagram.com/v1/users/"+userId+"/media/recent?access_token=601817993.1fb234f.f42ac410e7194cd885509816c760cc89",
				type: "GET",
				dataType: 'jsonp', 
			}).done(function(data){
				$(".box-images ul").html("");
				$.each(data.data, function(i, item){
					var imageUrl = item.images.low_resolution.url;
					$(".box-images ul").append("<li class='image-instagram'><img src='"+imageUrl+"'></li>");
				}); 

				showModal();
			});
		});
	});	
	loadMore();

	$(".box-absolute img").click(function(){
		return false;
	})
});
var loadMore = function(){
	$(".load-more").click(function(){
		var name_user = $("#box").val();
		$.ajax({
			url: "https://api.instagram.com/v1/users/search?q="+name_user+"&access_token=868960614.1fb234f.2ce568f7f9604b8c9cfbe429e3d2ee96",
			type: "GET",
			dataType: 'jsonp', 
		}).done(function(data){
			var userId = data.data[0].id;
			var loadMoreImg = 200;
			$.ajax({
				url: "api.instagram.com/v1/users/"+userId+"/media/recent?min_id="+loadMoreImg+"&access_token=868960614.1fb234f.2ce568f7f9604b8c9cfbe429e3d2ee96",
				type: "GET",
				dataType: 'jsonp', 
			}).done(function(data){
				$.each(data.data, function(i, item){
					var imageUrl = item.images.low_resolution.url;
					$(".box-images ul").append("<li class='image-instagram'><img src='"+imageUrl+"'></li>");
				}); 

				showModal();
			});
		});
	});
}

var closeModal = function(){
	$(".box-absolute").click(function(){
		$("body").removeClass("overflow");
		$(".box-absolute").addClass("hide");
	});
}

var showModal = function(){
	$(".image-instagram img").click(function(){
		var imageUrl = $(this).attr("src");
		$(".box-absolute img").attr("src", imageUrl)
		$("body").addClass("overflow");
		$(".box-absolute").removeClass("hide");
		closeModal();
	})
}