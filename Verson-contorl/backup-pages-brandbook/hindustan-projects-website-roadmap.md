# Hindustan Projects Website — Growth Roadmap (Phase-Wise AI Prompts)

This file contains ready-to-use prompts for Claude Code (or any AI coding assistant) to implement SEO, trust, and conversion features on `hindustanprojects.in` / `itservices.hindustanprojects.in`.

**How to use this file:** Feed one prompt at a time to Claude Code inside the project repo, in phase order, so the AI has full context of the existing codebase before making changes. Do not skip ahead — later phases assume earlier ones (like the contact form / lead backend) already exist.

**Already implemented (skip these):** WhatsApp widget, Portfolio/Case-study filter by industry.

**Audit rule for Phase 3 & 4 items:** For every prompt marked `[AUDIT-FIRST]`, the AI must first check whether the feature already exists in the codebase:
- ✅ Exists and works correctly → leave it alone, just confirm.
- 🔧 Exists but incomplete/broken → improve it.
- 🆕 Doesn't exist → build it fresh.

---

## PHASE 1 — SEO Foundation

Goal: make the site technically crawlable, fast, and properly tagged before adding content/tools on top.

### 1.1 On-Page SEO Tightening

```
Review my React + Vite + Tailwind website codebase. For every page/route, do the following:
1) Add a unique, keyword-rich <title> and meta description using react-helmet-async
   (reference existing helmet setup if present).
2) Ensure each page has exactly ONE <h1> tag, and enforce a logical H1 > H2 > H3 heading
   hierarchy -- fix any pages that violate this.
3) Add descriptive alt text to every <img> tag based on its context/content.
4) Convert any non-SEO-friendly URLs (e.g. query params like ?id=123) into clean, readable
   route paths (e.g. /services/web-development).
5) Add relevant internal links between the Services, Blog, About, and Contact pages so link
   equity flows across the site.
List every file you changed and a summary of what was fixed in each.
```

### 1.2 Schema Markup (Structured Data)

```
Add JSON-LD structured data to my website (React + Vite + Tailwind, using react-helmet-async).
Implement the following schema types:
1) Organization schema on the homepage (name: Hindustan Projects, logo, url, contact info,
   social profiles).
2) LocalBusiness schema with address, phone number, opening hours, and geo coordinates for
   our Rajasthan-based office.
3) Service schema for each individual service page (IT services, web development, etc.),
   describing the service, provider, and area served.
Inject each JSON-LD block via a reusable <SchemaMarkup> component so it's easy to update
later. Validate the output structure against schema.org guidelines and show me the final
JSON-LD for each page type.
```

### 1.3 Technical SEO (Sitemap, Robots.txt, Core Web Vitals)

```
Improve the technical SEO of my React + Vite website:
1) Generate a sitemap.xml covering all static and dynamic (blog) routes. Set it up so it
   auto-regenerates on build (use a Vite plugin like vite-plugin-sitemap if suitable).
2) Create a robots.txt allowing all crawlers and pointing to the sitemap.xml location.
3) Audit my images and convert any large PNG/JPG assets to WebP format, and add
   loading="lazy" to all below-the-fold images.
4) Check my current bundle for render-blocking resources and suggest/implement
   code-splitting or lazy-loading for heavy components (e.g. using React.lazy + Suspense).
5) Confirm the site is fully responsive at 375px, 768px, and 1280px breakpoints, and fix
   any layout issues you find.
Give me a before/after summary of what was optimized.
```

### 1.4 Analytics & Search Console Integration

```
Integrate analytics and search visibility tools into my React + Vite + Tailwind website:
1) Add Google Analytics 4 (GA4) tracking via gtag.js, loaded conditionally so it doesn't
   block initial page render.
2) Add the Google Search Console verification meta tag (I will paste in the verification
   code you request from me).
3) Set up basic custom event tracking for key actions: contact form submissions, WhatsApp
   button clicks, and quote/calculator tool submissions (once built in Phase 3).
Tell me exactly where in the codebase these were added and what values I need to fill in
myself (e.g. GA4 Measurement ID).
```

---

## PHASE 2 — Content & Trust Signals

Goal: give Google fresh content to index and give visitors reasons to trust us.

### 2.1 Blog / Content Section

