Basics to Using Handlebars
===========================

## 1. Create the Handlebars script template in HTML

```HTML
<script id='form-template' type='text/x-handlebars'>
  
</script>
```

## 2. Write in the markup you want to be in the template
Within the markup use `{{var}}` to denote dynamic values you want to insert into your markup. In the example below the `formTitle` variable and the `formId` will be inserted at some future point by Handlebars.
```HTML
<script id='form-template' type='text/x-handlebars'>
  <h1>{{formTitle}} {{formId}}</h1>
  <form>
    <ul>
      <li>
        <label for="email">E-mail:</label>
        <input type="email" id="form {{formId}} email" name="email">
      </li>
      <li>
        <button type='submit' id="form {{formId}} submit">Submit</button>
      </li>
    </ul>
  </form>
</script>
```

## 3. Within the JS file, get the content of the template node
It doesn't matter how you do it, see below. Just access the node, then get its
content in string format.
```javascript
const formContent = document.querySelector('#form-template').innerHTML;
console.log(formContent); //logs the string of all the HTML markup inside the handlebars template tag

const formContent2 = document.querySelector('#form-template').textContent;
console.log(formContent2); //logs the same exact thing
```

## 4. Pass the String HTML content to Handlebars to compile into a function

```javascript
const formContent = document.querySelector('#form-template').innerHTML;

const formTemplate = Handlebars.compile(formContent);
```
But wait! It's not ready yet, we still need to get our data to Handlebars so it can finalize our HTML. At this point `formTemplate` is a function which we can use to do that.

## 5. Pass our data to the template (which is now a function)
As we can see from the following log, Handlebars returns to us a function.
```javascript
console.log(typeof formTemplate); // logs 'function'
```
We can then pass in our data as an object for the template function to use to produce our finalized HTML. The key is that the template function will only look for property names that match the `{{var}}` names specified originally in the HTML file within the script template. So for our purposes here we need an object as follows:
```javascript
const formDynamicValues = {
  formTitle: 'Handlebars Form',
  formId: 1,
}
```
So we pass this object to our function...
```javascript
const formHTML = formTemplate(formDynamicValues);
```
And it returns to us the finalized string HTML but _with_ our dynamic values inserted.
We can now use this directly with setting the `.innerHTML` property of an element on our page.

```javascript
document.querySelector('#all-forms-container').innerHTML += formHTML;
```
Now that HTML has been inserted in the DOM.


Precompilation
==================

As we have seen, the first thing Handlebars does is to compile the template into a function. This is one of the most expensive operations to perform on the client. We can improve the performance of the application if we precompile `templateScript` and then send the compiled version to the client. In that case, the only task needed to be performed on the client will be the execution of that function. Since the precompiled file is a script, we can load the script in HTML as a normal file. Let's see how all this stuff can be done.

Firstly, you have to install Handlebars globally by using `npm install handlebars -g`. Please, be sure that different templates are written in separate files with different file names and with the `.handlebars` extensions (for example `demo.handlebars`). There is no need of using the `<script>` tag inside those files.

```handlebars
<div>
  My name is {{name}}. I am a {{occupation}}.
</div>
```

Now store all the template files in a single folder named `templates`. You can use any folder name you wish but if you do that, please don't forget to change the following command accordingly. So, open the terminal and execute the command:

```bash
handlebars path/to/templates -f templatesCompiled.js
```

This command will generate a file named `templatesCompiled.js` that contains all the compiled templates. The compiler will insert the templates in `Handlebars.templates`. If the input file is `demo.handlebars`, then it will be inserted at `Handlebars.templates.demo`

Now we have to include `templatesCompiled.js` in the HTML file as a normal `script`. It's important to note that we don't need to load the whole Handlebars library as the compiler itself is not needed anymore. We can use the smaller "runtime" build instead:

```HTML
<script src="handlebars.runtime.js"></script>
<script src="path/to/templatesCompiled.js"></script>
```

Now we can employ the template that was originally present in `demo.handlebars` by using the following code:

```javascript
var context = {
  "name" : "Ritesh Kumar",
  "occupation" : "developer"
}

var templateScript = Handlebars.templates.demo(context);

$(document.body).append(templateScript);
```

The final output will be the following:

```HTML
My name is Ritesh Kumar. I am a developer.
```

This method will significantly increase the performance of the application and the page loading time also decreases as we are using the runtime build of Handlebars that is lighter than the whole library.

The code of [this whole precompilation demo is available on GitHub](https://github.com/sitepoint-editors/handlebars-precompilation-demo).