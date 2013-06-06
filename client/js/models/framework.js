/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone'
], function (Backbone) {

  var FrameworkModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/frameworks',
    defaults: {
      title: 'Framework name',
      url: 'Framework url'
    },
    validate: function (attrs, options) {
      if (attrs['title'] === '' || attrs['url'] === '') {
        if (options && options.error) {
          options.error(this, 'all fields are required', options);
          return true;
        }
      }
    }
  });

  return FrameworkModel;

});