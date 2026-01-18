# CLAUDE CODE PROMPT: Anchor UI Redesign

## Context
I have a working Anchor MVP (mental wellness app) that needs a visual redesign to match a reference design. The functionality is solid - I just need styling improvements.

## Current State vs. Target State

### What's Working (Keep This)
- Disclaimer modal functionality
- Session flow and AI integration
- Safety detection
- All core features

### What Needs Redesigning
Transform the basic UI (Image 1) to match the polished design (Image 2).

## Specific Design Changes Needed

### 1. Layout & Structure
**Current:** Single-column, cramped layout
**Target:** 
- Clean navigation bar at top with logo on left, nav links (Home, Daily Tip, Resources, Sessions, Contact Us), user icon on right
- Centered content with max-width: 900px
- Better spacing and breathing room
- Floating card/box for the "Before you begin" section

### 2. Navigation Bar
Add a horizontal navigation bar:
```
[Anchor Logo]  Home | Daily Tip | Resources | Sessions | Contact Us    [User Icon]
```
- Background: White with subtle shadow
- Fixed at top (sticky)
- Clean typography
- User icon on far right

### 3. "Before You Begin" Card
**Current:** Awkward green box at bottom
**Target:**
- Floating card positioned to the right of main content
- White background with soft shadow (elevation)
- Rounded corners (8-12px)
- Sage green/teal heading bar
- Clean bullet points
- Better proportions (card should be ~350px wide)

### 4. "Start Calming Session" Button
**Current:** Basic button with border
**Target:**
- White elevated card/button
- Drop shadow for depth
- Play icon (▶) on the right
- Larger, more prominent
- Hover state with slight lift

### 5. Typography & Spacing
- More generous margins and padding throughout
- Cleaner hierarchy:
  - Main heading: 32-36px, bold
  - Subheading: 18-20px, regular weight
  - Body: 16px
- Better line-height (1.6-1.8)

### 6. Color Palette Refinement
**Keep these colors but use them better:**
- Background: Soft sage/mint gradient or texture (#E8F5F0 or similar)
- Cards/modals: Pure white (#FFFFFF)
- Primary text: Dark gray/charcoal (#2C3E50)
- Accent: Sage green/teal for headers (#7FA99B or similar)
- Links: Blue (#4A90E2)

### 7. Visual Hierarchy Improvements
- Add subtle shadows to cards (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- Better contrast between sections
- Clearer focal points

## Implementation Approach

### Option 1: CSS-Only Refactor (Fastest - 30 mins)
Update the existing CSS file(s) with new styles. Keep all component logic unchanged.

**Files to modify:**
- `src/styles/globals.css` (or main CSS file)
- Possibly add `src/styles/components/` folder for component-specific styles

### Option 2: Component + CSS Refactor (45 mins)
Restructure components slightly for better layout control + new CSS.

**New components to add:**
- `Navigation.jsx` (nav bar)
- `BeforeYouBeginCard.jsx` (floating card)
- `HomeContent.jsx` (restructure home screen)

## Detailed CSS Changes

### Navigation Bar Styles
```css
.navigation {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #2C3E50;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
  transition: border-color 0.2s;
}

.nav-links a:hover,
.nav-links a.active {
  border-bottom-color: #7FA99B;
}
```

### Home Screen Layout
```css
.home-container {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #E8F5F0 0%, #F0F8F5 100%);
  padding: 60px 24px;
}

.home-content {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  align-items: start;
}

@media (max-width: 768px) {
  .home-content {
    grid-template-columns: 1fr;
  }
}
```

### Before You Begin Card
```css
.before-begin-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  position: sticky;
  top: 100px;
}

.card-header {
  background: #7FA99B;
  color: white;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 18px;
}

.card-body {
  padding: 24px;
}

.card-body ul {
  list-style: none;
  padding: 0;
}

.card-body li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
}

.card-body li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #7FA99B;
  font-size: 20px;
}
```

### Start Session Button
```css
.start-session-button {
  background: white;
  border: none;
  border-radius: 8px;
  padding: 20px 32px;
  font-size: 18px;
  font-weight: 500;
  color: #2C3E50;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  transition: all 0.2s ease;
}

.start-session-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.start-session-button .play-icon {
  width: 24px;
  height: 24px;
  background: #7FA99B;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}
```

## Instructions for Claude Code

Please help me redesign the Anchor UI following these specifications:

1. **Assess Current Structure**
   - Review my current component structure
   - Identify which files need changes

2. **Implement Navigation Bar**
   - Add sticky nav at top with logo, links, user icon
   - Use the CSS provided above as a starting point

3. **Restructure Home Screen**
   - Convert to 2-column grid layout (main content left, card right)
   - Add gradient background
   - Improve spacing

4. **Create Floating Card**
   - Move "Before you begin" into separate component
   - Style as elevated card with sage green header
   - Make it sticky (follows scroll)

5. **Redesign Start Session Button**
   - Convert to elevated card style
   - Add play icon (▶)
   - Smooth hover animation

6. **Mobile Responsive**
   - Ensure everything works on mobile
   - Stack layout on screens < 768px
   - Adjust spacing for mobile

7. **Maintain Functionality**
   - Keep all existing functionality intact
   - Don't break disclaimer modal, chat, safety screen
   - This is purely visual changes

## Testing Checklist
After changes, verify:
- [ ] Navigation bar appears and links work
- [ ] Home screen layout matches reference
- [ ] "Before you begin" card is positioned correctly
- [ ] Start session button looks polished and works
- [ ] Mobile responsive (test at 375px width)
- [ ] Disclaimer modal still works
- [ ] Chat interface still works
- [ ] Safety detection still works

## Reference Images
- Image 1 (current): Basic layout, needs improvement
- Image 2 (target): Polished design with nav, cards, better spacing

## Priority Order
1. Navigation bar (most visible improvement)
2. Home screen layout restructure
3. Before you begin card styling
4. Start session button polish
5. Overall spacing and typography refinement

---

**Expected time:** 30-45 minutes for CSS changes, test thoroughly before demo.

**Note:** Focus on getting it "close enough" to the reference design. Perfect pixel matching isn't necessary - the overall professional polish is what matters for the pitch.
