var multiStr = [
	'<script src="//www.scholastic.com/assets/js/jquery.min.js"></script>',
	'<script src="//www.scholastic.com/assets/js/jquery-migrate-1.2.1.min.js"></script>',
	'<script type="text/javascript">',
		'var schljq = false;',
		'var $j = jQuery.noConflict();',
	'</script>',
	'<script type="text/javascript" src="//www.scholastic.com/kids/stacks/multiverse-navigation/nav.js"></script>'
].join("\n");

document.write(multiStr)