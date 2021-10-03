# Svelte Inject
[![](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/npm/v/@mibu/svelte-inject.svg)](https://npmjs.org/package/@mibu/svelte-inject)

Svelte action to inject elements into the DOM

- [Installation](#Installation)
- [Why](#Why)
- [Usage](#Usage)

## Installation
```bash
yarn add -D @mibu/svelte-inject
```

```svelte
<script>
	import {inject} from "@mibu/svelte-inject"
</script>
```

## Why
Useful when injectig Svelte into exising code at runtime, e.g. GreaseMonkey userscripts.<br>
<br>
You can already inject Svelte components, but only with one injection point per component:
```ts
new App({
	target: ..., // Insert into target
	anchor: ... // Insert before child of target
});
```
Consider wanting to modify a webiste by adding toggle to the navbar and some toggleable content to an existing content container:
```html
<nav id="navbar">
	<button id="toggle"/> <!-- toggle we want to inject -->
</nav>
<div id="container">
	<div id="content"/> <!-- content we want to inject -->
</div>
```
You would have to create a component for each and then inject them:
```ts
new Toggle({target: document.getElementById("navbar")});
new Content({target: document.getElementById("container")});
```
But now you are outside the domain of the Svelte compiler and its harder to add reactivity. Lets instead create a `App.svelte` component and use the `inject` action:
```svelte
<script>
	import inject from "@mibu/svelte-inject"
	let showContent = false;
</script>

<button use:inject{"#navbar"} on:click={() => showContent = !showContent}/>
<div use:inject{"#container"} class:hidden={showContent}/>
```
Now everything is inside one Svelte component and its also reactive.


## Usage
The `inject` action takes one argument `{<mode>: <target>}`:
- `<mode>`: Where the element will be injected
- `<target>`: Either an HTMLElement or a query selector string

```svelte
<!-- Inject after target -->
<div use:inject={{after: document.getElementById("example")}}>
	...
</div>

<!-- Inject before target -->
<div use:inject={{before: "#example"}}>
	...
</div>

<!-- Append to target -->
<div use:inject={{append: "li.example"}}>
	...
</div>
```

When you pass just the HTMLElement or a query string, the element will be appended:
```svelte
<!-- Append to target -->
<div use:inject={document.getElementById("example")}>
	...
</div>

<!-- Append to target -->
<div use:inject={"button.active"}>
	...
</div>
```

If you don't pass any arguments, the element will be appended to the `body`:
```svelte
<!-- Append to document.body -->
<div use:inject>
	...
</div>
```
