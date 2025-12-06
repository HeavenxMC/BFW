# BLACK FEATHER - Admin Panel Guide

## ⚠️ Important Note

**There is NO separate admin panel interface.** Instead, you have something better: a **single configuration file** that controls your entire website.

This approach is:
- ✅ Faster and more direct
- ✅ No login required
- ✅ No database needed for content
- ✅ Version controllable (track changes)
- ✅ Easy to backup

## 📝 How to Edit Your Website Content

### Your "Admin Panel" is:
**File:** `/app/frontend/src/config.js`

This ONE file controls 100% of your website content.

## 🔧 Step-by-Step: How to Make Changes

### 1. Open the Config File

Using the file viewer or editor, open:
```
/app/frontend/src/config.js
```

### 2. Make Your Changes

The file is organized in sections. Here are common tasks:

#### Change Gang Name or Tagline
```javascript
gangName: "BLACK FEATHER",  // ← Change this
tagline: "Rise Silent. Strike Loud. Rule the Shadows.",  // ← Change this
```

#### Update Discord Link
```javascript
discord: {
  label: "Discord Server",
  link: "https://discord.gg/YOUR-ACTUAL-INVITE",  // ← Change this
},
```

#### Add/Remove Roster Members
```javascript
{
  id: "shadowhands",
  name: "Shadowhands",
  rank: 4,
  description: "Operational Force",
  expandable: true,
  members: [
    { name: "Operative 1", since: "Mar 2024" },
    { name: "Operative 2", since: "Apr 2024" },
    { name: "NEW MEMBER NAME", since: "Dec 2024" },  // ← Add like this
  ],
}
```

#### Add New Rules
```javascript
{
  id: "discipline",
  title: "Discipline & Consequences",
  icon: "alert-triangle",
  rules: [
    {
      title: "Your New Rule Title",  // ← Add new rule
      description: "Your rule description here",
    },
  ],
}
```

#### Update Social Media Links
```javascript
socials: [
  {
    platform: "Instagram",
    link: "https://instagram.com/your-actual-handle",  // ← Change
    username: "@blackfeather",  // ← Change
  },
  {
    platform: "TikTok",
    link: "https://tiktok.com/@your-actual-handle",  // ← Change
    username: "@blackfeather",  // ← Change
  },
]
```

#### Change Colors
```javascript
colors: {
  primaryBlack: "#0a0a0a",      // ← Change any color
  deepGrey: "#2a2a2a",
  royalPurple: "#6b21a8",
  electricYellow: "#facc15",
  softGreyHighlight: "#4b5563",
}
```

### 3. Save the File

After making changes, save the file. The website will automatically reload with your changes (hot reload is enabled).

## 🖼️ How to Upload Images

### Step 1: Upload to Public Folder

Place your images in:
```
/app/frontend/public/
```

Example structure:
```
/app/frontend/public/
├── logo.png
├── hero-bg.jpg
├── ranks/
│   ├── regent.png
│   ├── talon.png
│   └── council.png
```

### Step 2: Update Config

In `config.js`, update the image paths:
```javascript
images: {
  logo: "/logo.png",  // ← Must match filename in public folder
  heroBackground: "/hero-bg.jpg",
  rankIcons: {
    ravenRegent: "/ranks/regent.png",
    blackTalon: "/ranks/talon.png",
  },
}
```

## 📋 Common Admin Tasks

### 1. Change Landing Page Tagline
File: `config.js`
Line: ~16
```javascript
tagline: "Rise Silent. Strike Loud. Rule the Shadows.",  // ← Edit here
```

### 2. Update Discord Invite
File: `config.js`
Line: ~58
```javascript
primaryButton: {
  text: "Join Discord",
  link: "https://discord.gg/yourlink",  // ← Edit here
}
```

### 3. Add New Rank to Roster
File: `config.js`
Line: ~160-220
Add a new object to the `ranks` array:
```javascript
{
  id: "new-rank",
  name: "New Rank Name",
  rank: 6,
  description: "Description",
  expandable: true,
  members: [
    { name: "Member 1", since: "Dec 2024" },
  ],
}
```

### 4. Edit Join Requirements
File: `config.js`
Line: ~230-260
```javascript
requirements: [
  {
    title: "Age Requirement",
    description: "Must be 16+ years old",  // ← Edit or add more
  },
]
```

### 5. Change Contact Form Fields
File: `config.js`
Line: ~300-350
```javascript
formFields: [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "John Doe",
  },
  // Add more fields...
]
```

## 🎯 What Can You Control?

### Everything!
- ✅ Gang name and tagline
- ✅ All text content on every page
- ✅ Colors and theme
- ✅ Navigation menu items
- ✅ Rules and categories
- ✅ Roster ranks and members
- ✅ Join requirements
- ✅ Social media links
- ✅ Contact form fields
- ✅ Images and logos
- ✅ Buttons and CTAs

## 🚫 You Cannot Change (Without Code Changes)

- Page layouts (requires editing React components)
- Animations (requires editing CSS)
- Navigation structure (requires editing React Router)
- Form submission logic (requires editing Contact.jsx)

## 🔄 When Changes Appear

**Instant:** Most changes to `config.js` appear immediately (hot reload).

**Requires Refresh:** Sometimes you may need to refresh the browser.

**Never Requires Restart:** The server doesn't need restarting for config changes.

## 💡 Pro Tips

1. **Backup before editing**: Copy `config.js` before making big changes
2. **Use find/replace**: If changing something multiple times (like a name)
3. **Check syntax**: Make sure commas and brackets match
4. **Test after changes**: Check the website after each major edit

## 🆘 If Something Breaks

1. Check the browser console for errors (F12)
2. Look for missing commas or brackets in `config.js`
3. Revert to your backup
4. Check frontend logs: `tail -n 50 /var/log/supervisor/frontend.err.log`

## 📊 Current Configuration

Your config file currently has:
- 6 navigation items
- 4 rule categories
- 5 roster ranks
- 6 join requirements
- 5 application steps
- 3 social media platforms
- 5 contact form fields

## 🎨 Visual Admin Panel (Optional)

If you want a visual admin panel with a UI, you would need to:
1. Build a separate admin interface (React app)
2. Create backend APIs to read/write config
3. Add authentication
4. Store content in MongoDB

**Current approach is simpler and faster for your use case.**

## ✅ Summary

Your "admin panel" = `/app/frontend/src/config.js`

**To edit content:**
1. Open `/app/frontend/src/config.js`
2. Find the section you want to edit
3. Change the values
4. Save
5. Website updates automatically!

**No login. No complexity. Just edit and save.**
