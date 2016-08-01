package com.scholastic.harrypotter.model;

import java.util.ArrayList;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.scholastic.harrypotter.model.abstracts.JCRModel;

public class TriviaQuestionsList extends JCRModel{

public static final String TRIVIA_QUESTIONS = "triviaQuestions";
	
	private ArrayList<TriviaQuestions> triviaQuestions = new ArrayList<TriviaQuestions>();
	
	public TriviaQuestionsList() {}
	
	public TriviaQuestionsList(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	public TriviaQuestionsList(ArrayList<TriviaQuestions> triviaQuestions) {
		this.triviaQuestions = triviaQuestions;
	}

	public ArrayList<TriviaQuestions> getTriviaQuestions() {
		return triviaQuestions;
	}

	public void setTriviaQuestions(ArrayList<TriviaQuestions> triviaQuestions) {
		this.triviaQuestions = triviaQuestions;
	}

	public void fromJSON(JSONObject json) throws JSONException {
		if (this.triviaQuestions != null) this.triviaQuestions.clear();
		
		if (json != null && json.has(TRIVIA_QUESTIONS)) {
			JSONArray triviaQuestions = json.getJSONArray(TRIVIA_QUESTIONS);
			
			for (int i = 0; triviaQuestions != null && i < triviaQuestions.length(); i++) {
				JSONObject triviaQuestionsJSON = triviaQuestions.getJSONObject(i);
				String question = triviaQuestionsJSON.has(TriviaQuestions.QUESTION)? triviaQuestionsJSON.getString(TriviaQuestions.QUESTION) : null;
				String correctAnswer = triviaQuestionsJSON.has(TriviaQuestions.CORRECT_ANSWER)? triviaQuestionsJSON.getString(TriviaQuestions.CORRECT_ANSWER): null;
						
				JSONArray answersArray = triviaQuestionsJSON.has(TriviaQuestions.ANSWERS)? triviaQuestionsJSON.getJSONArray(TriviaQuestions.ANSWERS) : null;
				String[] answers = null;
				
				if (answersArray != null) {
					int arrayLength = answersArray.length();
					answers = new String[arrayLength];
					
					for (int j = 0; j < arrayLength; j++) {
						String answerVal = answersArray.getString(j);
						answers[j] = answerVal;
					}
				}
				
				TriviaQuestions triviaQuestionsObj = new TriviaQuestions(question,answers,correctAnswer);
				this.triviaQuestions.add(triviaQuestionsObj);
			}
		}
	}

	public JSONObject toJSON() throws JSONException {
		JSONObject root = new JSONObject();
		JSONArray triviaQuestions = new JSONArray();
		
		for (TriviaQuestions triviaQuestionsObj : this.triviaQuestions) {
			JSONObject triviaQuestionsJSON = triviaQuestionsObj.toJSON();
			triviaQuestions.put(triviaQuestionsJSON);
		}
		
		root.put(TRIVIA_QUESTIONS, triviaQuestions);
		if (!root.has(TRIVIA_QUESTIONS)) root.put(TRIVIA_QUESTIONS, JSONObject.NULL);
		
		return root;
	}

	@Override
	protected void mapField(Node jcrNode) throws PathNotFoundException, RepositoryException {
		NodeIterator iterator = jcrNode.getNodes();
		
		while (iterator.hasNext()) {
			Node node = (Node) iterator.next();
			
			TriviaQuestions triviaQuestions = new TriviaQuestions();
			triviaQuestions.mapField(node);
			
			this.triviaQuestions.add(triviaQuestions);
		}
				
	}
}
