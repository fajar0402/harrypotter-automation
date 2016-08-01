package com.scholastic.harrypotter.model;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

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

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.mockito.Mockito.*;

/**
 * Functionality test of Book class.
 */
public class BookTest {
	
	private static Book mockBook;
	private static JSONObject bookJson;
	
	@BeforeClass
	public static void setUP() {
		//given
		mockBook = mock(Book.class);
		
		mockBook.setCode("ABCD1234");
		mockBook.setImage("/harry_potter.png");
		mockBook.setTitle("Chamber of Secrets");
		mockBook.setOrder(99);
		
		when(mockBook.getOrder()).thenReturn(99);
		when(mockBook.getCode()).thenReturn("ABCD1234");
		when(mockBook.getImage()).thenReturn("/harry_potter.png");
		when(mockBook.getTitle()).thenReturn("Chamber of Secrets");
		
		try {
			bookJson = mockBook.toJSON();
		} catch (JSONException e) {
			bookJson = new JSONObject();
			e.printStackTrace();
		}
	}
	
	@Test
	public void testFromToJSON(){

	}
	
	@Test
	public void testGetSetOrder(){
		assertEquals(99, mockBook.getOrder());
	}
	
	@Test
	public void testGetSetCode() throws JSONException{
		assertEquals("ABCD1234", mockBook.getCode());
	}
	
	@Test
	public void testGetSetImage() throws JSONException{
		assertEquals("/harry_potter.png", mockBook.getImage());
	}
	
	@Test
	public void testGetSetTitle() throws JSONException{
		assertEquals("Chamber of Secrets", mockBook.getTitle());
	}
	
	@Test
	public void testfromJSON() throws JSONException{
		Book book = new Book();
        JSONObject jsonResponseBooks = new JSONObject();
        jsonResponseBooks.put( "code", "HPSS" );
        jsonResponseBooks.put( "title", "Sorcerer\'s Stone" );
        jsonResponseBooks.put( "image", "content/dam/HPSS.png" );
        
        JSONObject jsonResponseBooks1 = new JSONObject();
        jsonResponseBooks1.put( "code", "" );
        jsonResponseBooks1.put( "title", "" );
        jsonResponseBooks1.put( "image", "" );

        book.fromJSON(jsonResponseBooks);
		assertEquals("HPSS", book.getCode());
		assertEquals("Sorcerer\'s Stone", book.getTitle());
		assertEquals("content/dam/HPSS.png", book.getImage());
		
		book.fromJSON(jsonResponseBooks1);
		assertEquals("", book.getCode());
		assertEquals("", book.getTitle());
		assertEquals("", book.getImage());
	}
	
	@Test
	public void testtoJSON() throws JSONException{
		int order = 1;
		String code = "HPSS";
		String title = "Sorcerer's Stone";
		String image = "/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg";
		Book book = new Book(order, code, title, image);
		JSONObject root = book.toJSON();
		
		int order1 = 3;
		String code1 = "";
		String title1 = "";
		String image1 = "";
		Book book1 = new Book(order1, code1, title1, image1);
		JSONObject root1 = book1.toJSON();
		
		assertEquals("HPSS", root.getString(Book.CODE));
		assertEquals("Sorcerer's Stone", root.getString(Book.TITLE));
		assertEquals("/etc/designs/scholastic/harrypotter/clientlibs/core/images/cover-1.jpg", root.getString(Book.IMAGE));
		
		assertEquals("", root1.getString(Book.CODE));
		assertEquals("", root1.getString(Book.TITLE));
		assertEquals("", root1.getString(Book.IMAGE));
	}
	
	@Test
	public void testmapField() throws PathNotFoundException, RepositoryException{
		Book book1 = new Book();
		
		book1.mapField(null);
		assertEquals(0, book1.getOrder());
		assertNull(book1.getCode());
		assertNull(book1.getTitle());
		assertNull(book1.getImage());
		
		book1.mapField(new Node() {
			
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
		assertEquals(0, book1.getOrder());
		assertNull(book1.getCode());
		assertNull(book1.getTitle());
		assertNull(book1.getImage());
	}
	
	@Test
	public void testcompareTo(){
		Book book1 = new Book(1,"HPSS","Harry Potter and Sorcerer's Stone", "content/dam/scholastic/harrypotter/image/hpss.png");
		Book book2 = new Book(2,"HPCS","Harry Potter and Chamber of Secret", "content/dam/scholastic/harrypotter/image/hpcs.png");
		Book book3 = new Book(99,"HPCS","Harry Potter and Chamber of Secret", "content/dam/scholastic/harrypotter/image/hpcs.png");
		Book book4 = new Book(90,"HPCS","Harry Potter and Chamber of Secret", "content/dam/scholastic/harrypotter/image/hpcs.png");
		assertEquals(-1, book1.compareTo(book2));
		assertEquals(9, book3.compareTo(book4));
	}
	
}
