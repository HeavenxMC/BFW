# BLACK FEATHER Gang Website - Complete Guide

## 🎯 What's Been Built

A fully responsive, multi-page website for your GTA V RP gang with:
- ✅ 6 separate pages (Landing, About, Rules, Roster, Join, Contact)
- ✅ Fully dynamic theme system with your color palette (Yellow, Purple, Grey, Black)
- ✅ Dark/Light mode toggle with localStorage
- ✅ Smooth animations and transitions everywhere
- ✅ Expand/collapse functionality for Rules and Roster
- ✅ Dynamic config file controlling ALL content
- ✅ Modern, clean design with Rajdhani + Inter fonts
- ✅ Responsive design for all screen sizes
- ✅ Contact form ready to connect to external services

## 🎨 Your Color Palette

```
Primary Black: #0a0a0a
Deep Grey: #2a2a2a
Royal Purple: #6b21a8
Electric Yellow: #facc15
Soft Grey Highlight: #4b5563
```

## 📁 File Structure

```
/app/frontend/src/
├── config.js              ← MAIN ADMIN CONFIG FILE (edit this!)
├── theme.css              ← CSS variables and theme system
├── App.js                 ← Main app with routing
├── components/
│   ├── Navbar.jsx         ← Navigation with theme toggle
│   ├── Navbar.css
│   ├── Footer.jsx         ← Footer with links
│   └── Footer.css
└── pages/
    ├── Landing.jsx        ← Hero page with tagline
    ├── Landing.css
    ├── About.jsx          ← Gang description and values
    ├── About.css
    ├── Rules.jsx          ← Rules with expand/collapse
    ├── Rules.css
    ├── Roster.jsx         ← Ranks and members
    ├── Roster.css
    ├── Join.jsx           ← Requirements and process
    ├── Join.css
    ├── Contact.jsx        ← Form and socials
    └── Contact.css
```

## 🔧 How to Edit Content

### 1. Edit Main Config File

**File:** `/app/frontend/src/config.js`

This ONE file controls everything:
- Gang name and tagline
- All page content
- Colors (already set to your palette)
- Navigation items
- Rules and categories
- Roster ranks and members
- Join requirements
- Social links
- Form fields

### 2. Example: Update Discord Link

```javascript
// In config.js, find:
discord: {
  label: "Discord Server",
  link: "https://discord.gg/yourlink", // ← Change this
},
```

### 3. Example: Add Roster Members

```javascript
// In config.js, find roster section:
{
  id: "shadowhands",
  name: "Shadowhands",
  rank: 4,
  description: "Operational Force",
  expandable: true, // Make it expandable
  members: [
    { name: "Operative 1", since: "Mar 2024" },
    { name: "Your New Member", since: "Dec 2024" }, // ← Add here
  ],
}
```

### 4. Example: Change Colors

```javascript
// In config.js:
colors: {
  primaryBlack: "#0a0a0a",     // ← Change these
  deepGrey: "#2a2a2a",
  royalPurple: "#6b21a8",
  electricYellow: "#facc15",
  // ... etc
}
```

### 5. Example: Add New Rule Category

```javascript
// In config.js, rules.categories:
{
  id: "new-category",
  title: "New Category Name",
  icon: "crown", // crown, radio, target, alert-triangle
  rules: [
    {
      title: "Rule Title",
      description: "Rule description here",
    },
  ],
}
```

## 🖼️ How to Add Images

### 1. Upload Images to Public Folder

```bash
# Place your images in:
/app/frontend/public/
├── logo.png
├── hero-bg.jpg
├── about-banner.jpg
├── rules-banner.jpg
├── roster-banner.jpg
├── join-banner.jpg
├── contact-banner.jpg
└── ranks/
    ├── regent.png
    ├── talon.png
    ├── council.png
    ├── shadowhands.png
    └── featherborn.png
```

### 2. Update Paths in Config

```javascript
// In config.js:
images: {
  logo: "/logo.png",
  heroBackground: "/hero-bg.jpg",
  // ... etc
}
```

## 🎯 Key Features

### 1. Roster Management
- **Raven Regent & Black Talon**: Non-expandable (show members directly)
- **Other Ranks**: Expandable (click to show members)
- Member count automatically shown
- Controlled via `expandable: true/false` in config

### 2. Rules System
- Collapsible categories
- Smooth animations
- Icons for each category
- Fully dynamic from config

