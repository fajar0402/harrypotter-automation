package com.scholastic.harrypotter.controller;

import java.util.ArrayList;

import com.adobe.cq.sightly.WCMUse;
import com.scholastic.harrypotter.common.Constants;
import com.scholastic.harrypotter.model.Vocabulary;
import com.scholastic.harrypotter.model.VocabularyList;

public class VocabularyRecordsCtrl extends WCMUse {
	
	private ArrayList<Vocabulary> vocabularyRecords = new ArrayList<Vocabulary>();

	@Override
	public void activate() throws Exception {
		VocabularyList vocabularyList = new VocabularyList(Constants.JCR_DATA_BASE_PATH+"/vocabulary");
		vocabularyList.fetch();
		this.setVocabularyRecords(vocabularyList.getVocabularyRecords());
	}

	public ArrayList<Vocabulary> getVocabularyRecords() {
		return vocabularyRecords;
	}

	public void setVocabularyRecords(ArrayList<Vocabulary> vocabularyRecords) {
		this.vocabularyRecords = vocabularyRecords;
	}

}
