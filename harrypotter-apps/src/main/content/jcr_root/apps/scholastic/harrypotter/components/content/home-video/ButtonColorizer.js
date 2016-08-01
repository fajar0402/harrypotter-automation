"use strict";
use(['../../utils/ImageColorizer.js'], function (ImageColorizer) {
	var TITLE_COLOR = "titleColor";

    var BUTTON_COLOR = "buttonColor";
	
	var ButtonColor = {};

	var titleColor = granite.resource.properties[TITLE_COLOR];

    var buttonColor = granite.resource.properties[BUTTON_COLOR];

	if (titleColor) {
		ButtonColor.titleColorFilter = ImageColorizer.changeImageColor(titleColor);
    }

    if (buttonColor) {
		ButtonColor.buttonColorFilter = ImageColorizer.changeImageColor(buttonColor);
    }

    return ButtonColor;
});