# Webundance Website Creation Prompts

## Phase 1: Project Setup and Structure

### Task 1.1: Initialize Project Structure
```
Create the initial directory structure for the Webundance website according to the technical specifications in the documentation. Create all necessary folders (css, js, images, assets) and empty HTML files for all 5 pages (index, services, process, results, contact).
```

### Task 1.2: Create HTML Boilerplate
```
Create a reusable HTML5 boilerplate template with proper meta tags, SEO optimization, and Open Graph tags. Include:
- Viewport meta tag for responsive design
- SEO meta tags (description, keywords)
- Open Graph tags for social sharing
- Favicon links
- CSS links (main.css, components.css, utilities.css)
- Google Fonts link for Inter font
- Defer JavaScript loading
Reference the documentation for proper structure and include semantic HTML5 elements.
```

## Phase 2: Design System Implementation

### Task 2.1: Create CSS Reset and Variables
```
Create main.css with:
1. A modern CSS reset (box-sizing, margin/padding reset, etc.)
2. CSS custom properties for the complete design system from the documentation including:
   - Color palette (primary, secondary, neutrals, gradients)
   - Typography scale (font sizes, weights, line heights)
   - Spacing system
   - Animation durations
   - Breakpoints for responsive design
Ensure all values match the design system specifications exactly.
```

### Task 2.2: Create Layout Utilities
```
In utilities.css, create utility classes for:
- Container with max-width and responsive padding
- Flexbox utilities (flex, justify, align variations)
- Grid utilities for common layouts
- Spacing utilities using the spacing scale
- Text utilities (alignment, weight, size)
- Display utilities (hidden on mobile/desktop)
- Animation utilities (fade-in, slide-up, etc.)
Follow mobile-first approach with min-width media queries.
```

### Task 2.3: Create Component Styles
```
In components.css, create reusable component styles based on the design system:
1. Buttons (btn-primary, btn-secondary, btn-ghost) with hover states
2. Cards with hover animations
3. Form elements (inputs, textareas, selects) with consistent styling
4. Navigation components
5. Section headers
6. stat cards
Include all transitions and hover effects specified in the documentation.
```

## Phase 3: Navigation and Layout Components

### Task 3.1: Create Header Navigation
```
Create the header navigation HTML and CSS that:
- Uses a fixed position with backdrop blur effect
- Includes the Webundance logo on the left
- Has navigation links (Services, Process, Results) 
- Features a "Get Started" CTA button on the right
- Implements a mobile hamburger menu using pure CSS and minimal JavaScript
- Adds smooth scroll behavior to anchor links
- Changes appearance on scroll (add shadow)
Make it fully responsive according to the design specifications.
```

### Task 3.2: Create Footer Component
```
Create a footer component that includes:
- Dark background (#1f2937) with white text
- Three columns: Quick Links, Services, Contact Info
- Secondary navigation links
- Contact information (email, phone, location)
- Social media links (if applicable)
- Copyright notice
- Responsive grid that stacks on mobile
Style according to the design system with proper spacing.
```

## Phase 4: Home Page Development

### Task 4.1: Create Home Page Hero Section
```
Build the hero section for index.html with:
- Gradient background using --gradient-primary
- Two-column layout (text left, visual right)
- Main headline: "Transform Your Business with Data-Driven Web Solutions"
- Subheadline with the specific metrics
- Two CTA buttons (primary and secondary)
- Animated browser mockup on the right (CSS only)
- Floating animation and background pattern overlay
- Fully responsive with single column on mobile
Include fade-in animations on scroll.
```

### Task 4.2: Create Stats Section
```
Create the statistics section with:
- Four stat cards displaying: 98% satisfaction, 25% traffic increase, 40% ranking boost, 85% retention
- Animated number counters that trigger on scroll using Intersection Observer
- Hover effects on cards (lift and shadow)
- Grid layout responsive to 2x2 on tablet and 2x2 on mobile
- Use the light background color and proper spacing from design system
```

