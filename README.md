# Tech Gadget Inventory Hub

A polished single-page application (SPA) for registering, browsing, and
inspecting tech gadgets. Built with **React + Vite**, styled with **Material UI
(MUI)** components + **CSS Modules**, and using **TanStack Table** for the
registry.

🔗 **Live demo:** _add your Vercel URL here_
📦 **Repository:** https://github.com/acpilla/tech-gadget-inventory-hub

## Tech Stack

- **React 18** with Hooks — `useState`, `useEffect`, `useMemo`
- **Vite** build tooling
- **MUI (Material UI)** component library + `ThemeProvider` theming
- **CSS Modules** for scoped layout/spacing styling
- **TanStack Table** (`@tanstack/react-table`) for the registry table
- Client-side pagination, real-time form validation, dynamic conditional rendering

## Styling Approach

Concerns are cleanly separated:

- **MUI components** provide the UI widgets and accessibility.
- **MUI `ThemeProvider`** (`src/theme.js`) sets the global brand palette + typography.
- **CSS Modules** (`*.module.css`) own all layout, spacing, and custom visuals,
  scoped locally so class names never collide.

## Features

- **Registration form** with real-time inline validation (required fields,
  min-length name, numeric 1–100 health rating, user-role radios)
- **Success feedback** via a MUI Snackbar; the form resets on submit
- **Registry table** (TanStack Table) with client-side **pagination — 5 rows per
  page**, Previous/Next controls, a page indicator, and disabled states
- **Row selection** with a visible highlight (mouse + keyboard accessible)
- **Active gadget profile** card — synchronized from the selection via
  `useEffect` — with a role **badge** and a color-coded health bar
- **Role filter** toggle (All / Engineer / Tester) that resets pagination
- **Empty states** for: no registrations yet, no filter matches, no selection

## Gadget Data Model

Each gadget record contains:

| Field                | Notes                                   |
| -------------------- | --------------------------------------- |
| Gadget Name          | Required, min 3 characters              |
| Category             | Smartphone / Laptop / Wearable / Audio  |
| Sub-category / Genre | Required                                |
| Manufacturer         | Required                                |
| Health Rating        | Required, numeric 1–100                 |
| Tech Brand / Company | Required                                |
| User Role            | Engineer / Tester                       |
| id                   | Unique internal identifier              |

## Project Structure

```
src/
  components/
    GadgetForm.jsx          # registration form + validation
    GadgetTable.jsx         # TanStack Table registry + pagination
    GadgetProfile.jsx       # active gadget detail card
    FilterControls.jsx      # role filter toggle
    *.module.css            # scoped styles per component
  App.jsx                   # shared state + layout + useEffect selection sync
  constants.js              # categories, roles, empty form
  validation.js             # form validation rules
  theme.js                  # MUI theme
  main.jsx                  # entry point
```

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in the `dist/` directory.

## Deployment (Vercel)

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
