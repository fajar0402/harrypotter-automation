package apps.scholastic.harrypotter.components.content.about_author;

import com.adobe.cq.sightly.WCMUse;


public class AboutAuthor extends WCMUse {
    private String[] illustrators;

    @Override
    public void activate() throws Exception {
        illustrators = getProperties().get("illustrators", String[].class);
    }

    public boolean getIsTypeOne() {
		if (illustrators == null) {
			return false;
        } else {
			return illustrators.length > 1;
        }

    }
}