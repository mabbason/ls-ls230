(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['contact'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"contact\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":27},"end":{"line":2,"column":33}}}) : helper)))
    + "\">\n    <h4>"
    + alias4(((helper = (helper = lookupProperty(helpers,"full_name") || (depth0 != null ? lookupProperty(depth0,"full_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"full_name","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":21}}}) : helper)))
    + "</h4>\n    <h5>Phone Number:</h5>\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"phone_number") || (depth0 != null ? lookupProperty(depth0,"phone_number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone_number","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":23}}}) : helper)))
    + "</p>\n    <h5>Email:</h5>\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":7,"column":7},"end":{"line":7,"column":16}}}) : helper)))
    + "</p>\n    <h5>Tags:</h5>\n    <div class=\"tags\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":13,"column":13}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"contactButtons\">\n      <button class=\"contactEditBtn\"><i class=\"fa-regular fa-pen-to-square\"></i>Edit</button>\n      <button class=\"contactDeleteBtn\"><i class=\"fa-regular fa-trash-can\"></i>Delete</button>\n    </div>  \n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":8},"end":{"line":12,"column":17}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<span class=\"tag\">#"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tag") || (depth0 != null ? lookupProperty(depth0,"tag") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tag","hash":{},"data":data,"loc":{"start":{"line":11,"column":41},"end":{"line":11,"column":48}}}) : helper)))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"contacts") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":20,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['editContact'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tags") || (depth0 != null ? lookupProperty(depth0,"tags") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tags","hash":{},"data":data,"loc":{"start":{"line":17,"column":99},"end":{"line":17,"column":107}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul>\n  <li>   \n    <input type=\"hidden\" id=\"contactId\" name=\"id\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":57},"end":{"line":3,"column":63}}}) : helper)))
    + "\">\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" id=\"name\" name=\"full_name\" pattern=\"^(\\w+)\\s(\\w+)$\" placeholder=\"First Last\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"full_name") || (depth0 != null ? lookupProperty(depth0,"full_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"full_name","hash":{},"data":data,"loc":{"start":{"line":5,"column":107},"end":{"line":5,"column":120}}}) : helper)))
    + "\" required title=\"First Last\">\n  </li>\n  <li>\n    <label for=\"email\">E-mail:</label>\n    <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"email@example.com\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":9,"column":87},"end":{"line":9,"column":96}}}) : helper)))
    + "\" required>\n  </li>\n  <li>\n    <label for=\"phone\">Phone Number:</label>\n    <input type=\"tel\" pattern=\"[0-9]{3}-[0-9]{3}-[0-9]{4}\" placeholder=\"123-456-7890\" id=\"phone\" name=\"phone_number\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"phone_number") || (depth0 != null ? lookupProperty(depth0,"phone_number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone_number","hash":{},"data":data,"loc":{"start":{"line":13,"column":124},"end":{"line":13,"column":140}}}) : helper)))
    + "\" title=\"eg. 123-456-7894\">\n  </li>\n  <li>\n    <label for=\"tags\">Tags:</label>\n    <input type=\"text\" placeholder=\"work, friend, VIP...\" id=\"tags\" name=\"tags\" value=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":17,"column":87},"end":{"line":17,"column":122}}})) != null ? stack1 : "")
    + "\" title=\"eg. work, friend, custom...\">\n  </li>\n  <button type=\"submit\" class=\"editContactSubmit contactSubmit\">Submit</button>\n  <button type=\"button\" class=\"cancel\">Cancel</button>\n</ul>";
},"useData":true});
})();