```
Create a Blog section for my React + Vite + Tailwind website. Requirements:
1) A /blog listing page showing post title, excerpt, cover image, and publish date in a
   responsive card grid matching my existing brand colors (red/blue/white).
2) A /blog/:slug dynamic route rendering full blog content from local markdown/MDX files
   or a simple JSON data file (choose the simpler approach given my current stack, explain
   your choice).
3) Each blog post component must set its own SEO title/meta description via
   react-helmet-async.
4) Add pagination or 'load more' if there are more than 6 posts.
5) Create 3 starter blog post drafts (title + outline only, not full content) targeting
   these long-tail keywords: "IT services cost in Rajasthan", "Best web development
   company in Rajasthan", "Corporate website vs custom portal — which does my business
   need".
Set up the folder structure so adding a new blog post later is a simple copy-paste of one
file.
```

### 2.2 Client Testimonials + Video Reviews Section `[AUDIT-FIRST]`

```
Check my React + Vite + Tailwind website codebase for an existing testimonials/reviews
section. First: search the codebase and tell me if one already exists, and if so evaluate
whether it properly displays client name, photo/company, quote, and rating -- and whether
it's actually wired up on the homepage.

IF IT EXISTS AND IS CORRECT: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS INCOMPLETE/BROKEN: fix and improve it to meet the requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a "Client Speaks" section on the homepage with a card carousel/grid showing
client name, company, photo (use placeholder avatars if none provided), star rating, and
short quote. Also add support for an optional embedded video testimonial (YouTube/Vimeo
embed or self-hosted mp4) in place of a photo for select testimonials. Style to match my
red/blue/white brand. Make content easily editable from a single data file (JSON or
similar) so I can add new testimonials without touching component code.
```

### 2.3 FAQ Section with FAQ Schema `[AUDIT-FIRST]`

```
Check my website codebase for an existing FAQ section on any service page. First: tell me
if one already exists and whether it includes structured data (FAQPage JSON-LD schema).

IF IT EXISTS AND IS CORRECT (has schema + proper accordion UI): tell me it's fine, no
changes needed.
IF IT EXISTS BUT IS INCOMPLETE (e.g. UI exists but no schema, or schema exists but not
wired to visible content): fix and improve it.
IF IT DOES NOT EXIST: build it fresh.

Requirements: an expandable/collapsible FAQ accordion component, reusable across service
pages, styled with my existing Tailwind theme. For each service page, add 5-6 relevant Q&A
pairs (e.g. "How long does it take to build a website?", "Is maintenance included?", "What
is the payment structure?"). Generate matching FAQPage JSON-LD schema for each page via
react-helmet-async so the content is crawlable and eligible for Google's expandable FAQ
rich results. Confirm the schema content matches the visible FAQ content exactly (required
by Google guidelines).
```

### 2.4 Portfolio / Case Study Deep-Dive Pages `[AUDIT-FIRST]`

```
Check my website codebase for existing individual case study or project detail pages (not
just a portfolio grid/filter, which I already have). First: tell me if dedicated deep-dive
pages per project exist, and if so whether they follow a Problem -> Solution -> Result
structure with measurable outcomes.

IF IT EXISTS AND IS CORRECT: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS THIN/INCOMPLETE: improve the structure and content per the requirements
below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a dynamic route /portfolio/:slug (or similar) linked from my existing
portfolio filter/grid. Each page should have sections for: Client/Project Overview, The
Problem, Our Solution (with screenshots), The Result (with 2-3 measurable stats like "load
time improved 40%", placeholder stats if real data isn't available yet), and a CTA to
start a similar project. Add unique SEO meta tags per case study via react-helmet-async.
```

### 2.5 Trust Badges & Certifications `[AUDIT-FIRST]`

```
Check my website codebase (homepage and footer) for any existing trust badges,
certifications, or partnership logos. First: tell me what currently exists.

IF IT EXISTS AND IS DISPLAYED CORRECTLY: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS POORLY PLACED/STYLED: improve placement and styling.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a trust badge strip (homepage, above footer) displaying
certification/partnership logos (e.g. Razorpay Partner if applicable) as a responsive logo
row, grayscale by default with color on hover. Make it a reusable <TrustBadges />
component fed from a simple config array so I can add/remove badges easily. Use
placeholder badge slots if I haven't provided actual logos yet.
```

---

## PHASE 3 — Lead-Generation Tools

Goal: interactive tools that generate leads directly and are shareable (extra backlinks/traffic).

### 3.1 Website Cost / Quote Calculator