### 3. Theme Toggle
- Dark/Light mode
- Saves preference in localStorage
- Instant switching
- All colors update automatically

### 4. Contact Form
- Dynamic form fields from config
- Ready to connect to backend or external service (FormSpree, Netlify Forms, etc.)
- Validation built-in

## 🚀 Current Status

**Frontend: ✅ COMPLETE**
- All pages working
- Routing functional
- Animations smooth
- Theme system active
- Responsive design ready

**What You Need to Do:**
1. Update `/app/frontend/src/config.js` with your actual content
2. Upload your images to `/app/frontend/public/`
3. Update Discord invite links
4. Update social media URLs
5. Update server info

## 📱 Pages Overview

### 1. Landing Page (/)
- Large feather icon with animation
- Gang name with gradient
- Tagline: "Rise Silent. Strike Loud. Rule the Shadows."
- Two CTA buttons (Join Discord + Requirements)
- Features section with your core values

### 2. About Page (/about)
- Gang description and mission
- 4 core values with icons (Loyalty, Discipline, Silence, Excellence)
- Hover effects on value cards

### 3. Rules Page (/rules)
- 4 collapsible categories:
  - Rank Structure
  - Communication Protocol
  - Operational Standards
  - Discipline & Consequences
- Smooth expand/collapse animations
- All content from your SOP document

### 4. Roster Page (/roster)
- 5 ranks displayed
- Member counts shown
- Expandable ranks (Council, Shadowhands, Featherborn)
- Non-expandable ranks (Regent, Talon)
- Members shown with "Since" dates

### 5. Join Page (/join)
- Requirements checklist (6 requirements)
- Application process (5 steps)
- CTA buttons to Discord and Contact

### 6. Contact Page (/contact)
- Discord invite link
- Server information
- Social media links (Instagram, TikTok, Twitter)
- Application form with 5 fields
- Form fields are dynamic from config

## 🎨 Design Features

- **Fonts**: Rajdhani (headings), Inter (body)
- **Colors**: Yellow/Purple gradient throughout
- **Icons**: Lucide-react (NO emojis)
- **Animations**: Fade-in, slide-in, hover effects
- **Spacing**: Generous whitespace
- **Shadows**: Subtle purple/yellow glows
- **Grid**: Animated background pattern on hero

## 🔄 How to Update

### Add a New Navigation Item

```javascript
// In config.js:
navigation: [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Rules", path: "/rules" },
  { name: "Roster", path: "/roster" },
  { name: "Join", path: "/join" },
  { name: "Contact", path: "/contact" },
  { name: "Gallery", path: "/gallery" }, // ← Add new page
],
```

### Change Tagline

```javascript
// In config.js:
hero: {
  title: "BLACK FEATHER",
  tagline: "Your New Tagline Here", // ← Change this
  // ...
}
```

### Update Social Links

```javascript
// In config.js:
socials: [
  {
    platform: "Instagram",
    link: "https://instagram.com/yourgang", // ← Update
    username: "@blackfeather",
  },
  // Add more...
],
```

## 🎯 Next Steps

1. **Review the website**: Check all pages
2. **Update config.js**: Add your real content
3. **Upload images**: Add your logo, banners, rank icons
4. **Test on mobile**: Responsive design is ready
5. **Connect form**: Link to backend or FormSpree/Netlify Forms

## 📞 Connect External Form Service

The contact form is ready to connect to:
- **FormSpree**: Simple form backend
- **Netlify Forms**: If deploying to Netlify
- **Your own backend**: Can create API endpoint

Example with FormSpree:
```javascript
// In Contact.jsx, update handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  // Handle response...
};
```

## 🎨 Theme Customization

To change the color scheme system-wide, edit `colors` object in `config.js`. The CSS variables will automatically update.

## ✅ What's Working

- ✅ All 6 pages load correctly
- ✅ Navigation with active states
- ✅ Theme toggle (dark/light)
- ✅ Expand/collapse (Rules & Roster)
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Form validation
- ✅ Hover effects
- ✅ Gradient text
- ✅ Custom scrollbar
- ✅ Footer with links

## 🚀 Ready to Deploy

The website is production-ready! Just:
1. Update your content in config.js
2. Add your images
3. Deploy to your hosting (Vercel, Netlify, etc.)

---

**Built with**: React, React Router, Lucide Icons, Custom CSS
**Theme**: Yellow + Purple + Grey + Black
**Fonts**: Rajdhani + Inter (Google Fonts)
