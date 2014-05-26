$(document).ready(function(){

	$("#button-search").click(function(){
		var informatioToSearch = $("#mood-search").val().toLowerCase();
		$.ajax({
		  url: "http://try.rednote.com/api/moods.json?api_key=0u2UF1z41h0ptaFJpXJnu7l5n_qIvUzWJS8Uvuuthog",
		}).done(function(data) {
			$(this).addClass("done");
			$.each(data, function(i, item){
				if(item.name.toLowerCase() == informatioToSearch){
					$(".list-mood").html("");
					$(".list-mood").append("<ul id='"+item.id+"''>"+"<li>"+item.name+"</li>"+"</ul>");
					$.each(item.music_clips, function(i, clip){
						$("ul#"+clip.mood_id).append("<li>"+clip.name+"</li>"+"<li class='info'><span>Artist: </span>"+clip.artist+"</li>"+"<li class='info'><span>lyrics: </span>"+clip.lyrics+"</li>"+"<li class='info'><span>created at: </span>"+clip.created_at+"</li>"+"<li class='info'>"+"<a href='"+clip.file_url+"' target='_blank'>Listen on here!</a>"+"</li>");
					});
				} 
			});	  
		});
	});

	// $("#button-search-lyrics").click(function(){
	// 	var lyricsToSearch = $("#mood-search-lyrics").val().toLowerCase();
	// 	$.ajax({
	// 	  url: "http://try.rednote.com/api/moods.json?api_key=0u2UF1z41h0ptaFJpXJnu7l5n_qIvUzWJS8Uvuuthog",
	// 	}).done(function(data) {
	// 		$(this).addClass("done");
	// 		$.each(data, function(i, item){
	// 			$.each(item.music_clips, function(i, clip){
	// 				if(clip.name.toLowerCase() == lyricsToSearch){
	// 					$(".list-mood").html("");
	// 					$(".list-mood").append("<ul>"+"<li>"+clip.name+"</li>"+"<li class='info'><span>Artist: </span>"+clip.artist+"</li>"+"<li class='info'><span>lyrics: </span>"+clip.lyrics+"</li>"+"<li class='info'><span>created at: </span>"+clip.created_at+"</li>"+"<li class='info'>"+"<a href='"+clip.file_url+"' target='_blank'>Listen on here!</a>"+"</li>"+"</ul>");
	// 				}
	// 			});
	// 		});	  
	// 	});
	// });

	$("#button-search-lyrics").click(function(){
		var lyricsToSearch = $("#mood-search-lyrics").val().toLowerCase().trim();

		$.ajax({
		  url: "http://try.rednote.com/api/moods.json?api_key=0u2UF1z41h0ptaFJpXJnu7l5n_qIvUzWJS8Uvuuthog",
		}).success(function(data) {	
			$(".list-mood").html("");		
			$.each(data, function(i, item){
				$.each(item.music_clips, function(i, clip){					
					if(clip.name.toLowerCase().indexOf(lyricsToSearch) != -1){	
						$(".list-mood").append("<ul>"+"<li>"+clip.name+"</li>"+"<li class='info'><span>Artist: </span>"+clip.artist+"</li>"+"<li class='info'><span>lyrics: </span>"+clip.lyrics+"</li>"+"<li class='info'><span>created at: </span>"+clip.created_at+"</li>"+"<li class='info'>"+"<a href='"+clip.file_url+"' target='_blank'>Listen on here!</a>"+"</li>"+"</ul>");					
						// $(".list-mood").append("<ul>"+"<li>"+clip.name+"</li>"+"</ul>");
					}
				}); 
			});	  
		});
	});

	$(".button").click(function(){
		event.preventDefault();
		$.ajax({
		  url: "http://try.rednote.com/api/moods.json?api_key=0u2UF1z41h0ptaFJpXJnu7l5n_qIvUzWJS8Uvuuthog",
		}).done(function(data) {
			$(this).addClass("done");
			$.each(data, function(i, item){
				$(".list-mood").append("<ul id='"+item.id+"''>"+"<li>"+item.name+"</li>"+"</ul>");
				$.each(item.music_clips, function(i, clip){
					$("ul#"+clip.mood_id).append("<li data-content='"+clip.name+"'>"+clip.name+"</li>"+"<li class='info'><span>Artist: </span>"+clip.artist+"</li>"+"<li class='info'><span>lyrics: </span>"+clip.lyrics+"</li>"+"<li class='info'><span>created at: </span>"+clip.created_at+"</li>"+"<li class='info'>"+"<a href='"+clip.file_url+"' target='_blank'>Listen on here!</a>"+"</li>");
				}); 
			});	  
		});
	});

});

