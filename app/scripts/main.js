//Build the Model
var Recipe = Backbone.Model.extend ({
  defaults: {
    name: ''
  },
});

//Instantiate the Model
var recipe = new Recipe();

var RecipeCollection = Backbone.Collection.extend ({
  model: Recipe
});

//View for the collection of recipes
var RecipeListView = Backbone.View.extend ({

});

//View for the recipe that you've chosen
var RecipeView = Backbone.View.extend ({

});
