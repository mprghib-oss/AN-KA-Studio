# AN-KA Studio Portfolio

A static, GitHub Pages-ready architecture portfolio built with HTML, CSS and vanilla JavaScript.

## Visual concept

The homepage presents **one project at a time**: metadata on the left and one large, flat 2D architectural photograph on the right. Scroll down to discover the next project.

It intentionally avoids:
- 3D book effects
- vinyl-stack effects
- card grids
- heavy shadows
- rounded UI
- backend/CMS

## Folder structure

```text
AN-KA_Architecture_Portfolio/
├── index.html
├── about.html
├── contact.html
├── project.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── projects.js
├── images/
│   ├── project-01/
│   ├── project-02/
│   └── ...
└── assets/
    └── favicon.svg
```

## Replace project photos

Each project has a `cover` and `gallery` in `js/projects.js`.

Example:

```js
cover: "images/project-01/cover.jpg",
gallery: [
  "images/project-01/01.jpg",
  "images/project-01/02.jpg"
]
```

Put your real JPG/WebP files into the matching folder and change the paths in `projects.js`.

Recommended website image size:
- Long edge: about 2000–3000 px
- JPG/WebP
- Usually under 1–2 MB per image when possible

The first cover is loaded eagerly; gallery images are lazy-loaded.

## Add a new project

1. Create a folder such as `images/project-07/`.
2. Add `cover.jpg`, `01.jpg`, `02.jpg`, etc.
3. Add a new object to the `projects` array in `js/projects.js`.
4. Upload/commit the changed files to GitHub.

## Change studio information

Search the files for:
- `AN-KA`
- `AN-KA STUDIO`
- `hello@yourstudio.com`
- `Indonesia`

Replace them with your real studio information.

## GitHub Pages

1. Create a **public** GitHub repository.
2. Upload the contents of this folder.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`.
7. Save.
8. GitHub will publish the site at a URL similar to:
   `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

This project uses relative paths so it works as a GitHub Pages project site.

## Important limitation of GitHub Pages

GitHub Pages is static hosting. A public website cannot permanently upload a photograph into the GitHub repository by itself.

To change a project image permanently:
- replace the image in the repository, or
- upload the new image to GitHub and commit the change.

No backend is required.

## Local preview

You can simply open `index.html` in a browser for basic viewing. For the most reliable local behavior, use a simple static server such as VS Code Live Server, but no build process is required.

## License

Use and modify this starter as your own portfolio website.
