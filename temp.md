Element Attributes
==================

Getting and Setting Attributes
------------------------------

Let's look again at a simple paragraph element:

```bash
> let p = document.querySelector('p');
> p;
= <p class="intro" id="simple">...</p>

```

We can access the attributes of an Element using these methods:

| Method | Description | Returns |
| --- | --- | --- |
| `getAttribute(name)` | Retrieve value of attribute `name` | Value of attribute as string |
| `setAttribute(name, newValue)` | Set value of attribute `name` to `newValue` | `undefined` |
| `hasAttribute(name)` | Check whether element has attribute `name` | `true` or `false` |

```bash
> p.hasAttribute('class');
= true
> p.getAttribute('class');
= "intro"
> p.getAttribute('id');
= "simple"
> p.setAttribute('id', 'complex');
> p
= <p class="intro" id="complex">...</p>

```

When using `setAttribute` please take note of this [warning from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#Notes)

> Using `setAttribute` to modify certain attributes, most notably `value` in XUL, works inconsistently, as the attribute specifies the default value. To access or modify the current values, you should use the properties. For example, use `Element.value` instead of `Element.setAttribute`.

Attribute Properties
--------------------

`getAttribute` and `setAttribute` work for *all* attributes, but you can access some attributes another way. The DOM exposes these special attributes as properties of the Element: `id`, `name`, `title`, and `value`. You can fetch the value for one of these properties or set it to a new value using standard property access and assignment operations:

```bash
> p;
= <p class="intro" id="simple">...</p>
> p.id
= "simple"
> p.id = 'complex'
> p;
= <p class="intro" id="complex">...</p>

```

Not every Element type has these properties: the `name` and `value` attributes, in particular, are invalid on most elements.

The `class` attribute is similar, but uses the `className` property since `class` is a JavaScript reserved word:

```bash
> p.className;
= "intro"
> p.className = 'outro';

```

classList
---------

Working with the `class` attribute via `className` is inconvenient when elements have more than one class. *This is common* in some applications. Consider the following HTML:

```bash
<button class="btn btn-lg btn-primary">Proceed</button>

```

If we have a reference to the DOM node for this `button`, we can get the list of classes for the `button`:

```bash
> button.className;
= "btn btn-lg btn-primary"

```

Since the value is a space-delimited set of names, interacting with `className` can be clumsy. Let's say we need to replace `btn-primary` with `btn-disabled`. To do this, we must get the string from `className`, use `replace` to change it, and then use the result to set a new value for `button.className`:

```bash
> let newClass = button.className.replace('btn-primary', 'btn-disabled');
> button.className = newClass;
= "btn btn-lg btn-disabled"
> button;
= <button class="btn btn-lg btn-disabled">...</button>

```

As another example, consider how we determine whether the `button` belongs to the `btn` class? Keep in mind that `class` may contain class names in any order. To make this determination, you must split `className`'s value using spaces as a delimiter, then search the array to see whether it contains the string `btn`. You can do this, but it's tedious for something you will need to do fairly often.

Modern browsers provide a better way with the `classList` property. `classList` references a special array-like `DOMTokenList` object that has these properties and methods:

| Name | Description |
| --- | --- |
| `add(name)` | Add class `name` to element |
| `remove(name)` | Remove class `name` from element |
| `toggle(name)` | Add class `name` to element if it doesn't exist, remove if it does exist |
| `contains(name)` | Return `true` or `false` depending on whether element has class `name` |
| `length` | The number of classes to which element belongs |

style
-----

Element nodes also have a `style` attribute that has some special behavior. The `style` attribute on an Element references a `CSSStyleDeclaration` Object:

```bash
> let h1 = document.querySelector('h1');
> h1.style;
= CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", ...}

```

You can use the `style` attribute to alter any CSS property. For example, you can change the color of a heading to `red`:

```bash
> h1.style.color = 'red';

```

To remove a CSS property, set the property to `null` with the `style` property:

```bash
> h1.style.color = null;

```

When a CSS property's name contains dashes, you must use a camelCased version of the name to access that property. For example, to set a value for the `line-height` attribute, you assign a value to the `lineHeight` property:

```bash
> h1.style.lineHeight = '3em';

```

Most applications don't use the `style` property often; it's easier and more manageable to use classes in your stylesheet to alter the characteristics of your elements. You can add or remove CSS class names to or from any DOM Element.