package com.scholastic.harrypotter.interfaces;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

public interface JSONModel {
	
	/**
	 * Map JSONObject field to fill in the Object Model field.
	 * @param json Data source in JSONObject
	 * @throws JSONException
	 */
	public void fromJSON(JSONObject json) throws JSONException;
	/**
	 * Populate Object Model field to be converted to JSONObject.
	 * @return JSONObject that holds the field values.
	 * @throws JSONException
	 */
	public JSONObject toJSON() throws JSONException;
	
}
