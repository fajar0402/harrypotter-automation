describe("GlossaryAPISpec", function() {
	describe("getGlossaryTest", function() {
		var jqXHR = GlossaryAPI.getGlossary();

		it("should return jqXHR object", function() {
			expect(jqXHR).not.toBeUndefined();
		});
	});
});