/*
 * Grunt Task File
 * ---------------
 *
 * Task: Handlebars 
 * Description: Compile handlebars templates to JST file
 * Dependencies: None
 *
 */

task.registerBasicTask("handlebars",
  "Compile underscore templates to JST file", function(data, name) {

  // If namespace is specified use that, otherwise fallback
  var namespace = config("meta.handlebars.namespace") || "JST";

  // Create JST file.
  var files = file.expand(data);
  file.write(name, task.helper("handlebars", files, namespace));

  // Fail task if errors were logged.
  if (task.hadErrors()) { return false; }

  // Otherwise, print a success message.
  log.writeln("File \"" + name + "\" created.");
});

task.registerHelper("handlebars", function(files, namespace) {
  namespace = "this['" + namespace + "']";

  // Comes out looking like this["JST"] = this["JST"] || {};
  var contents = "(function() {" + namespace + " = " + namespace + 
    " || {};\n\n";

  // Compile the template and get the function source
  contents += files ? files.map(function(filepath) {
    var templateFunction = require("handlebars").precompile(file.read(filepath));

    return namespace + "['" + filepath + "'] = " + templateFunction;
  }).join(";\n\n") : "";

  return contents + "}).call(this);";
});
