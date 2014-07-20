//Build the Model
var Vine = Backbone.Model.extend ({
    defaults: function(){
          return {
              postID: '',
              created: '',
              videoUrl: '',
              username: '',
              permalinkUrl:''
            };
      }
    })

//Instantiate the Model
var vine = new Vine();




var VineCollection = Backbone.Collection.extend ({
  model: Vine,

//   url: 'https://api.vineapp.com/timelines/tags/cat',
url: 'http://www.mocky.io/v2/53cb43667313bbe4019ef820',

  parse: function(results) {
            return results.data.records;
        },


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







  // url: 'http://api.yummly.com/v1/api/vines?_app_id=2aacde19&_app_key=e8bce795e7a1dc7c96574390c998df81&q=%20chicken+soup',
  // sync: function(method, model, options) {
  //     options.timeout = 10000;
  //     options.dataType = "jsonp";
  //     options.jsonp = "JSONPcallback";
  //     return Backbone.sync(method, model, options);



});

//Instantiate the Collection
var vineCollection = new VineCollection({

});

//View for our vine collection
var VineListView = Backbone.View.extend ({
  className : 'list',
    initialize:function(){
       this.collection.fetch({
         success: function(){
              console.log('Yay!');
              console.log(this.collection);

          }
      })
      // this.render();

    },

    render: function () {
        var source = $('#vine-list-template').html();
        var template = Handlebars.compile(source);
        console.log('Did I make it to render?');
      //   var vinesJSON = $.ajax('http://api.yummly.com/v1/api/vines?_app_id=2aacde19&_app_key=e8bce795e7a1dc7c96574390c998df81&q=%20chicken+soup',{
      //       'async': false,
      //       'global': false,
      //       'dataType': "jsonp",
      //       complete: function(data){
      //           json = data;
      //       }
      // })
      var rendered = template({vineCollection: this.collection.toJSON()});
      // var rendered = template({vineCollection: data.matches});
      this.$el.html(rendered);
      return this;


}
});

//Instantiate the Vine List view
var vineListView = new VineListView ({
  collection: vineCollection
});

//View for the vine that you've chosen
var VineView = Backbone.View.extend ({
});



// $(function () {
// 	'use strict';
// 	// populate our default list view
// 	$('.container').append(vineListView.render().$el);
// });




//
// var j = myGetJSON();
// console.log(j);


$(document).ready(function() {
    $('.list').append(vineListView.render().$el);
    });