```
Build a "Website Development Cost Calculator" as a React component (Tailwind styled,
matching my red/blue/white brand colors) for my Hindustan Projects website. Requirements:
1) Multi-step form: Step 1 - select project type (Business Website / E-commerce / Custom
   Web App / Office Portal). Step 2 - select number of pages (1-5, 6-10, 10+). Step 3 -
   select features (checkboxes: CMS, Payment Gateway, User Login, Admin Dashboard, SEO
   Setup, Multi-language).
2) On the final step, calculate and display an estimated price RANGE (not exact price)
   based on selections using a simple weighted logic I can edit later in a config file.
3) End with a lead-capture form (Name, Phone, Email, brief message) that submits to our
   existing contact API endpoint / form handler -- check my codebase for the existing
   contact form submission logic and reuse it.
4) Make it a standalone component I can drop into any page via <CostCalculator />.
Show me the final component code and where to import it.
```

### 3.2 Free Website Audit Tool

```
Build a "Free Website Audit" tool as a React component for my website. Requirements:
1) A single input field where a visitor pastes their website URL.
2) On submit, call Google PageSpeed Insights API (I will provide the API key) to fetch
   performance score, SEO score, accessibility score, and mobile-friendliness.
3) Display results as simple visual score cards/gauges (use a lightweight chart library
   already in my project if available, otherwise plain CSS progress bars -- don't add a
   new heavy dependency).
4) Below the results, add a clear CTA: "Want us to fix these issues? Get a free
   consultation" linking to the contact form/WhatsApp.
5) Handle errors gracefully (invalid URL, API failure, rate limits) with a friendly
   message.
Tell me exactly where to plug in the PageSpeed API key as an environment variable.
```

### 3.3 Digital Marketing Budget Planner

```
Build a "Digital Marketing Budget Planner" as a React component for my website.
Requirements:
1) Ask the visitor 3 simple questions via dropdowns/radio buttons: their industry/business
   type, their monthly revenue range, and their primary goal (Brand Awareness / Lead
   Generation / Sales).
2) Based on the answers, show a suggested monthly digital marketing budget RANGE and a
   rough split across channels (e.g. SEO, Paid Ads, Social Media, Content) as a simple
   horizontal bar breakdown -- use logic I can edit later in a config object.
3) End with a CTA to book a free consultation, linking to our contact form/WhatsApp.
4) Style it to match my existing red/blue/white brand theme and make it mobile responsive.
Provide the full component code and usage instructions.
```

### 3.4 Tech Stack Recommender Quiz

```
Build a short interactive quiz called "Which Tech Stack Is Right For Your Business?" as a
React component for my website. Requirements:
1) 4-5 multiple choice questions about the visitor's business needs (e.g. budget range,
   need for e-commerce, expected traffic scale, need for custom features, timeline).
2) Based on answers, recommend one of: "WordPress/CMS", "React + Vite Business Site", or
   "Custom Full-Stack Web App" with a short (2-3 line) explanation of why it fits them.
3) Make it feel engaging -- one question per screen with a progress bar, smooth
   transitions between questions using simple CSS transitions (no new animation library
   needed).
4) End with the recommendation plus a CTA button to "Discuss this with our team" linking
   to contact/WhatsApp.
5) Make the whole quiz shareable via a simple "Share your result" button (Web Share API
   with clipboard fallback).
Provide the full component code.
```

### 3.5 Free Downloadable Resource (Lead Magnet)

```
Set up a "Free Resource Download" section on my website. Requirements:
1) A landing block promoting a downloadable PDF titled "Website Launch Checklist" (I will
   provide the actual PDF file separately).
2) A short email-gate form (Name + Email) before the download link is revealed/triggered.
3) On submit, store the lead (reuse my existing contact form backend/database logic if
   available -- check the codebase first) and then trigger the PDF download.
4) Style the section to match my red/blue/white brand and make it embeddable as
   <ResourceDownload /> on any page (e.g. blog posts, homepage footer).
Show me where the existing lead storage logic lives so this reuses it instead of creating
a duplicate system.
```

---

## PHASE 4 — Conversion & Retention

Goal: convert warm traffic, retain leads that don't convert immediately, and polish the remaining UX gaps.

### 4.1 "Compare Us" Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing comparison page (e.g. "Why Us" or "Compare"
page). First: tell me if one exists and whether it does a structured feature-by-feature
comparison.

IF IT EXISTS AND IS CORRECT: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS JUST GENERIC TEXT (no real comparison table): improve it per
requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a new page (e.g. /why-hindustan-projects) with a comparison table: columns
for "Hindustan Projects" vs "Freelancers" vs "Other Agencies", rows for factors like
Pricing Transparency, Support After Delivery, Communication, Turnaround Time, Code
Ownership. Style as a clean responsive table (collapse to stacked cards on mobile)
matching my brand colors. End with a CTA to get a quote.
```

### 4.2 Live Chat Bot `[AUDIT-FIRST]`

```
Check my website codebase for any existing chat widget (live chat, chatbot, or similar).
First: tell me if one already exists and what it currently does.

