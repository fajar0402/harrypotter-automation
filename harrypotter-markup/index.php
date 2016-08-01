<?php
include "_header.php";
?>
		<div class="site home">
			<div class="wrapper">

<?php include "_sidemenu.php"; ?>


				<div class="main home">

					<div class="slide explore no-mask">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="explore-helper">
							<div class="explore-abg"></div>

							<div class="explore-video">
								<video src="video/intro-v3.mp4" preload="auto" muted></video>
							</div>

							<div class="slide-holder">

								<img src="images/extras/harry.png" alt="" class="harry">

								<div class="slide-wrapper">
									<div class="centered hp-heading">
										<img src="images/extras/hp-heading.png" alt="">
									</div>
									
									<div class="books-paragraph">
										<h2>The Books</h2>
										<p>Follow Harry Potter on all of his magical adventures in the seven books—from his arrival at the Hogwarts School of Witchcraft and Wizardry to his battle with the most evil wizard of all time! This bestselling fantasy series has cast a spell on readers all over the world—now it’s time for YOU to discover the magic!</p>
										<a href="" class="link"><span>Check out new cover art by Kazu Kibuishi!</span></a>
									</div>

									<div class="slider-frame">
										<ul class="covers">
										<?php
										$covers_json = file_get_contents("json/covers.json");
										$covers = json_decode($covers_json, true);
	
										foreach ($covers as $item => $cover) { ?>
											<li class="particle">
												<div class="like">
													<div class="thumbs-up">s</div>
												</div>
												<div class="cover-holder-outer">
													<div class="cover-holder">
														<img src="<?=$cover['cover-original'] ?>" alt="" class="cover old">
														<div class="cover side">
															<? for($i = 1; $i <= 8; $i++) { ?>
															<span></span>
															<? } ?>
														</div>
														<img src="<?=$cover['cover-new'] ?>" alt="" class="cover new">
													</div>
												</div>
												<div class="book-name" style="background-image: url(<?=$cover['order'] ?>)">
													<span><?=$cover['name'] ?></span>
												</div>
											</li>
										<? } ?>
										</ul>
									</div>
									
									<!--<a href="" class="button bordered big-gap">explore the magic world</a>-->
								</div>
							</div>
						</div>
					</div>

					<div class="slide beasts">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="video">
							<a href="#" class="video-close"><img src="images/extras/icon-close-video.png"></a>
							<div class="video-holder">
								<iframe id="ytplayer" src="https://www.youtube.com/embed/ViuDsy7yb8M?modestbranding=1&autohide=1&showinfo=0&controls=0&version=3&enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>
							</div>
							<div class="inner-box"></div>
						</div>

						<div class="slide-wrapper">
							<div class="panel left">
								<img src="images/extras/fantastic-beasts.png" alt="">
								<p>An all-new adventure returning us to the Wizarding world created by J.K. Rowling. Coming November 18!</p>
								<div class="play-btn">
									<img src="images/extras/cta-video.png" alt="" class="idle">
									<img src="images/extras/cta-video-pressed.png" alt="" class="pressed">
								</div>
							</div>
							<div class="tag right">
								<img src="images/extras/ww.png" alt="">
							</div>
							<div class="clear"></div>
						</div>
					</div>

					<div class="slide sorting-hat">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="centered">
								<img src="images/extras/hat.png" alt="">

								<h2>Welcome to Hogwarts!</h2>
								<span class="smaller">When young witches and wizards arrive at Hogwarts, the Sorting Hat sorts them into one of the four Hogwarts Houses—and now it’s your turn! Will you be a Hufflepuff, Slytherin, Ravenclaw, or Gryffindor?</span>
								<div class="clear"></div>
								<a href="" class="button bordered medium-gap">let the sorting begin!</a>
							</div>
						</div>
					</div>

					<div class="slide glossary">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>
						<img src="images/extras/characters.png" alt="" class="characters">

						<div class="slide-wrapper">
							<div class="centered">
								<div class="glossary-heading">
									<h2>Glossary</h2>
								</div>
								<span class="wod">word of the day</span>

								<div class="search">
									<form action="">
										<div class="input">
											<input type="submit" name="submit" id="submit">
											<label for="submit" class="search-for"><img src="images/extras/magnify.png" alt=""></label>
											<input type="text" name="search-terms" value="" placeholder="Alchemy" autocomplete="off" data-placeholder="Alchemy">
											<div class="speaker"><img src="images/extras/speaker.png" alt=""></div>
										</div>
									</form>
								</div>

								<div class="result">
									/ˈæl.kə.mi/ — Medieval science that is concerned with the creation of the Sorcerer’s Stone.
								</div>

								<a href="" class="button bordered big-gap">see more glossary</a>
							</div>
						</div>
					</div>

					<div class="slide challenge">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="centered">
								<img src="images/extras/trivia.png" alt="">
								<div class="caption">trivia challenge</div>

								<h2 class="red">Put Your Wizarding Knowledge to the Test!</h2>

								<p>Are you an expert on the magical world of Harry Potter?</p>
								<p>Prove your knowledge of all things wizard with this tricky trivia challenge!</p>

								<a href="" class="button bordered small-gap">play the game</a>
							</div>
						</div>
					</div>

					<div class="slide illustrated">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<ul class="split">
								<li>
									<ul class="books">
										<li>
											<div class="like">
												<div class="thumbs-up">s</div>
												<span class="like-count">888</span>
											</div>
											<img src="images/covers/illustrated-cover-2.jpg" alt="">
										</li>
										<li><img src="images/covers/illustrated-cover-1.jpg" alt=""></li>
									</ul>
								</li>

								<li>
									<div class="book-detail">
										<h2>Illustrated Editions</h2>
										<p>See the world of Harry Potter as you’ve never seen it before! These special illustrated editions feature all your favorite characters and magical moments from the original novels—plus more than 100 amazing full-color pictures!</p>
									</div>
									<a href="" class="button bordered small-gap">more about this book</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="slide author">
						<div class="slide-bg-outer">
							<div class="slide-bg"></div>

							<img src="images/extras/rowling-gradient.png" alt="" class="rowling">
						</div>

						<div class="slide-wrapper">

							<ul class="split">
								<li>
									<h2>J.K. Rowling</h2>
									<div class="caption">Born: Yate, United Kingdom</div>
									<p>J.K. (Joanne Kathleen) Rowling was born in the summer of 1965 at Yate General Hospital in England and grew up in Chepstow, Gwent, where she went to Wyedean Comprehensive. Jo left Chepstow for Exeter University, where she earned a French and Classics degree, and where her course included one year in Paris.</p>
									<!--<a href="" class="link">Read more about the author</a>-->
									<div class="link"></div>
									<div class="clear"></div>

									<div class="caption illustrators">meet the illustrators</div>
									<div class="illustrators-list">
										<div class="illustrator">
											<div class="link">
												<img src="images/extras/illustrator-1.jpg" alt="">
												<div class="name">Mary GrandPré</div>
											</div>
										</div>
										<div class="illustrator">
											<div class="link">
												<img src="images/extras/illustrator-2.jpg" alt="">
												<div class="name">Kazu Kibuishi</div>
											</div>
										</div>
										<div class="illustrator">
											<div class="link">
												<img src="images/extras/illustrator-3.jpg" alt="">
												<div class="name">Jim Kay</div>
											</div>
										</div>
									</div>
								</li>

								<li></li>
							</ul>
						</div>
					</div>

				</div>

			</div>
		</div>

		<script>
			$(function() {
				app.home.init();
			})
		</script>
<?php
include "_footer.php";