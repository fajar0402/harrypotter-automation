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
 * Functionality test of Vocabulary List class.
 */
public class VocabularyListTest {
	
	private static VocabularyList mockVocabularyList;
	private static JSONObject vocabularyListJson;
	private static String[] books1 = {"HPOP", "HPGF"};
	private static String[] books2 = {"HPPA", "HPOP"};
	
	@BeforeClass
	public static void setUP() {
		//given
		mockVocabularyList = mock(VocabularyList.class);
		ArrayList<Vocabulary> vocabularyRecords = new ArrayList<Vocabulary>();
		Vocabulary vocabulary1 = new Vocabulary("Accio", "Incantation for the Summoning Charm.", "Spells", "content/dam/scholastic/harrypotter/audio/accio.wav", books1);
		Vocabulary vocabulary2 = new Vocabulary("Zonko's", "Wizard joke shop in Hogsmeade.", "Places", "content/dam/scholastic/harrypotter/audio/zonko's.wav", books2);
		vocabularyRecords.add(vocabulary1);
		vocabularyRecords.add(vocabulary2);
		
		mockVocabularyList.setVocabularyRecords(vocabularyRecords);
		
		when(mockVocabularyList.getVocabularyRecords()).thenReturn(vocabularyRecords);
		
		try {
			vocabularyListJson = mockVocabularyList.toJSON();
		} catch (JSONException e) {
			vocabularyListJson = new JSONObject();
			e.printStackTrace();
		}
	}
	
