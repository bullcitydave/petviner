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
