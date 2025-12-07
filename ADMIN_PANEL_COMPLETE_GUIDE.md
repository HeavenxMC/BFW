# BLACK FEATHER - Complete Admin Panel Guide

## 🔐 Admin Access

### Login Credentials
- **URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `Manan@08`

### Security Features
- Secure token-based authentication
- Protected routes (redirects to login if not authenticated)
- Credentials stored in backend environment variables
- Can be changed in `/app/backend/.env` file

---

## 🎛️ Admin Dashboard Overview

The admin panel provides complete control over every aspect of your website through 8 comprehensive tabs:

### 1. **General Settings**
Edit core website identity and content:

#### Gang Identity
- **Gang Name**: Main site title
- **Tagline**: Site motto/slogan

#### Hero Section (Landing Page)
- **Hero Title**: Large title on homepage
- **Hero Tagline**: Subtitle on homepage
- **Primary Button Text**: Main CTA button text
- **Primary Button Link**: Main CTA button URL
- **Secondary Button Text**: Secondary CTA button text
- **Secondary Button Link**: Secondary CTA button URL

#### About Page
- **Title**: About page heading
- **Description**: Main about text
- **Mission**: Mission statement
- **Core Values**: Edit all 4 value cards (title + description)

---

### 2. **Theme Colors**
Complete color customization for the entire site:

