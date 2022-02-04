# Prompt
The code below is buggy. The person who created the code expects that nothing will happen when the user clicks on the image. This, however, isn't the case; clicking the image still brings the user to another web page.

Study the code and explain the bug.

```html
<a href="https://www.launchschool.com">
  Home
  <img src="https://d24f1whwu8r3u4.cloudfront.net/assets/launch-logo-b6d01bd15ee9da31457ee3c315845718823aa8a741858be598ab35042a312348.svg" />
</a>
```

```javascript
document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);
```

So with an anchor tag, everything within the tag is connected to a 'click' event because a browser will attempt to follow the link. In this case the string 'Home' as well as the image are both able to be clicked to link to the url provided in the `href`. The person who created the code is thinking that since the 'click' event is attached to the image itself and the containing anchor element will only be hit by the event on the way back up on the bubbling phase. So if you stop the event from continuing in the bubbling phase, the anchor won't link to the url. However, the browser still has default behavior associated with anchor elements and the `.stopPropagation()` call will only stop the event on the capturing/bubbling phase, it won't prevent any of the default behavior from happening. If they want to stop that, the person would instead need to call `event.preventDefault()`.