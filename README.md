# Palette

tl;dr visit [lebenleben.github.io/palette](https://lebenleben.github.io/palette/)

[![](https://raw.githubusercontent.com/LeBenLeBen/palette/master/preview.png)](https://lebenleben.github.io/palette/)

## But why

Web design requires a lot of color shades depending on their use; colorizing texts, backgrounds, borders, shadows, icons and even more when all these get combined together.

I’ve always felt limited with 3 or even 5 shades of a color and it’s only when I read the [Refactoring UI](https://refactoringui.com/) e-book that I realized I just needed more. But creating 9 shades of a color in traditional tools was a time consuming and frustrating experience for me, hence this tool.

The main feature is the ability to easily generate a whole palette of shades from a single color, tweak it and export it.

## Local setup

The application is powered by [Vue.js](https://vuejs.org/) and use the [Vue CLI](https://cli.vuejs.org/).

### Development

```shell
npm start
```

The app will be served on [localhost:3000](http://localhost:3000).

### Build a static version

```shell
npm run build
```

Files are outputed in the `dist` folder.

## Deploy on Github pages

The following command will build a static version of the app and copy it over to the `gh-pages` branch.

```shell
npm run deploy
```

## License

Palette is licensed under the [MIT License](https://github.com/LeBenLeBen/palette/blob/master/LICENCE).