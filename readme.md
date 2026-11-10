# jakupjakupi.com

My portfolio, drawn as a terminal. A static site: React from a CDN, no server.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page: meta tags, icons, and the `<script>` tags |
| `style.css` | All the styles and the colour themes |
| `src/data.js` | All the text: profile, projects, jobs, skills, themes |
| `src/components.jsx` | Small building blocks: icons, links, buttons |
| `src/pages.jsx` | What every command prints |
| `src/App.jsx` | The terminal window itself |
| `app.js` | **Built** from `src/` — the file the browser loads. Don't edit it by hand |
| `assets/` | Project screenshots and the share image |

## Changing the site

```sh
npm install      # once
npm run build    # after every change in src/ — writes app.js
npm start        # look at it on http://localhost:3000
```

Then bump the `?v=` numbers in `index.html` (`app.js`, `style.css`) so browsers drop their cached copies.

To add a project: add it to `projects` in `src/data.js` and put its screenshots in
`assets/projects/<slug>.webp` (1280×800) and `<slug>-640.webp` (640×400).
