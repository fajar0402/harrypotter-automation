var GlossaryAPI = {
    getGlossary: function(){
        return API.moduleRequest(API.methods.GET, "/glossary");
    }
};