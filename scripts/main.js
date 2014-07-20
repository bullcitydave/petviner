//Build the Model
var Vine = Backbone.Model.extend ({
    defaults: function(){
          return {
              postId: '',
              created: '',
              videoUrl: '',
              username: '',
              permalinkUrl:''
            };
      },
      idAttribute: "postId"
    });



//Instantiate the Model
var vine = new Vine();




var VineCollection = Backbone.Collection.extend ({
  model: Vine,

  // url: 'https://api.vineapp.com/timelines/tags/cat',
url: 'http://www.mocky.io/v2/53cb43667313bbe4019ef820',

  parse: function(results) {
            return results.data.records;
        },

// add JSONP get ability to getJSON method
  sync: function(method, model, options) {
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);

            return $.ajax(params);
        }
});

//Instantiate the Collection
var vineCollection = new VineCollection({

});

//View for our vine collection
var VineListView = Backbone.View.extend ({
  className : 'list',
    initialize:function(){
       var self = this;
       this.collection.fetch({
         success: function(){
              console.log('Yay!');
              console.log(this.collection);
          }
       }).done(function(){
           self.render();
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

             '*actions'      :     'defaultRoute'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;


    app_router.on('route:getVine', function(postId) {
        console.log('Getting vine ' + postId);
        $('.container').html(vineSingleView.render(postId).$el);
    })

    app_router.on('route:mainList', function() {
        console.log('Returning to video list');
        $('.container').html(vineListView.render().$el);
    })

    app_router.on('route:entry', function() {
        console.log('Going home...');
        $('.container').replaceWith($('.vine-choices'));
    })





    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();

$(function () {
	'use strict';

	  // $('.container').append(vineListView.render().$el);
		// $('.container').html(vineListView.render().$el);
});