- **Primary Black** (#0a0a0a) - Main background
- **Deep Grey** (#2a2a2a) - Secondary backgrounds
- **Royal Purple** (#6b21a8) - Primary accent
- **Electric Yellow** (#facc15) - Secondary accent
- **Soft Grey Highlight** (#4b5563) - Text highlights
- **Purple Dark** (#581c87) - Dark purple variant
- **Purple Light** (#a855f7) - Light purple variant
- **Yellow Dark** (#eab308) - Dark yellow variant

Each color has:
- Color picker for visual selection
- Text input for manual hex entry
- Live preview of selected color

---

### 3. **Navigation**
Manage website navigation menu:

For each navigation item:
- **Name**: Display text
- **Path**: URL route (e.g., `/about`, `/rules`)
- Add new navigation items
- Remove existing items
- Reorder by editing

---

### 4. **Roster**
Complete roster management system:

#### Page Settings
- **Title**: Roster page heading
- **Subtitle**: Roster page subheading

#### For Each Rank:
- **Rank Name**: Display name
- **Description**: Rank description
- **Rank Number**: Hierarchy number (1-5)
- **Expandable**: Toggle (show/hide members by default)

#### Members Management:
- **Member Name**: Display name
- **Since**: Join date/period
- Add unlimited members
- Remove members
- Add new ranks

---

### 5. **Rules**
Comprehensive rules management:

#### Page Settings
- **Rules Page Title**: Main heading

#### For Each Category:
- **Category Title**: Section name
- **Icon**: Icon identifier (crown, radio, target, alert-triangle)

#### For Each Rule:
- **Rule Title**: Rule heading
- **Description**: Full rule text
- Add/remove rules within categories
- Add/remove entire categories

---

### 6. **Join Requirements**
Manage recruitment information:

#### Page Settings
- **Title**: Join page heading
- **Subtitle**: Join page subheading

#### Requirements Section:
For each requirement:
- **Title**: Requirement name
- **Description**: Requirement details
- Add/remove requirements

#### Application Process:
- Edit each step text
- Add/remove steps
- Reorder process steps

---

### 7. **Images**
Manage all website images:

#### Main Images
- **Logo**: Site logo
- **Hero Background**: Landing page background
- **About Banner**: About page header
- **Rules Banner**: Rules page header
- **Roster Banner**: Roster page header
- **Join Banner**: Join page header
- **Contact Banner**: Contact page header

#### Rank Icons
- **Raven Regent Icon**
- **Black Talon Icon**
- **Nightborne Council Icon**
- **Shadowhands Icon**
- **Featherborn Icon**

**How to Add Images:**
1. Upload image to `/app/frontend/public/` folder
2. Enter path in admin panel (e.g., `/logo.png`)
3. Save changes

---

### 8. **Contact & Socials**
Manage all contact information and social links:

#### Page Settings
- **Title**: Contact page heading
- **Subtitle**: Contact page subheading

#### Discord Settings
- **Discord Label**: Display text
- **Discord Invite Link**: Full Discord URL

#### Server Information
- **Label**: Display text (e.g., "Server")
- **Server Name**: Your GTA V RP server name
- **Server IP**: Connection address

#### Social Media
For each social platform:
- **Platform**: Platform name (Instagram, TikTok, Twitter, etc.)
- **Link**: Full URL
- **Username**: Display username
- Add/remove social platforms

#### Contact Form Fields
For each form field:
- **Field Name (ID)**: Internal identifier
- **Label**: Display label
- **Type**: Input type (text, email, number, textarea)
- **Placeholder**: Placeholder text
- **Required**: Toggle required validation
- Add/remove form fields
- Customize form completely

---

## 💾 Saving Changes

1. Make your edits in any tab
2. Click **"Save Changes"** button (top right)
3. Wait for success message
4. **Reload the website** to see changes

### Important Notes:
- All changes are saved to `/app/frontend/src/config.js`
- Changes apply immediately after reload
- No server restart needed
- All changes persist across sessions

---

## 🔒 Security Best Practices

### Change Admin Credentials:
1. Edit `/app/backend/.env`
2. Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Restart backend: `sudo supervisorctl restart backend`

### Protect Admin Access:
- Don't share credentials
- Use strong password
- Logout when finished
- Change default credentials immediately

---

## 🎯 Quick Edit Guide

### Change Gang Name:
1. Go to **General Settings** tab
2. Edit "Gang Name" field
3. Save changes

### Update Colors:
1. Go to **Theme Colors** tab
2. Use color pickers or enter hex codes
3. Save changes
4. Reload site to see new theme

### Add Roster Member:
1. Go to **Roster** tab
2. Find the rank
3. Click "Add Member" under members list
4. Enter name and date
5. Save changes

### Edit Rules:
1. Go to **Rules** tab
2. Find the category
3. Edit rule title/description
4. Save changes

### Change Discord Link:
1. Go to **Contact & Socials** tab
2. Edit "Discord Invite Link"
3. Save changes

### Update Images:
1. Upload image to `/app/frontend/public/`
2. Go to **Images** tab
3. Enter path (e.g., `/my-logo.png`)
4. Save changes

---

## 📱 Access URLs

- **Admin Login**: `https://your-domain.com/admin/login`
- **Admin Dashboard**: `https://your-domain.com/admin/dashboard`
- **Main Website**: `https://your-domain.com/`

---

## 🐛 Troubleshooting

### Can't Login:
- Verify username is `admin`
- Verify password is `Manan@08`
- Check browser console for errors
- Clear browser cache

### Changes Not Showing:
- Make sure you clicked "Save Changes"
- Reload the page (Ctrl+F5 / Cmd+Shift+R)
- Check browser console for errors
- Verify config.js was updated

### Lost Access:
- Reset credentials in `/app/backend/.env`
- Restart backend: `sudo supervisorctl restart backend`

---

## ✨ What's Editable?

✅ **EVERYTHING on the website can be edited:**

- Gang name and taglines
- All colors (8 color options)
- Navigation menu items
- Hero section content and buttons
- About page content and values
- All rules and categories
- Roster ranks and members
- Join requirements and process
- All images and logos
- Discord and server info
- Social media links
- Contact form fields
- Page titles and subtitles

---

## 🚀 Advanced Features

### Dynamic Navigation:
- Add new pages by creating navigation items
- Remove pages by deleting navigation items
- Custom URLs supported

### Flexible Roster:
- Add unlimited ranks
- Add unlimited members per rank
- Toggle expandable/non-expandable ranks
- Custom hierarchy numbers

### Customizable Forms:
- Add/remove form fields
- Change field types
- Toggle required validation
- Custom placeholders

### Complete Color Control:
- All colors customizable
- Visual color pickers
- Manual hex input
- Instant preview

---

## 📚 Technical Details

### Architecture:
- **Frontend**: React + React Router
- **Backend**: FastAPI (Python)
- **Config Storage**: JavaScript file (`config.js`)
- **Authentication**: Token-based (stored in localStorage)

### Files Modified:
- `/app/backend/server.py` - Admin router registration
- `/app/backend/admin_routes.py` - Authentication logic
- `/app/backend/.env` - Admin credentials
- `/app/frontend/src/App.js` - Admin routes
- `/app/frontend/src/pages/Admin/AdminLogin.jsx` - Login page
- `/app/frontend/src/pages/Admin/AdminDashboard.jsx` - Dashboard
- `/app/frontend/src/config.js` - Website configuration

---

## ✅ Admin Panel Features Checklist

- ✅ Secure login with username/password
- ✅ 8 comprehensive management tabs
- ✅ All website content editable
- ✅ Color customization (8 colors)
- ✅ Image path management
- ✅ Navigation menu editor
- ✅ Roster management system
- ✅ Rules editor with categories
- ✅ Join requirements editor
- ✅ Contact form customizer
- ✅ Social media manager
- ✅ Server info editor
- ✅ Save functionality with feedback
- ✅ Logout functionality
- ✅ Protected routes
- ✅ Responsive design
- ✅ Real-time config updates

---

## 🎉 Your Admin Panel is Complete!

Every aspect of your BLACK FEATHER website is now editable through the admin panel. No coding knowledge required - just login, edit, save, and reload!

**Login and start customizing your gang website now!**

👉 `/admin/login`
