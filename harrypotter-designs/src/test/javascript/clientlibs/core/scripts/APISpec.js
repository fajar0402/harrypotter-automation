describe("APISpec", function() {
	describe("baseUrlTest", function() {
		it("should equal to '/bin/apps/scholastic/harrypotter'", function() {
			expect(API.baseUrl).toBe("/bin/apps/scholastic/harrypotter");
		});
	});

	describe("requestTest", function() {
		var jqXHR = API.request();
		
		it("should return jqXHR object", function() {
			expect(jqXHR).not.toBeUndefined();
		});
	});
});