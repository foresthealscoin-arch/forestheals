# FORESTHEALS IMAGE ASSET INSTALLATION INSTRUCTIONS

## Objective

Install all renamed Forestheals image assets from the provided image folder/ZIP into the repository's main:

```text
public/images/
```

The goal is to make every image available to the website through clean, predictable paths and ensure existing website image references are updated where necessary.

---

# 1. SOURCE ASSETS

The source archive contains two categories:

```text
brand/
products/
```

Use the renamed filenames exactly as provided.

Do **not** rename the files again.

Do **not** change image extensions.

Do **not** compress or resize the images.

Do **not** convert PNG files to JPG/WebP unless explicitly instructed later.

---

# 2. TARGET DIRECTORY

The final repository structure should be:

```text
public/
└── images/
    ├── brand/
    │   ├── prateek-raj-kumawat-founder-ceo-illustration.png
    │   ├── forestheals-made-in-india-kaphi-aura-coffee.png
    │   ├── prateek-raj-kumawat-founder-ceo.png
    │   └── prateek-raj-kumawat-founder-portrait.jpg
    │
    └── products/
        ├── forestheals-premium-pistachios.png
        ├── midifo-office-hustler-coffee.png
        ├── forestheals-gulkand-rose-petals.png
        ├── forestheals-morning-detox.png
        ├── forestheals-sleep.png
        ├── kaphi-coffee-gift-box.png
        ├── forestheals-hydrate.png
        ├── kaphi-aura-coffee-225g.png
        ├── forestheals-premium-raisins.png
        ├── forestheals-calm-your-mind.png
        ├── forestheals-premium-arabica-coffee-granules.png
        ├── kaphi-coffee-creatine-front-benefits.png
        ├── forestheals-premium-almonds.png
        ├── kaphi-aura-coffee-benefits-sachet.png
        ├── kaphi-aura-coffee-why-buy.png
        ├── kaphi-coffee-creatine-lifestyle.png
        ├── forestheals-premium-cashews.png
        └── forestheals-clean-slate-detox-cleanse-kit.png
```

---

# 3. COPY THE ASSETS

First locate the supplied renamed image archive/folder.

Extract it if it is a ZIP.

Then copy:

```text
brand/*
```

into:

```text
public/images/brand/
```

And copy:

```text
products/*
```

into:

```text
public/images/products/
```

Create the destination directories if they do not already exist.

Do not delete unrelated existing assets from `public/images/`.

If a file with the same filename already exists:

1. Compare the files.
2. If they are identical, keep the existing file.
3. If they are different, preserve the new supplied asset and report the replacement.
4. Never silently overwrite unrelated images.

---

# 4. IMPORTANT — DO NOT BREAK EXISTING WEBSITE ASSETS

Before modifying image references, scan the entire repository for existing references to:

```text
/public/images/
```

and:

```text
/images/
```

Also search for:

```text
.png
.jpg
.jpeg
.webp
```

inside:

```text
src/
app/
pages/
components/
public/
```

and any other relevant application directories.

Do not make broad destructive replacements.

---

# 5. UPDATE IMAGE REFERENCES

Where the website is clearly referring to one of these products or brand images, update the reference to the new canonical path.

Use paths such as:

```text
/images/products/forestheals-premium-almonds.png
```

```text
/images/products/forestheals-premium-cashews.png
```

```text
/images/products/forestheals-premium-pistachios.png
```

```text
/images/products/forestheals-premium-raisins.png
```

```text
/images/products/forestheals-gulkand-rose-petals.png
```

```text
/images/products/forestheals-morning-detox.png
```

```text
/images/products/forestheals-sleep.png
```

```text
/images/products/forestheals-hydrate.png
```

```text
/images/products/forestheals-calm-your-mind.png
```

```text
/images/products/forestheals-clean-slate-detox-cleanse-kit.png
```

```text
/images/products/kaphi-aura-coffee-225g.png
```

```text
/images/products/kaphi-aura-coffee-benefits-sachet.png
```

```text
/images/products/kaphi-aura-coffee-why-buy.png
```

```text
/images/products/kaphi-coffee-gift-box.png
```

```text
/images/products/kaphi-coffee-creatine-front-benefits.png
```

```text
/images/products/kaphi-coffee-creatine-lifestyle.png
```

```text
/images/products/forestheals-premium-arabica-coffee-granules.png
```

```text
/images/products/midifo-office-hustler-coffee.png
```

For brand/founder pages:

```text
/images/brand/prateek-raj-kumawat-founder-ceo.png
```

```text
/images/brand/prateek-raj-kumawat-founder-portrait.jpg
```

```text
/images/brand/prateek-raj-kumawat-founder-ceo-illustration.png
```

```text
/images/brand/forestheals-made-in-india-kaphi-aura-coffee.png
```

---

# 6. DO NOT BLINDLY CHANGE PRODUCT DATA

