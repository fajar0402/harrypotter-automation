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

public class BookList extends JCRModel {
	
	public static final String BOOKS = "books";
	
	private ArrayList<Book> books = new ArrayList<Book>();
	
	public BookList() {}
	
	public BookList(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	public BookList(ArrayList<Book> books) {
		this.books = books;
	}

	public ArrayList<Book> getBooks() {
		return books;
	}

	public void setBooks(ArrayList<Book> books) {
		this.books = books;
	}

	public void fromJSON(JSONObject json) throws JSONException {
		if (this.books != null) this.books.clear();
		
		if (json != null && json.has(BOOKS)) {
			JSONArray books = json.getJSONArray(BOOKS);
			
			for (int i = 0; i < books.length(); i++) {
				JSONObject bookJSON = books.getJSONObject(i);
				String code = bookJSON.has(Book.CODE)? bookJSON.getString(Book.CODE) : null;
				String title = bookJSON.has(Book.TITLE)? bookJSON.getString(Book.TITLE) : null;
				String image = bookJSON.has(Book.IMAGE)? bookJSON.getString(Book.IMAGE) : null;
				
				Book book = new Book(i+1, code, title, image);
				
				this.books.add(book);
			}
		}
	}

	public JSONObject toJSON() throws JSONException {
		JSONObject root = new JSONObject();
		JSONArray books = new JSONArray();
		
		for (Book book : this.books) {
			JSONObject bookJSON = book.toJSON();
			books.put(bookJSON);
		}
		
		root.put(BOOKS, books);
		if (!root.has(BOOKS)) root.put(BOOKS, JSONObject.NULL);
		
		return root;
	}

	@Override
	protected void mapField(Node jcrNode) throws PathNotFoundException, RepositoryException {
		NodeIterator iterator = jcrNode.getNodes();
		
		while (iterator.hasNext()) {
			Node node = (Node) iterator.next();
			
			Book book = new Book();
			book.mapField(node);
			
			this.books.add(book);
		}
		
		Collections.sort(this.books);
	}

}
