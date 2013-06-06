/*global console require */
/*jslint sloppy: true, indent: 2 */

require.config({
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/lodash',
    'bootstrap': 'lib/bootstrap',
    'backbone': 'lib/backbone',
    'text': 'lib/text',
    'handlebars': 'lib/handlebars'
  },
  shim: {
    'handlebars': {
      exports: 'Handlebars'
    },
    'backbone': {
      deps: [
        'underscore'
      ],
      exports: 'Backbone'
    },
    'bootstrap': {
      deps: [
        'jquery'
      ]
    }
  }
});

require([
  'app',
  'router'
], function (App, Router) {

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on('click', 'a[href]:not([data-bypass])', function (evt) {
    // Get the absolute anchor href.
    var href = { prop: $(this).prop('href'), attr: $(this).attr('href') },
      // Get the absolute root.
      root = location.protocol + '//' + location.host;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });


  App.router = new Router();

  App.collection.fetch({
    reset: true,
    success: function () {
      Backbone.history.start({pushState: true});
    }
  });

  window.APP = App;

});