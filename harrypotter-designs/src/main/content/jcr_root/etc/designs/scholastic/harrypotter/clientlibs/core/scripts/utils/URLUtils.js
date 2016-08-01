var URLUtils = {
	getQueryItem : function(key) {
        var urlQueries = this.getURLQueries();
		return urlQueries[key];
    },
    getURLQueries: function() {
        var urlQueries = {};

        var queriesArray = window.location.search.substring(1).split("&");

        for(var i=0; i<queriesArray.length; i++) {
			var item = queriesArray[i];
			var pair = item.split("=");
            urlQueries[pair[0]] = decodeURIComponent(pair[1]);
        }

        return urlQueries;
    }
};