# Portfolio — Mauricio Santos

Static HTML/CSS/JS site. No build step, no framework — works directly in VSCode and deploys as-is.

## Structure

```
/
├── index.html              → Home (hero + featured projects)
├── work.html                → Work (full project grid)
├── about.html                → About
├── contact.html              → Contact
├── work/
│   ├── project-edigipolis.html   → project page (real content)
│   ├── project-armazem.html      → project page (needs real content)
│   ├── project-culture.html      → project page (needs real content)
│   └── project-placeholder.html  → duplicate this for each new project
├── css/style.css            → all styles, design tokens at the top
└── js/main.js                → mobile nav toggle
```

## Editing content

- Text: edit directly in each `.html` file.
- Colors/fonts/spacing: edit the `:root` variables and component classes at the top of `css/style.css`.
- Images: currently using placeholder URLs from picsum.photos. Replace the `src="..."` attributes with your own image paths (e.g. create an `/images` folder and use `src="images/project-1.jpg"`).
- New project page: copy `work/project-placeholder.html`, rename it, edit content, then link to it from `work.html` and/or `index.html`.

## Running locally

Just open `index.html` in a browser, or for a local server (recommended, avoids relative-path issues):

```bash
npx serve .
```

## Deploying to GitHub + Vercel

1. Initialize git and push to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Deploy on Vercel:
   - Go to vercel.com → **Add New Project** → import the GitHub repo.
   - Framework preset: **Other** (it's a static site, no build command needed).
   - Output directory: leave blank / root.
   - Deploy.

Every push to `main` will auto-redeploy.

## Notes

- The duotone→color hover effect on project cards only activates on devices with a real mouse (`hover:hover` + `pointer:fine`). On touch devices, images show in full color by default — this is intentional, not a bug.
- Nav collapses to a hamburger menu below 860px width.
