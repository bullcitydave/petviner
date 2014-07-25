var HomeView = Backbone.View.extend ({
	className : 'home',
		initialize:function(){
			console.log('Welcome to Petviner!');
		},

		render: function () {

				var source = $('#home-template').html();
				this.$el.html(source);
				console.log('Home page rendered');
				return this;


}
});



// Launch home page

$(function () {
	'use strict';
console.log(HomeView);
	var homeView = new HomeView();

		$('.container').load("home.html", function() {
			// $('.container').html(homeView.render().$el);

		});
});
