app.hatSorting = {
	init: function() {
		var $hatSorting = $(".hat-sorting"),
			$hatSortingQuestions = $hatSorting.find(".questions"),
			$hatSortingQuestionsPosition = $hatSortingQuestions.find(".position"),
			$hatSortingQuestionsPositionActive = $hatSortingQuestionsPosition.find(".position-active"),
			$hatSortingQuestionsQuestion = $hatSortingQuestions.find(".question"),
			$hatSortingQuestionsAnswers = $hatSortingQuestions.find(".answers"),
			$hatSortingQuestionsMessage = $hatSortingQuestions.find(".message"),
			$hatSortingQuestionsMessageList = [
				"ah.png",
				"hm.png",
				"i-see.png",
				"right-then.png"
			];
			$hatSortingResult = $hatSorting.find(".result");
		
		var questionsData = null,
			questionsCurrent = 1,
			questionsAnswersSelected = [];
		
		$.getJSON("json/hat-sorting.json", function(data) {
			questionsData = $.map(data, function(element) {
				return element;
			});
			
			questionsData = app.utils.shuffleArray(questionsData);
			
			/**
			* Update question
			**/
			$hatSortingQuestionsPositionActive.html(questionsCurrent);
			$hatSortingQuestionsQuestion.html(questionsData[questionsCurrent-1].question);
			
			$hatSortingQuestionsAnswers.find(".answer").each(function(index, element) {
				index++;
				
				var answerData = questionsData[questionsCurrent-1].answers[index];
				
				$(this).removeClass("normal long selected").addClass(answerData.type).find(".answer-middle").html(answerData.answer);
			});
			
			app.utils.shuffleElements(".answers", ".answer");
			
			$hatSortingQuestions.removeClass("hide");
		});
		
		$hatSortingQuestionsAnswers.find(".answer").click(function() {
			questionsAnswersSelected[questionsCurrent] = $(this).attr("answer-order");
			
			/**
			* Mark selected answer
			**/
			$(this).addClass("selected").delay(500).queue(function() {
				/**
				* Last question, hide and show result
				**/
				if (questionsCurrent == questionsData.length) {
					$hatSortingResult.css("display", "block");
					
					$hatSortingQuestions.off(app.utils.transitionEnd)
					.on(app.utils.transitionEnd, function() {
						$(this).off(app.utils.transitionEnd);
						
						$hatSortingResult.removeClass("hide");
					}).addClass("hide");
					
					return false;
				}
				
				questionsCurrent++;
				
				/**
				* Update message
				**/
				$hatSortingQuestionsMessage.find("img").attr("src", "images/hat-sorting/" + $hatSortingQuestionsMessageList[Math.floor(Math.random() * $hatSortingQuestionsMessageList.length)]);
				
				/**
				* Hide question and show message
				**/
				$hatSortingQuestionsQuestion.addClass("hide");
				
				$(this).dequeue().parent().off(app.utils.transitionEnd)
				.on(app.utils.transitionEnd, function() {
					$(this).off(app.utils.transitionEnd);
					
					/**
					* Update position
					**/
					$hatSortingQuestionsPositionActive.stop().delay(2000).animate({
						"opacity": 0
					}, 500, function() {
						$(this).html(questionsCurrent).animate({
							"opacity": 1
						}, 500);
					});
					
					/**
					* Hide message and show question
					**/
					$hatSortingQuestionsMessage.removeClass("hide").delay(2000).queue(function() {
						$(this).dequeue().off(app.utils.transitionEnd)
						.on(app.utils.transitionEnd, function() {
							$(this).off(app.utils.transitionEnd);
							
							/**
							* Update question
							**/
							$hatSortingQuestionsQuestion.html(questionsData[questionsCurrent-1].question);
							
							$hatSortingQuestionsAnswers.find(".answer").each(function(index, element) {
								index++;
								
								var answerData = questionsData[questionsCurrent-1].answers[index];
								
								$(this).removeClass("normal long selected").addClass(answerData.type).find(".answer-middle").html(answerData.answer);
							});
							
							app.utils.shuffleElements(".answers", ".answer");
							
							$hatSortingQuestionsQuestion.removeClass("hide");
							$hatSortingQuestionsAnswers.removeClass("hide");
						}).addClass("hide");
					});
				}).addClass("hide");
			});
		});
	}
};