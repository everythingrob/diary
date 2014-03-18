	$(document).ready(function() {
		$('#add-entry').bind('submit', newEntry);
		pageHighlight();
		$('#add-entry textarea').click(function() {
			$('.error').hide('quick');
			$('#add-entry textarea').removeClass('box-error');

		})
	})


	function getJSON() {		
		$.getJSON( "entries.json", function( entries ) {
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

	function newEntry(event) {
		event.preventDefault();
		var entry = document.querySelector('#add-entry textarea').value;
		if(entry == "") {
			$('.error').show('quick');
			$('#add-entry textarea').addClass('box-error');
			return false;
		} else { 
			$('#success').show('quick');
			$('#add-entry textarea').addClass('box-success') 
		}
		$.ajax({
			type : "POST",
			url : 'writeToJSON.php',
			data : { data : entry }
		})
		.done(function(data_d) {
			setTimeout(function() {
				$('#success').hide('quick');
				$('#add-entry textarea').removeClass('box-success');
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