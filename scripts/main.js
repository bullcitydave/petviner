//Build the Model
var Recipe = Backbone.Model.extend ({
  defaults: {
    recipeName: '',
    smallImgUrls: '',
    rating: ''
  },
});

//Instantiate the Model
var recipe = new Recipe({
  recipeName: 'chicken soup'
});

var RecipeCollection = Backbone.Collection.extend ({
  model: Recipe
});

//Instantiate the Collection
var recipeCollection = new RecipeCollection();

//View for our recipe collection
var RecipeListView = Backbone.View.extend ({

    initialize:function(){
        this.render();
    },

    render: function () {
        var source = $('#recipe-list-template').html();
        var template = Handlebars.compile(source);
        var rendered = template(recipe.toJSON());
        this.$el.html(rendered);
        return this;
    }
});

//Instantiate the Recipe List view
var recipeListView = new RecipeListView ({
  collection: recipeCollection
});

//View for the recipe that you've chosen
var RecipeView = Backbone.View.extend ({

});
