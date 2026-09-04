# CoreChem

Production-only source for the CoreChem static website.

- `site/hanbit-materials/` contains the deployable homepage and assets.
- `.github/workflows/pages.yml` publishes that directory to GitHub Pages.
- Research, project notes, Vista documents, and working references stay local and are not tracked here.

Live site: https://muzholiq.github.io/corechem/

## Local preview

From this repository, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/site/hanbit-materials/>.

## Workflow

- Make website changes under `site/hanbit-materials/`.
- Verify the HTML, links, language switching, and responsive layout.
- Commit to `main` and push to `origin` to trigger Pages deployment.
- Use the [Product information issue template](https://github.com/muzholiq/corechem/issues/new?template=product-information.yml) for verified grades, suppliers, and technical documents.
- Do not add unverified contact details, product grades, or supply conditions.
