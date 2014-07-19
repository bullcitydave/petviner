//Build the Model
var Recipe = Backbone.Model.extend ({
  defaults: {
    recipeName: '',
    smallImgUrls: '',
    rating: ''
  },
});

//Instantiate the Model
var recipe = new Recipe();

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
        var recipesJSON = $.ajax('http://api.yummly.com/v1/api/recipes?_app_id=2aacde19&_app_key=e8bce795e7a1dc7c96574390c998df81&q=%20chicken+soup',{
            'async': false,
            'global': false,
            'dataType': "jsonp",
            complete: function(data){
                json = data;
            }
      }).done(function(data) {


        console.log('Returned JSON data...' + recipesJSON);
        var rendered = template({recipeCollection: data.matches});
        // this.$el.html(rendered);
        $('.container').html(rendered);
        return this;
      });
}
});

//Instantiate the Recipe List view
var recipeListView = new RecipeListView ({
  collection: recipeCollection
});

//View for the recipe that you've chosen
var RecipeView = Backbone.View.extend ({
});



// $(function () {
// 	'use strict';
// 	// populate our default list view
// 	$('.container').append(recipeListView.render().$el);
// });




function myGetJSON () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://api.yummly.com/v1/api/recipes?_app_id=2aacde19&_app_key=e8bce795e7a1dc7c96574390c998df81&q=%20chicken+soup",
        'dataType': "jsonp"

    }).done(function(data) {
json = data
    console.log('About to return Json data: ' + json);
    console.log(json);
    return json;
  });
    // console.log(json);
    // return json;
};

//
// var j = myGetJSON();
// console.log(j);
