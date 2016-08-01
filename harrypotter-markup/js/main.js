var app = {
	utils: {
		getScrollTop: function() {
			return $('html').scrollTop() || $('body').scrollTop() || $(window).scrollTop();
		},
		transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
		animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
		toggleScroll: function(value) {
			$(document.body).css({
				overflow: value ? 'auto' : 'hidden'
			});
		},
		getTextWidth: function(element, elementText, elementFont) {
			if (!this.getTextWidthElement) {
				this.getTextWidthElement = $("<span/>").hide().appendTo(document.body);
			}

			this.getTextWidthElement.text(elementText || element.val() || element.text()).css("font", elementFont || element.css("font"));

			return this.getTextWidthElement.width();
		},
		getTextWidthElement: null,
		shuffleArray: function(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));

				var temp = array[i];

				array[i] = array[j];
				array[j] = temp;
			}

			return array;
		},
		shuffleElements: function(elementParent, elementSelector) {
			var $elements = elementSelector ? $(elementParent).find(elementSelector) : $(elementParent).children(),
				$parents = $elements.parent();

			$parents.each(function() {
				$(elementParent).children(elementSelector).sort(function() {
					return Math.round(Math.random()) - 0.5;
				}).detach().appendTo(elementParent);
			});
		},
		playAudio: function(path) {
			var $audio = $('<audio class="audio-play" src="' + path + '" preload="auto" autoplay></audio>');

			$audio.on('ended', function() {
				$audio.remove();
			}).on('error', function() {
				$audio.remove();
			});

			$(document.body).append($audio);
		}
	},
	layout: {
		init: function() {
			var $slides = $('.slide');

			$(window).scroll(this.onScroll);
			this.onScroll();
		},
		onScroll: function() {
			var $slides = $('.slide');

			var top = app.utils.getScrollTop();

			$slides.each(function() {
				if (top >= $(this).offset().top - (window.innerHeight / 4 * 3)) {

					if (!$(this).hasClass("loaded")) {
						$(this).addClass("loaded");

						$slides.filter(".detail-footer").addClass("loaded");
					}
				}
			});

			$slides.each(function() {
				var $bg = $(this).find('.slide-bg');

				var pos = $(this).offset().top;

				var y = 0;

				if (top > pos) {
					y = (top - pos) / 4;
				} else if (top + window.innerHeight < pos + $(this).outerHeight()) {
					y = -((pos + $(this).outerHeight()) - (top + window.innerHeight));

					if (top - pos > y) {
						y = top - pos;
					}

					y /= 4;
				}

				y = Math.round(y);

				$bg.css({
					transform: 'translate3d(0, ' + y + 'px, 0)'
				});
			});
		}
	},
	youtube: {
		_callbacks: [],
		_loaded: false,
		loaded: function() {
			this._loaded = true;
			this._callbacks.forEach(function(cb) {
				cb();
			});

			this._callbacks = [];
		},
		onReady: function(cb) {
			if (this._loaded) {
				cb();
			} else {
				this._callbacks.push(cb);
			}
		}
	},
	home: {
		_exploreAnimated: false,
		_exploreAnimating: false,
		_exploreTimeout: null,
		_player: null,
		_animation: {
			total: 6000,
			initialised: false,
			current: 0,
			videoPlayed: false,
			onVideoPlayed: function() {
				if (this.videoPlayed) {
					return;
				}

				this.videoPlayed = true;

				var $explore = $('.slide.explore');

				$explore.find('.harry').css({
					opacity: 0,
					transform: 'translate3d(-300px, 0, 0)',
					transition: 'none'
				});
				$explore.find('.hp-heading').css({
					opacity: 0,
					transform: 'scale(0.8)',
					transition: 'none'
				});
				$explore.find('.particle').css({
					opacity: 0,
					transform: 'translate3d(0, 100px, 0)',
					transition: 'none'
				});

				setTimeout(function() {
					$explore.find('.hp-heading').css({
						opacity: 1,
						transform: 'scale(1)',
						transition: '400ms'
					});
					$explore.find('.harry').css({
						opacity: 1,
						transform: 'translate3d(0, 0, 0)',
						transition: '700ms'
					});
					var cc = 0;

					$explore.find('.particle').each(function() {
						$(this).css({
							opacity: 1,
							transform: 'translate3d(0, 0, 0)',
							transition: '350ms ' + (100 + (cc*70)) + 'ms'
						});
						cc++;
					});

					setTimeout(function() {
						$explore.addClass('video-played-final');

						$explore.find('.hp-heading').removeAttr('style');
						$explore.find('.harry').removeAttr('style');
						$explore.find('.particle').removeAttr('style');
					}, 900);
				}, 50);
			},
			bg: {
				start: 0,
				end: 0.5,
				animate: function($slide, state) {
					if (!this.$elem) {
						this.$elem = $slide.find('.explore-abg');
					}

					this.$elem.css({
						opacity: state * 0.8
					});
				}
			},
			harry: {
				start: 0,
				end: 0.3,
				animate: function($slide, state) {
					if (!this.$elem) {
						this.$elem = $slide.find('.harry');
					}

					this.$elem.css({
						transform: 'translate3d(' + (1080 * state) + 'px, 0, 0)',
						opacity: 1 - (state < 0.5 ? 0 : (state-0.5)*2)
					});
				}
			},
			title: {
				start: 0.05,
				end: 0.25,
				animate: function($slide, state) {
					if (!this.$elem) {
						this.$elem = $slide.find('.hp-heading');
					}

					this.$elem.css({
						opacity: 1 - state
					});
				}
			},
			titleMobile: {
				start: 0.05,
				end: 0.25,
				animate: function($slide, state) {
					if (!this.$elem) {
						this.$elem = $slide.find('.hp-heading');
						this.$paragraph = $slide.find('.books-paragraph');
					}

					var marginBottom = this.$paragraph.height() - this.$elem.height() - 80 + 50;
						marginBottom = marginBottom < 0 ? 0 : marginBottom;

					this.$elem.css({
						opacity: 1 - state,
						margin: "0 0 " + (marginBottom * state) + "px 0"
					});
				}
			},
			paragraph: {
				start: 0.25,
				end: 0.3,
				animate: function($slide, state) {
					if (!this.$elem) {
						this.$elem = $slide.find('.books-paragraph');
					}

					this.$elem.css({
						opacity: state,
						transform: 'translate3d(0, ' + (100 * (1 - state)) + 'px, 0)'
					});
				}
			},
			books: {
				start: 0.35,
				end: 0.7,
				animate: function($slide, state) {
					if (!this.$particles) {
						this.$covers = $slide.find('.covers');
						this.$particles = $slide.find('.covers .particle');
						this.$particlesHolder = $slide.find('.covers .particle .cover-holder-outer');
					}

					this.$covers.css({
						transform: 'translate3d(0, ' + (-45 * state) + 'px, 0)'
					});

					this.$particles.filter(':nth-child(odd)').css({
						transform: 'translate3d(0, ' + (-40 * state) + 'px, 0)'
					}).end().filter(':nth-child(even)').css({
						transform: 'translate3d(0, ' + (40 * state) + 'px, 0)'
					});

					var holderScale = (0.17 * state*3);
					holderScale = holderScale > 0.17 ? 0.17 : holderScale;
					this.$particlesHolder.css({
						transform: 'scale(' + (1 - holderScale) + ')'
					});
				}
			},
			booksMobile: {
				start: 0.35,
				end: 0.7,
				animate: function($slide, state) {
					if (!this.$particles) {
						this.$covers = $slide.find('.covers');
						this.$particles = $slide.find('.covers .particle');
						this.$particlesHolder = $slide.find('.covers .particle .cover-holder-outer');
					}

					var translateLast = -44;

					for (var i = 0; i < this.$particles.length; i++) {
						if (i < 3) {
							this.$particles.eq(i).css({
								transform: "translate3d(" + (translateLast + (-((140* (3 - i)) + translateLast) * state)) + "px, 0, 0) rotateZ(" + (-(5 * (3 - i)) + ((5 * (3 - i)) * state)) + "deg) scale(" + (0.88 + (0.12 * state)) + ")"
							});

							translateLast += 12;
						} else if (i == 3) {
							translateLast = 20;
						} else if (i > 3) {
							this.$particles.eq(i).css({
								transform: "translate3d(" + (translateLast + (((140 * (i - 3)) - translateLast) * state)) + "px, 0, 0) rotateZ(" + ((5 * (i - 3)) + (-(5 * (i - 3)) * state)) + "deg) scale(" + (0.88 + (0.12 * state)) + ")"
							});

							translateLast += 12;
						}
					}
				}
			},
			bookNames: {
				start: 0.7,
				end: 0.9,
				animate: function($slide, state) {
					if (!this.$names) {
						this.$names = $slide.find('.covers .particle .book-name');
					}

					this.$names.css({
						opacity: state,
						transform: 'translate3d(0, ' + (-100 * (1 - state)) + 'px, 0)'
					});
				}
			},
			bookNamesMobile: {
				start: 0.7,
				end: 0.9,
				animate: function($slide, state) {
					if (!this.$names) {
						this.$names = $slide.find('.covers .particle .book-name');
					}

					this.$names.css({
						opacity: state,
						transform: 'translate3d(0, ' + (-100 + (120 * state)) + 'px, 0)'
					});
				}
			},
			bookLikes: {
				start: 0.9,
				end: 0.95,
				animate: function($slide, state) {
					if (!this.$elem) {
						this.$elem = $slide.find('.covers .particle .like');
					}

					this.$elem.css({
						opacity: state,
						transform: 'translate3d(0, ' + (-45 * state) + 'px, 0)'
					});
				}
			},
		},
		init: function() {
			var self = this;

			var $slides = $('.slide');
			var $explore = $slides.filter('.explore'),
				$exploreSlider = $explore.find(".slider-frame");
			var $inExplore = $slides.filter('.explore').find('.slide-wrapper'),
				$inGlossary = $slides.filter('.glossary').find('.slide-wrapper'),
				$inIllustrated = $slides.filter('.illustrated').find('.slide-wrapper');

			var scrollFirst = true;

			var exploreSlider = null;

			app.utils.toggleScroll(false);

			if (window.innerWidth <= 736) {
				$explore.addClass('video-played');
				self._animation.onVideoPlayed();

				exploreSlider = new Sly($exploreSlider, {
					horizontal: 1,
					itemNav: 'forceCentered',
					smart: 1,
					activateMiddle: 1,
					mouseDragging: 1,
					touchDragging: 1,
					releaseSwing: 1,
					startAt: 3,
					scrollBy: 1,
					speed: 700,
					elasticBounds: 1,
					dragHandle: 1,
					dynamicHandle: 1,
					cycleBy: 'items',
					cycleInterval: 4000,
					pauseOnHover: 1,
					startPaused: 1
				});
			} else {
				var $video = $explore.find('.explore-video video');
				$video.on('ended', function() {
					$explore.addClass('video-played');
					self._animation.onVideoPlayed();
				}).on('playing', function() {
					$video.addClass('playing');
				})[0].play();
			}

			var touchStart = 0,
				touchLastY = 0;

			$(window).on("touchstart", function(e) {
				touchStart = e.originalEvent.touches[0].clientY;
			});

			$(window).on("mousewheel touchmove", function(e) {
				var top = app.utils.getScrollTop();
				var delta = e.originalEvent.deltaY || e.originalEvent.wheelDelta || -e.detail;

				/*if (e.type == "touchmove") {
					var touchY = e.originalEvent.touches[0].clientY;

					delta = touchStart - touchY;
console.log(delta);
					if (delta > 0) {
						if (touchY > touchLastY) {console.log(1);
							touchStart = touchY;
						}
					} else if (delta < 0) {
						if (touchY < touchLastY) {console.log(2);
							touchStart = touchY;
						}
					}

					touchLastY = touchY;
				}*/

			// todo add touch support
			/*$(window).mousewheel(function(e) {
				var top = app.utils.getScrollTop();
				var delta = e.originalEvent.deltaY || e.originalEvent.wheelDelta || -e.detail;*/

				if (top !== 0) {
					if (!self._animation.initialised) {
						app.utils.toggleScroll(true);
						self._animation.current = 1000000;
						$explore.addClass('video-played');
						self._animation.onVideoPlayed();
					} else {
						if (top >= $('body')[0].scrollHeight - window.innerHeight && delta > 0) {
							e.preventDefault();
							return false;
						}

						return;
					}
				}

				if (!self._animation.initialised) {
					self._animation.initialised = true;
				}

				if (!$explore.hasClass('video-played-final')) {
					// e.preventDefault();
					return false;
				}

				if (self._animation.current === self._animation.total && top === 0) {
					app.utils.toggleScroll(delta > 0 ? true : false);

					// Slider
					if (window.innerWidth <= 736) {
						if (delta > 0 && !exploreSlider.initialized) {
							$exploreSlider.addClass("initialized").find(".particle").removeAttr("style");

							setTimeout(function() {
								exploreSlider.init();
							}, 50);
						} else if (delta < 0 && exploreSlider.initialized) {
							exploreSlider.destroy();

							$exploreSlider.removeClass("initialized").find("ul li").removeAttr("style").parent().removeAttr("style");
						}
					}

					if (delta > 0) {
						return;
					}
				}

				if (delta < 0 && self._animation.current === 0) {
					e.preventDefault();
					return;
				}

				self._animation.current += delta;
				self._animation.current = self._animation.current < 0 ? 0 : self._animation.current;
				self._animation.current = self._animation.current > self._animation.total ? self._animation.total : self._animation.current;

				var percent = self._animation.current / self._animation.total;
				var toAnimate = ['bg', 'harry', 'title', 'paragraph', 'books', 'bookNames', 'bookLikes'];

				if (window.innerWidth <= 736) {
					toAnimate = ['bg', 'harry', 'titleMobile', 'paragraph', 'booksMobile', 'bookNamesMobile', 'bookLikes'];
				}

				for (var i = 0; i < toAnimate.length; i++) {
					var animationObject = self._animation[toAnimate[i]];
					var state = (percent - animationObject.start) * 1 / (animationObject.end - animationObject.start);
					state = state < 0 ? 0 : state;
					state = state > 1 ? 1 : state;

					animationObject.animate($explore, state);
				}

			});

			$(window).scroll(function() {
				if (app.utils.getScrollTop() >= $inIllustrated.offset().top - ($inIllustrated.height() / 2)) {
					if (!$inIllustrated.find(".like").hasClass("loaded")) {
						if ($inIllustrated.hasClass("loaded") && !$inIllustrated.find(".like").hasClass("loaded")) {
							$inIllustrated.find(".like").addClass("loaded");
						}

						$inIllustrated.off(app.utils.transitionEnd)
						.on(app.utils.transitionEnd, function() {
							$(this).off(app.utils.transitionEnd);

							$(this).find(".like").addClass("loaded");
						}).addClass("loaded");
					}
				}
			});

			$(window).resize(function() {
				// Slider
				if (window.innerWidth <= 736) {
					if (!exploreSlider.initialized) {
						exploreSlider.init();

						$exploreSlider.addClass("initialized");
					} else {
						exploreSlider.destroy();

						$exploreSlider.removeClass("initialized").find("ul li").removeAttr("style").parent().removeAttr("style");
					}
				}
			});

			$inExplore.find('.books-paragraph .link').click(function() {
				if ($(this).text() != "Switch Book Covers") {
					$(this).html('Switch Book Covers');
				} else {
					$(this).html('Check out new cover art by Kazu Kibuishi!');
				}

				$inExplore.find(".particle").toggleClass('show-new');

				return false;
			});

			var $time = $.now(),
				interval = null;

			$inExplore.find(".covers").on({
				mouseenter: function() {
					if (window.innerWidth <= 736) {
						return false;
					}

					$(this).removeClass("hide").parents().siblings().find(".cover-holder").addClass("hide");

					$time = 0;
					clearInterval(interval);
				},
				mouseleave: function() {
					if (window.innerWidth <= 736) {
						return false;
					}

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

			$inGlossary.find(".search").find("input[name=\"search-terms\"]").focusin(function() {
				$(this).attr("placeholder", "");

				$inGlossary.find(".speaker, .result").addClass("hide");
			}).focusout(function() {
				$(this).attr("placeholder", $(this).attr("placeholder"));

				$inGlossary.find(".speaker, .result").removeClass("hide");
			});

			$('.like').mousedown(function() {
				$(this).addClass('pressed');
			}).mouseleave(function() {
				$(this).removeClass('pressed');
			});

			//youtube
			app.youtube.onReady(function() {
				self._player = new YT.Player('ytplayer', {
					events: {
						'onReady': function(e) {
							e.target.setPlaybackQuality('highres');
							self._player.cueVideoById({
								'videoId': 'ViuDsy7yb8M',
								'startSeconds': 1,
								'suggestedQuality': 'highres'
							});
						},
						'onStateChange': function(e) {
							if (e.data == YT.PlayerState.BUFFERING) {
								e.target.setPlaybackQuality('highres');
							}
						}
					}
				});
			});

			var $ytPlayer = $('#ytplayer');
			$('.slide.beasts .play-btn').click(function() {
				self.playVideo();
			});

			$('.video .inner-box').click(function() {
				if (self._player.getPlayerState() == 1) {
					self._player.pauseVideo();
				} else {
					self._player.playVideo();
				}
			});

			$(".video .video-close").click(function(event) {
				event.preventDefault();

				self.stopVideo();
			});

			$(document).on('keydown', function(e) {
				if (e.keyCode === 27) {
					self.stopVideo();
				}
			});
		},
		playVideo: function() {
			$(document.body).css({
				overflow: 'hidden'
			});
			$('.slide.beasts').addClass('video-opened');
			$('.video').addClass('opened');
			this._player.playVideo();

			$('html,body').animate({
				scrollTop: $('.slide.beasts').offset().top/* + 30*/
			}, 2000);
		},
		stopVideo: function() {
			$('.slide.beasts').removeClass('video-opened');
			$('.video').removeClass('opened');
			this._player.pauseVideo();
			$(document.body).css({
				overflow: 'auto'
			});
		}
	},
	detail: {
		init: function() {
			var $slides = $('.slide');
			var $inReadNext = $slides.filter('.read-next').find('.slide-wrapper');

			var $detailBookAbout = $(".slide.detail").find(".book-specs .book-about");

			var detailBookAboutText = $detailBookAbout.find(".text").text();

			detailBookAboutText = detailBookAboutText.trim();

			$detailBookAbout.attr({
				"text-full": detailBookAboutText,
				"text-short": detailBookAboutText.substring(0, 200).split(" ").slice(0, -1).join(" ") + "...",
				"text-state": 0
			}).find(".text").text(detailBookAboutText.substring(0, 200).split(" ").slice(0, -1).join(" ") + "...");

			$detailBookAbout.find("a").click(function() {
				if ($detailBookAbout.attr("text-state") == 1) {
					$detailBookAbout.attr("text-state", 0).find(".text").text($detailBookAbout.attr("text-short"));
					$detailBookAbout.find("a").text("See All");
				} else {
					$detailBookAbout.attr("text-state", 1).find(".text").text($detailBookAbout.attr("text-full"));
					$detailBookAbout.find("a").text("Close");
				}

				return false;
			});

			$('.to-press').mousedown(function() {
				$(this).addClass('pressed');
			}).mouseleave(function() {
				$(this).removeClass('pressed');
			});

			$('.explore-all .features > li').hover(function() {
				$(this).parent().children().addClass('shrink');
				$(this).removeClass('shrink')
			}, function() {
				$(this).parent().children().removeClass('shrink');
			});

			var $time = $.now(),
				interval = null;

			$inReadNext.find(".next-books").on({
				mouseenter: function() {
					$(this).removeClass("hide").siblings().addClass("hide");

					$time = 0;
					clearInterval(interval);
				},
				mouseleave: function() {
					$time = $.now() + 100;

					interval = setInterval(function(item) {
						if ($time <= $.now()) {
							item.siblings().removeClass("hide");

							clearInterval(interval);
						}
					}, 100, $(this));
				}
			}, ".book-holder");

			$(window).resize(this.onResize);
			this.onResize();
		},
		onResize: function() {
			var $slider = [];

			var slider = [];

			$(".slider-frame").each(function(index) {
				$slider[index] = $(this);

				slider[index] = new Sly($slider[index], {
					horizontal: 1,
					itemNav: 'forceCentered',
					smart: 1,
					activateMiddle: 1,
					mouseDragging: 1,
					touchDragging: 1,
					releaseSwing: 1,
					startAt: 0,
					scrollBy: 1,
					speed: 700,
					elasticBounds: 1,
					dragHandle: 1,
					dynamicHandle: 1,
					cycleBy: 'items',
					cycleInterval: 4000,
					pauseOnHover: 1,
					startPaused: 1,
					pagesBar: $slider[index].parent().find(".pages"),
				});
			})/*.addClass("binded")*/;

			for (var i = 0; i < slider.length; i++) {
				slider[i].destroy();

				$slider[i].find("ul:not(.pages) li").removeAttr("style").parent().removeAttr("style");

				if (window.innerWidth <= 736) {
					slider[i].init();

					$slider[i].find("ul:not(.pages) li").css({
						"width": 100 / $slider[i].find("ul:not(.pages) li").length + "%",
						"min-width": 100 / $slider[i].find("ul:not(.pages) li").length + "%",
						"max-width": 100 / $slider[i].find("ul:not(.pages) li").length + "%"
					});
				}
			}
		}
	}
};

window.onYouTubeIframeAPIReady = function() {
	app.youtube.loaded();
};

$(function() {
	app.layout.init();
});