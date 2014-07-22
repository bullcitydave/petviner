var Vine = Backbone.Model.extend ({
      class: 'vine-single',
      idAttribute: 'postId'
    });

var VineCollection = Backbone.Collection.extend ({
    model: Vine,
    url: 'http://protected-harbor-8958.herokuapp.com/api/timelines/tags/cats',
    parse: function(results) {
              return results.data.records;
          },
});


var vineCollection = new VineCollection();

//View for the vine collection
var VineListView = Backbone.View.extend ({
  className : 'list',
    initialize:function(){

    },

    render: function () {
        var source = $('#vine-list-template').html();
        var template = Handlebars.compile(source);
        var rendered = template({vineCollection: this.collection.toJSON()});
        this.$el.html(rendered);
        console.log('Collection rendered to page')
        return this;


}
});

//Instantiate the Vine List view
var vineListView = new VineListView ({
  collection: vineCollection
});

var VineSingleView = Backbone.View.extend({

    initialize: function(){
        console.log('Initializing single vine view');
      },

    render: function(id){
        var source = $('#vine-single-template').html();
        var template = Handlebars.compile(source);
        console.log('Attempting to render model id' + id);
        var m = vineCollection.get(id);
        this.$el.html(template(m.toJSON()));
        return this;
    }
});

var vineSingleView = new VineSingleView ({
  className : 'vine-single'
});

var AppRouter = Backbone.Router.extend({
    routes: {


             'cats/:postId'    :     'getVine',
             'cats'            :     'mainList',
             'home'            :     'entry',
             'dogs'            :     'defaultRoute',
             'moksha'          :     'defaultRoute'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;

    app_router.on('route:getVine', function(postId) {
        console.log('Presenting vine ' + postId);
        $('.container').html(vineSingleView.render(postId).$el);
    })

    app_router.on('route:mainList', function() {
        console.log('Presenting video list');
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          $('.container').html(vineListView.render().$el);
      });
    })

    app_router.on('route:dogList', function() {
        console.log('Presenting video list');
        dogCollection.fetch().done(function(){
          console.log(this + ' fetched');
          $('.container').html(dogListView.render().$el);
      });
    })

    app_router.on('route:entry', function() {
        console.log('Going home...');
        $('.container').html(homeView.render().$el);
    })

    app_router.on('route:defaultRoute', function() {
        alert('Sorry, that function is not yet available.')
    })



    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();

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
