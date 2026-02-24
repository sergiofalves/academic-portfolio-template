# Academic Portfolio Template

A modern, responsive academic portfolio website built with **Next.js**, **Material UI**, and **Framer Motion**. Designed for researchers, academics, and professionals to showcase their projects, publications, and software.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![MUI](https://img.shields.io/badge/MUI-6-007FFF?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📄 **Publications** — Showcase your research papers with details, links, and images
- 🔬 **Projects** — Highlight your research projects with collaborators and related work
- 💻 **Software** — Display your software tools with tech tags and external links
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile
- ♿ **Accessible** — WCAG-compliant design

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/sergiofalves/academic-portfolio-template.git
cd academic-portfolio-template
npm install
```

### 2. Customize Your Data

Edit the JSON files in the `data/` directory:

| File | Content |
|------|---------|
| `data/aboutme.json` | Your name, bio, position, education, social links |
| `data/projects.json` | Your research projects |
| `data/publications.json` | Your publications |
| `data/software.json` | Your software/tools |

### 3. Add Your Assets

Place your media files in the `public/` directory:

```
public/
├── images/
│   ├── profilepic.png        ← Your profile photo
│   └── logo.png              ← Your site logo
├── documents/                 ← CVs, PDFs
├── projects/
│   └── <project-id>/         ← Images for each project
├── publications/
│   └── <publication-id>/      ← PDFs and images for each publication
└── software/
    └── <software-id>/         ← Screenshots for each software
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.


## 📁 Project Structure

```
├── data/                      ← Your personal data (JSON files)
├── public/                    ← Your media assets
├── src/
│   └── app/
│       ├── Components/        ← Reusable UI components
│       ├── projects/          ← Project detail pages
│       ├── publications/      ← Publication detail pages
│       ├── software/          ← Software detail pages
│       ├── layout.js          ← Root layout
│       ├── page.js            ← Homepage
│       └── theme.jsx          ← MUI theme configuration
├── package.json
└── jsconfig.json
```

## 🎨 Customization

### Theme

Edit `src/app/theme.jsx` to customize colors, typography, and other design tokens.

### Components

All components are in `src/app/Components/`. Each component is self-contained and can be modified independently.

## 📝 License

This project is licensed under the MIT License — feel free to use it for your own portfolio!

## 🙏 Credits

Built by [Sérgio Alves](https://github.com/sergiofalves). If you find this template useful, consider giving it a ⭐!