If the website has product objects, database entries, JSON, TypeScript, or CMS-like configuration, do not change product names, prices, descriptions, SKUs, variants, inventory, or pricing simply because an image filename changed.

Only change the image/source field when the relationship is obvious.

Example:

```ts
image: "/images/products/forestheals-premium-almonds.png"
```

is acceptable.

Do not change:

```ts
name
price
description
sku
category
inventory
rating
```

unless explicitly requested.

---

# 7. IMAGE USAGE RULES

Use the appropriate image for the appropriate product.

Do not randomly assign images.

Product images should be used for:

- Product cards
- Product detail pages
- Shop grids
- Featured products
- Related products
- Product recommendations
- Product galleries

Brand images should be used for:

- About page
- Founder section
- Brand story
- Company story
- Made-in-India section
- Founder/CEO section

Do not use a founder portrait as a product image.

Do not use a product package image as a founder image.

---

# 8. ALT TEXT

Where images have an `alt` attribute, use descriptive SEO-friendly alt text.

Examples:

```text
Forestheals Premium Almonds
```

```text
Forestheals Premium Cashews
```

```text
Forestheals Premium Pistachios
```

```text
Forestheals Premium Raisins
```

```text
Forestheals Gulkand Rose Petals
```

```text
Forestheals Morning Detox
```

```text
Forestheals Sleep Wellness Product
```

```text
Forestheals Hydrate Wellness Product
```

```text
Kaphi Aura Coffee 225g
```

```text
Kaphi Aura Coffee Benefits Sachet
```

```text
Kaphi Coffee Creatine
```

```text
Prateek Raj Kumawat Founder and CEO of Forestheals
```

Avoid keyword stuffing.

Do not use:

```text
image.png
photo
product image
IMG_1234
```

unless no meaningful context exists.

---

# 9. NEXT.JS / REACT COMPATIBILITY

If the repository uses Next.js, React, Vite, or another frontend framework, follow the project's existing image conventions.

For static files inside:

```text
public/images/
```

prefer URL paths such as:

```text
/images/products/filename.png
```

Do not incorrectly use:

```text
/public/images/products/filename.png
```

in browser-facing URLs.

If the project already uses `next/image`, preserve that architecture.

Example:

```tsx
<Image
  src="/images/products/forestheals-premium-almonds.png"
  alt="Forestheals Premium Almonds"
  width={800}
  height={800}
/>
```

Do not introduce a new image library just for these assets.

---

# 10. CHECK FOR BROKEN REFERENCES

After installation, search for:

```text
404
```

and inspect all image imports/references.

Run the project's existing validation commands.

Use the commands already defined in:

```text
package.json
```

Prefer existing commands such as:

```bash
npm run lint
npm run build
```

or the equivalent package-manager commands already used by the repository.

Do not install unnecessary dependencies.

---

# 11. VERIFY FILES

Confirm every expected file exists.

Run an equivalent check for:

```text
public/images/brand/
public/images/products/
```

There should be:

### Brand

```text
4 files
```

### Products

```text
18 files
```

### Total

```text
22 image files
```

The archive's `README-IMAGE-MANIFEST.txt` is documentation only and does not need to be copied into `public/images/` unless useful for repository documentation.

---

# 12. FIND DUPLICATES

Check whether the repository already contains duplicate copies of the same image under different filenames.

Do not delete duplicates automatically.

Instead report:

```text
Duplicate/possible duplicate assets found:
- ...
```

Only remove duplicates if explicitly instructed.

---

# 13. FINAL QA

Before finishing, verify:

- [ ] `public/images/brand/` exists
- [ ] `public/images/products/` exists
- [ ] All 22 image assets are present
- [ ] Original image quality is preserved
- [ ] No image was accidentally deleted
- [ ] Product references point to the correct images
- [ ] Founder/brand references point to brand images
- [ ] Alt text is meaningful
- [ ] No `/public/` prefix is used in browser URLs
- [ ] No broken image references remain
- [ ] Existing website functionality still works
- [ ] Build/lint passes using the repository's existing commands

---

# 14. FINAL REPORT

When finished, give a concise report containing:

```text
IMAGE INSTALLATION COMPLETE

Brand images: 4
Product images: 18
Total installed: 22

Updated image references:
[number]

Potential duplicate assets:
[number]

Broken image references:
[number]

Build:
PASS / FAIL

Lint:
PASS / FAIL
```

If anything could not be safely determined, report it instead of guessing.

---

# IMPORTANT EXECUTION PRINCIPLE

This is an asset migration task.

Do not redesign the website.

Do not change the site's visual system.

Do not modify unrelated components.

Do not change product pricing.

Do not change product copy.

Do not change routing.

Do not change the database schema.

Do not install unnecessary packages.

Only:

1. Install the supplied images.
2. Organize them under `public/images/brand` and `public/images/products`.
3. Connect the correct existing website references to the correct images.
4. Add/repair meaningful alt text where appropriate.
5. Verify the application.
6. Report exactly what changed.