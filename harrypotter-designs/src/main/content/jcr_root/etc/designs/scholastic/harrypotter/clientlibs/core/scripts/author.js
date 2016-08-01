app.author = {
	init: function() {
		var $authorDetail = $(".slide.author-detail");
		
		var authorDetailHeightShort = $authorDetail.find(".author-text .text").height(),
			authorDetailHeightLong = 0;
		
		$authorDetail.find(".collapse").click(function() {
			if ($(this).attr("data-collapse") == 1) {
				$("html, body").scrollTop(0);

				$(this).attr("data-collapse", 0).removeClass("active").find("span:not(.icon-down)").text("Read more");
				
				$authorDetail.find(".author-text").find("h2, p").removeAttr("style");

                authorDetailHeightShort = $authorDetail.find(".author-text .text").height();
			} else {
				$(this).attr("data-collapse", 1).addClass("active").find("span:not(.icon-down)").text("Read less");
				
				$authorDetail.find(".author-text").find("h2, p").css("display", "block");

                authorDetailHeightLong = $authorDetail.find(".author-text .text").height();
			}
			
			return false;
		});
	}
};