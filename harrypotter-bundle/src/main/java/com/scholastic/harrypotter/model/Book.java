package com.scholastic.harrypotter.model;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.scholastic.harrypotter.model.abstracts.JCRModel;

public class Book extends JCRModel implements Comparable<Book>{
	
	public static final String CODE = "code";
	public static final String TITLE = "title";
	public static final String IMAGE = "image";
	
	private int order;
	private String code;
	private String title;
	private String image;
	
	public Book() {}
	
	public Book(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	public Book(int order, String code, String title, String image) {
		this.order = order;
		this.code = code;
		this.title = title;
		this.image = image;
	}
	
	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void fromJSON(JSONObject json) throws JSONException {
		if(json != null) {
			if (json.has(CODE)) this.code = json.getString(CODE);
			if (json.has(TITLE)) this.title = json.getString(TITLE);
			if (json.has(IMAGE)) this.image = json.getString(IMAGE);
		}
	}

	public JSONObject toJSON() throws JSONException {
		JSONObject root = new JSONObject();
		
		root.put(CODE, this.getCode());
		if (!root.has(CODE)) root.put(CODE, JSONObject.NULL);
		
		root.put(TITLE, this.getTitle());
		if (!root.has(TITLE)) root.put(TITLE, JSONObject.NULL);
		
		root.put(IMAGE, this.getImage());
		if (!root.has(IMAGE)) root.put(IMAGE, JSONObject.NULL);
		
		return root;
	}
	
	@Override
	protected void mapField(Node jcrNode) throws PathNotFoundException, RepositoryException{
		if(jcrNode != null) {
			if(jcrNode.hasProperty(CODE)) this.code = jcrNode.getProperty(CODE).getString();
			if(jcrNode.hasProperty(TITLE)) this.title = jcrNode.getProperty(TITLE).getString();
			if(jcrNode.hasProperty(IMAGE)) this.image = jcrNode.getProperty(IMAGE).getString();
			
			String nodeName = jcrNode.getName();

			try {
				String orderString = nodeName.substring(0, 1);
				this.order = Integer.parseInt(orderString);
			} catch (Exception e) {
				//do nothing to keep default data of object model properties
				// TODO Add logger
			}
		}
	}

	public int compareTo(Book book) {
		return this.order - book.order;
	}
}
