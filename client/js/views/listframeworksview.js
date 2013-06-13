/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'app',
  'backbone',
  'text!templates/listframeworks.html'
], function (app, Backbone, template) {

  var ListFrameworksView = Backbone.View.extend({
    el: '#list-frameworks-view',
    template: Handlebars.compile(template),
    events: {
      'click .delete': 'onDelete'
    },
    initialize: function () {
      var that = this;
      console.log('List view initialized');
      app.frameworkCollection.on('change reset destroy add', function () {
        that.render();
      });
    },
    onDelete: function (e) {
      e.preventDefault();
      var id = $(e.currentTarget).data('id');
      app.frameworkCollection.get(id).destroy();
    },
    render: function () {
      this.$el.html(this.template({
        frameworks: app.frameworkCollection.toJSON()
      }));
    }
  });

  return ListFrameworksView;

});