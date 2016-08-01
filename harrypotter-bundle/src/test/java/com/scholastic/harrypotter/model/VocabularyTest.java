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

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.junit.Test;
import org.junit.BeforeClass;

/**
 * Functionality test of Vocabulary class.
 */
public class VocabularyTest {
	
	private static Vocabulary mockVocabulary;
	private static JSONObject vocabularyJson;
	private static String[] books = {"HPOP", "HPGF"};
	
	@BeforeClass
	public static void setUP() {
		//given
		mockVocabulary = mock(Vocabulary.class);
		
		mockVocabulary.setTerm("Abraxas Malfoy");
		mockVocabulary.setDefinition("Draco Malfoy's grandfather.");
		mockVocabulary.setCategory("Characters");
		mockVocabulary.setStartedWith("A");
		mockVocabulary.setAudio("content/dam/scholastic/harrypotter/audio/abraxas-malfoy.wav");
		mockVocabulary.setBooks(books);
		
		when(mockVocabulary.getTerm()).thenReturn("Abraxas Malfoy");
		when(mockVocabulary.getDefinition()).thenReturn("Draco Malfoy's grandfather.");
		when(mockVocabulary.getCategory()).thenReturn("Characters");
		when(mockVocabulary.getStartedWith()).thenReturn("A");
		when(mockVocabulary.getAudio()).thenReturn("content/dam/scholastic/harrypotter/audio/abraxas-malfoy.wav");
		when(mockVocabulary.getBooks()).thenReturn(books);
		
		try {
			vocabularyJson = mockVocabulary.toJSON();
		} catch (JSONException e) {
			vocabularyJson = new JSONObject();
			e.printStackTrace();
		}
	}
	
	@Test
	public void testgetTerm() throws JSONException{
		assertEquals("Abraxas Malfoy", mockVocabulary.getTerm());
	}
	
	@Test
	public void testgetDefinition() throws JSONException{
		assertEquals("Draco Malfoy's grandfather.", mockVocabulary.getDefinition());
	}
	
	@Test
	public void testgetCategory() throws JSONException{
		assertEquals("Characters", mockVocabulary.getCategory());
	}
	
	@Test
	public void testgetStartedWith() throws JSONException{
		assertEquals("A", mockVocabulary.getStartedWith());
	}
	
	@Test
	public void testgetAudio() throws JSONException{
		assertEquals("content/dam/scholastic/harrypotter/audio/abraxas-malfoy.wav", mockVocabulary.getAudio());
	}
	
	@Test
	public void testgetBooks() throws JSONException{
		assertEquals(books, mockVocabulary.getBooks());
	}

	@Test
	public void testfromJSON() throws JSONException{
		Vocabulary vocabulary = new Vocabulary();
		JSONObject jsonResponseVocabularyRecords = new JSONObject();
        JSONArray booksVocabularyRecords = new JSONArray();	
        jsonResponseVocabularyRecords.put( "term", "Accio" );
        jsonResponseVocabularyRecords.put( "definition", "Incantation for the Summoning Charm." );
        jsonResponseVocabularyRecords.put( "startedWith", "A" );
        booksVocabularyRecords.put( "HPSS" );
        booksVocabularyRecords.put( "HPCS" );
        jsonResponseVocabularyRecords.put( "books", booksVocabularyRecords );
        jsonResponseVocabularyRecords.put( "audio", "content/dam/scholastic/harrypotter/audio/accio.wav" );
        vocabulary.fromJSON(jsonResponseVocabularyRecords);
		assertEquals("Accio", vocabulary.getTerm());
		assertEquals("Incantation for the Summoning Charm.", vocabulary.getDefinition());
		assertEquals("A", vocabulary.getStartedWith());
		assertEquals("content/dam/scholastic/harrypotter/audio/accio.wav", vocabulary.getAudio());
		String[] bookArray = vocabulary.getBooks();
		assertEquals("HPSS", bookArray[0]);
		assertEquals("HPCS", bookArray[1]);
	}
	
