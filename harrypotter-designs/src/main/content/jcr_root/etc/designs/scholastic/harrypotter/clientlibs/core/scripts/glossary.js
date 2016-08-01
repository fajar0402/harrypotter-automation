app.glossary = {
	init: function() {
		var self = this;

		$(window).resize(this.onResize);
		$(window).scroll(this.onScroll);

		this.onResize();

		this.onScroll();
		this.search();
        
        $(".glossary-sections .section .section-content li").click(function() {
			$(".glossary-sections .section .section-content li").removeClass("active");

			$(this).addClass("active");
		}).mouseenter(function() {
			if ($(this).find('.hover-outer').length) {
				clearTimeout($(this).data('hoverTimeout'));
				return;
			}
			
			var $hover = $('<div class="hover-outer disabled">\
				<div class="hover">\
					<div class="title">' + $(this).find('.title').text() + '</div>\
					<div class="description">' + $(this).find('.description').text() + '</div>\
					<div class="buttons"><a href="#" class="button action-play" data-audio="' + $(this).attr('data-audio') + '"><span class="icon-speaker"></span></a><a href="#" class="button"><span class="icon-favorite"></span></a></div>\
				</div>\
			</div>');
			
			$(this).prepend($hover);
			
			setTimeout(function() {
				$hover.removeClass('disabled');
			}, 30);
		}).mouseleave(function() {
			$(this).data('hoverTimeout', setTimeout(function() {
				$(this).find('.hover-outer').remove();
			}.bind(this), 500));
		});

		$(".glossary .back-to-top a").click(function() {
			$('html,body').animate({scrollTop: 0}, 300);

			return false;
		});

        self.glossaryDataRequest();
	},
	onResize: function() {
		var $sections = $(".glossary-sections");

		$sections.css({
			minHeight: window.innerHeight - $(".glossary .back-to-top").outerHeight()
		});

		$sections.find(".section").each(function() {
			$(this).find(".section-content > li").removeClass("first");

			$(this).find(".section-content > li:visible").each(function(index) {
				var breakAfter = 4;

				if (window.innerWidth <= 736) {
					breakAfter = 1;
				} else if (window.innerWidth <= 800 && window.innerWidth > 736) {
					breakAfter = 3;
				}

				if (index !== 0 && index % breakAfter === 0) {
					$(this).addClass("first");
				}
			});
		});
	},
	onScroll: function() {
		var heroHeight = 360,
			heroHeightMinimized = 56,
			heroHeadingOuterHeight = 250,
			listingHeight = 56;

		var top = app.utils.getScrollTop();

		var $header = $(".glossary .header"),
			$search = $header.find('.hero-search'),
			$listing = $(".glossary-listing"),
			$sections = $(".glossary-sections"),
			$sectionsSection = $sections.find(".section");

		var heroY = top - heroHeight + heroHeightMinimized;
		heroY = heroY < 0 ? 0 : heroY;

		var searchBottom = 60;
		searchBottom -= top > 250 ? top - 250 : 0;
		searchBottom = searchBottom < 0 ? 0 : searchBottom;

		$search.css({
			bottom: searchBottom
		});

		if (heroY > 0) {
			$header.addClass('floating').width($('.glossary').width());
		} else {
			$header.removeClass('floating').removeAttr('style').find('input').trigger('resized');
		}

        if (!app.device.isChrome || app.device.isMobile) {
			return;
		}

		$sectionsSection.each(function() {
			var pos = $(this).offset().top;
			var y = top + 200 - pos;
			y = y < 0 ? 0 : y;
			var maxPos = $(this).height() - $(this).find('.section-headline span').outerHeight() - 50;

			if (y > maxPos) {
				$(this).find('.section-headline span').css({
					position: 'relative',
					transform: 'translate3d(0, ' + maxPos + 'px, 0)'
				});
			} else if (y > 0) {
				$(this).find('.section-headline span').css({
					position: 'fixed',
					transform: 'translate3d(0, ' + (200+45) + 'px, 0)'
				});
			} else {
				$(this).find('.section-headline span').removeAttr('style');
			}
		});
	},
	search: function() {
		var $header = $(".glossary .header"),
			$search = $header.find(".hero-search"),
			$input = $search.find("input"),
			$sections = $(".glossary .glossary-sections");

		$search.find(".icon-search-active").click(function() {
			$input.focus();
		});

		$search.find('.close').click(function() {
			// $('html,body').animate({scrollTop: 0}, 300);
			$search.removeClass("active");
			$input.val("");
			
			app.glossary.results();

			return false;
		});

		$input.focus(function() {
			$(this).attr("placeholder", "");
		}).blur(function() {
			$(this).attr("placeholder", $(this).attr("data-placeholder"));
		}).on('input', function(event) {
			$(this).width(app.utils.getTextWidth($(this)));

            if ($(this).val().length) {
				$search.addClass("active");
			} else {
				$search.removeClass("active");
			}

			app.glossary.results();
		}).on('resized', function() {
			$(this).width(app.utils.getTextWidth($(this)));
			
			if ($(this).val().length) {
				$search.addClass("active");
			} else {
				$search.removeClass("active");
			}
		}).on('keydown', function(e) {
            if (e.keyCode === 13) {
                var $listing = $('.glossary .header .listing');
                
                if ($listing.hasClass('active')) {
                    $listing.find('.books-show').click();
                }
                
                return false;
            }
        });
	},
	listing: function() {
		var self = this;

		var $header = $('.glossary .header'),
			$listing = $header.find('.listing'),
			$sections = $(".glossary-sections");

		$listing.find('.books-show').click(function() {
			$listing.toggleClass("active");

			if ($listing.hasClass("active")) {
				$listing.height(window.innerHeight - 56);
			} else {
				$listing.removeAttr('style');
			}

			return false;
		});

		$listing.find("a:not(.books-show)").click(function() {
			var $section = $sections.find("[data-section=\"" + $(this).text() + "\"]");

			if ($section.length && $section.is(':visible')) {
				$('html,body').animate({
					scrollTop: $section.offset().top - 200 - 45
				});
			}

			return false;
		});

		$listing.find("select").change(function() {
			var $section = $sections.find("[data-section=\"" + $(this).val() + "\"]");

			if ($section.length && $section.is(':visible')) {
				$('html,body').animate({
					scrollTop: $section.offset().top - 200 - 45
				});
			}
		});

		$listing.find('.books input').change(function() {
			app.glossary.results();
		});

		$('.glossary-sections .action-play').click(function() {
			app.utils.playAudio($(this).attr('data-audio'));

			return false;
		});

		return false;
	},
	results: function() {
		var $header = $(".glossary .header"),
			$listing = $header.find('.listing'),
			$search = $header.find(".hero-search"),
			$input = $search.find("input"),
			$sections = $(".glossary .glossary-sections");

		var matcher = $input.val().trim();
		var re = new RegExp(matcher.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&"), "i");

		var books = [];
		$listing.find('.books input:checked').each(function() {
			books.push($(this).attr('value'));
		});

        var sectionVisibleCount = 0;

		$sections.find(".section").each(function() {
			var sectionVisible = false;

			$(this).find(".section-content > li").each(function() {
				var title = $(this).find('.title').text();
				var inbooks = $(this).attr('data-books').split(',');

				var visible = inbooks.filter(function(book) {
					return books.indexOf(book) !== -1;
				}).length;

				if (visible) {
					visible = !matcher || title.trim().match(re);
				}

				$(this)[visible ? 'show' : 'hide']();

				if (visible) {
					sectionVisible = true;
				}
			});

			if (!sectionVisible) {
				$(this).hide().removeClass("first");
			} else {
				$(this).show().removeClass("first");

                if (sectionVisibleCount == 0) {
					$(this).addClass("first");
				}

				sectionVisibleCount++;
			}
		});

		if (!$sections.find(".section:visible").length) {
			if (!$listing.find(".books input:checked").length) {
				$(".glossary .no-results").find("h2").text("Please select any one of the book.").parent().find("p").hide();
				$("html, body").scrollTop(0);
			} else {
				$(".glossary .no-results").find("h2").text("Sorry, no word was found.").parent().find("p").show();
			}

			$('.glossary .no-results').show();
		} else {
			$('.glossary .no-results').hide();
		}

		this.onResize();

        var $last = $(".glossary .glossary-sections > li:visible").eq(0);
		
		if ($last.length) {
			if ($last.offset().top - app.utils.getScrollTop() - 250 < 0) {
				$('html,body').scrollTop(app.utils.getScrollTop() + ($last.offset().top - app.utils.getScrollTop() - 250 - 45));
			}
		}

	},
    glossaryDataRequest: function() {
        var self = this;

		GlossaryAPI.getGlossary().done(function(response) {
            self.render(response);
        });
    },
    render: function(data) {
        this.renderBooks(data.books);
        this.renderVocabularyRecords(data.vocabularyRecords);
		this.listing();
        this.prepopulateText();
    },
    renderBooks: function(books) {
		$(".books").html('');
		for(var i=0; i<books.length; i++) {
			var book = books[i];
			var bookId = 'book-'+book.code;

			var booksTemplateString =
			'<li class="book" data-book-code="'+ book.code +'">' +
				'<div class="cover"><img src="'+ book.image +'" alt="'+ book.title +'"></div>' +
				'<div class="name">'+ book.title +'</div>' +
				'<input id="'+ bookId +'" type="checkbox" name="'+ bookId +'" value="'+ book.code +'" checked>' +
				'<div class="checkbox"></div>' +
				'<label for="'+ bookId +'"><span></span></label>' +
			'</li>';
			var booksTemplate = $(booksTemplateString);

            $(".books").append(booksTemplate);
        }
    },
    renderVocabularyRecords: function(vocabularyRecords) {
		$('.glossary-sections').html('');
		for(var i=0; i<vocabularyRecords.length; i++) {

			var vocabularyRecord = vocabularyRecords[i];
            var lastSection = i != 0? vocabularyRecords[i-1].startedWith : "A";

            var vocabularyRecordsTemplate;

            if( i==0 || vocabularyRecord.startedWith !== lastSection) {
            	var startedWith = vocabularyRecord.startedWith? vocabularyRecord.startedWith.toLowerCase() : vocabularyRecord.startedWith;

            	var vocabularyRecordsTemplateString =
            	'<li class="section" data-section="'+ startedWith +'">' +
            		'<div class="section-headline"><span>'+ startedWith +'</span></div>' +
            		'<ul class="section-content"></ul>' +
            	'</li>';
				vocabularyRecordsTemplate = $(vocabularyRecordsTemplateString);

				$('.glossary-sections').append(vocabularyRecordsTemplate);
            }

            if(vocabularyRecordsTemplate !== null) {
            	var books = vocabularyRecord.books? vocabularyRecord.books.join(",") : "";
            	
            	var sectionTemplateString =
            	'<li data-books="'+ books +'">' +
	            	'<div class="hover-outer">' +
		            	'<div class="hover">' +
			            	'<div class="title">'+ vocabularyRecord.term +'</div>' +
			            	'<div class="description">'+ vocabularyRecord.definition +'</div>' +
			            	'<div class="buttons">' +
                                '<a href="#" class="button action-play" data-audio="'+ vocabularyRecord.audio +'">' +
                    				'<span class="icon-speaker"></span>' +
                    			'</a>' +
				            '</div>' +
		            	'</div>' +
	            	'</div>' +
	            	'<div class="title">'+ vocabularyRecord.term +'</div>' +
	            	'<div class="description">'+ vocabularyRecord.definition +'</div>' +
            	'</li>';
				var sectionTemplate = $(sectionTemplateString);


				vocabularyRecordsTemplate.find('.section-content').append(sectionTemplate);
            }
        }
    },
    prepopulateText: function() {
        var $header = $(".glossary .header"),
			$search = $header.find(".hero-search"),
			$input = $search.find("input");

		var searchTerm = URLUtils.getQueryItem("search-terms");
        $input.val(searchTerm);
        $input.trigger("input");
    }
};