package com.scholastic.harrypotter.controller;

import java.util.ArrayList;

import com.adobe.cq.sightly.WCMUse;
import com.scholastic.harrypotter.common.Constants;
import com.scholastic.harrypotter.model.TriviaQuestions;
import com.scholastic.harrypotter.model.TriviaQuestionsList;

public class TriviaQuestionsCtrl extends WCMUse {
	
	private ArrayList<TriviaQuestions> triviaQuestions = new ArrayList<TriviaQuestions>();

	@Override
	public void activate() throws Exception {
		TriviaQuestionsList triviaQuestionsList = new TriviaQuestionsList(Constants.JCR_DATA_BASE_PATH+"/trivia");
		triviaQuestionsList.fetch();
		this.setTriviaQuestions(triviaQuestionsList.getTriviaQuestions());
	}

	public ArrayList<TriviaQuestions> getTriviaQuestions() {
		return triviaQuestions;
	}

	public void setTriviaQuestions(ArrayList<TriviaQuestions> triviaQuestions) {
		this.triviaQuestions = triviaQuestions;
	}

}