### Task 4.3: Create Services Overview Section
```
Build the services overview section with:
- Section header with title and subtitle
- Three service cards in a grid:
  1. Custom Web Development (use 🌐 icon)
  2. SEO & Content Strategy (use 📈 icon)  
  3. Analytics & Insights (use 📊 icon)
- Each card has icon, title, description, and hover effects
- Cards should lift on hover with shadow enhancement
- Include "Learn More" links to services page
- Responsive grid (3 columns desktop, 1 column mobile)
```

### Task 4.4: Create Process Preview Section
```
Create a process preview section showing the 4-step process:
1. Consultation
2. Strategy  
3. Implementation
4. Growth
Design requirements:
- Connected timeline design with CSS pseudo-elements
- Numbered circles for each step
- Brief description under each step
- Gradient line connecting the steps
- Link to full process page
- Responsive (vertical timeline on mobile)
```

### Task 4.5: Create Testimonials Section
```
Build a testimonials section with:
- Three featured testimonial cards
- Client quote, name, and business name
- 5-star rating display
- Profile image placeholder (use initials in colored circle)
- Card design with shadow and hover effects
- Responsive grid layout
- Optional: carousel functionality for mobile
```

### Task 4.6: Create Final CTA Section
```
Create the final call-to-action section with:
- Gradient background (use --gradient-primary)
- Centered content
- Headline: "Ready to Grow Your Business?"
- Subheadline about joining satisfied clients
- Large primary CTA button to contact page
- Animated background effect (subtle pulse or wave)
- Proper padding and spacing
```

## Phase 5: Interior Pages

### Task 5.1: Create Services Page
```
Build the complete services.html page with:
1. Hero section with page title and breadcrumbs
2. Three detailed service sections:
   - Custom Web Development (with features list, technologies, benefits)
   - SEO & Content Strategy (with process details, deliverables)
   - Analytics & Insights (with reporting examples, KPIs)
3. Service comparison table (Starter, Growth, Premium tiers)
4. FAQ section at bottom
5. CTA to contact page
Ensure consistent styling with home page and proper internal navigation.
```

### Task 5.2: Create Process Page
```
Build the process.html page featuring:
1. Hero section explaining the consultative approach
2. Detailed 4-step process with:
   - Expanded descriptions for each phase
   - Visual timeline design
   - What to expect in each phase
   - Deliverables for each step
3. Project timeline estimates
4. FAQ accordion section
5. CTA to schedule consultation
Include smooth animations and interactive elements.
```

### Task 5.3: Create Results Page
```
Create the results.html page showcasing:
1. Hero section with impact-focused headline
2. 3-4 detailed case studies with:
   - Client background
   - Challenge faced
   - Solution implemented
   - Results achieved (with specific metrics)
   - Client testimonial
   - Before/after visuals or screenshots
3. Grid of additional testimonials (6-8)
4. Summary statistics section
5. CTA to get similar results
Style with emphasis on data and visual proof.
```

### Task 5.4: Create Contact Page
```
Build the contact.html page with:
1. Welcoming hero section
2. Two-column layout:
   Left side: Contact form with:
   - Name, Email, Phone fields
   - Business Name field
   - Project Type dropdown
   - Budget Range dropdown  
   - Message textarea
   - Honeypot field for spam prevention
   - Submit button with loading state
   Right side: Direct contact info and business hours
3. Response time promise
4. Location map or illustration
5. FAQ about the consultation process
Include form validation and success/error states.
```

## Phase 6: JavaScript Functionality

### Task 6.1: Create Main JavaScript File
```
Create main.js with core functionality:
1. Smooth scroll for anchor links
2. Header scroll effects (add shadow on scroll)
3. Mobile menu toggle functionality
4. Intersection Observer setup for animations
5. Lazy loading for images
6. Basic form validation helpers
Use modern ES6+ syntax and ensure no dependencies on external libraries.
```

### Task 6.2: Create Animation Controllers
```
Create animations.js to handle all scroll-triggered animations:
1. Fade in animations for elements with .animate-on-scroll
2. Number counter animations for stats
3. Stagger animations for grid items
4. Progress bar animations
5. Parallax effects for hero sections (subtle)
Use Intersection Observer API and requestAnimationFrame for performance.
```

### Task 6.3: Create Contact Form Handler
```
Create contact.js to handle the contact form:
1. Form validation (all fields, email format, etc.)
2. Honeypot spam prevention
3. Loading state during submission
4. Success/error message display
5. Form data preparation for submission
6. Basic sanitization of inputs
Include proper error handling and user feedback.
```

