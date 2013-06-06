/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone',
  'views/listview',
  'views/addview',
  'views/updateview'
], function (Backbone, ListView, AddView, UpdateView) {

  var listView = new ListView(),
    addView = new AddView(),
    updateView = new UpdateView();

  var Router = Backbone.Router.extend({
    routes: {
      'update/:id': 'update',
      '*actions': 'index'
    },
    initialize: function () {
      listView.render();
      addView.render();
    },
    index: function () {
      updateView.hide();
    },
    update: function (id) {
      updateView.render(id);
    }
  });

  return Router;

});