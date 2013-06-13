/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'app',
  'backbone',
  'text!templates/listtags.html'
], function (app, Backbone, template) {

  var ListTagsView = Backbone.View.extend({
    el: '#list-tags-view',
    template: Handlebars.compile(template),
    events: {
      'click .delete': 'onDelete'
    },
    initialize: function () {
      var that = this;
      console.log('List view initialized');
      app.tagCollection.on('change reset destroy add', function () {
        that.render();
      });
    },
    onDelete: function (e) {
      e.preventDefault();
      var id = $(e.currentTarget).data('id');
      app.tagCollection.get(id).destroy();
    },
    onUpdate: function (e) {
      e.preventDefault();
    },
    render: function () {
      this.$el.html(this.template({
        frameworks: app.tagCollection.toJSON()
      }));
    }
  });

  return ListTagsView;

});