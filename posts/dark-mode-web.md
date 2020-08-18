---
date: "2020-08-16"
title: Dark Mode on the Web
---

<!-- Excerpt Start -->
This solution is pretty simple and standard across the web. It reads the user's system color scheme as the page's theme using the CSS `prefers-color-scheme` property, but will also remember the user's override preference in `sessionStorage` using JavaScript. The script is run when the body tag is parsed, preventing the page from flashing with the wrong background color.
<!-- Excerpt End -->

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
    color: rgb(217, 217, 217);
  }
}
body.dark-theme {
  background-color: #000;
  color: rgb(217, 217, 217);
}
body {
  background-color: #fff;
  color: #000;
}
```

The `script` is immediately after the `body` tag opens:

```html
<body>
  <script>
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const userPref = sessionStorage.getItem('theme');
    if(userPref === 'light') {
      document.body.className = '';
    } else if (userPref === 'dark' || prefersDarkScheme.matches) {
      document.body.className = 'dark-theme';
    } else {
      document.body.className = '';
    }

    function toggleTheme() {
      if(document.body.className == '') {
        document.body.className = 'dark-theme';
        sessionStorage.setItem('theme', 'dark')
      } else {
        document.body.className = '';
        sessionStorage.setItem('theme', 'light')
      }
    }
  </script>
```

Note `fill="currentColor"`, which inherits the button's parent `color`. You may need to set the parent's `color: currentColor` to get it passed it down from the body tag.

```html
<button
  id="theme-btn"
  onclick="toggleTheme()"
>
  <svg fill="currentColor" aria-hidden="true" class="svg-icon" width="24" height="24"><path d="M18.925 4.075c4.1 4.1 4.1 10.75 0 14.85s-10.75 4.1-14.85 0-4.1-10.75 0-14.85 10.75-4.1 14.85 0zM17.51 17.51a8.5 8.5 0 000-12.02L5.49 17.51a8.5 8.5 0 0012.02 0z"></path></svg>
</button>
```
