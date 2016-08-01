<?php
include "_header.php";
?>
		<div class="site">
			<div class="wrapper">
				
<?php include "_sidemenu.php"; ?>

				
				<div class="main hat-sorting">
					<a href="" class="skip">skip quiz<span class="icon-close" aria-hidden="true"></span></a>
					
					<div class="questions hide">
						<img src="images/extras/hat.png" title="" alt="" class="hat">
						
						<div class="position">
							<div>
								<div class="position-active">1</div>
							</div>
							
							<div>
								<div class="position-divider">of</div>
								<div class="position-max">10</div>
							</div>
						</div>
						
						<div class="question"></div>
						
						<ul class="answers">
							<?php for ($i = 1; $i <= 4; $i++) { ?>
								<li class="answer" data-answer-order="<?php echo $i; ?>">
									<div class="answer-left"></div>
									<div class="answer-middle"></div>
									<div class="answer-right"></div>
								</li>
							<?php } ?>
						</ul>
						
						<div class="message hide"><img src="images/hat-sorting/right-then.png" title="" alt=""></div>
					</div>
					
					<div class="result hide">
						<div class="title">You belong in...</div>
						
						<div class="image"><img src="images/hat-sorting/slytherin.png" title="" alt=""></div>
						
						<div class="text">
							You are courageous, chivalrous, and determined.<br>You can be short-tempered, and sometimes reckless.
							
							<p>
								<a href="" class="link">Sign Up</a> or <a href="" class="link">Log In</a> to save your house, or <a href="" class="link">retake the test</a>!
							</p>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		
		<script>
			$(function() {
				app.hatSorting.init();
			})
		</script>
<?php
include "_footer.php";