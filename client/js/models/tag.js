/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone',
  'backbone-relational'
], function (Backbone) {

  var TagModel = Backbone.RelationalModel.extend({
    idAttribute: '_id',
    urlRoot: '/api/tags',
    defaults: {
      title: 'Tag name'
    },
    validate: function (attrs, options) {
      if (attrs['title'] === '') {
        if (options && options.error) {
          options.error(this, 'all fields are required', options);
          return true;
        }
      }
    }
  });

  return TagModel;

});