<?php
include "_header.php";
?>
		<div class="site detail">
			<div class="wrapper">

				<?php include "_sidemenu.php"; ?>

				<div class="main detail">

					<div class="slide detail no-mask">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="detail-slide">
								<div>
									<a href="" class="inside"><span href="" class="link">see inside</span><img src="images/detail/extras/ico-crkd-arrow.png" alt=""></a>
									<img src="images/detail/covers/hp1.jpg" alt="">
								</div>
								<div></div>
								<div>
									<ul class="book-specs">
										<li class="series">Harry Potter</li>
										<li class="title">Harry Potter and the Sorcerer’s Stone</li>
										<li class="author">by <a href="" class="detail-link author-name">J.K. Rowling</a></li>
										<li class="illustrator">Illustrator: <a href="" class="detail-link illustrator-name">Mary GrandPré</a></li>
										<li class="spec-details">
											<div class="age">
												<div class="spec-title">age range</div>
												<div class="spec-value">All ages</div>
											</div>
											<div class="level">
												<div class="spec-title">reading level</div>
												<div class="spec-value to-press">6.7 <?php include('images/detail/extras/ico-info.svg') ?></div>
											</div>
											<div class="genre">
												<div class="spec-title">genre</div>
												<div class="spec-value">Adventure, Fantasy</div>
											</div>
										</li>
										<li class="book-about">
											<span class="text">For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir</span> <a href="" class="detail-link to-press underline">See All</a>
										</li>
										<li class="cta">
											<div class="get"><span>r</span>Get this book</div>
											<!--<div class="fav"><span>s</span>Favorite</div>-->
											<div class="share"><span>k</span>Email</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div class="slide read-next">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="centered">

								<img src="images/detail/extras/ico-books.jpg" alt="">

								<h3>Read the next book in the series</h3>

								<div class="slider-frame">
									<ul class="next-books">
										<?php
										$nextbooks_json = file_get_contents("json/nextbooks.json");
										$nextbooks = json_decode($nextbooks_json, true);

										foreach($nextbooks as $item => $book) { ?>
										<li class="book-holder">
											<div class="like to-press">
												<div class="thumbs-up">s</div>
												<span class="like-count">888</span>
											</div>

											<img src="<?=$book['cover'] ?>" alt="">

											<div class="book-title"><?=$book['name'] ?></div>
										</li>
										<? } ?>
									</ul>

									<ul class="pages"></ul>
								</div>

								<a href="" class="button bigger-gap">see series</a>

							</div>
						</div>
					</div>

					<div class="slide about-author">
						<div class="slide-bg-outer">
							<div class="slide-bg"></div>
							
							<img src="images/extras/rowling-gradient.png" alt="" class="rowling">
						</div>

						<div class="slide-wrapper">
							<ul class="split">
								<li>
									<h4>About the Author</h4>
									<p>Todd Strasser writes his books largely out of his own experience or remembered feeling, and always with his readers in mind. He tries to observe young people whenever he can, and when he can't, he will eavesdrop on their conversations in places where they hang out. One of his favorite things to do is visit schools, where he talks about what it's like to be a writer. “Then, after I speak,” he says, “I listen to the audience. I can learn as much from them as they can from me.”</p>
									<!--<a href="" class="link to-press">Read Whole Author Bio</a>-->
									<div class="link"></div>
									<div class="clear"></div>

									<ul class="illustrator-box">
										<li>
											<img src="images/detail/extras/grandpre.jpg" alt="">
										</li>
										<li>
											<h4>about the illustrator</h4>
											<p>Mary GrandPré, the illustrator for the Harry Potter books, has been drawing since she was five years old.</p>
											<!--<a href="" class="link to-press">Read Whole Illustrator Bio</a>-->
										</li>
									</ul>
								</li>

								<li></li>
							</ul>
						</div>
					</div>

					<div class="slide explore-all">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="centered">

								<img src="images/detail/extras/ico-eye.jpg" alt="">

								<h3>Explore Everything Harry Potter</h3>

								<div class="slider-frame">
									<ul class="features">
										<li>
											<div class="like to-press">
												<div class="thumbs-up">s</div>
												<span class="like-count">888</span>
											</div>
											<div class="feature-icon" style="background-image: url(images/detail/feature-1-bg.jpg);">
												<div class="feature-icon-overflow">
													<!--<img src="images/detail/feature-1-bg.jpg" alt="" class="feature-icon-bg">-->
													<img src="images/detail/feature-1-icon.png" alt="" class="feature-icon-image">
												</div>
											</div>
											<div class="feature-name">Glossary</div>
										</li>
										<li>
											<div class="like to-press">
												<div class="thumbs-up">s</div>
												<span class="like-count">888</span>
											</div>
											<div class="feature-icon">
												<img src="images/detail/feature-2-bg.png" alt="" class="feature-icon-bg">
												<img src="images/detail/feature-2-icon.png" alt="" class="feature-icon-image">
											</div>
											<div class="feature-name">Trivia Game</div>
										</li>
										<li>
											<div class="like to-press">
												<div class="thumbs-up">s</div>
												<span class="like-count">888</span>
											</div>
											<div class="feature-icon" style="background-image: url(images/detail/feature-3-bg.jpg);">
												<!--<div class="feature-icon-overflow">-->
												<!--	<img src="images/detail/feature-3-bg.jpg" alt="" class="feature-icon-bg">-->
												<!--</div>-->
												<img src="images/detail/feature-3-icon.png" alt="" class="feature-icon-image">
											</div>
											<div class="feature-name">Hat Sorting</div>
										</li>
									</ul>

									<ul class="pages"></ul>
								</div>

								<a href="" class="button">see all harry potter</a>

							</div>
						</div>
					</div>

					<div class="slide more-books">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="centered">
								<img src="images/detail/extras/ico-open-book.jpg" alt="">

								<h3 class="red">More Harry Potter Books</h3>

								<div class="slider-frame">
									<ul class="next-books">
										<?php
										$morebooks_json = file_get_contents("json/morebooks.json");
										$morebooks = json_decode($morebooks_json, true);

										foreach($morebooks as $item => $book) { ?>
										<li class="book-holder">
											<div class="like to-press">
												<div class="thumbs-up">s</div>
												<span class="like-count">888</span>
											</div>

											<img src="<?=$book['cover'] ?>" alt="">

											<div class="book-title"><?=$book['name'] ?></div>
										</li>
										<? } ?>
									</ul>

									<ul class="pages"></ul>
								</div>

							</div>
						</div>
					</div>

					<div class="slide detail-footer no-mask">
						<div class="slide-bg-outer"><div class="slide-bg"></div></div>

						<div class="slide-wrapper">
							<div class="genres">
								<div><span>This Book is about</span></div>
								<div><a href="">Fantasy</a></div>
								<div><a href="">Growing Up</a></div>
								<div><a href="">Magic</a></div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<script>
			$(function() {
				app.detail.init();
			})
		</script>
<?php
include "_footer.php";