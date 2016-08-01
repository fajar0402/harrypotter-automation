<?php

$out = ob_get_contents();
// ob_end_clean();

$file = $_SERVER['SCRIPT_FILENAME'];


file_put_contents(preg_replace('/\.php$/', '.html', $file), $out);