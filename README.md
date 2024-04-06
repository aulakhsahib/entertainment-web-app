# Entertainment Web App

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Todo](#todo)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV series
- Search for relevant shows on all pages
- **Bonus**: Build this project as a full-stack application
- **Bonus**: If you're building a full-stack app, we provide authentication screen (sign-up/login) designs if you'd like to create an auth flow

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

If you want more help with writing markdown, we'd recommend checking out
[The Markdown Guide](https://www.markdownguide.org/) to learn more.

### Continued development

Use this section to outline areas that
you want to continue focusing on in future projects. These could be concepts
you're still not completely comfortable with or techniques you found useful that
you want to refine and perfect.

## Todo

1. Auto-Complete Widget (with keyboard Navigation)
2. Skeleton Loading
3. TMDB API Integration
4. React Router Loaders Refactor
5. useFetch
6. Pagination
7. TMDB Documentation
8. What different paths your application will use
9. Create environment variables to store API keys. And sanitize HTML.
10. Learn useReducer and custom hooks.
11. Loading animation when loading a new page.

12. Debouncing State
13. Keyboard Navigation autocomplete
14. Suspense, Error Boundary
15. Dropdown useReducer

## Learn Order

1. Custom Hooks and useFetch and use even more custom hooks if needed.
2. useReducer
3. Pagination
4. TMDB API paths
5. How to integrate TMDB API paths with the React Router

## Paths

1. /
2. /movies
3. /tv
4. /movies/ || /movies/discover/ (useSearchParams)
5. /tv || /tv/discover/ (useSearchParams)
6. /tv/genre/
7. /movies/genre
8. movies/:id
9. tv/:id
10. movies/trending (useSearchParams for pagination)
11. movies/popular
12. movies/nowplaying
13. movies/upcoming
14. movies/toprated
15. tv/trending
16. tv/popular
17. tv/airing
18. tv/onair
19. tv/top

All paths from 10 to 19 will show a same component.

Adding the case of when page is not given in search parameters default to 1.
Add the same for discover when the genre is not given.

## Author

- Website - [Add your name here](https://www.your-site.com)
- LinkedIn - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
