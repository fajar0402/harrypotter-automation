package com.scholastic.harrypotter.model;

import java.util.ArrayList;
import java.util.Collections;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.scholastic.harrypotter.model.abstracts.JCRModel;

public class VocabularyList extends JCRModel {
	
	public static final String VOCABULARY_RECORDS = "vocabularyRecords";
	
	private ArrayList<Vocabulary> vocabularyRecords = new ArrayList<Vocabulary>();
	
	public VocabularyList() {}
	
	public VocabularyList(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	public VocabularyList(ArrayList<Vocabulary> vocabularyRecords) {
		this.vocabularyRecords = vocabularyRecords;
	}

	public ArrayList<Vocabulary> getVocabularyRecords() {
		return vocabularyRecords;
	}

	public void setVocabularyRecords(ArrayList<Vocabulary> vocabularyRecords) {
		this.vocabularyRecords = vocabularyRecords;
	}

	public void fromJSON(JSONObject json) throws JSONException {
		if (this.vocabularyRecords != null) this.vocabularyRecords.clear();
		
		if (json != null && json.has(VOCABULARY_RECORDS)) {
			JSONArray vocabularyRecords = json.getJSONArray(VOCABULARY_RECORDS);
			
			for (int i = 0; vocabularyRecords != null && i < vocabularyRecords.length(); i++) {
				JSONObject vocabularyJSON = vocabularyRecords.getJSONObject(i);
				String term = vocabularyJSON.has(Vocabulary.TERM)? vocabularyJSON.getString(Vocabulary.TERM) : null;
				String definition = vocabularyJSON.has(Vocabulary.DEFINITION)? vocabularyJSON.getString(Vocabulary.DEFINITION) : null;
				String category = vocabularyJSON.has(Vocabulary.CATEGORY)? vocabularyJSON.getString(Vocabulary.CATEGORY) : null;
				String audio = vocabularyJSON.has(Vocabulary.AUDIO)? vocabularyJSON.getString(Vocabulary.AUDIO) : null;
				JSONArray booksArray = vocabularyJSON.has(Vocabulary.BOOKS)? vocabularyJSON.getJSONArray(Vocabulary.BOOKS) : null;
				String[] books = null;
				
				if (booksArray != null) {
					int arrayLength = booksArray.length();
					books = new String[arrayLength];
					
					for (int j = 0; j < arrayLength; j++) {
						String book = booksArray.getString(j);
						books[j] = book;
					}
				}
				
				Vocabulary vocabulary = new Vocabulary(term, definition, category, audio, books);
				
				this.vocabularyRecords.add(vocabulary);
			}
		}
	}

	public JSONObject toJSON() throws JSONException {
		JSONObject root = new JSONObject();
		JSONArray vocabularyRecords = new JSONArray();
		
		for (Vocabulary vocabulary : this.vocabularyRecords) {
			JSONObject vocabularyJSON = vocabulary.toJSON();
			vocabularyRecords.put(vocabularyJSON);
		}
		
		root.put(VOCABULARY_RECORDS, vocabularyRecords);
		if (!root.has(VOCABULARY_RECORDS)) root.put(VOCABULARY_RECORDS, JSONObject.NULL);
		
		return root;
	}

	@Override
	protected void mapField(Node jcrNode) throws PathNotFoundException, RepositoryException {
		NodeIterator iterator = jcrNode.getNodes();
		
		while (iterator.hasNext()) {
			Node node = (Node) iterator.next();
			
			Vocabulary vocabulary = new Vocabulary();
			vocabulary.mapField(node);
			
			this.vocabularyRecords.add(vocabulary);
		}
		
		Collections.sort(this.vocabularyRecords);
	}
}
