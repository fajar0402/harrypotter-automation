package com.scholastic.harrypotter.model;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.*;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Calendar;

import javax.jcr.AccessDeniedException;
import javax.jcr.Binary;
import javax.jcr.InvalidItemStateException;
import javax.jcr.InvalidLifecycleTransitionException;
import javax.jcr.Item;
import javax.jcr.ItemExistsException;
import javax.jcr.ItemNotFoundException;
import javax.jcr.ItemVisitor;
import javax.jcr.MergeException;
import javax.jcr.NoSuchWorkspaceException;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.ReferentialIntegrityException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.UnsupportedRepositoryOperationException;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;
import javax.jcr.lock.Lock;
import javax.jcr.lock.LockException;
import javax.jcr.nodetype.ConstraintViolationException;
import javax.jcr.nodetype.NoSuchNodeTypeException;
import javax.jcr.nodetype.NodeDefinition;
import javax.jcr.nodetype.NodeType;
import javax.jcr.version.ActivityViolationException;
import javax.jcr.version.Version;
import javax.jcr.version.VersionException;
import javax.jcr.version.VersionHistory;

import java.util.ArrayList;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.junit.Test;
import org.junit.BeforeClass;

/**
 * Functionality test of BookList class.
 */
public class BookListTest {
	
	private static BookList mockBookList;
	private static JSONObject bookListJson;
	
	@BeforeClass
	public static void setUP() {
		//given
		mockBookList = mock(BookList.class);
		ArrayList<Book> books = new ArrayList<Book>();
		Book book1 = new Book(1, "HPSS", "Sorcerer's Stone", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg");
		Book book2 = new Book(7, "HPCS", "Chamber of Secret", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-2.jpg");
		books.add(book1);
		books.add(book1);
		
		mockBookList.setBooks(books);
		
		when(mockBookList.getBooks()).thenReturn(books);
		
		try {
			bookListJson = mockBookList.toJSON();
		} catch (JSONException e) {
			bookListJson = new JSONObject();
			e.printStackTrace();
		}
	}
	
	@Test
	public void testfromJSON() throws JSONException{
		BookList bookList = new BookList();
		JSONArray books = new JSONArray();	
		JSONObject book1 = new JSONObject();
		JSONObject book2 = new JSONObject();
		JSONObject book3 = new JSONObject();
		JSONObject root = new JSONObject();
		book1.put( "code", "HPSS" );
		book1.put( "title", "Sorcerer\'s Stone" );
		book1.put( "image", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg" );
		book2.put( "code", "HPCS" );
		book2.put( "title", "Chamber of Secret" );
		book2.put( "image", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-2.jpg" );
		book3.put( "code", "HPPA" );
		book3.put( "title", "Prisoner of Azkaban" );
		book3.put( "image", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-3.jpg" );
		books.put(book1);
		books.put(book2);
		books.put(book3);
		root.put(BookList.BOOKS, books);
        bookList.fromJSON(root);
        ArrayList<Book> bookArray = bookList.getBooks();
        assertEquals(3, bookArray.size());
        for (int i = 0; i < bookArray.size(); i++) {
        	Book book = bookArray.get(i);
        	
        	if (i == 0) {
        		assertEquals("HPSS", book.getCode());
    			assertEquals("Sorcerer's Stone", book.getTitle());
    			assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg", book.getImage());
        	}else if (i == 1) {
        		assertEquals("HPCS", book.getCode());
    			assertEquals("Chamber of Secret", book.getTitle());
    			assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-2.jpg", book.getImage());
        	}else {
        		assertEquals("HPPA", book.getCode());
    			assertEquals("Prisoner of Azkaban", book.getTitle());
    			assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-3.jpg", book.getImage());
        	}
			
        }
	}
	
	@Test
	public void testtoJSON() throws JSONException{
		ArrayList<Book> books = new ArrayList<Book>();
		Book book1 = new Book(1, "HPSS", "Sorcerer's Stone", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg");
		Book book2 = new Book(7, "HPCS", "Chamber of Secret", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-2.jpg");
		Book book3 = new Book(9, "HPPA", "Prisoner of Azkaban", "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-3.jpg");
		books.add(book1);
		books.add(book2);
		books.add(book3);
		BookList bookList = new BookList(books);
		JSONObject root = bookList.toJSON();
		assertEquals(true, root.has(BookList.BOOKS));
		ArrayList<Book> bookArray = bookList.getBooks();
		assertEquals(3, bookArray.size());
		assertEquals("HPSS", bookArray.get(0).getCode());
		assertEquals("Sorcerer's Stone", bookArray.get(0).getTitle());
		assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg", bookArray.get(0).getImage());
		assertEquals("HPCS", bookArray.get(1).getCode());
		assertEquals("Chamber of Secret", bookArray.get(1).getTitle());
		assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-2.jpg", bookArray.get(1).getImage());
		assertEquals("HPPA", bookArray.get(2).getCode());
		assertEquals("Prisoner of Azkaban", bookArray.get(2).getTitle());
		assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-3.jpg", bookArray.get(2).getImage());
	}
}
