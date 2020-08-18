---
date: "2020-08-17"
title: JavaScript default sort() method is for strings
---

<!-- Excerpt Start -->
In JavaScript, `[-6,-4,1].sort() = [-4, -6, 1]`, which is incorrect. The default sort function converts the array into a string and compares string values, which only works for sorting positive numbers.
<!-- Excerpt End -->

To correctly sort positive and negative numbers, pass in a comparator function:

```js
[-6,-4,1].sort(function(a, b) { return a - b; })
```

which returns the (already) sorted array.
