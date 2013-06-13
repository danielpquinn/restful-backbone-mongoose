/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone',
  'models/tag',
  'backbone-relational'
], function (Backbone, TagModel) {

  var FrameworkModel = Backbone.RelationalModel.extend({
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
    },
    relations: [{
      type: 'HasMany',
      key: 'tags',
      relatedModel: TagModel,
      reverseRelation: {
        key: '_id',
        includeInJSON: '_id'

      }
    }]
  });

  return FrameworkModel;

});