# 🧪 TEST USERS & SYSTEM TESTING GUIDE

## 🔐 Test Login Credentials

Your SoilSmart application uses localStorage-based authentication for demonstration purposes. **Any email and password combination will work!**

However, here are **recommended test users** that match the sample data in the system:

---

## 👥 Sample Test Users

### **User 1: John Kamau (Kenya)** 🇰🇪

```
Email:    john.kamau@example.com
Password: password123
```

**Profile Details:**
- **Name**: John Kamau
- **Location**: Nairobi, Kenya
- **Phone**: +254 712 345 678
- **Farm Size**: 5 hectares
- **Crops**: Maize, Beans
- **Joined**: January 15, 2024

---

### **User 2: Amina Hassan (Tanzania)** 🇹🇿

```
Email:    amina.hassan@example.com
Password: password123
```

**Profile Details:**
- **Name**: Amina Hassan
- **Location**: Dar es Salaam, Tanzania
- **Phone**: +255 765 432 109
- **Farm Size**: 3 hectares
- **Crops**: Rice, Vegetables
- **Joined**: February 10, 2024

---

### **User 3: Emmanuel Nkunda (Rwanda)** 🇷🇼

```
Email:    emmanuel.nkunda@example.com
Password: password123
```

**Profile Details:**
- **Name**: Emmanuel Nkunda
- **Location**: Kigali, Rwanda
- **Phone**: +250 788 123 456
- **Farm Size**: 2 hectares
- **Crops**: Coffee, Tea
- **Joined**: March 5, 2024

---

### **Custom Test User**

You can also create your own account:

```
Email:    test@soilsmart.com
Password: test123
```

Or use **ANY email/password combination** - the system will accept it!

---

## 🧪 COMPLETE TESTING GUIDE

### **Step 1: Access the Live Application**

**Production URL**: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app

---

### **Step 2: Test Landing Page**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/

**What to Test:**
- ✅ Hero section loads with animations
- ✅ Floating icons animate smoothly
- ✅ Statistics display (10K+ farmers, 50% yield, 30% water)
- ✅ Scroll down to see all sections
- ✅ Problem statement cards (3 challenges)
- ✅ Objectives section (4 solutions)
- ✅ Features showcase (6 items)
- ✅ How It Works (4 steps in dark theme)
- ✅ Call-to-action with email form
- ✅ Footer with all links
- ✅ Mobile menu (resize browser)
- ✅ Click "Get Started" button
- ✅ Click "Sign In" button

---

### **Step 3: Test Signup Flow**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/signup

**Test Actions:**
1. Fill in the signup form:
   ```
   Name: Test User
   Email: test@soilsmart.com
   Phone: +250 788 999 888
   Location: Kigali, Rwanda
   Password: test123
   Confirm Password: test123
   ```
2. ✅ Check "I agree to Terms and Conditions"
3. Click **"Create Account"**
4. Watch loading animation
5. Should redirect to **Dashboard** automatically

**What to Test:**
- ✅ Form validation works
- ✅ Password visibility toggle
- ✅ Passwords must match
- ✅ Terms checkbox required
- ✅ Loading state shows
- ✅ Successful redirect to dashboard

---

### **Step 4: Test Login Flow**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/login

**Test Login #1: John Kamau**
```
Email: john.kamau@example.com
Password: password123
```

**Test Login #2: Amina Hassan**
```
Email: amina.hassan@example.com
Password: password123
```

**Test Login #3: Your Custom Account**
```
Email: test@soilsmart.com
Password: test123
```

**What to Test:**
- ✅ Form accepts any email/password
- ✅ Password visibility toggle works
- ✅ "Remember me" checkbox
- ✅ "Forgot password?" link present
- ✅ Social login UI displays
- ✅ Loading animation shows
- ✅ Redirects to dashboard on success

---

### **Step 5: Test Dashboard (Main)**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/dashboard

**What to Test:**

#### **Stats Cards (4)**
- ✅ Active Sensors: 4
- ✅ Avg Soil Moisture: 45%
- ✅ Temperature: 24°C
- ✅ Yield Improvement: 32%
- ✅ All cards show with icons
- ✅ Change indicators display (+2, +3%, etc.)

#### **Charts (2)**
- ✅ Soil Moisture Trend chart loads
- ✅ Shows 7 days of data
- ✅ Optimal range line displays
- ✅ Temperature bar chart loads
- ✅ Interactive tooltips work
- ✅ Charts are responsive

#### **Active Sensors Section**
- ✅ 4 sensors displayed:
  - SENS-001: Soil Moisture (45%) - Active
  - SENS-002: Soil pH (6.5) - Active
  - SENS-003: Temperature (24°C) - Active
  - SENS-004: Soil Moisture (25%) - Warning
- ✅ Battery levels show
- ✅ Status indicators (green/yellow)

#### **AI Recommendations**
- ✅ 3 recommendations display
- ✅ Priority levels (high/medium/low)
- ✅ Icons and descriptions show
- ✅ Color-coded borders

