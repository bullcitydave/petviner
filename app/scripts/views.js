var VineListView = Backbone.View.extend ({
  className : 'list',
      initialize:function(){

    },

    render: function () {
        this.template = Handlebars.compile($('#vine-list-template').html());
        var rendered = this.template({vineCollection: this.collection.toJSON()});
        this.$el.html(rendered);
        console.log('Collection for',this.collection.tag, 'rendered to page')
        return this;


}
});

var VineSingleView = Backbone.View.extend({

    initialize: function(){
        console.log('Initializing single vine view');

        $('#single').load("single.html");
        $('#list').load("list.html");


      },

    render: function(model){
        this.template = Handlebars.compile($('#vine-single-template').html());
        this.$el.html(this.template(model.toJSON()));
        return this;
    }
});

var vineSingleView = new VineSingleView ({
  className : 'vine-single'
});
