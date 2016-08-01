package com.scholastic.harrypotter.utils;


/**
 * Utility for String manipulation.
 */
public class StringUtils{
	
	/**
	 * To get a word with excluding some phrase(s).
	 * @param word any String.
	 * @return the word without excluded phrase
	 */
    public static String excludePhraseOnWord(String word) {
    	String SPACE_CHARACTER = " ";
    	String[] ignoredPhrase = {"a", "an", "the"};
        String result = "";
        
        if (word != null && !word.isEmpty()) {
        	String[] parts = word.split(SPACE_CHARACTER);
            
        	String part1 = parts[0];
        	boolean containsIgnoreCase = stringArrayContainsIgnoreCase(part1, ignoredPhrase);
        	
            if (containsIgnoreCase) {
            	result = word.substring(word.indexOf(SPACE_CHARACTER)+1);
            }
            else {
            	result = word;
            }
        }
        
        return result;
    }
	
	/**
	 * To get first letter of a word with excluding some phrase(s).
	 * @param word any String.
	 * @return the first letter of word except "a", "an", and "the".
	 */
    public static String getFirstLetter(String word) {
    	String excludePhraseWord = excludePhraseOnWord(word);
    	
    	String firstLetter1 = excludePhraseWord != null && !excludePhraseWord.isEmpty()? excludePhraseWord.substring(0, 1) : "";
    	String firstLetter2 = word != null && !word.isEmpty()? word.substring(0, 1) : "";
    	
    	String firstLetter = !firstLetter1.isEmpty()? firstLetter1 : firstLetter2;
        
        return firstLetter.toUpperCase();
    }
    
    /**
	 * To check String Array whether contains a string with ignoring case sensitivity.
	 * @param string any String.
	 * @return true if String Array contains a text by ignoring the case.
	 */
    public static boolean stringArrayContainsIgnoreCase(String string, String[] stringArray) {
    	boolean containsIgnoreCase = false;
    	for (int i = 0; i < stringArray.length; i++) {
			String phrase = stringArray[i];
			if (phrase.equalsIgnoreCase(string)) {
				containsIgnoreCase = true;
				break;
			}
		}
    	
    	return containsIgnoreCase;
    }
    
}