	@Test
	public void testtoJSON() throws JSONException{
		String term = "Abraxas Malfoy";
		String definition = "Draco Malfoy's grandfather.";
		String category = "Characters";
		String audio = "content/dam/scholastic/harrypotter/audio/abraxas-malfoy.wav";
		String[] books = {"HPHP"};
		Vocabulary vocabulary = new Vocabulary(term, definition, category, audio, books);
		JSONObject root = vocabulary.toJSON();
		JSONArray bookList = root.getJSONArray(Vocabulary.BOOKS);
		
		assertEquals("Abraxas Malfoy", root.getString(Vocabulary.TERM));
		assertEquals("Draco Malfoy's grandfather.", root.getString(Vocabulary.DEFINITION));
		assertEquals("Characters", root.getString(Vocabulary.CATEGORY));
		assertEquals("content/dam/scholastic/harrypotter/audio/abraxas-malfoy.wav", root.getString(Vocabulary.AUDIO));
		assertEquals("A", root.getString(Vocabulary.STARTED_WITH));
		for (int i = 0; i < bookList.length(); i++) {
			assertEquals("HPHP", bookList.getString(i));
		}
	}
	
	@Test
	public void testmapField() throws PathNotFoundException, RepositoryException{
		Vocabulary vocabulary1 = new Vocabulary();
		
		vocabulary1.mapField(null);
		assertNull(vocabulary1.getTerm());
		assertNull(vocabulary1.getDefinition());
		assertNull(vocabulary1.getCategory());
		assertNull(vocabulary1.getStartedWith());
		assertNull(vocabulary1.getAudio());
		assertNull(vocabulary1.getBooks());
		
		vocabulary1.mapField(new Node() {
			
			public void save() throws AccessDeniedException, ItemExistsException, ConstraintViolationException,
					InvalidItemStateException, ReferentialIntegrityException, VersionException, LockException,
					NoSuchNodeTypeException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void remove() throws VersionException, LockException, ConstraintViolationException, AccessDeniedException,
					RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void refresh(boolean keepChanges) throws InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public boolean isSame(Item otherItem) throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean isNode() {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean isNew() {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean isModified() {
				// TODO Auto-generated method stub
				return false;
			}
			
			public Session getSession() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public String getPath() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Node getParent() throws ItemNotFoundException, AccessDeniedException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public String getName() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public int getDepth() throws RepositoryException {
				// TODO Auto-generated method stub
				return 0;
			}
			
			public Item getAncestor(int depth) throws ItemNotFoundException, AccessDeniedException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public void accept(ItemVisitor visitor) throws RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void update(String srcWorkspace) throws NoSuchWorkspaceException, AccessDeniedException, LockException,
					InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void unlock() throws UnsupportedRepositoryOperationException, LockException, AccessDeniedException,
					InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public Property setProperty(String name, String value, int type) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, String[] values, int type) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Value[] values, int type) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Value value, int type) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Node value) throws ValueFormatException, VersionException, LockException,
					ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Calendar value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, long value) throws ValueFormatException, VersionException, LockException,
					ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, BigDecimal value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, double value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, boolean value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Binary value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, InputStream value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, String value) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, String[] values) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Value[] values) throws ValueFormatException, VersionException,
					LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property setProperty(String name, Value value) throws ValueFormatException, VersionException, LockException,
					ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public void setPrimaryType(String nodeTypeName) throws NoSuchNodeTypeException, VersionException,
					ConstraintViolationException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void restoreByLabel(String versionLabel, boolean removeExisting) throws VersionException,
					ItemExistsException, UnsupportedRepositoryOperationException, LockException, InvalidItemStateException,
					RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void restore(Version version, String relPath, boolean removeExisting) throws PathNotFoundException,
					ItemExistsException, VersionException, ConstraintViolationException,
					UnsupportedRepositoryOperationException, LockException, InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void restore(Version version, boolean removeExisting) throws VersionException, ItemExistsException,
					InvalidItemStateException, UnsupportedRepositoryOperationException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void restore(String versionName, boolean removeExisting) throws VersionException, ItemExistsException,
					UnsupportedRepositoryOperationException, LockException, InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void removeSharedSet() throws VersionException, LockException, ConstraintViolationException,
					RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void removeShare() throws VersionException, LockException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void removeMixin(String mixinName) throws NoSuchNodeTypeException, VersionException,
					ConstraintViolationException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void orderBefore(String srcChildRelPath, String destChildRelPath)
					throws UnsupportedRepositoryOperationException, VersionException, ConstraintViolationException,
					ItemNotFoundException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public NodeIterator merge(String srcWorkspace, boolean bestEffort) throws NoSuchWorkspaceException,
					AccessDeniedException, MergeException, LockException, InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Lock lock(boolean isDeep, boolean isSessionScoped) throws UnsupportedRepositoryOperationException,
					LockException, AccessDeniedException, InvalidItemStateException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public boolean isNodeType(String nodeTypeName) throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean isLocked() throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean isCheckedOut() throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean holdsLock() throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean hasProperty(String relPath) throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean hasProperties() throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean hasNodes() throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public boolean hasNode(String relPath) throws RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public PropertyIterator getWeakReferences(String name) throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public PropertyIterator getWeakReferences() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public VersionHistory getVersionHistory() throws UnsupportedRepositoryOperationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public String getUUID() throws UnsupportedRepositoryOperationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeIterator getSharedSet() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public PropertyIterator getReferences(String name) throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public PropertyIterator getReferences() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Property getProperty(String relPath) throws PathNotFoundException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public PropertyIterator getProperties(String[] nameGlobs) throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public PropertyIterator getProperties(String namePattern) throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public PropertyIterator getProperties() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeType getPrimaryNodeType() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Item getPrimaryItem() throws ItemNotFoundException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeIterator getNodes(String[] nameGlobs) throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeIterator getNodes(String namePattern) throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeIterator getNodes() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Node getNode(String relPath) throws PathNotFoundException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeType[] getMixinNodeTypes() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Lock getLock() throws UnsupportedRepositoryOperationException, LockException, AccessDeniedException,
					RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public int getIndex() throws RepositoryException {
				// TODO Auto-generated method stub
				return 0;
			}
			
			public String getIdentifier() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public NodeDefinition getDefinition() throws RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public String getCorrespondingNodePath(String workspaceName) throws ItemNotFoundException,
					NoSuchWorkspaceException, AccessDeniedException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Version getBaseVersion() throws UnsupportedRepositoryOperationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public String[] getAllowedLifecycleTransistions() throws UnsupportedRepositoryOperationException,
					RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public void followLifecycleTransition(String transition) throws UnsupportedRepositoryOperationException,
					InvalidLifecycleTransitionException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void doneMerge(Version version) throws VersionException, InvalidItemStateException,
					UnsupportedRepositoryOperationException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public void checkout() throws UnsupportedRepositoryOperationException, LockException, ActivityViolationException,
					RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public Version checkin() throws VersionException, UnsupportedRepositoryOperationException,
					InvalidItemStateException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public void cancelMerge(Version version) throws VersionException, InvalidItemStateException,
					UnsupportedRepositoryOperationException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
			
			public boolean canAddMixin(String mixinName) throws NoSuchNodeTypeException, RepositoryException {
				// TODO Auto-generated method stub
				return false;
			}
			
			public Node addNode(String relPath, String primaryNodeTypeName) throws ItemExistsException, PathNotFoundException,
					NoSuchNodeTypeException, LockException, VersionException, ConstraintViolationException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public Node addNode(String relPath) throws ItemExistsException, PathNotFoundException, VersionException,
					ConstraintViolationException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				return null;
			}
			
			public void addMixin(String mixinName) throws NoSuchNodeTypeException, VersionException,
					ConstraintViolationException, LockException, RepositoryException {
				// TODO Auto-generated method stub
				
			}
		});
		assertNull(vocabulary1.getTerm());
		assertNull(vocabulary1.getDefinition());
		assertNull(vocabulary1.getCategory());
		assertNull(vocabulary1.getStartedWith());
		assertNull(vocabulary1.getAudio());
		assertNull(vocabulary1.getBooks());
	}
	
	@Test
	public void testcompareTo() throws JSONException{
		String[] books1 = {"HPHP"};
		String[] books2 = {"HPHP"};
		String[] books3 = {"HPOP", "HPGF"};
		String[] books4 = {"HPHP"};
		
		Vocabulary vocabulary1 = new Vocabulary("Abraxas Malfoy", "Draco Malfoy's grandfather.", "Characters", "content/dam/scholastic/harrypotter/audio/abraxas-malfoy.wav", books1);
		Vocabulary vocabulary2 = new Vocabulary("The Quibbler", "A tabloid newspaper in the wizarding world, edited by Luna Lovegood's father.",  "Publications", "content/dam/scholastic/harrypotter/audio/the-quibbler.wav", books2);   
		Vocabulary vocabulary3 = new Vocabulary("Sectumsempra", "A curse that slashes its victim open as though with a sword.", "Spells", "content/dam/scholastic/harrypotter/audio/sectumsempra.wav", books3);
		Vocabulary vocabulary4 = new Vocabulary("Narcissa Malfoy", "Mother of Draco and wife of Lucius Malfoy. A tall, slim, snooty blonde.", "Characters", "content/dam/scholastic/harrypotter/audio/narcissa-malfoy.wav", books4);
        
		assertEquals(-16, vocabulary1.compareTo(vocabulary2));
		assertEquals(5, vocabulary3.compareTo(vocabulary4));
	}
}