<?php 
	
	if(isset($_REQUEST ['data'])) {
		newThing();
	} 
	if(isset($_REQUEST ['edit'])) {
		editThing();
	}
	if(isset($_REQUEST ['entry'])) {
		deleteThing();
	} else {
		exit;
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

		$new_entry = array("date" => $date, "content" => $entry);

		if($json == null || $json == "") {
			$json[$size] = $new_entry;
		} else {
			array_push($json, $new_entry);
		}
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

	function deleteThing() {

		if($_REQUEST ['entry'] == "") {
			exit;
		}

		$entry = $_REQUEST ['entry'];

		$file = 'entries.json';

		$json = json_decode(file_get_contents($file));

		if (! empty($json->{$entry})) {
  			unset($json->{$entry});
		}

		//echo json_encode($json);

		if(json_encode($json) == "{}") {
			unlink($file);
			exit;
		}

		file_put_contents($file, json_encode($json));


	}

?>