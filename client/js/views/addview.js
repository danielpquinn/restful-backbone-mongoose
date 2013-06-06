/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'app',
  'backbone',
  'models/framework',
  'text!templates/add.html'
], function (app, Backbone, FrameworkModel, template) {

  var AddView = Backbone.View.extend({
    el: '#add-view',
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
        model = new FrameworkModel(that.arrToObj(arr));
      model.save(null, {
        wait: true,
        success: function (model) {
          app.collection.add(model);
          that.$('.control-group').removeClass('error');
          that.$('.help-inline').html('');
          that.$('input').val('');
        },
        error: function (model, error, options) {
          that.$('.control-group').addClass('error');
          that.$('.help-inline').html(error);
        }
      });
    },
    render: function () {
      this.$el.html(Handlebars.compile(template));
      this.$form = this.$('form');
    }
  });

  return AddView;

});