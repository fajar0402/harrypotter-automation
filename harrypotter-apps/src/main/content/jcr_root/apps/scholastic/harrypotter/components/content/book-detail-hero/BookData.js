"use strict";
use (function () {
	var VENDOR = "vendor";
	var obj = {};
    var book = {};
    var vendor = granite.resource.properties[VENDOR] || [];

    if (vendor.length > 1) {
        for (var i = 0 ; i < vendor.length ; i++) {
            book = JSON.parse(vendor[i] || '{}');
            obj[book.name] = book.url;
        }
    } else if (vendor.length != 0) {
        book = JSON.parse(vendor || '{}');
        obj[book.name] = book.url;
    }

    return JSON.stringify(obj);
});