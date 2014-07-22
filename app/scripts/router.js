var AppRouter = Backbone.Router.extend({
    routes: {


             'cats/:postId'    :     'getVine',
             'cats'            :     'mainList',
             'home'            :     'entry',
             'dogs'            :     'defaultRoute'
             'moksha'          :     'defaultRoute'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;

    app_router.on('route:getVine', function(postId) {
        console.log('Presenting vine ' + postId);
        $('.container').html(vineSingleView.render(postId).$el);
    })

    app_router.on('route:mainList', function() {
        console.log('Presenting video list');
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          $('.container').html(vineListView.render().$el);
      });
    })

    app_router.on('route:dogList', function() {
        console.log('Presenting video list');
        dogCollection.fetch().done(function(){
          console.log(this + ' fetched');
          $('.container').html(dogListView.render().$el);
      });
    })

    app_router.on('route:entry', function() {
        console.log('Going home...');
        $('.container').html(homeView.render().$el);
    })

    app_router.on('route:defaultRoute', function() {
        alert('Sorry, that function is not yet available.')
    })



    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
