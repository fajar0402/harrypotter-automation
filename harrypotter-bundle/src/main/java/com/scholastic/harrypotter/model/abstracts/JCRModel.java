package com.scholastic.harrypotter.model.abstracts;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;

import com.scholastic.harrypotter.interfaces.JSONModel;
import com.scholastic.harrypotter.utils.JCRConnectorUtils;

/**
 * Abstract class to enable object model to fetch data from JCR.
 *
 */
public abstract class JCRModel implements JSONModel {
	
	/**
	 * Absolute path of JCR where the model should fetch the data from.
	 */
	protected String jcrPath = null;
	
	public String getJcrPath() {
		return jcrPath;
	}

	public void setJcrPath(String jcrPath) {
		this.jcrPath = jcrPath;
	}
	
	/**
	 * Fetch the data for object model from JCR.
	 * 
	 * @return true if able to retrieve data from JCR.
	 */
	public boolean fetch() {
		boolean success = false;
		
		try {
			Node node = JCRConnectorUtils.getInstance().fetch(jcrPath);
			
			if (node != null) {
				this.mapField(node);
				success = true;
			}
			
		} catch (Exception e) {
			//do nothing to keep default data of object model properties
			// TODO Add logger
		}
		
		return success;
	}
	
	/**
	 * Field mapping from JCR data to object model properties.
	 * Will not be called if jcrNode is null.
	 * 
	 * @param jcrNode JCR node containing data.
	 */
	protected abstract void mapField(Node jcrNode) throws PathNotFoundException, RepositoryException;
}
