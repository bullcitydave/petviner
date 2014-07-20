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
});

//Instantiate the Collection
var vineCollection = new VineCollection({

});
