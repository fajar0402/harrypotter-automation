<?php
include "_header.php";
?>
		<div class="site">
			<div class="wrapper">
				
				<?php include "_sidemenu.php"; ?>
				
				<div class="main glossary">
					
					<div class="header-outer">
						
						<div class="header">
							<div class="hero">
								<div class="hero-heading">
									<h1>Glossary</h1>
								</div>
								
								<div class="hero-search">
									<form action="">
										<span class="icon-search-active" aria-hidden="true"></span>
										<input type="text" name="search-terms" placeholder="Search terms" data-placeholder="Search terms">
										<a href="" class="close"><span class="icon-close"></span></a>
									</form>
								</div>
							</div>
							
							<div class="listing">
								<div class="characters-outer">
									<select class="characters">
										<option value="" disabled selected>A - Z</option>
										
										<?php for ($i = ord('a'); $i <= ord('z'); $i++) echo "<option value=".chr($i).">".chr($i)."</option>"; ?>
									</select>
									
									<ul class="characters">
										<?php for ($i = ord('a'); $i <= ord('z'); $i++) echo "<li class=\"character\"><a href=#".chr($i).">".chr($i)."</a></li>"; ?>
										
										<li class="character">
											<a href="#books" class="books-show">
												<span class="text"></span>
												<span class="icon-down"></span>
											</a>
										</li>
									</ul>
								</div>
								
								<ul class="books">
									<?php
									$books_json = file_get_contents("json/glossary.json");
									$books = json_decode($books_json, true);
									
									foreach ($books["books"] as $book) {
									?><li class="book" data-code="<?php echo $book["code"]; ?>">
										<div class="cover"><img src="<?php echo $book["image"]; ?>"></div>
										<div class="name"><?php echo $book["title"]; ?></div>
										<input id="book-<?php echo $book["code"]; ?>" type="checkbox" name="book-<?php echo $book["code"]; ?>" value="<?php echo $book["code"]; ?>" checked>
										<div class="checkbox"></div>
										<label for="book-<?php echo $book["code"]; ?>"><span></span></label>
									</li>
								<?php } ?></ul>
							</div>
						</div>
						
					</div>
					
					<div class="no-results">
						<div class="middled">
							<div>
								<h2>Sorry, no word was found.</h2>
								<p>Check your spelling</p>
							</div>
						</div>
					</div>
					
					<ul class="glossary-sections">
						<?php
						$books_json = file_get_contents("json/glossary.json");
						$books = json_decode($books_json, true);
						
						for ($i = ord("a"); $i <= ord("z"); $i++) {
							$j = 0;
							$data = "";
							
							foreach ($books["vocabularyRecords"] as $record) {
								if (strtolower(substr($record["term"], 0, 1)) == strtolower(chr($i))) {
									$data .= "<li data-books=\"".implode(',', $record["books"])."\"".($j != 0 && $j % 4 == 0 ? " class=\"first\"" : "").">";
										$data .= "<div class=\"hover-outer\">";
											$data .= "<div class=\"hover\">";
												$data .= "<div class=\"title\">".$record["term"]."</div>";
												$data .= "<div class=\"description\">".$record["definition"]."</div>";
												$data .= "<div class=\"buttons\"><a href=\"#\" class=\"button action-play\" data-audio=\"" . $record['audio'] . "\"><span class=\"icon-speaker\"></span></a><a href=\"#\" class=\"button\"><span class=\"icon-favorite\"></span></a></div>";
											$data .= "</div>";
										$data .= "</div>";
										
										$data .= "<div class=\"title\">".$record["term"]."</div>";
										$data .= "<div class=\"description\">".$record["definition"]."</div>";
									$data .= "</li>";
									
									$j++;
								}
							}
							
							if (!empty($data)) {
								echo "<li class=\"section\" data-section=\"".chr($i)."\">";
									echo "<div class=\"section-headline\"><span>".chr($i)."</span></div>";
									
									echo "<ul class=\"section-content\">";
										echo $data;
									echo "</ul>";
								echo "</li>";
							}
						}
						?>
					</ul>
					
					<div class="back-to-top">
						<a href=""><span class="icon-up"></span><br>Back to Top</a>
					</div>
				</div>
				
			</div>
		</div>
		
		<script type="text/javascript">
			$(function() {
				app.glossary.init();
			});
		</script>
<?php
include "_footer.php";