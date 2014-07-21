//View for the vine collection
var VineListView = Backbone.View.extend ({
  className : 'list',
    initialize:function(){
       var self = this;
       this.collection.fetch(
        //  {dataType: "jsonp"},
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
