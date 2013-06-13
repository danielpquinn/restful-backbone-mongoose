/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'app',
  'backbone',
  'handlebars',
  'models/tag',
  'text!templates/addtag.html'
], function (app, Backbone, Handlebars, TagModel, template) {

  var AddTagView = Backbone.View.extend({
    el: '#add-tag-view',
    template: template,
    events: {
      'submit form': 'onSubmit'
    },
    initialize: function () {
      var that = this;
      console.log('Add view initialized');
      that.$form = {};
    },
    arrToObj: function (arr) {
      var obj = {};

      _.each(arr, function (item) {
        obj[item.name] = item.value;
      });
      return obj;
    },
    onSubmit: function (e) {
      e.preventDefault();
      var that = this,
        arr = that.$form.serializeArray(),
        model = new TagModel(that.arrToObj(arr));
      
      model.save(null, {
        wait: true,
        success: function (model) {
          app.tagCollection.add(model);
          that.resetForm();
        },
        error: function (model, error, options) {
          that.$('.control-group').addClass('error');
          that.$('.help-inline').html(error);
        }
      });
    },
    resetForm: function () {
      this.$('.control-group').removeClass('error');
      this.$('.help-inline').html('');
      this.$('input').val('');
    },
    render: function () {
      this.$el.html(Handlebars.compile(template));
      this.$form = this.$('form');
    }
  });

  return AddTagView;

});