# ARCA Store - Cool Keyboard Shop

ARCA is a simple online store for fancy mechanical keyboards, custom keycaps, and desk stuff. It's made with just Tailwind CSS v4  and React 18 , no extra UI libraries.

## Live Demo


## How to Run

Just do:

```sh
npm install
npm run dev
```
bash
npm run build 

(Use Tailwind CSS v4.x)

Have fun with the store!

Functionality:
product search and filter by key or names
addtOCart functionality 
toggle buttons dark on light themes 

## Tech Stack

| Tool         | Version |
| ------------ | ------- |
| React        | 18    |
| Vite         | 8       |
| Tailwind CSS | 4       |
| PostCSS      | 8       |

No UI component libraries, no CSS Modules, no external state management.

##Project Structure 

src/
│
├── components/
│   ├── Navbar.jsx
│   ├── ProductListing.jsx
│   ├── ProductDetail.jsx
│   ├── ProductCard.jsx
│   ├── Cart.jsx
│   └── Toast.jsx
│
├── data/
│   └── products.js
│
├── App.jsx
├── main.jsx
└── index.css    

##Design Decisons 

conditional rendering no React router dom 
tailwindcss utlity class
dark and light theme 
use google fonts
unplash images address