IF IT EXISTS AND WORKS PROPERLY: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS LIMITED/BROKEN: improve it per the requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a floating chat widget (bottom-right corner, matching brand colors) that
opens into a simple chat panel. Start with a rule-based flow: greet the visitor, offer 3-4
quick-reply buttons for common intents (Get a Quote, View Services, Talk to Team, Check
Project Status), and route "Talk to Team" to our WhatsApp number or contact form. Keep it
lightweight -- do not add a large new dependency; build with plain React state. Note in
your response where I could later plug in an actual AI/LLM API if I want smarter
responses.
```

### 4.3 Email Newsletter / Drip Sequence Setup `[AUDIT-FIRST]`

```
Check my website/backend codebase for any existing email automation (newsletter signup,
drip sequence, or transactional email setup beyond basic contact form notifications).
First: tell me what currently exists.

IF IT EXISTS AND IS PROPERLY SET UP: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS PARTIAL (e.g. only sends a single confirmation email, no sequence):
improve it.
IF IT DOES NOT EXIST: build it fresh.

Requirements: check my backend (Node/Express/Prisma stack) for the existing email sending
setup (e.g. Nodemailer or similar) and reuse it. Add a simple newsletter signup capture on
the site if not already present. Design a 3-email drip sequence (Day 0 welcome + case
study, Day 3 tips, Day 7 offer/CTA) as email templates, and set up the trigger logic to
queue these when someone submits a lead form but hasn't converted. Note any third-party
service you recommend (e.g. simple cron-based queue vs a service) given my current
self-hosted VPS setup.
```

### 4.4 Referral / Affiliate Program Page `[AUDIT-FIRST]`

```
Check my website codebase for any existing referral or affiliate program page. First: tell
me if one exists and what it currently offers.

IF IT EXISTS AND IS CORRECT: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS INCOMPLETE: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a new page explaining a simple referral program (e.g. "Refer a client, get
X% off your next project or a cash reward"). Include a simple referral submission form
(referrer name, referrer contact, referred business name, referred contact) that stores to
the same backend/lead system as my contact form (check codebase and reuse existing logic).
Style to match brand.
```

### 4.5 Speed-Focused Landing Page for Ads `[AUDIT-FIRST]`

```
Check my website codebase for any existing standalone/minimal landing page separate from
the main site navigation (built for ad campaigns). First: tell me if one exists.

IF IT EXISTS AND IS PROPERLY MINIMAL/FAST: tell me it's fine, no changes needed.
IF IT EXISTS BUT STILL LOADS FULL SITE NAV/FOOTER/HEAVY ASSETS: strip it down per
requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: a standalone route (e.g. /get-quote) with NO main site header/footer/nav --
just a focused hero, 3-4 trust bullet points, and a single lead capture form above the
fold. Keep bundle size minimal for this route specifically (avoid importing heavy shared
layout components). Optimize for fast First Contentful Paint. This page is meant for paid
traffic, so keep it distraction-free with one clear CTA only.
```

### 4.6 Custom 404 Page + Internal Site Search `[AUDIT-FIRST]`

```
Check my website codebase for an existing custom 404 page and any internal search
functionality. First: tell me what currently exists for both.

IF BOTH EXIST AND WORK CORRECTLY: tell me it's fine, no changes needed.
IF EITHER EXISTS BUT IS THE DEFAULT/GENERIC VERSION OR BROKEN: improve it per requirements
below.
IF EITHER DOES NOT EXIST: build it fresh.

Requirements: (a) a branded 404 page matching my red/blue/white theme with a friendly
message and a clear "Back to Home" CTA plus links to popular pages (Services, Blog,
Contact). (b) a simple internal search bar (in header or a dedicated /search page) that
searches across page titles and blog post titles/content client-side (no need for a heavy
search backend given current site size) and shows matching results with links. Keep both
lightweight and consistent with existing routing setup (React Router or equivalent --
check what I'm using).
```

---

## Quick Priority Guide

If short on time, do these first — best ROI per effort:

1. **1.3 Technical SEO** (sitemap/robots/speed) — unlocks Google indexing
2. **2.3 FAQ Schema** — fast rich-result win in search
3. **2.2 Testimonials** — instant trust boost
4. **3.1 Cost Calculator** — direct lead generator
5. **2.4 Case Study pages** — trust + long-tail SEO combined

Everything else can follow in phase order as time allows.
