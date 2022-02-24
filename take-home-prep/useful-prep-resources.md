# Simple Handlebars Info w Vanilla JS (No jQuery)
  https://sabe.io/tutorials/getting-started-with-handlebars-js#handlebar-templates

  - For me the key was to use it in a small practice example

# For Troubleshooting Handlebars
  This code snippet to register a helper was real nice when I was trying figure out what was going on!
  ```javascript
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
  ```
  Then just use {{debug}} or {{debug value}} within the Handlebars script in HTML doc.

# Simple MVC Patterned Todo App
  https://www.taniarascia.com/javascript-mvc-todo-app/

  - If you want to implement w Modules instead then you will probably run into CORS errors even when developing locally. If so, then the following simple server was PERFECT!
  https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server

  - For me, just reading through wasn't enough. I needed to actually build it all. Along the way I implemented my own versions of some functions as well. I tried to "make it my own" and that really helped with understanding as well.

# Basic MVC Video explaining the Pattern
  https://www.youtube.com/watch?v=pCvZtjoRq1I

  - I really like the pseudocode walkthrough portion, it brought all the big ideas together in how a program might actually talk to the different parts.