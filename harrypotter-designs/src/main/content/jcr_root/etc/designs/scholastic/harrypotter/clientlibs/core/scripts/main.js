var app = {
    device: {
        isMobile: (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)),
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isIE: /(MSIE|Trident|Edge)/.test(navigator.userAgent)
    },
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
        },
        tr: function($elem, x, y, z) {
            var transform = 'translate3d(' + x + 'px, ' + y + 'px, ' + (z || 0) + 'px)';

            $elem.css({
                'transform': transform,
                '-webkit-transform': transform,
                '-moz-transform': transform,
                '-ms-transform': transform
            });
        }
    },
    layout: {
        init: function() {
            var $slides = $('.slide');

            app.components.init();

            $(window).scroll(this.onScroll);
            this.onScroll();
        },
        onScroll: function() {
            var $slides = $('.slide');

            var top = app.utils.getScrollTop();

            $slides.each(function() {
                if (!$(this).hasClass("loaded")) {
                    if (top >= $(this).offset().top - (window.innerHeight / 4 * 3) || window.innerHeight > $(this).offset().top) {
                        $(this).addClass("loaded");

                        $slides.filter(".detail-footer").addClass("loaded");
                    }

                    setTimeout(function(element) {
                        if (top >= $(element).offset().top - (window.innerHeight / 4 * 3) || window.innerHeight > $(element).offset().top) {
                            $(element).addClass("loaded");
                        }
                    }, 250, this);
                }
            });

            if (app.device.isIE) {
                return;
            }

            $slides.each(function() {
                if ($(this).hasClass("no-parallax")) {
                    return;
                }

                var $bg = $(this).find('.slide-bg,.slide-bg-svg');

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
                y = y < 0 ? 0 : y;

                app.utils.tr($bg, 0, y);
            });
        }
    },
    home: {
        _exploreAnimated: false,
        _exploreAnimating: false,
        _exploreTimeout: null,
        _player: null,
        _animation: {
            total: 5000,
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
                            transition: '350ms ' + (100 + (cc * 70)) + 'ms'
                        });
                        cc++;
                    });

                    setTimeout(function() {
                        $explore.addClass('video-played-final');

                        $explore.find('.hp-heading').removeAttr('style');
                        $explore.find('.harry').removeAttr('style');
                        $explore.find('.particle').removeAttr('style');

                        app.utils.toggleScroll(true);
                        $('.site').height($('.main').height() + app.home._animation.total);
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
                        // transform: 'translate3d(' + (1080 * state) + 'px, 0, 0)',
                        opacity: 1 - state
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
                        this.$sliderFrame = $slide.find('.slider-frame');
                    }

                    var translateTop = this.$paragraph.height() - this.$elem.height() - 80 + 50;
                    translateTop = translateTop < 0 ? 0 : translateTop;

                    this.$elem.css({
                        opacity: 1 - state
                    });

                    this.$sliderFrame.css({
                        transform: "translate3d(0, " + (translateTop * state) + "px, 0)"
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
                        "z-index": (state == 0 ? -9999 : 1),
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

                    var holderScale = (0.17 * state * 3);
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

                    if (this.lastState === state) {
                        return;
                    }

                    this.lastState = state;

                    if (this.$particles.parents(".slider-frame").hasClass("prepared")) {
                        this.$particles.parents(".slider-frame").removeClass("prepared");
                    }

                    var translateLast = -44;

                    for (var i = 0; i < this.$particles.length; i++) {
                        if (i < 3) {
                            this.$particles.eq(i).css({
                                transform: "translate3d(" + (translateLast + (-((140 * (3 - i)) + translateLast) * state)) + "px, 0, 0) rotateZ(" + (-(5 * (3 - i)) + ((5 * (3 - i)) * state)) + "deg) scale(" + (0.88 + (0.12 * state)) + ")"
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
                $inAuthor = $slides.filter(".author").find(".slide-wrapper");

            var scrollFirst = true;

            var exploreSlider = null;

            app.utils.toggleScroll(false);

            $('.main').addClass('fixed');
            
            if (window.innerWidth <= 480) {
				$('#unav-stacks').append('<div id="universal"><div class="logoHeader"><a href="http://www.scholastic.com/home/"><img border="0" alt="Scholastic" src="http://www.scholastic.com/kids/stacks/common/images/unav/logo.gif" style="display: block; margin: auto; margin-top: 8px;"></a></div> <div id="universal-account" class=""><div id="universal-signInOut"><a href="https://my.scholastic.com/sps_my_account/accmgmt/GenericSignin.jsp?finalSuccessURL=http://www.scholastic.com" onclick="unavLogOut();return false;">Sign Out</a></div><div id="universal-myAccount"><a class="my-account" onclick="enableDestPopUp(); return MA_show();" href="https://myaccount.scholastic.com/com.scholastic.myaccount.MyAccount/MyAccount.html">My Account</a></div></div></div>');
            }

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
                var hpAnimation = null;
                try {

                    hpAnimation = localStorage.getItem("homepage-animation");

                } catch (e) {
                }

                if (hpAnimation != "true") {
                    var $video = $explore.find('.explore-video video');
                    $explore.find('.explore-video .video-close').addClass('showed');
                    if ($video && $video.length > 0) {
                        $video.on('ended', function() {
                            try {
                                localStorage.setItem("homepage-animation", true);
                            } catch (e) {
                            }

                            $explore.addClass('video-played');
                            self._animation.onVideoPlayed();
                        }).on('playing', function() {
                            $video.addClass('playing');
                        })[0].play();
                    }
                } else {
                    $explore.addClass('video-played');
                    self._animation.onVideoPlayed();
                }
            }

            var touchLast = 0;
            var lastTop = null;

            $(window).on('mousewheel touchstart mousedown', function() {
                $('html,body').stop();
            });

            var updateScreen = function() {
                if (window.requestAnimationFrame) {
                    requestAnimationFrame(updateScreen);
                }

                var top = app.utils.getScrollTop();

                var previousTop = lastTop;

                if (top === lastTop) {
                    return;
                } else {
                    lastTop = top;
                }

                if (!self._animation.initialised) {
                    self._animation.initialised = true;
                }

                if (!$explore.hasClass('video-played-final')) {
                    return false;
                }

                self._animation.current = top;
                self._animation.current = self._animation.current < 0 ? 0 : self._animation.current;
                self._animation.current = self._animation.current > self._animation.total ? self._animation.total : self._animation.current;

                var percent = self._animation.current / self._animation.total;

                if (!$('html,body').is(':animated') && !app.device.isSafari && !app.device.isMobile) {
                    if (top > previousTop && self._animation.current / self._animation.total < 1) {
                        $('html,body').stop().animate({
                            scrollTop: self._animation.total * 1
                        }, 2000 * (1 - percent));
                    } else if (top < previousTop && self._animation.current / self._animation.total >= 0 && self._animation.current / self._animation.total < 1) {
                        $('html,body').stop().animate({
                            scrollTop: 0
                        }, 2000 * percent);
                    }
                }
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

                if (self._animation.current === self._animation.total) {
                    if ($('.main').hasClass('fixed')) {
                        $('.main').removeClass('fixed')
                        $('.site').removeAttr('style').css({
                            paddingTop: self._animation.total + 'px'
                        });

                        if (window.innerWidth <= 736) {
                            if (exploreSlider !== null && !exploreSlider.initialized) {
                                $exploreSlider.addClass("prepared").find(".particle").removeAttr("style");

                                setTimeout(function() {
                                    exploreSlider.init();

                                    $exploreSlider.removeClass("prepared").addClass("initialized");
                                }, 500);
                            }
                        }
                    }
                } else {
                    if (!$('.main').hasClass('fixed')) {
                        $('.site').height($('.main').height() + app.home._animation.total).css({
                            paddingTop: 0
                        });
                        $('.main').addClass('fixed');

                        if (exploreSlider !== null && exploreSlider.initialized) {
                            exploreSlider.destroy();

                            $exploreSlider.removeClass("initialized").addClass("prepared").find("ul li").removeAttr("style").parent().removeAttr("style");
                        }
                    }
                }
            };

            if (window.requestAnimationFrame) {
                requestAnimationFrame(updateScreen);
            } else {
                $(window).scroll(updateScreen);
            }

            $explore.find('.explore-video .video-close').click(function() {
                $explore.addClass('video-played');
                self._animation.onVideoPlayed();
                $explore.find('.explore-video video')[0].pause();


                try {

                    localStorage.setItem("homepage-animation", true);

                } catch (e) {
                }
                return false;
            });

            $(window).resize(function() {
                // Slider
                if (window.innerWidth <= 736) {
                    if (exploreSlider !== null) {
                        if (!exploreSlider.initialized) {
                            if (self._animation.current === self._animation.total && top === 0) {
                                exploreSlider.init();

                                $exploreSlider.addClass("initialized");
                            }
                        } else if (exploreSlider.initialized) {
                            if (self._animation.current !== self._animation.total && top === 0) {
                                exploreSlider.destroy();

                                $exploreSlider.removeClass("initialized").find("ul li").removeAttr("style").parent().removeAttr("style");
                            }
                        }

                        var translateTop = $exploreSlider.parent(".slide-wrapper").find(".books-paragraph").height() - $exploreSlider.parent(".slide-wrapper").find(".hp-heading").height() - 80 + 50,
                            translateTop = translateTop < 0 ? 0 : translateTop;

                        $exploreSlider.css({
                            transform: "translate3d(0, " + translateTop + "px, 0)"
                        });
                    }
                }
            });

            var booksSwitched = null;



            try {

                booksSwitched = localStorage.getItem("homepage-books-switched");

            } catch (e) {
            }



            if (booksSwitched == "true") {
                $inExplore.find('.books-paragraph .link').html('Switch to Mary GrandPré Covers');
                $inExplore.find(".particle").toggleClass('show-new');
            }

            $inExplore.find('.books-paragraph .link').click(function() {
                if ($(this).text() != "Switch to Mary GrandPré Covers") {
                    $(this).html('Switch to Mary GrandPré Covers');

                    try {

                        localStorage.setItem("homepage-books-switched", true);

                    } catch (e) {



                    }
                } else {
                    $(this).html('Check out new cover art by Kazu Kibuishi!');

                    try {

                        localStorage.setItem("homepage-books-switched", false);

                    } catch (e) {
                    }
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
                $(this).attr("placeholder", $(this).attr("data-placeholder"));

                $inGlossary.find(".speaker, .result").removeClass("hide");
            });
            
            var text = $inAuthor.find(".text-inner").html().trim();

			$inAuthor.find(".text").attr({
				"data-text-full": text,
				"data-text-short": text.substring(0, 529).split(" ").slice(0, -1).join(" "),
				"data-text-state": 0
			}).find(".text-inner").html(text.substring(0, 529).split(" ").slice(0, -1).join(" "));
			
			$inAuthor.find(".text-action").click(function() {
				if ($inAuthor.find(".text").attr("data-text-state") == 1) {
					if (app.utils.getScrollTop() > $inAuthor.offset().top) {
						$("html, body").scrollTop($inAuthor.offset().top);
					}
					
					$inAuthor.find(".text").attr("data-text-state", 0).find(".text-inner").html($inAuthor.find(".text").attr("data-text-short"));
					$inAuthor.find(".text-action").text("See All");
				} else {
					$inAuthor.find(".text").attr("data-text-state", 1).find(".text-inner").html($inAuthor.find(".text").attr("data-text-full"));
					$inAuthor.find(".text-action").text("Close");
				}

				return false;
			});

            $('.like').mousedown(function() {
                $(this).addClass('pressed');
            }).mouseleave(function() {
                $(this).removeClass('pressed');
            });

            var $ytPlayer = $('#ytplayer');
            $('.slide.beasts .play-btn').click(function() {
                self.playVideo();
            });

            $('.video .inner-box').click(function() {
                var video = $("#video").find("video").get(0);

                if (video) {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
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

            $(document).click(function(event) {
                if (!$(event.target).parents(".slide.beasts").length && event.target.className != $(".slide.beasts")[0].className) {
                    self.stopVideo();
                }
            });
        },
        playVideo: function() {
            $('.slide.beasts').addClass('video-opened');
            $('.video').addClass('opened');

            var video = $("#video").find("video").get(0);
            if (video) {
                video.play();
            }

            //$('html,body').animate({
            //scrollTop: $('.slide.beasts').offset().top/* + 30*/
            //}, 2000);
        },
        stopVideo: function() {
            $('.slide.beasts').removeClass('video-opened');
            $('.video').removeClass('opened');

            var video = $("#video").find("video").get(0);
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    },
    detail: {
        init: function() {
            var $detailBookAbout = $(".slide.detail").find(".book-specs .book-about");

            var detailBookAboutText = $detailBookAbout.find(".text").html();

            detailBookAboutText = detailBookAboutText.trim();

            var maxChar = 175;

            if (detailBookAboutText.length > maxChar) {
                $detailBookAbout.attr({
                    "data-text-full": detailBookAboutText,
                    "data-text-short": detailBookAboutText.substring(0, maxChar - 1).split(" ").slice(0, -1).join(" ") + "...",
                    "data-text-state": 0
                }).find(".text").html(detailBookAboutText.substring(0, maxChar - 1).split(" ").slice(0, -1).join(" ") + "...");

                var detailBookAboutHeightShort = $detailBookAbout.height();
                detailBookAboutHeightLong = 0;

                $detailBookAbout.find("a.detail-link").click(function() {
                    if ($detailBookAbout.attr("data-text-state") == 1) {
                        $("html, body").scrollTop(0);

                        $detailBookAbout.attr("data-text-state", 0).find(".text").html($detailBookAbout.attr("data-text-short"));
                        $(this).text("See All");

                        detailBookAboutHeightShort = $detailBookAbout.height();
                    } else {
                        $detailBookAbout.attr("data-text-state", 1).find(".text").html($detailBookAbout.attr("data-text-full"));
                        $(this).text("See Less");

                        detailBookAboutHeightLong = $detailBookAbout.height();
                    }

                    return false;
                });
            } else {
                $detailBookAbout.find("a").hide();
            }
            
            var $inAuthor = $(".about-author").find(".slide-wrapper");
			
			var text = $inAuthor.find(".text-inner").html().trim();

			$inAuthor.find(".text").attr({
				"data-text-full": text,
				"data-text-short": text.substring(0, 529).split(" ").slice(0, -1).join(" "),
				"data-text-state": 0
			}).find(".text-inner").html(text.substring(0, 529).split(" ").slice(0, -1).join(" "));
			
			$inAuthor.find(".text-action").click(function() {
				if ($inAuthor.find(".text").attr("data-text-state") == 1) {
					if (app.utils.getScrollTop() > $inAuthor.offset().top) {
						$("html, body").scrollTop($inAuthor.offset().top);
					}
					
					$inAuthor.find(".text").attr("data-text-state", 0).find(".text-inner").html($inAuthor.find(".text").attr("data-text-short"));
					$inAuthor.find(".text-action").text("See All");
				} else {
					$inAuthor.find(".text").attr("data-text-state", 1).find(".text-inner").html($inAuthor.find(".text").attr("data-text-full"));
					$inAuthor.find(".text-action").text("Close");
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

            var self = this;

            $(window).resize(function() {
                self.onResize();
            });
            this.onResize();
        },
        onResizeWidth: window.innerWidth,
        onResize: function() {
            var $slider = [];

            var slider = [],
                sliderLoaded = [];

            $(".slider-frame:not(.binded)").each(function(index) {
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

                sliderLoaded[index] = false;

                $(this).parents(".slide-wrapper").off(app.utils.transitionEnd)
                    .on(app.utils.transitionEnd, function() {
                        $(this).off(app.utils.transitionEnd);

                        if (window.innerWidth <= 736 && !slider[index].initialized) {
                            sliderLoaded[index] = true;

                            slider[index].init();

                            $slider[index].find("ul:not(.pages) li").css({
                                "width": 100 / $slider[index].find("ul:not(.pages) li").length + "%",
                                "min-width": 100 / $slider[index].find("ul:not(.pages) li").length + "%",
                                "max-width": 100 / $slider[index].find("ul:not(.pages) li").length + "%"
                            });
                        }
                    });
            }).addClass("binded");

            for (var i = 0; i < slider.length; i++) {
                if (window.innerWidth == this.onResizeWidth) {
                    return false;
                }

                if (slider[i].initialized) {
                    slider[i].destroy();

                    $slider[i].find("ul:not(.pages) li").removeAttr("style").parent().removeAttr("style");
                }

                if (window.innerWidth <= 736) {
                    if (!slider[i].initialized && sliderLoaded[i]) {
                        slider[i].init();

                        $slider[i].find("ul:not(.pages) li").css({
                            "width": 100 / $slider[i].find("ul:not(.pages) li").length + "%",
                            "min-width": 100 / $slider[i].find("ul:not(.pages) li").length + "%",
                            "max-width": 100 / $slider[i].find("ul:not(.pages) li").length + "%"
                        });
                    }
                }
            }

            this.onResizeWidth = window.innerWidth;
        }
    },
    components: {
        init: function() {
            this.readNext();
            this.illustrated();
            this.moreBooks();
        },
        readNext: function() {
            var $readNext = $(".slide.read-next");

            if (!$readNext.length) {
                return false;
            }

            var $time = $.now(),
                interval = null;

            $readNext.find(".next-books").on({
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

            var $slider;

            var slider = null,
                sliderLoaded = false;

            $readNext.find(".slider-frame:not(.binded)").each(function(index) {
                $slider = $(this);

                slider = new Sly($slider, {
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
                    pagesBar: $slider.parent().find(".pages"),
                });
            }).addClass("binded");

            var transition = $readNext.find(".slider-frame").parents(".slide-wrapper").css("transition");

            if (transition == "all 0s ease 0s" || transition == "") {
                if (window.innerWidth <= 736 && !slider.initialized) {
                    sliderLoaded = true;

                    slider.init();

                    $slider.find("ul:not(.pages) li").css({
                        "width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                        "min-width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                        "max-width": 100 / $slider.find("ul:not(.pages) li").length + "%"
                    });
                }
            } else {
                $readNext.find(".slider-frame").parents(".slide-wrapper").off(app.utils.transitionEnd)
                    .on(app.utils.transitionEnd, function() {
                        $(this).off(app.utils.transitionEnd);

                        if (window.innerWidth <= 736 && !slider.initialized) {
                            sliderLoaded = true;

                            slider.init();

                            $slider.find("ul:not(.pages) li").css({
                                "width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                                "min-width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                                "max-width": 100 / $slider.find("ul:not(.pages) li").length + "%"
                            });
                        }
                    });
            }

            var lastWidth = window.innerWidth;

            $(window).resize(function() {
                if (slider === null || !sliderLoaded || window.innerWidth == lastWidth) {
                    return false;
                }

                if (slider.initialized) {
                    slider.destroy();

                    $slider.find("ul:not(.pages) li").removeAttr("style").parent().removeAttr("style");
                }

                if (window.innerWidth <= 736) {
                    if (!slider.initialized) {
                        slider.init();

                        $slider.find("ul:not(.pages) li").css({
                            "width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                            "min-width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                            "max-width": 100 / $slider.find("ul:not(.pages) li").length + "%"
                        });
                    }
                }

                lastWidth = window.innerWidth;
            });
        },
        illustrated: function() {
            var $illustrated = $(".slide.illustrated");

            if (!$illustrated.length) {
                return false;
            }

            $illustrated.find(".books").on({
                mouseenter: function() {
                    if (window.innerWidth <= 736) {
                        return false;
                    }

                    $(this).removeClass("hide").siblings().addClass("hide");

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
                            item.siblings().removeClass("hide");

                            clearInterval(interval);
                        }
                    }, 100, $(this));
                }
            }, "li");

            $(window).scroll(function() {
                if (app.utils.getScrollTop() >= $illustrated.offset().top - ($illustrated.height() / 2)) {
                    if (!$illustrated.find(".like").hasClass("loaded")) {
                        if ($illustrated.hasClass("loaded") && !$illustrated.find(".like").hasClass("loaded")) {
                            $illustrated.find(".like").addClass("loaded");
                        }

                        $illustrated.off(app.utils.transitionEnd)
                            .on(app.utils.transitionEnd, function() {
                                $(this).off(app.utils.transitionEnd);

                                $(this).find(".like").addClass("loaded");
                            }).addClass("loaded");
                    }
                }
            });
        },
        moreBooks: function() {
            var $moreBooks = $(".slide.more-books");

            if (!$moreBooks.length) {
                return false;
            }

            var $slider;

            var slider = null,
                sliderLoaded = false;

            $moreBooks.find(".slider-frame:not(.binded)").each(function(index) {
                $slider = $(this);

                slider = new Sly($slider, {
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
                    pagesBar: $slider.parent().find(".pages"),
                });
            }).addClass("binded");

            var transition = $moreBooks.find(".slider-frame").parents(".slide-wrapper").css("transition");

            if (transition == "all 0s ease 0s" || transition == "") {
                if (window.innerWidth <= 736 && !slider.initialized) {
                    sliderLoaded = true;

                    slider.init();

                    $slider.find("ul:not(.pages) li").css({
                        "width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                        "min-width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                        "max-width": 100 / $slider.find("ul:not(.pages) li").length + "%"
                    });
                }
            } else {
                $moreBooks.find(".slider-frame").parents(".slide-wrapper").off(app.utils.transitionEnd)
                    .on(app.utils.transitionEnd, function() {
                        $(this).off(app.utils.transitionEnd);

                        if (window.innerWidth <= 736 && !slider.initialized) {
                            sliderLoaded = true;

                            slider.init();

                            $slider.find("ul:not(.pages) li").css({
                                "width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                                "min-width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                                "max-width": 100 / $slider.find("ul:not(.pages) li").length + "%"
                            });
                        }
                    });
            }

            var lastWidth = window.innerWidth;

            $(window).resize(function() {
                if (slider === null || !sliderLoaded || window.innerWidth == lastWidth) {
                    return false;
                }

                if (slider.initialized) {
                    slider.destroy();

                    $slider.find("ul:not(.pages) li").removeAttr("style").parent().removeAttr("style");
                }

                if (window.innerWidth <= 736) {
                    if (!slider.initialized) {
                        slider.init();

                        $slider.find("ul:not(.pages) li").css({
                            "width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                            "min-width": 100 / $slider.find("ul:not(.pages) li").length + "%",
                            "max-width": 100 / $slider.find("ul:not(.pages) li").length + "%"
                        });
                    }
                }

                lastWidth == window.innerWidth;
            });
        }
    }
};

$(function() {
    app.layout.init();
});