/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'backbone',
  'models/framework'
], function (Backbone, FrameworkModel) {

  var FrameworkCollection = Backbone.Collection.extend({
    url: '/api/frameworks',
    model: FrameworkModel
  });

  return FrameworkCollection;

});