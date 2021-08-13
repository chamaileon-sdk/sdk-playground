# Chamaileon SDK Playground
An application to showcase the flexibility of Chamaileon Plugins.

## Updating environment
SDK initialization happens in `src/store/index.js`. You can change the environment in the `initSDK` function.

##  Plugin views
Each view is structured as a standalone project. These are found in `src/components` with a name corresponding to the plugin `(e.g.: HtmlGenerator, EmailEditor, etc.)`. Each folder contains at least 3 separate folders `(components, store, view)` where you can find the corresponding parts of the specific view.

## Invoking plugins
The config object for each plugin can be found in the `src/components/%viewName%/store` folder of each view. These objects are usually processed through functions that map it to and appropriate config object. These functions can be found in `src/store/index.js` as these functions rely on more than 1 module.

**Note:** A config object must be **passed by value** (e.g.: by creating a deep copy) to the plugins, as some of the plugins cause side effects that will modify the store!

## Navigation
The routes are stored in `src/router/index.js`, while the hashes and code matching helpers are stored as part of the menu configuration in `src/components/AppElements/store/menuData.js`

## Hash matching on scroll
An `IntersectionObserver` is used for matching the `hash` with the current submenu while scrolling. It will look for elements with `.section` class and expects these elements to have an `id` as the hash will be the section's id. 

A best practice is to wrap each section into a `SectionObserver` component. For example:

```html
<SectionObserver>
	<div  class="section"  id="hash1"></div>
	<div  class="section"  id="hash2"></div>
	<div  class="section"  id="hash3"></div>
</SectionObserver>
```

**Note:** The component shown above is only responsible for hash matching on scroll, without it the app is fully functional, but it won't react to scrolling! 


## Auto-scrolling to active component

Scrolling to the component selected in the menu is done by `vue-scrollactive`, except for the main menu points (the ones with id `home`). Their scrolling (scrolling to top) is handled manually with the `scrollToTop()` function found in `src/components/AppElements/components/Menu.vue`. 

The reason for it being handled separately is that whenever you click on a `.scrollactive-item`,  `vue-scrollactive` will scroll to that item from the current one even if they have the same position. The default duration for such a scroll is `650ms` which means, if the `#home` compoenents are `.scrollactive-item`s,  the user has to wait `650ms` after a vie change to be able to scroll down.


## Matching code to active component

This matching happens in the Code Editor (`src/components/AppElements/components/CodeEditor.vue`). The matching is done by setting a `watcher` to the current `$route`. When a route change is detected `scrollCode(from, to)` is called and handles the rest.

**Note:** `CodeEditor.vue` strongly depends on the active `$route`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
