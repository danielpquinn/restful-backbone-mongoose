/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone',
  'views/listframeworksview',
  'views/listtagsview',
  'views/addframeworkview',
  'views/addtagview',
  'views/updateframeworkview'
], function (Backbone, ListFrameworksView, ListTagsView, AddFrameworkView, AddTagView, UpdateFrameworkView) {

  var listFrameworksView = new ListFrameworksView(),
    listTagsView = new ListTagsView(),
    addFrameworkView = new AddFrameworkView(),
    addTagView = new AddTagView(),
    updateFrameworkView = new UpdateFrameworkView();

  var Router = Backbone.Router.extend({
    routes: {
      'update/:id': 'update',
      '*actions': 'index'
    },
    initialize: function () {
      listFrameworksView.render();
      listTagsView.render();
      addFrameworkView.render();
      addTagView.render();
    },
    index: function () {
      updateFrameworkView.hide();
    },
    update: function (id) {
      updateFrameworkView.render(id);
    }
  });

  return Router;

});