	@Test
	public void testfromJSON() throws JSONException{
		JSONObject vocabularyRecords1 = new JSONObject();
		JSONArray books1 = new JSONArray();
		
		vocabularyRecords1.put( "term", "Accio" );
		vocabularyRecords1.put( "definition", "Incantation for the Summoning Charm." );
		vocabularyRecords1.put( "category", "Spells" );
		vocabularyRecords1.put( "startedWith", "A" );
		vocabularyRecords1.put( "audio", "content/dam/scholastic/harrypotter/audio/accio.wav" );
		books1.put( "HPSS" );
		vocabularyRecords1.put( "books", books1 );
		
		JSONObject vocabularyRecords2 = new JSONObject();
		JSONArray books2 = new JSONArray();
		vocabularyRecords2.put( "term", "Peter Pettigrew" );
		vocabularyRecords2.put( "definition", "Friend of James Potter, Harry's father, while at Hogwarts. His nickname was Wormtail." );
		vocabularyRecords2.put( "category", "Characters" );
		vocabularyRecords2.put( "startedWith", "P" );
		vocabularyRecords2.put( "audio", "content/dam/scholastic/harrypotter/audio/peter-pettigrew.wav" );
		books2.put( "HPGF" );
		books2.put( "HPOP" );
		vocabularyRecords2.put( "books", books2 );
		
		JSONObject vocabularyRecords3 = new JSONObject();
		JSONArray books3 = new JSONArray();
		vocabularyRecords3.put( "term", "Zonko's" );
		vocabularyRecords3.put( "definition", "Wizard joke shop in Hogsmeade." );
		vocabularyRecords3.put( "category", "Places" );
		vocabularyRecords3.put( "startedWith", "Z" );
		vocabularyRecords3.put( "audio", "content/dam/scholastic/harrypotter/audio/zonko's.wav" );
		books3.put( "HPPA" );
		vocabularyRecords3.put( "books", books3 );
		
		JSONArray vocabulary = new JSONArray();	
		vocabulary.put(vocabularyRecords1);
		vocabulary.put(vocabularyRecords2);
		vocabulary.put(vocabularyRecords3);
		
		JSONObject root = new JSONObject();
		root.put(VocabularyList.VOCABULARY_RECORDS, vocabulary);
		
		VocabularyList vocabularyList = new VocabularyList();
		vocabularyList.fromJSON(root);
		ArrayList<Vocabulary> vocabularyArray = vocabularyList.getVocabularyRecords();
		
		assertEquals("Accio", vocabularyArray.get(0).getTerm());
		assertEquals("Incantation for the Summoning Charm.", vocabularyArray.get(0).getDefinition());
		assertEquals("Spells", vocabularyArray.get(0).getCategory());
		assertEquals("A", vocabularyArray.get(0).getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/accio.wav", vocabularyArray.get(0).getAudio());
		String[] bookArray1 = vocabularyArray.get(0).getBooks();
		assertEquals("HPSS", bookArray1[0]);
		assertEquals("Peter Pettigrew", vocabularyArray.get(1).getTerm());
		assertEquals("Friend of James Potter, Harry's father, while at Hogwarts. His nickname was Wormtail.", vocabularyArray.get(1).getDefinition());
		assertEquals("Characters", vocabularyArray.get(1).getCategory());
		assertEquals("P", vocabularyArray.get(1).getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/peter-pettigrew.wav", vocabularyArray.get(1).getAudio());
		String[] bookArray2 = vocabularyArray.get(1).getBooks();
		assertEquals("HPGF", bookArray2[0]);
		assertEquals("HPOP", bookArray2[1]);
		assertEquals("Zonko's", vocabularyArray.get(2).getTerm());
		assertEquals("Wizard joke shop in Hogsmeade.", vocabularyArray.get(2).getDefinition());
		assertEquals("Places", vocabularyArray.get(2).getCategory());
		assertEquals("Z", vocabularyArray.get(2).getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/zonko's.wav", vocabularyArray.get(2).getAudio());
		String[] bookArray3 = vocabularyArray.get(2).getBooks();
		assertEquals("HPPA", bookArray3[0]);
	}
	
	@Test
	public void testtoJSON() throws JSONException{
		ArrayList<Vocabulary> vocabularyRecords = new ArrayList<Vocabulary>();
		String[] books1 = {"HPSS"};
		String[] books2 = {"HPGF", "HPOP"};
		String[] books3 = {"HPPA"};
		Vocabulary vocabulary1 = new Vocabulary("Accio", "Incantation for the Summoning Charm.", "Spells", "content/dam/scholastic/harrypotter/audio/accio.wav", books1);
		Vocabulary vocabulary2 = new Vocabulary("Peter Pettigrew", "Friend of James Potter, Harry's father, while at Hogwarts. His nickname was Wormtail.", "Characters", "content/dam/scholastic/harrypotter/audio/peter-pettigrew.wav", books2);
		Vocabulary vocabulary3 = new Vocabulary("Zonko's", "Wizard joke shop in Hogsmeade.", "Places", "content/dam/scholastic/harrypotter/audio/zonko's.wav", books3);
		vocabularyRecords.add(vocabulary1);
		vocabularyRecords.add(vocabulary2);
		vocabularyRecords.add(vocabulary3);
		VocabularyList vocabularyList = new VocabularyList(vocabularyRecords);
		JSONObject root = vocabularyList.toJSON();
		assertEquals(true, root.has(VocabularyList.VOCABULARY_RECORDS));
		ArrayList<Vocabulary> vocabularyArray = vocabularyList.getVocabularyRecords();
		assertEquals(3, vocabularyArray.size());
		assertEquals("Accio", vocabularyArray.get(0).getTerm());
		assertEquals("Incantation for the Summoning Charm.", vocabularyArray.get(0).getDefinition());
		assertEquals("Spells", vocabularyArray.get(0).getCategory());
		assertEquals("A", vocabularyArray.get(0).getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/accio.wav", vocabularyArray.get(0).getAudio());
		String[] bookArray1 = vocabularyArray.get(0).getBooks();
		assertEquals("HPSS", bookArray1[0]);
		assertEquals("Peter Pettigrew", vocabularyArray.get(1).getTerm());
		assertEquals("Characters", vocabularyArray.get(1).getCategory());
		assertEquals("Friend of James Potter, Harry's father, while at Hogwarts. His nickname was Wormtail.", vocabularyArray.get(1).getDefinition());
		assertEquals("P", vocabularyArray.get(1).getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/peter-pettigrew.wav", vocabularyArray.get(1).getAudio());
		String[] bookArray2 = vocabularyArray.get(1).getBooks();
		assertEquals("HPGF", bookArray2[0]);
		assertEquals("HPOP", bookArray2[1]);
		assertEquals("Zonko's", vocabularyArray.get(2).getTerm());
		assertEquals("Wizard joke shop in Hogsmeade.", vocabularyArray.get(2).getDefinition());
		assertEquals("Places", vocabularyArray.get(2).getCategory());
		assertEquals("Z", vocabularyArray.get(2).getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/zonko's.wav", vocabularyArray.get(2).getAudio());
		String[] bookArray3 = vocabularyArray.get(2).getBooks();
		assertEquals("HPPA", bookArray3[0]);
	}
}
