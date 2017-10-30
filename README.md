# Team Fortress 2 MOTD Theme for Hugo

A [Hugo][hugo] theme to be used in generating message of the day pages for Team Fortress 2.
Supports inline page transitions, scrolling overflow (with a custom scrollbar), and scaling
layouts.

Uses modern HTML5 and JavaScript.  No library dependencies.

The theme mainly targets a somewhat recent version of Chrome, as that is the web browser engine
that TF2 uses to render pages.

Background chalkboard resource from [the Special Attack community's how-to][how-to], slightly
modified and optimized for size.

[hugo]: https://gohugo.io/
[how-to]: https://www.specialattack.net/content/how-create-tf2-chalkboard-style-motd-html

## Usage

Add the following into your `config.toml` (see the *Localizations* section below for other
supported locales):

```
[params]
	locale = "en-US"
```

Then, manage the files so that they're inserted in the correct order.
It should be sufficient to number the files, and to not give them page titles (since users
won't see them in-game anyways).

Something like the following should be acceptable:

```
root/
└ content/
  ├ 01_intro.html
  ├ 02_rules.md
  ├ 03_more_rules.md
  └ 04_features.md
```

The theme's default index page will redirect users to your first page.

No metadata is rendered in addition to the content; feel free to style it inline however you'd
like.

### Styling

Preferred unit of measurement for font sizes is `vmin` (integer percentage representing the
minimum of either viewport width or viewport height), allowing text to scale appropriately with
window size.

You can use `<style>` tags inline; they should render just fine.

### Inline page loading

Any `.motd-link` navigation buttons in the `<footer>` will load the next page's `#main-content`
and `#motd-buttons` elements, replacing the existing ones without a full page load.
It uses `fetch()` and `DOMParser` to grab content, and inline scripts will be `eval()`'d.

### Scripting

Because of inline script functionality, you may run into trouble attempting to declare variables
with `let`, as it'll be in the same scope between pages.

Either declare your variables with `var` or enclose your inline script into a closure.

```js
(() => {
	/* your code here */
})();
```

### Responsive grid system

Use flexbox.  It's well-supported in browsers now, and more importantly, it's supported in the
embedded web browser that TF2 uses.

As this project used to use Pure.css, here's an example stub for a quick migration from it
(where the existing page has one-third and two-third columns):

```css
.pure-g {
	display: flex;
	flex-flow: wrap;
}

.pure-u-1 { flex: 0 0 100%; }

@media screen and (min-width: 35.5em) {
	.pure-u-sm-1-3 { flex: 0 0 33.3333%; }
	.pure-u-sm-2-3 { flex: 0 0 66.6667%; }
}
```

(Note that dynamically loaded pages' media queries don't really play nicely in Firefox as of
version 55, so navigating back to a page that requires responsive elements doesn't quite work.
See the **Additional header content** section below if you want to embed the CSS in the header
so you can get consistent behavior across browsers.  Works fine in Chrome, though.)

## Options

### Localizations

In case l10n was your kind of thing.  With the [Dynamic MOTD plugin][pl-motd] or similar, you
can send your chalkboard in a user's preferred language.  Follow along with [creating a
multilingual site][hugo-ml] if you plan on doing so.

Or you can just have the chalkboard localized for your region.  Not everyone can be a polyglot.

Currently supported locales:

* English: `en-US`
* Spanish: `es`

[pl-motd]: https://forums.alliedmods.net/showthread.php?t=147193
[hugo-ml]: https://gohugo.io/tutorials/create-a-multilingual-site/

### Additional header content

If you absolutely need something extra in the header, create a `header.html` file in your
project's `layouts/` directory and override the `header_content` block:

```
{{ define "header_content" }}
	<style>
	/* ... */
	</style>
{{ end }}
```
