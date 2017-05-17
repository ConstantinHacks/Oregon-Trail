pages = ["#page1", "#page2", "#page3", "#page4", "#page5", "#page6"]

$(document).ready(function() {
	for (var i = 1; i < pages.length; i++) {
		$(pages[i]).hide();
	}
	count = 1
	$(document).keypress(function(key) {
		if(key.which == 32) {
			if (count < 6) {
				$(pages[count - 1]).hide();
				$(pages[count]).show();
				count++;
			} else {
				$(location).attr('href', 'proj2.html')
			}
		}
	});
});