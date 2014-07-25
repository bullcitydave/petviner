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
        this.$el.html(this.template(model.toJSON()));
        return this;
    }
});

var vineSingleView = new VineSingleView ({
  className : 'vine-single'
});
