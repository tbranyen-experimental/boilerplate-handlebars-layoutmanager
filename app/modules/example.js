define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var Example = namespace.module();

  // This will fetch the tutorial template and render it.
  Example.Views.Index = Backbone.View.extend({
    template: "example",

    serialize: function() {
      return { object: "World" };
    }
  });

  // Required, return the module for AMD compliance
  return Example;

});
