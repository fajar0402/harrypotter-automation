package com.scholastic.harrypotter.utils;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Reference;
import org.apache.sling.jcr.api.SlingRepository;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

@Component(immediate = true, label = "Commons Activator")
public class Activator implements BundleActivator{
	
	@Reference
	private SlingRepository repository;
	
	@Activate
	public void start(BundleContext context) throws Exception {
		JCRConnectorUtils.getInstance().setRepository(repository);
	}

	@Deactivate
	public void stop(BundleContext context) throws Exception {
		// No action needed
	}

}
