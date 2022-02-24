// Helpful debug helper for Handlebars if needed
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

class View {
  constructor() {
    //This is where all the elements might go in the view
  }
    //This is where all the actions in the view might go
    // Render a template, etc.
}

export default View;