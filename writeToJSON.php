<?php 
	
	if(isset($_REQUEST ['data'])) {
		newThing();
	} 
	if(isset($_REQUEST ['edit'])) {
		editThing();
	}

	function newThing() {

		if($_REQUEST ['data'] == "") {
			exit;
		}

		$entry = $_REQUEST['data'];

		$file = 'entries.json';

		$json = json_decode(file_get_contents($file), true);

		$size = count($json)+1;

		$d = date('d');
		$m = date('m');
		$y = date('y');
		$date = $d . '/' . $m . '/' . $y;

		$json[$size] = array("date" => $date, "content" => $entry);

		file_put_contents($file, json_encode($json));

	}

	function editThing() {
		if($_REQUEST ['edit'] == "") {
			exit;
		}

		$entry = $_REQUEST['edit'];

		$content = $entry['content'];

		$selector = $entry['selector'];

		$file = 'entries.json';

		$json = json_decode(file_get_contents($file), true);

		$json[$selector]['content'] = $content;


		file_put_contents($file, json_encode($json));
	}

?>