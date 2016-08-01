package com.scholastic.harrypotter.servlet;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import com.scholastic.harrypotter.common.Constants;

/**
 * Harry Potter Glossary Servlet.
 */
@SlingServlet( paths = "/bin/apps/scholastic/harrypotter/version", methods = "GET" )
public class VersionSlingServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 1L;
    private static final double bundleVersion = 1.0;
    private static final long installTime = System.currentTimeMillis();
    
    @Override
    public void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException,
    IOException {

        response.setContentType(Constants.TEXT_HTML);
		response.setHeader(Constants.CONTENT_TYPE, Constants.TEXT_HTML);
		response.setCharacterEncoding(Constants.UTF_8);
		
		response.getWriter().write(String.valueOf(bundleVersion)+"."+String.valueOf(installTime));

    }

}