"use strict";
use(['../../utils/ImageColorizer.js'], function (ImageColorizer) {
    var ICON_COLOR = "iconColor";
	
	var ImageIconColor = {};

	var imageColor = granite.resource.properties[ICON_COLOR];

    if (imageColor) {
		ImageIconColor.colorFilter = ImageColorizer.changeImageColor(imageColor);
    }

    return ImageIconColor;
});