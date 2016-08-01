var app = {
	home: function() {
		var self = this;
		
		var $inExplore = $('.slide.explore .slide-holder .slide-wrapper'),
			$inGlossary = $(".slide.glossary .slide-wrapper"),
			$inIllustrated = $(".slide.illustrated .slide-wrapper"),
			$scrollHelper = $("<div/>", {
				"class": "scroll-helper"
			});
		
		var scrollFirst = true;
		
		$(window).scroll(function() {
			$($(".slide").get().reverse()).each(function() {
				if (self.getScrollTop() >= $(this).offset().top) {
					var $top = parseInt((self.getScrollTop() - $(this).offset().top - ($(this).height() / 2)) / ($(".slide").length / 2), 10);
					
					$top = $top <= 0 ? -30 : -30 + $top;
					console.log($(this).css("background-position").match(/\d+/).length);
					//console.log($top, $(this).css("background-position", "center " + $top + "px"));
					
					return false;
				}
			});
			
			if (scrollFirst) {
				$(document.body).css("overflow", "hidden").scrollTop(0);
				
				$inExplore.find(".particle").on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) {
					$(this).off(event);
					
					scrollFirst = false;
					
					$(document.body).css("overflow", "auto");
				}).parents(".slide.explore").addClass("exploring");
			} else {
				if ($(this).scrollTop() == 0) {
					$inExplore.parents(".slide.explore").removeClass("exploring").find(".covers .particle .cover-holder").removeClass("show-new");
					
					scrollFirst = true;
				}
			}
			
			if ($inIllustrated.offset().top <= $inIllustrated.height() / 2) {
				if (!$inIllustrated.parent().hasClass("loaded")) {
					$inIllustrated.parent().on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) {
						$(this).off(event);
						
						$(this).find(".like").addClass("loaded");
					}).addClass("loaded");
				}
			}
		});
		
		/*$inExplore.find('.button').click(function() {
			$(this).parents('.slide.explore').addClass('exploring');
			
			return false;
		});*/
		
		$inExplore.find('.books-paragraph .link').one('click', function() {
			$(this).html('Switch Book Covers');
			
			return false;
		});
		
		$inExplore.find('.books-paragraph .link').click(function() {
			if ($inExplore.find('.covers .particle .cover-holder').hasClass("show-new")) {
				$inExplore.find(".like").on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) {
					$(this).off(event);
					
					$inExplore.find('.covers .particle .cover-holder').removeClass('show-new');
				}).addClass("hide");
				
			} else {
				$inExplore.find('.covers .particle .cover-holder').addClass('show-new');
			}
			
			return false;
		});
		
		var $time = $.now(),
			interval = null;
		
		$inExplore.find(".covers").on({
			mouseenter: function() {
				$(this).removeClass("hide").parents().siblings().find(".cover-holder").addClass("hide");
				
				$time = 0;
				clearInterval(interval);
			},
			mouseleave: function() {
				$time = $.now() + 100;
				
				interval = setInterval(function(item) {
					if ($time <= $.now()) {
						item.parents().siblings().find(".cover-holder").removeClass("hide");
						
						clearInterval(interval);
					}
				}, 100, $(this));
			}
		}, ".cover-holder");
		
		$('.slide.beasts .panel.left .play-btn')
		.on('mouseenter', function() {
			$(this).addClass('hovered');
		})
		.on('mouseleave', function() {
			$(this).removeClass('hovered');
		})
		.on('mousedown', function() {
			$(this).removeClass('hovered');
			$(this).find('.idle').addClass('press');
			$(this).find('.pressed').addClass('press');
		})
		.on('mouseup', function() {
			$(this).addClass('hovered');
			$(this).find('.idle').removeClass('press');
			$(this).find('.pressed').removeClass('press');
		});
		
		//YouTube player
		var player = null;
		window.onYouTubeIframeAPIReady = function() {
			player = new YT.Player('ytplayer', {
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				},
			});
		};
		
		function onPlayerReady(event) {
			event.target.setPlaybackQuality('highres');
			player.cueVideoById({
				'videoId': 'ViuDsy7yb8M',
				'startSeconds': 1,
				'suggestedQuality': 'highres'
			});
		}
		
		function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.BUFFERING) {
				event.target.setPlaybackQuality('highres');
			}
		}
		
		var $ytPlayer = $('#ytplayer');
		var ytPlayerWidth = $ytPlayer.width();
		
		$ytPlayer.css("height", ytPlayerWidth*(9/16));
		
		$('.slide.beasts .play-btn').click(function() {
			$('.video').addClass('opened');
			player.playVideo();
		});
		
		$('.video .inner-box').click(function() {
			$('.video').removeClass('opened');
			player.pauseVideo();
		});
		
		$(document).on('keydown', function(e) {
			if (e.keyCode === 27) {
				$('.video').removeClass('opened');
				player.pauseVideo();
			}
		});
		
		$inGlossary.find(".search").find("input[name=\"search-terms\"]").focusin(function() {
			$inGlossary.find(".speaker, .result").addClass("hide");
		}).focusout(function() {
			$inGlossary.find(".speaker, .result").removeClass("hide");
		});
		
		$('.like')
		.on('mousedown', function() {
			$(this).addClass('pressed');
		})
		.on('mouseleave', function() {
			$(this).removeClass('pressed');
		});
	},
	
	detail: function() {
		$('.to-press').each(function() {
			$(this)
			.on('mousedown', function() {
				$(this).addClass('pressed');
			})
			.on('mouseleave', function() {
				$(this).removeClass('pressed');
			});
		});
	},
	getScrollTop: function() {
		return $('html').scrollTop() || $('body').scrollTop() || $(window).scrollTop();
	},
};