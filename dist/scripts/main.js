var Vine = Backbone.Model.extend ({
      class: 'vine-single',
      idAttribute: 'postId'
    });

var VineCollection = Backbone.Collection.extend ({
    model: Vine,

    initialize: function (options) {
      this.tag = options.tag;
      this.url = 'http://protected-harbor-8958.herokuapp.com/api/timelines/tags/' + this.tag;
    },

    parse: function(results) {
              return results.data.records;
          },
});

//View for the vine collection
var VineListView = Backbone.View.extend ({
  className : 'list',
      initialize:function(){
      this.template = Handlebars.compile($('#vine-list-template').html());
    },

    render: function () {
        var rendered = this.template({vineCollection: this.collection.toJSON()});
        this.$el.html(rendered);
        console.log('Collection for',this.collection.tag, 'rendered to page')
        return this;


}
});




var VineSingleView = Backbone.View.extend({

    initialize: function(){
        console.log('Initializing single vine view');
        this.template = Handlebars.compile($('#vine-single-template').html());
      },

    render: function(model){
        
        // var m = vineCollection.get(id);
        this.$el.html(this.template(model.toJSON()));
        return this;
    }
});

var vineSingleView = new VineSingleView ({
  className : 'vine-single'
});

var AppRouter = Backbone.Router.extend({
    routes: {


             'cats/:postId'    :     'getVine',
             'mokshadog/:postId'    :     'getVine',
             'cats'            :     'catList',
             'home'            :     'entry',
             'dogs'            :     'dogList',
             'moksha'          :     'mokshaList'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;

    var vineCollection;

    var vineListView;



    app_router.on('route:getVine', function(postId) {
      var vineSingleView = new VineSingleView;
        console.log('Presenting vine ' + postId);
        var m = vineCollection.get(postId);
        $('.container').html(vineSingleView.render(m).$el);
    })

    app_router.on('route:catList', function() {
        vineCollection = new VineCollection({tag: 'cats'});

        var vineListView = new VineListView ({
          collection: vineCollection
        });

        console.log('Presenting video list for ',vineCollection.tag);
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          Handlebars.registerHelper("tag", function() {
            return vineCollection.tag;
          });
          $('.container').html(vineListView.render().$el);
      });
    })

    app_router.on('route:mokshaList', function() {
        vineCollection = new VineCollection({tag: 'mokshadog'});

        var vineListView = new VineListView ({
          collection: vineCollection
        });

        console.log('Presenting video list');
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          $('.container').html(vineListView.render().$el);
      });
    })

    app_router.on('route:dogList', function() {
        var vineCollection = new VineCollection({tag: 'dogs'});

        var vineListView = new VineListView ({
          collection: vineCollection
        });

        console.log('Presenting video list');
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          $('.container').html(vineListView.render().$el);
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
