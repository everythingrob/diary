<?php 
	
	if($_REQUEST ['data'] == "") {
		exit;
	}

	$entry = $_REQUEST['data'];

	$file = '../entries.json';

	$json = json_decode(file_get_contents($file), true);

	$size = count($json)+1;

	$d = date('d');
	$m = date('m');
	$y = date('y');
	$date = $d . '/' . $m . '/' . $y;

	$json[$size] = array("date" => $date, "content" => $entry);

	file_put_contents($file, json_encode($json));

?>