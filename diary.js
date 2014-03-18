	
	$.getJSON( "entries.json", function( data ) {
		var entries = data;
	  	$('.entries-body').html(function() {
	  		var i = 1, entry;
	  		while(entry = entries[i]) {
	  			return makeEntry(entry);
	  			i++
	  		}
	  })
	 });

	function makeEntry (entry) {
		var article = '<article>' + entry.date + '<section>' + entry.content + '</section></article>';
		return article;
	}