#### **Recent Activity**
- ✅ 3 notifications display
- ✅ Icons and timestamps
- ✅ Different types (alert/success/info)

---

### **Step 6: Test Soil Monitoring Page**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/dashboard/monitoring

**What to Test:**

#### **Sensor Cards (4)**
For each sensor:
- ✅ Sensor name and type
- ✅ Current value with unit
- ✅ Battery percentage
- ✅ Last reading time
- ✅ GPS coordinates
- ✅ Status indicator (active/warning)
- ✅ "View Details" button

#### **Trend Charts (2)**
- ✅ Moisture Trend (7 days)
  - Field selector dropdown
  - Line chart with optimal range
  - Interactive tooltips
- ✅ pH Levels (7 days)
  - Field selector dropdown
  - Line chart
  - Scale from 5-8

#### **Sensor Health Status**
- ✅ All 4 sensors listed
- ✅ Battery progress bars
- ✅ Color-coded (green/yellow/red)
- ✅ Warning for low battery (SENS-004)

---

### **Step 7: Test AI Chatbot**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/dashboard/ai-chat

**Test Questions:**

1. **About Soil Moisture**
   ```
   Type: "What's my soil moisture level?"
   ```
   Expected: Analysis of current 45% moisture with recommendation

2. **About Irrigation**
   ```
   Type: "Should I water my crops today?"
   ```
   Expected: Irrigation schedule recommendation

3. **About pH Levels**
   ```
   Type: "What is my soil pH?"
   ```
   Expected: pH analysis (6.5 is ideal)

4. **About Fertilizer**
   ```
   Type: "fertilizer recommendation"
   ```
   Expected: Nitrogen fertilizer recommendation with application rates

5. **About Pest Control**
   ```
   Type: "pest control advice"
   ```
   Expected: Aphid monitoring recommendations

6. **About Weather**
   ```
   Type: "weather conditions"
   ```
   Expected: Rain forecast and irrigation adjustment advice

7. **About Crops**
   ```
   Type: "best crops for my farm"
   ```
   Expected: Maize and beans recommendation

**What to Test:**
- ✅ Chat interface loads
- ✅ Welcome message displays
- ✅ Quick question buttons work
- ✅ Text input accepts typing
- ✅ Send button works
- ✅ AI responds intelligently
- ✅ Typing indicator shows
- ✅ Message timestamps display
- ✅ Chat scrolls automatically
- ✅ Previous messages stay visible

---

### **Step 8: Test Settings Page**

Visit: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app/dashboard/settings

**What to Test:**

#### **Profile Settings**
- ✅ Name field populated
- ✅ Email field populated
- ✅ Phone field populated
- ✅ Location field populated
- ✅ All fields are editable

**Test Action:**
1. Change name to "Updated Test User"
2. Change location to "New Location"
3. Click "Save Changes"
4. Check for success message

#### **Notification Preferences**
- ✅ Email notifications toggle
- ✅ SMS notifications toggle
- ✅ Push notifications toggle
- ✅ All toggles work
- ✅ Settings save

#### **Language Selection**
- ✅ Dropdown shows 4 languages:
  - English
  - Français (French)
  - Kiswahili (Swahili)
  - Amharic
- ✅ Can select different language
- ✅ Selection saves

---

### **Step 9: Test Navigation**

**Sidebar Navigation (Desktop)**
- ✅ Dashboard link works
- ✅ Soil Monitoring link works
- ✅ Irrigation link (if implemented)
- ✅ Analytics link (if implemented)
- ✅ AI Assistant link works
- ✅ Settings link works
- ✅ Active page highlighted

**Mobile Navigation**
1. Resize browser to mobile width
2. ✅ Hamburger menu appears
3. ✅ Click to open sidebar
4. ✅ All links visible
5. ✅ Click link closes menu
6. ✅ Navigation works

**Top Header**
- ✅ Page title updates
- ✅ Notification bell shows (with badge)
- ✅ User avatar displays
- ✅ Click avatar goes to settings

**User Profile Section (Sidebar Bottom)**
- ✅ User avatar with initial
- ✅ Name displays
- ✅ Email displays (truncated if long)
- ✅ Logout button present

---

### **Step 10: Test Logout**

**Test Action:**
1. Click **"Logout"** button in sidebar
2. Should redirect to landing page
3. Try accessing `/dashboard` directly
4. Should redirect to `/login`

**What to Test:**
- ✅ Logout clears session
- ✅ Redirects to home page
- ✅ Protected routes redirect to login
- ✅ Must login again to access dashboard

---

### **Step 11: Test Responsive Design**

**Desktop (1920px)**
- ✅ Full sidebar visible
- ✅ 4-column grids
- ✅ Large charts
- ✅ All content spacious

**Laptop (1366px)**
- ✅ Sidebar visible
- ✅ 3-column grids
- ✅ Medium charts
- ✅ Balanced layout

