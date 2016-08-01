package com.scholastic.harrypotter.utils;

import static org.junit.Assert.*;

import org.junit.Test;

/**
 * Functionality test of String utils class.
 */
public class StringUtilsTest {

	/**
	 * Get word without excluded phrase test.
	 */
	@Test
	public void testexcludePhraseOnWord() {
		assertEquals("", StringUtils.excludePhraseOnWord(null));
		assertEquals("", StringUtils.excludePhraseOnWord(""));
		assertEquals("Accio", StringUtils.excludePhraseOnWord("Accio"));
		assertEquals("Jungle Book", StringUtils.excludePhraseOnWord("The Jungle Book"));
		assertEquals("jungle book", StringUtils.excludePhraseOnWord("the jungle book"));
		assertEquals("TheJungleBook", StringUtils.excludePhraseOnWord("TheJungleBook"));
		assertEquals("Beast", StringUtils.excludePhraseOnWord("A Beast"));
		assertEquals("Eel", StringUtils.excludePhraseOnWord("An Eel"));
		assertEquals("A", StringUtils.excludePhraseOnWord("A"));
		assertEquals("An", StringUtils.excludePhraseOnWord("An"));
		assertEquals("The", StringUtils.excludePhraseOnWord("The"));
		assertEquals("Acid Pops", StringUtils.excludePhraseOnWord("Acid Pops"));
	}
	
	/**
	 * Get first letter test.
	 */
	@Test
	public void testgetFirstLetter() {
		assertEquals("", StringUtils.getFirstLetter(null));
		assertEquals("", StringUtils.getFirstLetter(""));
		assertEquals("A", StringUtils.getFirstLetter("Accio"));
		assertEquals("J", StringUtils.getFirstLetter("The Jungle Book"));
		assertEquals("J", StringUtils.getFirstLetter("the jungle book"));
		assertEquals("T", StringUtils.getFirstLetter("TheJungleBook"));
		assertEquals("B", StringUtils.getFirstLetter("A Beast"));
		assertEquals("E", StringUtils.getFirstLetter("An Eel"));
		assertEquals("A", StringUtils.getFirstLetter("A"));
		assertEquals("A", StringUtils.getFirstLetter("An"));
		assertEquals("T", StringUtils.getFirstLetter("The"));
		assertEquals("A", StringUtils.getFirstLetter("Acid Pops"));
	}
	
	/**
	 * Check String Array contains ignore case test.
	 */
	@Test
	public void teststringArrayContainsIgnoreCase() {
		String[] stringArray = {"a", "an", "the", "Test"};
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("a", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("an", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("the", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("test", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("A", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("An", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("The", stringArray));
		assertTrue(StringUtils.stringArrayContainsIgnoreCase("Test", stringArray));
		assertFalse(StringUtils.stringArrayContainsIgnoreCase("x", stringArray));
	}

}
