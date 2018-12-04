# vanilla-router-js

_simple router for your singlepage app_

`vanilla-router-js` is a simple Javascript router for your singlepage application. Try it, it's awesome!

## Installation

This is a [Node.js](https://nodejs.org) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the `npm install` command:

```bash
$ npm install vanilla-router-js
```

Or manually [download]() it.

## Usage

1. Include `vanilla-router-js`

Import

```javascript
import Router from 'vanilla-router-js'
```

Or link `Router.js` in your HTML:

```html
<script src="Router.js"></script>
```

2. Set up your document

Set up your pages with a `class` of `page` and an unique `id` which is used as the path.

```html
<section id="home" class="page">
    <div>I am the home page</div>
</section>

<section id="about" class="page">
    <div>I am the about page</div>
</section>
```

Create an element with a class of `nav-link` and a `data-target` attribute which refers to the page `id`.

```html
<header>
    <a href="#" data-target="home" class="nav-link">Home</a>
    <a href="#" data-target="about" class="nav-link">About</a>
</header>
```

3. Call Router init function

```javascript
Router.init()
```

## Specification

Use custom propperties to modify the Router.

```javascript
Router.init({
    pageClass: 'page',
    linkClass: 'nav-link',
    htmlAttribute: 'data-target',
    pageName: 'Vanilla Router',
    titleSpacer: '||'
})
```

## Animations

```javascript
Router.init({
    pageTransition: '',
    pageTransitionDuration: '1000',
    contentTransition: '',
    contentTransitionDuration: '600'
})
```
