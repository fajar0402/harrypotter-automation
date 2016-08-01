"use strict";
use(['../../utils/ImageColorizer.js'], function (ImageColorizer) {
    var ICON_COLOR = "iconColor";
	
	var AudioIconColor = {};

	var imageColor = granite.resource.properties[ICON_COLOR];

    if (imageColor) {
		AudioIconColor.colorFilter = ImageColorizer.changeImageColor(imageColor);
    }

    return AudioIconColor;
});