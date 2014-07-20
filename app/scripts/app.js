var HomeView = Backbone.View.extend ({
	className : 'home',
		initialize:function(){
			console.log('Welcome to Petviner!');
		},

		render: function () {
				var source = $('#home-template').html();
				// var template = Handlebars.compile(source);
				// var rendered = template();
				this.$el.html(source);
				console.log('Home page rendered');
				return this;


}
});

var homeView = new HomeView();

// Launch home page

$(function () {
	'use strict';

		$('.container').html(homeView.render().$el);

});
