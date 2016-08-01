app.glossary = {
	init: function() {
		var self = this;

		$(window).resize(this.onResize);
		$(window).scroll(this.onScroll);

		this.onResize();
		this.onScroll();
		this.search();
		this.listing();

		$(".glossary-sections .section .section-content li").click(function() {
			$(".glossary-sections .section .section-content li").removeClass("active");

			$(this).addClass("active");
		});

		$(".glossary .back-to-top a").click(function() {
			$('html,body').animate({scrollTop: 0}, 300);

			return false;
		});
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
			$header.removeClass('floating').removeAttr('style');
		}

		$sectionsSection.each(function() {
			var pos = $(this).offset().top;
			var y = top + 100 - pos;
			y = y < 0 ? 0 : y;
			var maxPos = $(this).height() - $(this).find('.section-headline span').outerHeight() - 30;

			if (y > maxPos) {
				$(this).find('.section-headline span').css({
					position: 'relative',
					transform: 'translate3d(0, ' + maxPos + 'px, 0)'
				});
			} else if (y > 0) {
				$(this).find('.section-headline span').css({
					position: 'fixed',
					transform: 'translate3d(0, ' + 100 + 'px, 0)'
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

		$search.find('.close').click(function() {
			$('html,body').animate({scrollTop: 0}, 300);

			return false;
		});

		$input.focus(function() {
			$(this).attr("placeholder", "");
		}).blur(function() {
			$(this).attr("placeholder", $(this).attr("placeholder"));
		}).on('input', function(event) {
			$(this).width(app.utils.getTextWidth($(this)));

			app.glossary.results();
		});
	},
	listing: function() {
		var self = this;

		var $header = $('.glossary .header'),
			$listing = $header.find('.listing'),
			$sections = $(".glossary-sections");

		$listing.find('.books-show').click(function() {
			console.log('clicked');
			$listing.toggleClass("active");

			if ($listing.hasClass("active")) {
				$listing.height(window.innerHeight - 56);
			} else {
				$listing.removeAttr('style');
			}

			return false;
		});

		$listing.find("a:not(.books-show)").click(function() {
			var char = $(this).text();
			var $section = $sections.find("[data-section=\"" + $(this).text() + "\"]");

			if ($section.length && $section.is(':visible')) {
				$('html,body').animate({
					scrollTop: $section.offset().top - 112
				});
			}

			return false;
		});

		$listing.find("select").change(function() {
			var char = $(this).val();
			var $section = $sections.find("[data-section=\"" + char + "\"]");

			if ($section.length && $section.is(':visible')) {
				$('html,body').animate({
					scrollTop: $section.offset().top - 112
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
				$(this).hide();
			} else {
				$(this).show();
			}
		});

		if (!$sections.find(".section:visible").length) {
			$('.glossary .no-results').show();
		} else {
			$('.glossary .no-results').hide();
		}

		this.onResize();
	}
};