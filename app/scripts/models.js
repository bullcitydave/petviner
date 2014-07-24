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
