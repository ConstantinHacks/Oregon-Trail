$(document).ready(function(){
	$(document).keypress(function (e) {
		if (e.keyCode === 32) {
			$(location).attr('href', 'fishing.html')
		}
	});
});