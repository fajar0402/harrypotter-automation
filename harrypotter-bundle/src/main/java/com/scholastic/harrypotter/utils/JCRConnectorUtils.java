package com.scholastic.harrypotter.utils;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.jcr.api.SlingRepository;

/**
 * Utility for JCR fetch operation 
 *
 */
public class JCRConnectorUtils{
	
	private static JCRConnectorUtils instance;
	
	/**
	 * repository object will be initialized when Activator start
	 */
	private SlingRepository repository;
	
	private JCRConnectorUtils() {}
	
	public static JCRConnectorUtils getInstance() {
		if (instance == null) {
			instance = new JCRConnectorUtils();
		}
		
		return instance;
	}

	public SlingRepository getRepository() {
		return repository;
	}

	public void setRepository(SlingRepository repository) {
		this.repository = repository;
	}

	/**
	 * Connect and retrieve data from JCR node.
	 * 
	 * @param jcrPath Absolute path of JCR
	 * @return JCR Node if successfully fetched the data
	 * @throws PathNotFoundException
	 * @throws RepositoryException
	 */
	public Node fetch(String jcrPath) throws PathNotFoundException, RepositoryException {
		Node node = null;
		
		if (jcrPath != null && !jcrPath.isEmpty() && repository != null) {
			Session session = repository.loginAdministrative(null);
		    node = session.getNode(jcrPath);
		}
		
		return node;
	}
	
}
