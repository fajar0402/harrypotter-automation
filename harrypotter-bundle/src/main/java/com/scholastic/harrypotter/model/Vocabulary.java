package com.scholastic.harrypotter.model;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.scholastic.harrypotter.model.abstracts.JCRModel;
import com.scholastic.harrypotter.utils.StringUtils;

public class Vocabulary extends JCRModel implements Comparable<Vocabulary> {
	
	public static final String TERM = "term";
	public static final String DEFINITION = "definition";
	public static final String CATEGORY = "category";
	public static final String STARTED_WITH = "startedWith";
	public static final String AUDIO = "audio";
	public static final String BOOKS = "books";
	
	private String term;
	private String definition;
	private String category;
	private String startedWith;
	private String audio;
	private String[] books;
	
	public Vocabulary() {}
	
	public Vocabulary(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	public Vocabulary(String term, String definition, String category, String audio, String[] books) {
		this.term = term;
		this.definition = definition;
		this.category = category;
		this.startedWith = StringUtils.getFirstLetter(term);
		this.audio = audio;
		this.books = books;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getDefinition() {
		return definition;
	}

	public void setDefinition(String definition) {
		this.definition = definition;
	}
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getStartedWith() {
		return startedWith;
	}

	public void setStartedWith(String startedWith) {
		this.startedWith = startedWith;
	}

	public String getAudio() {
		return audio;
	}

	public void setAudio(String audio) {
		this.audio = audio;
	}

	public String[] getBooks() {
		return books;
	}

	public void setBooks(String[] books) {
		this.books = books;
	}

	public void fromJSON(JSONObject json) throws JSONException {
		if(json != null) {
			if (json.has(TERM)) {
				this.term = json.getString(TERM);
				this.startedWith = StringUtils.getFirstLetter(term);
			}
			if (json.has(DEFINITION)) this.definition = json.getString(DEFINITION);
			if (json.has(CATEGORY)) this.category = json.getString(CATEGORY);
			if (json.has(AUDIO)) this.audio = json.getString(AUDIO);
			if (json.has(BOOKS)) {
				JSONArray booksArray = json.getJSONArray(BOOKS);
				
				if (booksArray != null) {
					int arrayLength = booksArray.length();
					this.books = new String[arrayLength];
					
					for (int i = 0; i < arrayLength; i++) {
						String book = booksArray.getString(i);
						this.books[i] = book;
					}
				}
			}
		}
	}

	public JSONObject toJSON() throws JSONException {
		JSONObject root = new JSONObject();
		JSONArray booksArray = new JSONArray();
		
		String[] books = this.getBooks();
		
		for (int i = 0; books != null && i < books.length; i++) {
			String book = books[i];
			booksArray.put(book);
		}
		
		root.put(TERM, this.getTerm());
		if (!root.has(TERM)) root.put(TERM, JSONObject.NULL);
		
		root.put(DEFINITION, this.getDefinition());
		if (!root.has(DEFINITION)) root.put(DEFINITION, JSONObject.NULL);
		
		root.put(CATEGORY, this.getCategory());
		if (!root.has(CATEGORY)) root.put(CATEGORY, JSONObject.NULL);
		
		root.put(STARTED_WITH, this.getStartedWith());
		if (!root.has(STARTED_WITH)) root.put(STARTED_WITH, JSONObject.NULL);
		
		root.put(AUDIO, this.getAudio());
		if (!root.has(AUDIO)) root.put(AUDIO, JSONObject.NULL);
		
		root.put(BOOKS, booksArray);
		if (!root.has(BOOKS)) root.put(BOOKS, JSONObject.NULL);
		
		return root;
	}

	@Override
	protected void mapField(Node jcrNode) throws PathNotFoundException, RepositoryException {
		if(jcrNode != null) {
			if(jcrNode.hasProperty(TERM)) {
				this.term = jcrNode.getProperty(TERM).getString();
				this.startedWith = StringUtils.getFirstLetter(term);
			}
			if(jcrNode.hasProperty(DEFINITION)) this.definition = jcrNode.getProperty(DEFINITION).getString();
			if(jcrNode.hasProperty(CATEGORY)) this.category = jcrNode.getProperty(CATEGORY).getString();
			if(jcrNode.hasProperty(AUDIO)) this.audio = jcrNode.getProperty(AUDIO).getString();
			if(jcrNode.hasProperty(BOOKS)) {
				Value[] booksValues = jcrNode.getProperty(BOOKS).getValues();
				
				if(booksValues != null) {
					int valuesLength = booksValues.length;
					this.books = new String[valuesLength];
					
					for (int i = 0; i < booksValues.length; i++) {
						Value book = booksValues[i];
						this.books[i] = book.getString();
					}
				}
			}
		}
	}

	public int compareTo(Vocabulary vocabulary) {
		String thisTermWithoutPhrase = StringUtils.excludePhraseOnWord(this.term);
		String comparatorTermWithoutPhrase = StringUtils.excludePhraseOnWord(vocabulary.getTerm());
		
		return thisTermWithoutPhrase.compareToIgnoreCase(comparatorTermWithoutPhrase);
	}
}
