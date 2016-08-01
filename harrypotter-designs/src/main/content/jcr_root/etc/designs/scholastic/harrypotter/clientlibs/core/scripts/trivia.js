app.trivia = {
	init: function() {
		var $trivia = $(".site.trivia");

		$trivia = $(".slide.trivia-detail");

		if (!$trivia.length) {
			return false;
		}

		var $intro = $trivia.find(".intro"),
			$introButtons = $intro.find(".buttons");

		var $quiz = $trivia.find(".quiz"),
			$quizMessage = $quiz.find(".message"),
			$quizQuestion = $quiz.find(".question"),
			$quizAnswers = $quiz.find(".answers"),
			$quizWands = $quiz.find(".wands"),
			$quizCover = $quiz.find(".cover");


         $(window).resize(function() {
            if (window.innerHeight < 700) {
                $trivia.addClass("small");
            } else {
                $trivia.removeClass("small");
            }
        });

		var questionsData = null,
			questionsCurrent = 1,
			questionsAnswersSelected = [];

		$.getJSON("/bin/apps/scholastic/harrypotter/trivia", function(data) {
			questionsData = $.map(data, function(element) {
				return element;
			});
		});

		$introButtons.find(".play").click(function() {
			questionsData = app.utils.shuffleArray(questionsData);
			questionsCurrent = 1;

			$trivia.find(".bar div").addClass("show");

			/**
			* Update question
			**/
			$quizQuestion.html(questionsData[questionsCurrent-1].question);

			$quizAnswers.find(".answer").each(function(index, element) {
				var answerData = questionsData[questionsCurrent-1].answers[index];

				$(this).parent().find("[data-answer-order=\"" + (index + 1) + "\"]").removeAttr("data-answer-type").html("<span></span>" + answerData.answer);

				if (answerData.type === true) {
					$(this).parent().find("[data-answer-order=\"" + (index + 1) + "\"]").attr("data-answer-type", answerData.type);
				}
			});

			app.utils.shuffleElements(".answers", ".answer");

			/**
			* Start game
			**/
			$quiz.css("display", "block");
			$quizCover.addClass("active");
			$intro.addClass("hide");

			setTimeout(function() {
				$intro.css("display", "none");

				$quiz.find(".quiz-inner").css("display", "flex").delay(10).queue(function() {
					$(this).addClass("show").dequeue();
				});

				$quizWands.css("display", "block").delay(10).queue(function() {
					$(this).addClass("show").dequeue();
				});
				
				$quizCover.addClass("inactive");
				
				setTimeout(function() {
					setTimeout(function() {
						$quizCover.removeClass("active inactive");

						$trivia.find(".bar > div").eq(0).html("Question — " + questionsCurrent);
					}, 700);
				}, 300);
			}, 700);

			return false;
		});

		$quizAnswers.find(".answer").click(function() {
			var $answer = $(this);

			questionsAnswersSelected[questionsCurrent] = {
				"answer": $(this).attr("data-answer-order"),
				"type": $(this).attr("data-answer-type") ? true : false
			};

			if ($(this).attr("data-answer-type") != "true") {
				var lives = 3;

				$($quizWands.find("img").get().reverse()).each(function() {
					if ($(this).attr("data-status") != "hide") {
						$(this).attr("data-status", "hide");

						return false;
					}

					lives--;
				});

				if (lives <= 1) {
					questionsCurrent = questionsData.length;
				}
			}

			questionsCurrent++;

			$quizCover.addClass("active");
			$quiz.find(".quiz-inner").find(".left, .right").addClass("hide");

			setTimeout(function() {
				$quizMessage.html($answer.attr("data-answer-type") == "true" ? "you answered right..." : "you answered wrong...").addClass("show");
				
				setTimeout(function() {
					$quizMessage.addClass("hide");
				}, 300);

				setTimeout(function() {
					$quizMessage.removeClass("show hide");
					
					if ((questionsCurrent - 1) == questionsData.length) {
						$trivia.find(".bar > div").eq(0).html("Trivia Game - Your Score");

						var correct = 0;

						questionsAnswersSelected.forEach(function(data) {
							if (data.type === true) {
								correct++;
							}
						});

						$intro.find("h2").html("You answered " + correct + " correct!");

						if ($intro.find("p").length == 1) {
							$intro.find("p").html("Looks like you may need a trip to the library!").after("<p>Study up by reading the Harry Potter books and try again!</p>");
						}

						if ($introButtons.find("a").length == 1) {
							$introButtons.prepend("<a href=\"\" class=\"button bigger-gap\"><span class=\"icon-close\" aria-hidden=\"true\"></span> Leave Game</a>").find(".play").removeClass("bordered").html("<img src=\"/etc/designs/scholastic/harrypotter/clientlibs/core/images/trivia/icon-play-again.png\" title=\"\" alt=\"\"> Play Again");
						}

						$quiz.find(".quiz-inner").removeClass("show");
						$quizWands.removeClass("show");

						setTimeout(function() {
							$quiz.find(".quiz-inner").removeAttr("style").find(".left, .right").removeClass("hide");
							$quizWands.removeAttr("style").find("img").removeClass("hide").removeAttr("data-status");

							$intro.removeAttr("style").removeClass("hide");
						}, 300);
					} else {
						$quiz.find(".quiz-inner .left, .quiz-inner .right").removeClass("hide");
						
						$trivia.find(".bar > div").eq(0).html("Question — " + questionsCurrent);

						$quizQuestion.html(questionsData[questionsCurrent-1].question);

						$quizAnswers.find(".answer").each(function(index, element) {
							var answerData = questionsData[questionsCurrent-1].answers[index];

							$(this).parent().find("[data-answer-order=\"" + (index + 1) + "\"]").removeAttr("data-answer-type").html("<span></span>" + answerData.answer);

							if (answerData.type === true) {
								$(this).parent().find("[data-answer-order=\"" + (index + 1) + "\"]").attr("data-answer-type", answerData.type);
							}
						});

						app.utils.shuffleElements(".answers", ".answer");
					}

					$quizCover.addClass("inactive");

					setTimeout(function() {
						$quizCover.removeClass("active inactive");

						$($quizWands.find("img").get().reverse()).each(function() {
							if (!$(this).hasClass("hide") && $(this).attr("data-status") == "hide") {
								$(this).addClass("hide");
							}
						});
					}, 700);
				}, 1600);
			}, 700);
		});
	}
};