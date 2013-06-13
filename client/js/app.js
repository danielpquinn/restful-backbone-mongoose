/*global console require */
/*jslint sloppy: true, indent: 2 */

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'collections/frameworks',
  'collections/tags',
  'bootstrap',
  'backbone-relational'
], function ($, _, Backbone, Handlebars, FrameworkCollection, TagCollection) {

  'use strict';

  var App = {
    frameworkCollection: new FrameworkCollection(),
    tagCollection: new TagCollection()
  };

  _.extend(App, Backbone.Events);

  return App;

});