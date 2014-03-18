	$(document).ready(function() {
		$('#add-entry').bind('submit', newEntry);
		$('#edit-entry').bind('submit', editEntry);
		$('select.edit').bind('change', getEdit);
		pageHighlight(); 
		//$('#edit-entry textarea').readOnly = true;
		$('#add-entry textarea').click(function() {
			$('.error').hide('quick');
			$('#add-entry textarea').removeClass('box-error');

		})
	})


	function getEntryList() {
		$.getJSON('../entries.json', function( entries ) {
			var i = countObject(entries), entry;
			while(entry = entries[i]) {
				$('select').append(function() {
					i--;
					return "<option value='"+(i+1)+"'>"+entry.date+"</option>";
				})
			}
		})
	}

	function getJSON() {		
		$.getJSON( "/diary/entries.json", function( entries ) {
				var i = countObject(entries), entry;
			  	while(entry = entries[i]) {
			  		$('.entries-body').append(function() {
			  			i--;
			  			return makeEntry(entry);
			  		})		
			  	}

		})
		.fail(function(){
			var error = "No entries were found, <a href='/diary/new/' class='underline'>click here</a> to add one"
			$('.entries-body').html(error);
		});
	}

var currentEntry;

	function getEdit() {
		$('#edit-entry').show('quick');
		$.getJSON('../entries.json', function( entries ) {
			$('#edit-entry textarea').html(function() {
				var entry = document.querySelector('select').value;
				currentEntry = entry;
				return entries[entry].content;
			})
		})
	}

	function newEntry(event) {
		event.preventDefault();
		var entry = document.querySelector('#add-entry textarea').value;
		if(entry == "") {
			$('.error').show('quick');
			$('#add-entry textarea').addClass('box-error');
			return false;
		} 
		$.ajax({
			type : "POST",
			url : '../writeToJSON.php',
			data : { data : entry }
		})
		.done(function(data_d) {
			$('#success').show('quick');
			$('#add-entry textarea').addClass('box-success') 
			setTimeout(function() {
				$('#success').hide('quick');
				$('#add-entry textarea').removeClass('box-success');
			},1500);
		})
	}

	function editEntry(event) {
		event.preventDefault();
		var entry = document.querySelector('#edit-entry textarea').value;
		if($('#edit-entry textarea').readOnly == true) {
			$('.error2').show('quick');
			setTimeout(function() {
				$('.error2').hide('quick');
			},1300);
			return false;
		}
		if(entry == "") {
			$('.error').show('quick');
			$('#add-entry textarea').addClass('box-error');
			return false;
		} 
		var payload = {
			content : entry,
			selector : currentEntry
		}
		$.ajax({
			type : "POST",
			url : '../writeToJSON.php',
			data : { edit : payload }
		})
		.done(function(data_d) {
			$('#success').show('quick');
			$('#edit-entry textarea').addClass('box-success') 
			setTimeout(function() {
				$('#success').hide('quick');
				$('#edit-entry textarea').removeClass('box-success');
			},1500);
		})
	}

	function makeEntry (entry) {
		var article = '<article id=' + entry.date + '><span class="underline">' + entry.date + '</span><section>' + entry.content + '</section></article>';
		return article;
	}

	function countObject( object ) {
	    var length = 0;
	    for( var key in object ) {
	        if( object.hasOwnProperty(key) ) {
	            ++length;
	        }
	    }
	    return length;
	};

	function pageHighlight () {
		var url =  document.URL;
    	if(url.indexOf('new') != -1) { document.querySelector('.new-nav').classList.add('nav-highlight') }
   	 	else if(url.indexOf('edit') != -1) { document.querySelector('.edit-nav').classList.add('nav-highlight') }
   	 	else { document.querySelector('.entries-nav').classList.add('nav-highlight') }
	}