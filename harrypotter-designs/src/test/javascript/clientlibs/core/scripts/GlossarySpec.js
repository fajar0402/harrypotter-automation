describe("GlossarySpec", function() {
	describe("renderTest", function(){
		var data = {
							"books" : [
									{
										"code" : "HPSS",
										"title" : "Harry Potter and the Sorcerer's Stone",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-1.jpg"
									},
									{
										"code" : "HPCS",
										"title" : "Harry Potter and the Chamber of Secret",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-2.jpg"
									},
									{
										"code" : "HPPA",
										"title" : "Harry Potter and the Prisoner of Azkaban",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-3.jpg"
									},
									{
										"code" : "HPGF",
										"title" : "Harry Potter and the Goblet of Fire",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-4.jpg"
									},
									{
										"code" : "HPOP",
										"title" : "Harry Potter and the Order of Phoenix",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-5.jpg"
									},
									{
										"code" : "HPHP",
										"title" : "Harry Potter and the Half-Blood Prince",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-6.jpg"
									},
									{
										"code" : "HPDH",
										"title" : "Harry Potter and the Deathly Hallows",
										"image" : "/etc/designs/scholastic/harrypotter/clientlibs/core/images/covers/cover-7.jpg"
									} ],
							"vocabularyRecords" : [
									{
										"term" : "Abraxas Malfoy",
										"definition" : "Draco Malfoy's grandfather.",
										"startedWith" : "A",
										"audio" : "/content/dam/scholastic/harrypotter/audio/glossary/abraxas_malfoy.mp3",
										"books" : [ "HPHP" ]
									},
									{
										"term" : "Accio",
										"definition" : "Incantation for the Summoning Charm.",
										"startedWith" : "A",
										"audio" : "/content/dam/scholastic/harrypotter/audio/glossary/accio.mp3",
										"books" : [ "HPSS" ]
									},
									{
										"term" : "Acid Pops",
										"definition" : "Wizarding sweets that burn holes in your tongue. Available at Honeydukes in Hogsmeade.",
										"startedWith" : "A",
										"audio" : "",
										"books" : [ "HPSS", "HPCS", "HPPA" ]
									},
									{
										"term" : "Aconite",
										"definition" : "Plant used in potions. Also known as monkshood or wolfsbane.",
										"startedWith" : "A",
										"audio" : "",
										"books" : [ "HPGF" ]
									} ]
						};
		
		beforeEach(function() {
			jasmine.getFixtures().set("<ul class='books'></ul><ul class='glossary-sections'></ul>");
			app.glossary.render(data);
		});
		
		it("should render list of books", function(){	
			expect($(".books")).toContainElement('li.book');
		});
		
		it("should render list of term", function(){	
			expect($(".glossary-sections")).toContainElement('li.section');
		});
		
		it("should show Harry Potter and the Sorcerer's Stone as a first book title", function(){
			expect($(".book").eq(0).find(".name").text()).toMatch("Harry Potter and the Sorcerer's Stone");
		});
	})
	
});