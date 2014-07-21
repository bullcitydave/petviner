var Vine = Backbone.Model.extend ({
      idAttribute: "postId"
});

// var vine = new Vine();

var VineCollection = Backbone.Collection.extend ({
  model: Vine,
  // url: 'http://www.mocky.io/v2/53cb43667313bbe4019ef820',
  url: 'https://api.vineapp.com/timelines/tags/cat',

  parse: function(results) {
      return results.data.records;
  }

// add JSONP get ability use getJSON method
  // sync: function(method, model, options) {
  //           var that = this;
  //               var params = _.extend({
  //                   type: 'GET',
  //
  //                   // jsonpCallback: 'callback', // just added
  //                   url: that.url,
  //                   processData: false
  //               }, options);
  //
  //           return $.ajax(params);
  //       }
});

var vineCollection = new VineCollection();


//
// var dogvineCollection = new VineCollection({
//     url: 'http://www.mocky.io/v2/53ccb3a6b23e01c703bdafec'
// });

//View for the vine collection
var VineListView = Backbone.View.extend ({
  className : 'list',
    initialize:function(){
       var self = this;
       this.collection.fetch(
         {success: function(){
              console.log('Collection ready to be rendered');
          }
       }).done(function(){
          //  self.render();
          console.log(this + ' fetched');
         });
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

var vineCollection = new VineCollection();

var VineSingleView = Backbone.View.extend({

    initialize: function(){
        console.log('Initializing single vine view');
      },

    render: function(id){
        var source = $('#vine-single-template').html();
        var template = Handlebars.compile(source);
        console.log('Attempting to render model id' + id);
        //   var rendered = template({vine: vineCollection.get(id).toJSON()});
        // this.$el.html(rendered);
        var m = vineCollection.get(id);
        this.$el.html(template(m.toJSON()));
        // .done(function(){
          return this;
        // });
        }


});

var vineSingleView = new VineSingleView ({
  className : 'vine-single'
});

var AppRouter = Backbone.Router.extend({
    routes: {


             'cats/:postId'         :     'getVine',

             'cats'               :     'mainList',

             'home'                     :     'entry',

             'moksha'      :     'defaultRoute'


        }
    });






    var app_router = new AppRouter;


    app_router.on('route:getVine', function(postId) {
        console.log('Presenting vine ' + postId);
        $('.container').html(vineSingleView.render(postId).$el);
    })

    app_router.on('route:mainList', function() {
        console.log('Presenting video list');
        $('.container').html(vineListView.render().$el);
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
