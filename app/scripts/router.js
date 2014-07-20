var AppRouter = Backbone.Router.extend({
    routes: {


             'videos/:postId'         :     'getVine',

             'home'               :     'showList',

             '*actions'      :     'defaultRoute'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;


    app_router.on('route:getVine', function(postId) {
        console.log('Getting vine ' + postId);
        $('.vine-single').html(vineSingleView.render(postId).$el);
    })





    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
