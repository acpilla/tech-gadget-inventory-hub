# Tech Gadget Inventory Hub

A polished single-page application (SPA) for registering, browsing, and
inspecting tech gadgets. Built as a React + Vite project using Material UI (MUI)
and TanStack Table.

## Tech Stack

- **React 18** with Hooks (`useState`, `useEffect`)
- **Vite** build tooling
- **MUI (Material UI)** component library + theming
- **TanStack Table** (`@tanstack/react-table`) for the registry table
- Client-side pagination, form validation, and dynamic conditional rendering

## Features

- Gadget registration form with real-time inline validation
- Registry table with client-side pagination (5 rows per page)
- Row selection that drives an active gadget profile card
- Filter/toggle by user role (All / Engineer / Tester)
- Responsive, accessible MUI layout with empty states

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
