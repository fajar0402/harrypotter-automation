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
import com.scholastic.harrypotter.model.TriviaQuestionsList;


/**
 * Harry Potter Trivia Questions Servlet.
 */
@SlingServlet(paths = "/bin/apps/scholastic/harrypotter/trivia", methods = "GET")
public class TriviaQuestionsSlingServlet extends SlingSafeMethodsServlet {

 private static final long serialVersionUID = 1L;


 private static final String TRIVIA_JCR_PATH = Constants.JCR_DATA_BASE_PATH + "/trivia";

 @Override
 public void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException,
  IOException {

   try {
    response.setContentType(Constants.APPLICATION_JSON);
    response.setHeader(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON);
    response.setCharacterEncoding(Constants.UTF_8);

    JSONObject jsonResponse = new JSONObject();


    TriviaQuestionsList triviaQuestionsList = new TriviaQuestionsList(TRIVIA_JCR_PATH);
    triviaQuestionsList.fetch();
    JSONObject triviaQuestionsListJSON = triviaQuestionsList.toJSON();
    JSONArray questionsArray = triviaQuestionsListJSON.has(TriviaQuestionsList.TRIVIA_QUESTIONS) ? triviaQuestionsListJSON.getJSONArray(TriviaQuestionsList.TRIVIA_QUESTIONS) : new JSONArray();

    jsonResponse.put(TriviaQuestionsList.TRIVIA_QUESTIONS, questionsArray);


    response.getWriter().write(jsonResponse.toString());


   } catch (JSONException e) {
    response.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    response.getWriter().write("ERROR");
   }

  }
}