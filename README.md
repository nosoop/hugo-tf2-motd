# Team Fortress 2 MOTD Theme for Hugo

A [Hugo][hugo] theme to be used in generating message of the day pages for Team Fortress 2.
Supports inline page transitions, scrolling overflow (default scrollbar), and scaling
layouts.

Leverages the [pure.css framework][pure.css] and jQuery.

Background chalkboard resource from [the Special Attack community's how-to][how-to], slightly
modified and optimized for size.

[hugo]: https://gohugo.io/
[pure.css]: http://purecss.io/
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

Standard unit of measurement for font sizes is `vmin` (integer percentage representing the
minimum of either viewport width or viewport height), allowing text to scale appropriately with
window size.

### Inline page loading

Any `.motd-link` navigation buttons in the `<footer>` will load the next page's `#main-content`
and `#motd-buttons` elements, replacing the existing ones without a full page load.
It uses `.append()` instead of `.load()`, so inline scripts will be executed.

## Options

### Responsive grid system

By default, Pure.css' responsive grid system is included.  If you happen to not need grid
capabilities, you can save up to 8KB by setting `grids` to `false` in your site-level
configuration.

### Localizations

In case l11n was your kind of thing.  With the [Dynamic MOTD plugin][pl-motd] or similar, you
can send chalkboard in a user's preferred language.  Follow along with [creating a
multilingual site][hugo-ml] if you plan on doing so.

Or you can just have the chalkboard localized for your region.  Not everyone can be a polyglot.

Currently supported locales:

* English: `en-US`
* Spanish: `es`

[pl-motd]: https://forums.alliedmods.net/showthread.php?t=147193
[hugo-ml]: https://gohugo.io/tutorials/create-a-multilingual-site/

### Alternative references

If you're not into letting CDNs handle your stylesheets for whatever reason,
you can specify alternate references to resources as variables in your configuration file:

* `purecss_ref`:  The main Pure.css stylesheet.  Provided you're using grids, just the base
stylesheet and the base grid stylesheet is required.  (Default is CloudFlare.)
* `purecss_grids_ref`:  The Pure.css responsive grid stylesheet. (Default is CloudFlare.)
* `purecss_oldgrids_ref`:  The Pure.css old-IE responsive grid stylesheet.
(Defaults to unPKG.)
* `jquery_ref`:  The jQuery script.  Defaults to jQuery's CDN.
