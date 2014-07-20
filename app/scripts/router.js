var AppRouter = Backbone.Router.extend({
    routes: {


             'cats/:postId'         :     'getVine',

             'cats'               :     'mainList',

             'home'                     :     'entry',

             '*actions'      :     'defaultRoute'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;


    app_router.on('route:getVine', function(postId) {
        console.log('Getting vine ' + postId);
        $('.container').html(vineSingleView.render(postId).$el);
    })

    app_router.on('route:mainList', function() {
        console.log('Returning to video list');
        $('.container').html(vineListView.render().$el);
    })

    app_router.on('route:entry', function() {
        console.log('Going home...');
        $('.container').replaceWith($('.vine-choices'));
    })





    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
