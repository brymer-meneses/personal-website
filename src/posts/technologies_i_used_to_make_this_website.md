---
created: November 16, 2022
title: The Technologies I used to make this Website
tags: computer-science
---

# Introduction

When my Internet Technologies professor, tasked us to create a blog site as our
requirement, I decided to start right away. I have wanted to do this for
so long, even if were on our reading break at that time.

I am of huge fan of minimalistic design, and at the time I was designing this
website, I was inspired by this[site's](https://harrison.totty.dev/)
aesthetic. I knew at that moment, that I would talk about Math, Life or
Programming, and so I needed some way of displaying code blocks and $\LaTeX$
rendering.

# Tech Stack

Doing each blog entry in pure HTML would be very inconvenient and unscalable
for the long run, so I decided to use [markdown](https://en.wikipedia.org/wiki/Markdown), instead. Markdown is a
simple markup language for creating formatted text using a plain-text
editor.

I needed a way to use transpile markdown into HTML, luckily using this [library](https://www.npmjs.com/package/react-markdown),
I was able to easily do it (hooray for open-source!)

With this, I am able to write my article in this manner,

```md
# Some title

the quick brown _fox_ jumped over the lazy **cat**.
```

Which then gets transpiled into HTML that looks like this,

```html
<h1>Some title</h1>
<p>the quick brown <i>fox</i> jumped over the lazy <strong>cat</strong></p>
```

## Why TypeScript?

I have very long time view, with this site, so I wanted to create something robust and maintainable for the long run,
this is why I have decided to use [TypeScript](https://www.typescriptlang.org/) together with [ReactJS](https://reactjs.org/).

TypeScript is a superset of JavaScript, that makes it easy to catch errors. It looks like this,

```tsx
// TypeScript
function double(num: number) {
  return 2 * num;
}
// JavaScript
function double(num) {
  return 2 * num;
}
```

With the help of TypeScript's rich type system, bugs like this can easily be found

```tsx
// ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(double("hi"));
```

Errors like this will silently pass in JavaScript, which is really bad if you think about it.

# Why React?

For this website, I have decided to use ReactJS. In a nutshell, React allows
developers to put HTML inside JavaScript, this let's us code like this,

```tsx
import ReactDOM from "react-dom/client";

function HelloWorld() {
  return <h1> Hello World! </h1>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelloWorld />
);
```

Which is really neat, since this way of coding encourages code reuse, unlike pure HTML and JavaScript.

# What's with the rotating circles on the home page?

You may have noticed the circles rotating on each other to incrementally draw a circle, this is not magic and simply leverages
the Fourier Transform Algorithm. This was a last minute detail, since I realized that I needed something to draw the attention
of the readers upon opening my website.

Though, I have to confess that I have simply followed along in this great [video series](https://www.youtube.com/watch?v=MY4luNgGfms)
by Coding Train, about this topic.

And I think that's about the technologies I used for this website, I hope you enjoyed reading this!
