/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone',
  'models/tag'
], function (Backbone, TagModel) {

  var TagCollection = Backbone.Collection.extend({
    url: '/api/tags',
    model: TagModel
  });

  return TagCollection;

});