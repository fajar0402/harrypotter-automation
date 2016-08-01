var API = {
    baseUrl: "/bin/apps/scholastic/harrypotter",
    
    /**
     * Constant of HTTP verbs.
    **/
    methods: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE",
        PATCH: "PATCH"
    },

    /**
     * Core function of ajax call.
     *
     * @param method HTTP verb that is going to be executed.
     * @param url Address where the service is located.
     * @param reqBody Information that need to be sent to the server in JSON format.
     * @param customHeader HTTP request header to be sent to the server (optional).
     *
     * @return jqXHR JQuery XHR Object to allow callback chaining.
    **/
    request: function(method, url, reqBody, customHeader){
        var jqXHR = $.ajax({
                data : JSON.stringify(reqBody),
                type: method,
                crossDomain: true,
                contentType: 'application/json',
                url: url,
                header : customHeader 
        }).always(function() {
            //common handler for ajax callback
        });

        return jqXHR;
    },

    /**
     * Shorthand function for ajax call using baseUrl and module.
     *
     * @param method HTTP verb that is going to be executed.
     * @param module Path of service that going to be executed based on the baseUrl.
     * @param reqBody Information that need to be sent to the server in JSON format.
     * @param customHeader HTTP request header to be sent to the server (optional).
     *
     * @return jqXHR JQuery XHR Object to allow callback chaining.
    **/
    moduleRequest: function(method, module, reqBody, customHeader){
        return this.request(method, this.baseUrl+module, reqBody, customHeader);
    }
}