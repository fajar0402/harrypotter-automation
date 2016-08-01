package com.scholastic.harrypotter.controller;

import java.util.ArrayList;

import com.adobe.cq.sightly.WCMUse;
import com.scholastic.harrypotter.common.Constants;
import com.scholastic.harrypotter.model.Book;
import com.scholastic.harrypotter.model.BookList;

public class BooksCtrl extends WCMUse{
	
	private ArrayList<Book> books = new ArrayList<Book>();

	@Override
	public void activate() throws Exception {
		BookList bookList = new BookList(Constants.JCR_DATA_BASE_PATH+"/book");
		bookList.fetch();
		this.setBooks(bookList.getBooks());
	}

	public ArrayList<Book> getBooks() {
		return books;
	}

	public void setBooks(ArrayList<Book> books) {
		this.books = books;
	}

}
