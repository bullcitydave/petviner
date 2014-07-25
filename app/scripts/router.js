var AppRouter = Backbone.Router.extend({
    routes: {


             'cats/:postId'    :     'getVine',
             'mokshadog/:postId'    :     'getVine',
             'dogs/:postId'    :     'getVine',
             'cats'            :     'catList',
             'home'            :     'entry',
             'dogs'            :     'dogList',
             'moksha'          :     'mokshaList'


        }
    });

    // Initiate the router
    var app_router = new AppRouter;

    var vineCollection;

    var vineListView;


    app_router.on('route:getVine', function(postId) {
      var vineSingleView = new VineSingleView;
        console.log('Presenting vine ' + postId);
        var m = vineCollection.get(postId);
        $('.container').html(vineSingleView.render(m).$el);
    })

    app_router.on('route:catList', function() {
        vineCollection = new VineCollection({tag: 'cats'});

        var vineListView = new VineListView ({
          collection: vineCollection
        });

        console.log('Presenting video list for ',vineCollection.tag);
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          Handlebars.registerHelper("tag", function() {
            return vineCollection.tag;
          });
          $('.container').html(vineListView.render().$el);
      });
    })

    app_router.on('route:mokshaList', function() {
        vineCollection = new VineCollection({tag: 'mokshadog'});

        var vineListView = new VineListView ({
          collection: vineCollection
        });

        console.log('Presenting video list');
        vineCollection.fetch().done(function(){
          console.log(this + ' fetched');
          Handlebars.registerHelper("tag", function() {
            return vineCollection.tag;
          });
          $('.container').html(vineListView.render().$el);
      });
    })

    app_router.on('route:dogList', function() {
        vineCollection = new VineCollection({tag: 'dogs'});

          var vineListView = new VineListView ({
            collection: vineCollection
          });

          console.log('Presenting video list');
          vineCollection.fetch().done(function(){
            console.log(this + ' fetched');
            Handlebars.registerHelper("tag", function() {
              return vineCollection.tag;
            });
            $('.container').html(vineListView.render().$el);
        });
    })

    app_router.on('route:entry', function() {
        console.log('Going home...');
        // var homeView = new HomeView();
        // $('.container').html(homeView.render().$el);
        $('.container').load("home.html");
    })

    app_router.on('route:defaultRoute', function() {
        alert('Sorry, that function is not yet available.')
    })



    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
