/*global console define */
/*jslint sloppy: true, indent: 2 */

define([
  'app',
  'backbone',
  'text!templates/updateframework.html'
], function (app, Backbone, template) {

  var UpdateFrameworkView = Backbone.View.extend({
    el: '#update-framework-view',
    template: Handlebars.compile(template),
    model: {},
    form: {},
    events: {
      'submit form': 'onSubmit'
    },
    initialize: function () {
      var that = this;
      console.log('Update view initialized');
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
        arr = this.$form.serializeArray();
      
      this.model.save(this.arrToObj(arr), {
        wait: true,
        success: function () {
          Backbone.history.navigate('/', true);
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
    render: function (id) {
      var that = this;

      that.model = app.frameworkCollection.get(id);
      that.$el.html(that.template(that.model.toJSON()));
      that.$form = that.$('form');
      that.$('.modal').modal();
      that.$('input:first').focus();
    },
    hide: function () {
      this.resetForm();
      this.$el.find('.modal').modal('hide');
    }
  });

  return UpdateFrameworkView;

});