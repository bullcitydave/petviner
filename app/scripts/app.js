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

var homeView = new HomeView();

// Launch home page

$(function () {
	'use strict';

		$('#single').load("single.html");
		$('#list').load("list.html");
		$('#homepage').load("home.html", function() {
			$('.container').html(homeView.render().$el);
			$('h1').lettering();
		});
});