## Phase 7: Optimization and Polish

### Task 7.1: Implement Image Optimization
```
Add image optimization features:
1. Convert all images to WebP format with fallbacks
2. Implement responsive images using srcset
3. Add loading="lazy" to all images below the fold
4. Create placeholder blur effects for images
5. Optimize hero section graphics
6. Ensure all images have proper alt text
Focus on performance while maintaining visual quality.
```

### Task 7.2: Performance Optimization
```
Optimize the website performance:
1. Minify all CSS and JavaScript files
2. Combine CSS files if beneficial
3. Implement critical CSS inline in <head>
4. Add preload tags for critical resources
5. Optimize web fonts loading
6. Enable browser caching headers
7. Compress HTML output
Ensure page load time is under 3 seconds on 3G.
```

### Task 7.3: SEO and Metadata
```
Complete all SEO optimizations:
1. Add unique title tags and meta descriptions to all pages
2. Implement structured data (JSON-LD) for business info
3. Create XML sitemap
4. Add robots.txt file
5. Implement canonical URLs
6. Add Open Graph tags for all pages
7. Ensure proper heading hierarchy (H1-H6)
8. Add internal linking between pages
Follow the SEO guidelines from the documentation.
```

### Task 7.4: Accessibility Audit
```
Ensure WCAG 2.1 AA compliance:
1. Add proper ARIA labels where needed
2. Ensure all interactive elements are keyboard accessible
3. Add skip navigation link
4. Verify color contrast ratios (4.5:1 minimum)
5. Add focus indicators for keyboard navigation
6. Ensure form labels are properly associated
7. Add screen reader only text where needed
8. Test with screen reader
```

### Task 7.5: Cross-Browser Testing
```
Test and fix issues across browsers:
1. Test on latest Chrome, Firefox, Safari, and Edge
2. Test on mobile browsers (iOS Safari, Chrome Android)
3. Fix any CSS compatibility issues
4. Ensure JavaScript works without errors
5. Verify animations perform well
6. Check form functionality
7. Test responsive design at all breakpoints
8. Document any browser-specific fixes
```

### Task 7.6: Final Polish
```
Add final touches and polish:
1. Create custom 404 error page
2. Add loading animations for dynamic content
3. Implement print styles
4. Add favicon and touch icons
5. Create humans.txt and security.txt
6. Add newsletter signup (if applicable)
7. Implement cookie notice (if needed)
8. Final review of all content for typos
Ensure everything matches the design system perfectly.
```

## Phase 8: Launch Preparation

### Task 8.1: Create Deployment Package
```
Prepare the website for deployment:
1. Create production build with minified assets
2. Generate final sitemap.xml
3. Create .htaccess file for clean URLs
4. Set up 301 redirects if needed
5. Prepare analytics tracking code
6. Create backup of all source files
7. Document any server requirements
8. Create deployment checklist
```

### Task 8.2: Documentation
```
Create final documentation:
1. README file with setup instructions
2. Maintenance guide for future updates
3. Component library documentation
4. SEO checklist for new pages
5. Performance monitoring guide
6. Contact form configuration notes
7. Browser support documentation
8. Known issues and fixes
```

## Testing Prompts

### Final Testing Checklist
```
Perform comprehensive testing:
- [ ] All links work correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Responsive design works on all devices
- [ ] Animations trigger correctly
- [ ] Page speed score > 90
- [ ] SEO score > 90
- [ ] Accessibility score > 90
- [ ] Cross-browser compatibility verified
- [ ] Contact form tested with various inputs
- [ ] 404 page displays correctly
- [ ] Social media tags work
- [ ] Analytics tracking confirmed
```

---

## Usage Instructions

1. Work through each phase sequentially
2. Complete all tasks in a phase before moving to the next
3. Test each component as you build it
4. Refer back to the main documentation for specific values
5. Use browser developer tools to verify responsive design
6. Commit code frequently with descriptive messages

Each prompt is designed to be self-contained while building toward the complete website. The prompts reference the documentation for specific values and requirements while providing clear implementation instructions.