var Vine = Backbone.Model.extend ({
      idAttribute: "postId"
});

// var vine = new Vine();

var VineCollection = Backbone.Collection.extend ({
  model: Vine,
  // works ok if data is pulled from here
  // url: 'http://www.mocky.io/v2/53cb43667313bbe4019ef820',

  // receive error: No 'Access-Control-Allow-Origin' header is present on the requested resource
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