**Tablet (768px)**
- ✅ Sidebar toggles
- ✅ 2-column grids
- ✅ Responsive charts
- ✅ Touch-friendly

**Mobile (375px)**
- ✅ Hamburger menu
- ✅ 1-column layout
- ✅ Stacked content
- ✅ Mobile-optimized charts
- ✅ Easy to scroll

---

### **Step 12: Test Performance**

**Page Load Speed:**
- ✅ Landing page loads < 3 seconds
- ✅ Dashboard loads quickly
- ✅ Charts render smoothly
- ✅ No lag in animations
- ✅ Smooth transitions

**Animations:**
- ✅ Hero floating icons animate
- ✅ Fade-in effects work
- ✅ Hover effects smooth
- ✅ Chart tooltips appear quickly
- ✅ Page transitions smooth

---

## 🐛 TESTING CHECKLIST

### **Functionality** ✅
- [ ] Landing page loads
- [ ] Signup creates account
- [ ] Login works
- [ ] Dashboard displays data
- [ ] Charts render correctly
- [ ] Sensors show data
- [ ] AI chatbot responds
- [ ] Settings save
- [ ] Logout works
- [ ] Navigation functions

### **UI/UX** ✅
- [ ] Design looks professional
- [ ] Colors are consistent
- [ ] Typography is readable
- [ ] Icons display correctly
- [ ] Images load (if any)
- [ ] Buttons are clickable
- [ ] Forms are usable
- [ ] Error states clear

### **Responsive** ✅
- [ ] Works on desktop
- [ ] Works on tablet
- [ ] Works on mobile
- [ ] Touch gestures work
- [ ] No horizontal scroll

### **Performance** ✅
- [ ] Fast page loads
- [ ] Smooth animations
- [ ] No console errors
- [ ] Charts performant
- [ ] No memory leaks

---

## 🎯 QUICK TEST SCENARIOS

### **Scenario 1: New Farmer Signs Up**
1. Visit landing page
2. Click "Get Started"
3. Fill signup form
4. Create account
5. See dashboard
6. Explore features
7. Test AI chat
8. Update settings
9. Logout

### **Scenario 2: Returning Farmer**
1. Visit login page
2. Enter credentials
3. Access dashboard
4. Check sensor data
5. View charts
6. Ask AI for advice
7. Check recommendations
8. Logout

### **Scenario 3: Mobile Farmer**
1. Open on phone
2. Signup/login
3. Use hamburger menu
4. View dashboard
5. Check sensors
6. Chat with AI
7. Test all features

---

## 📸 SCREENSHOT OPPORTUNITIES

Take screenshots for documentation:
1. ✅ Landing page hero
2. ✅ Dashboard with charts
3. ✅ Soil monitoring sensors
4. ✅ AI chatbot conversation
5. ✅ Settings page
6. ✅ Mobile responsive view

---

## 🔍 KNOWN BEHAVIORS

### **Authentication**
- Uses localStorage (demo mode)
- Any email/password works
- No actual backend validation
- Session persists until logout

### **Data**
- Sample data is hardcoded
- 4 sensors with fixed values
- 7 days of historical data
- AI responses are pre-programmed

### **Future Enhancements**
- Real backend API
- Database integration
- Actual sensor IoT connections
- Real-time data updates
- Payment processing

---

## 💡 TESTING TIPS

1. **Clear Cache**: If issues, clear browser cache
2. **Private Mode**: Test in incognito for fresh session
3. **Multiple Browsers**: Test Chrome, Firefox, Safari, Edge
4. **Mobile Devices**: Test on actual phones/tablets
5. **Slow Connection**: Test on 3G simulation
6. **Console Errors**: Check browser console for errors

---

## 🎉 SUCCESS CRITERIA

Your app passes testing if:
- ✅ All 9 pages load correctly
- ✅ Authentication flow works
- ✅ Dashboard displays data
- ✅ Charts render properly
- ✅ AI chatbot responds
- ✅ Navigation functions
- ✅ Mobile responsive
- ✅ No major bugs
- ✅ Professional appearance
- ✅ Fast performance

---

## 📞 REPORT ISSUES

If you find bugs:
1. Note the page URL
2. Describe the issue
3. Browser and device info
4. Steps to reproduce
5. Screenshots if possible

---

## 🚀 YOUR TEST CREDENTIALS

**Quick Reference:**

```
=================================
SOILSMART TEST ACCOUNTS
=================================

Account 1 (Kenya):
Email: john.kamau@example.com
Password: password123

Account 2 (Tanzania):
Email: amina.hassan@example.com
Password: password123

Account 3 (Rwanda):
Email: emmanuel.nkunda@example.com
Password: password123

Custom Account:
Email: [any email]
Password: [any password]
=================================
```

**Live URL**: https://soilsm-io2iyxm5o-leandre000s-projects.vercel.app

---

**Happy Testing!** 🌱✅

*Test all features and enjoy your live SoilSmart application!*
