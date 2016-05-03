;(function() {
	
	prettyPrint()

	function checkNavBar() {
		//collapse button
		if(!$('.navbar-toggler').is(':visible')) $('#menus').addClass('in')
		else $('#menus').removeClass('in')
	}

	//resize
	$(window).on('resize', checkNavBar)

	checkNavBar()



})()