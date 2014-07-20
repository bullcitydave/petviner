var AppRouter = Backbone.Router.extend({
    routes: {


             'videos/:postId'         :     'getVine',

             'home'               :     'mainList',

             '*actions'      :     'defaultRoute'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;


    app_router.on('route:getVine', function(postId) {
        console.log('Getting vine ' + postId);
        $('.container').html(vineSingleView.render(postId).$el);
    })

    app_router.on('route:mainList', function(postId) {
        console.log('Returning to main list');
        $('.container').html(vineListView.render().$el);
    })





    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
