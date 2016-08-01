package com.scholastic.harrypotter.servlet;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.scholastic.harrypotter.common.Constants;
import com.scholastic.harrypotter.model.BookList;
import com.scholastic.harrypotter.model.VocabularyList;

/**
 * Harry Potter Glossary Servlet.
 */
@SlingServlet( paths = "/bin/apps/scholastic/harrypotter/glossary", methods = "GET" )
public class GlossarySlingServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 1L;
    
    private static final String BOOK_JCR_PATH = Constants.JCR_DATA_BASE_PATH+"/book";
    private static final String VOCABULARY_JCR_PATH = Constants.JCR_DATA_BASE_PATH+"/vocabulary";

    @Override
    public void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException,
    IOException {

        try {
            response.setContentType(Constants.APPLICATION_JSON);
            response.setHeader(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON);
            response.setCharacterEncoding(Constants.UTF_8);
            
            JSONObject jsonResponse = new JSONObject();
            
            BookList bookList = new BookList(BOOK_JCR_PATH);
            bookList.fetch();
            JSONObject bookListJSON = bookList.toJSON();
            JSONArray books = bookListJSON.has(BookList.BOOKS)? bookListJSON.getJSONArray(BookList.BOOKS) : new JSONArray();
            
            VocabularyList vocabularyList = new VocabularyList(VOCABULARY_JCR_PATH);
            vocabularyList.fetch();
            JSONObject vocabularyListJSON = vocabularyList.toJSON();
            JSONArray vocabularyRecords = vocabularyListJSON.has(VocabularyList.VOCABULARY_RECORDS)? vocabularyListJSON.getJSONArray(VocabularyList.VOCABULARY_RECORDS) : new JSONArray(); 
            
            jsonResponse.put(BookList.BOOKS, books);      
            jsonResponse.put(VocabularyList.VOCABULARY_RECORDS, vocabularyRecords);

            response.getWriter().write(jsonResponse.toString());
        } catch (JSONException e) {
            response.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("ERROR");
        }

    }

}

