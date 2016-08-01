package com.scholastic.harrypotter.model;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.scholastic.harrypotter.model.abstracts.JCRModel;

public class TriviaQuestions extends JCRModel {
	
	public static final String QUESTION = "question";
	public static final String ANSWERS = "answers";
	public static final String CORRECT_ANSWER = "correctAnswer";
	public static final String ANSWER = "answer";
	public static final String TYPE = "type";
	
	private String question;
	private String[] answers;
	private String correctAnswer;
	
	public TriviaQuestions() {}
	
	public TriviaQuestions(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	public TriviaQuestions(String question, String[] answers, String correctAnswer) {
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
		
	}
	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String[] getAnswers() {
		return answers;
	}

	public void setAnswers(String[] answers) {
		this.answers = answers;
	}

	public String getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	public void fromJSON(JSONObject json) throws JSONException {
				
	}

	public JSONObject toJSON() throws JSONException {
		JSONObject root = new JSONObject();
		JSONArray answersArray = new JSONArray();
		
		
		root.put(QUESTION, this.getQuestion());
		if(!root.has(QUESTION)) root.put(QUESTION, JSONObject.NULL);
		
		String[] answers = this.getAnswers();
		
		for (int i = 0; answers != null && i < answers.length; i++) {
			String answer = answers[i];
			JSONObject answerObject = new JSONObject();
			answerObject.put(ANSWER, answer);
			if(!answerObject.has(ANSWER)) answerObject.put(ANSWER, JSONObject.NULL);
			
			if(answer.equalsIgnoreCase(this.getCorrectAnswer()))			
			answerObject.put(TYPE, true);
			
			answersArray.put(answerObject);
			
		}
		root.put(ANSWERS, answersArray);
		return root;
	}

	@Override
	protected void mapField(Node jcrNode) throws PathNotFoundException,
			RepositoryException {
		if(jcrNode!= null){
			if(jcrNode.hasProperty(QUESTION)) this.question = jcrNode.getProperty(QUESTION).getString();
			if(jcrNode.hasProperty(CORRECT_ANSWER)) this.correctAnswer = jcrNode.getProperty(CORRECT_ANSWER).getString();
			if(jcrNode.hasProperty(ANSWERS)) {
				Value[] answers = jcrNode.getProperty(ANSWERS).getValues();
				
				if(answers != null) {
					int valuesLength = answers.length;
					this.answers = new String[valuesLength];
					
					for (int i = 0; i < valuesLength; i++) {
						Value answer = answers[i];
						this.answers[i] = answer.getString();
					}
				}
			}
		}
	}
}
