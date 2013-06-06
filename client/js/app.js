/*global console require */
/*jslint sloppy: true, indent: 2 */

define([
  'jquery',
  'backbone',
  'handlebars',
  'collections/frameworks',
  'bootstrap'
], function ($, Backbone, Handlebars, FrameworkCollection) {

  'use strict';

  var App = {
    collection: new FrameworkCollection()
  };

  return App;

});