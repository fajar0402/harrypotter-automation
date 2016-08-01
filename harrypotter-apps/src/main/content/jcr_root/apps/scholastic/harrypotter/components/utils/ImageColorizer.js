"use strict";
use(function () {
    var ImageColorizer = {};

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function rgbToHsl(r, g, b) {
        r /= 255.0;
        g /= 255.0;
        b /= 255.0;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2.0;
        
        if(max == min) {
            h = s = 0; 
        } else {
            var d = max - min;
            s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));
            
            if(max == r && g >= b) {
                h = 1.0472 * (g - b) / d ;
            } else if(max == r && g < b) {
                h = 1.0472 * (g - b) / d + 6.2832;
            } else if(max == g) {
                h = 1.0472 * (b - r) / d + 2.0944;
            } else if(max == b) {
                h = 1.0472 * (r - g) / d + 4.1888;
            }
        }
        return {
            str: 'hsl(' + parseInt(h / 6.2832 * 360.0 + 0.5) + ',' + parseInt(s * 100.0 + 0.5) + '%,' + parseInt(l * 100.0 + 0.5) + '%)',
            obj: { h: parseInt(h / 6.2832 * 360.0 + 0.5), s: parseInt(s * 100.0 + 0.5), l: parseInt(l * 100.0 + 0.5) }
        };
    };

    function changeImageColorHSL(h, s, l) {
    	var result = {};

        var hue = h - 38;
        var saturate = 100 + (24.5 - s);
        var brightness = 100 + (l - 60);

	    result.hue = hue;
		result.saturate = saturate;
	    result.brightness = brightness;

	    return result;
    };

	function changeImageColor(color) {
        var result = "";

		var targetColor = hexToRgb(color);
        var hslValue = rgbToHsl(targetColor.r, targetColor.g, targetColor.b).obj;
        var h = hslValue.h;
        var s = hslValue.s;
        var l = hslValue.l;

        var newColor = changeImageColorHSL(h, s, l);

        var WHITE = 'FFFFFF';
        var BLACK = '000000';
        var isGrayColor = newColor.saturate == 124.5;

        if (color == WHITE) {
            result = "hue-rotate("+newColor.hue+"deg) saturate("+newColor.saturate+"%) brightness("+newColor.brightness+"%)";
        } else if (color == BLACK || isGrayColor) {
			result = "brightness(50%) hue-rotate("+newColor.hue+"deg) saturate("+newColor.saturate+"%) brightness("+newColor.brightness+"%)";
        } else {
            result = "brightness(50%) sepia(1) hue-rotate("+newColor.hue+"deg) saturate("+newColor.saturate+") brightness("+newColor.brightness+"%)";
        }

	    return result;
    };

	ImageColorizer.hexToRgb = hexToRgb;
	ImageColorizer.rgbToHsl = rgbToHsl;
	ImageColorizer.changeImageColorHSL = changeImageColorHSL;
	ImageColorizer.changeImageColor = changeImageColor;

    return ImageColorizer;
});