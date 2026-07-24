# Hindustan Projects Website — Core Pages (New + Improve)

Status: **HOLD — do not run these yet.** Use this file only after Phase 1-4 of the main
roadmap (`hindustan-projects-website-roadmap.md`) are done.

This file covers core business pages — some need to be built new, some already exist and
just need improvement. Feed one prompt at a time to Claude Code inside the project repo.

**Audit rule for `[AUDIT-FIRST]` items:** the AI must first check whether the page already
exists in the codebase:
- ✅ Exists and works correctly → leave it alone, just confirm.
- 🔧 Exists but incomplete/weak → improve it.
- 🆕 Doesn't exist → build it fresh.

---

## PHASE 5 — Legal & Conversion-Critical Pages (do these first, when the time comes)

These are needed for Google Ads and Razorpay/payment gateway compliance, and for proper
conversion tracking. Highest priority within this file.

### 5.1 Privacy Policy Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing Privacy Policy page. First: tell me if one
exists and whether it actually reflects what data my site collects (contact forms,
analytics, cookies, payment info if applicable via Razorpay).

IF IT EXISTS AND IS ACCURATE/COMPLETE: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS GENERIC/OUTDATED/INCOMPLETE: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create a /privacy-policy page covering: what data is collected (name, email,
phone via contact/quote forms; analytics cookies via GA4; payment data via Razorpay if
applicable), how it's used, third-party services used (Google Analytics, Razorpay, email
provider), data retention, user rights, and contact info for privacy queries. Write it in
clear plain language, not just legal boilerplate. Style to match site branding and link it
in the footer on every page.
```

### 5.2 Terms & Conditions Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing Terms & Conditions page. First: tell me if one
exists and whether it covers service terms, payment terms, and liability basics.

IF IT EXISTS AND IS COMPLETE: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS GENERIC/INCOMPLETE: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create a /terms-conditions page covering: service scope, payment terms
(advance/milestone structure if applicable), project timelines and delays, intellectual
property/code ownership after full payment, cancellation/refund policy, liability
limitations, and governing law (India/Rajasthan jurisdiction). Style to match site
branding and link it in the footer on every page.
```

### 5.3 Thank You Page (Post Form-Submit) `[AUDIT-FIRST]`

```
Check my website codebase for an existing "Thank You" page or post-submit redirect after
the contact form / quote calculator / any lead form is submitted. First: tell me what
currently happens after form submission (redirect, inline message, nothing).

IF A PROPER THANK YOU PAGE EXISTS AND FORMS REDIRECT TO IT: tell me it's fine, no changes
needed.
IF FORMS JUST SHOW AN INLINE MESSAGE OR NOTHING: build the dedicated page and wire up
redirects per requirements below.
IF NOTHING EXISTS: build it fresh.

Requirements: create a /thank-you page shown after successful submission of ANY lead form
on the site (contact form, cost calculator, budget planner, resource download, referral
form). Include: a confirmation message, expected response time, links to Blog/Portfolio to
keep them browsing, and WhatsApp quick-contact option for urgent queries. Wire up EVERY
existing lead form's submit handler to redirect here on success. This page must also fire
the GA4 conversion event set up earlier -- confirm this is wired correctly.
```

---

## PHASE 6 — New Trust & Business Pages

### 6.1 About Us Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing About Us page. First: tell me if one exists and
whether it covers the company story, mission, and team/founder background, or if it's just
a placeholder/thin page.

IF IT EXISTS AND IS SUBSTANTIVE: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS THIN/PLACEHOLDER: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create an /about page with sections for: Company Story (why Hindustan
Projects started), Mission/Values, Founder/Team profiles (photo placeholder, name, role,
short bio), and a stats strip (years active, projects delivered, clients served -- use
placeholder numbers I can edit). End with a CTA to view services or contact. Style to
match brand and keep content in an easily editable data file.
```

### 6.2 Pricing Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing Pricing page separate from the cost calculator
tool. First: tell me if one exists.

IF IT EXISTS AND IS CLEAR: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS CONFUSING/INCOMPLETE: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create a /pricing page with 3 package tiers (e.g. Starter, Growth,
Enterprise) shown as comparison cards -- each with a starting price RANGE, bullet list of
what's included, and a "Get Started" CTA linking to the contact form or cost calculator
for an exact quote. Make clear this is a starting-price guide, not a final quote. Style to
match brand, mobile responsive (stack cards vertically on small screens).
```

### 6.3 Industries We Serve Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing "Industries We Serve" or similar page. First:
tell me if one exists.

IF IT EXISTS AND IS SUBSTANTIVE: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS THIN: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create an /industries page listing industries served (e.g. Real Estate,
Healthcare, Retail/E-commerce, Education, Hospitality -- adjust based on actual past
clients if known). Each industry gets a short card/section: common challenges in that
industry, how we solve them, and a relevant CTA. This page should be structured so each
industry could later become its own dedicated landing page (e.g.
/industries/real-estate) for targeted SEO -- set up the routing/component structure with
that in mind even if starting with one combined page.
```

### 6.4 Our Process / How We Work Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing "Our Process" or "How We Work" page/section.
First: tell me if one exists.

IF IT EXISTS AND IS CLEAR: tell me it's fine, no changes needed.
IF IT EXISTS BUT IS VAGUE/INCOMPLETE: improve it per requirements below.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create a /our-process page (or prominent homepage section) showing a clear
step-by-step timeline: Discovery Call -> Proposal & Planning -> Design -> Development ->
Testing -> Launch -> Ongoing Support. Each step gets a short description and rough
timeframe. Use a visual timeline/stepper component matching the brand colors. End with a
CTA to start the process (contact form).
```

### 6.5 Careers / Join Us Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing Careers page. First: tell me if one exists.

IF IT EXISTS: tell me it's fine, no changes needed unless I specify open roles to add.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create a /careers page with: a short "why work with us" section, a list of
current openings (use a simple editable config/array -- default to "No open positions
right now, but we're always growing -- send your resume" if I don't provide specific
roles), and a simple application form (Name, Email, Role interested in, Resume
link/upload placeholder, Message) that stores to the same lead backend as other forms
(check codebase and reuse existing logic).
```

### 6.6 Support / Help Center Page `[AUDIT-FIRST]`

```
Check my website codebase for an existing Support or Help Center page for EXISTING
clients (separate from general FAQs for prospects). First: tell me if one exists.

IF IT EXISTS: tell me it's fine, no changes needed.
IF IT DOES NOT EXIST: build it fresh.

Requirements: create a /support page aimed at existing clients (e.g. those using the
office management portal). Include: how to raise a support ticket/request (link to
WhatsApp or a simple form), expected response times, and a short getting-started FAQ
relevant to portal users. Keep this clearly separate in tone/navigation from the
sales-facing FAQ built earlier for prospects.
```

---

## PHASE 7 — Improve Existing Pages

### 7.1 Contact Us Page — Improve `[AUDIT-FIRST]`

```
Review my existing Contact Us page. First: tell me exactly what it currently includes
(form fields, map, phone/email display, hours).

Improve it to include all of the following, adding only what's missing:
1) Embedded Google Map showing our Rajasthan office location.
2) Multiple contact methods clearly listed: phone (click-to-call on mobile), email
   (click-to-email), WhatsApp button.
3) Business hours clearly displayed.
4) Keep the existing contact form but confirm it redirects to the Thank You page
   (Phase 5.3) on successful submission.
Style additions to match the existing page design -- don't rebuild what's already working.
```

### 7.2 Homepage — Improve `[AUDIT-FIRST]`

```
Review my existing homepage hero section and overall structure. First: tell me what's
currently there (hero content, sections, CTAs).

Evaluate against these standards and improve only what's weak:
1) Hero section should have a clear one-line value proposition (not generic text) and ONE
   primary CTA button (e.g. "Get a Free Quote") that stands out visually.
2) Hero should include a strong visual (image/illustration), not just text on a plain
   background.
3) Check that homepage links out to: Services, Portfolio, Testimonials (once built),
   Blog, and Contact -- add any missing internal links.
4) Confirm there's no more than one competing primary CTA above the fold (avoid decision
   paralysis).
Tell me specifically what you changed and why, don't rebuild sections that already meet
these standards.
```

### 7.3 Services Pages — Improve `[AUDIT-FIRST]`

```
Review my existing individual service pages. First: for each service page, tell me
whether it currently includes: pricing hints, a process/steps overview, and an FAQ
section.

For each service page, add whichever of these is MISSING (don't touch what's already
there):
1) A short pricing hint section (e.g. "Starting from ₹X" with a link to the full Pricing
   page from Phase 6.2).
2) A brief process overview specific to that service (can reuse/reference the general
   Our Process page from Phase 6.4).
3) Make sure the FAQ accordion component (built in the earlier roadmap phase) is
   actually included on this page with service-specific questions, not just the generic
   homepage FAQ.
Give me a per-page checklist of what was added vs already present.
```

---

## Priority Order Within This File (once you're ready to start)

1. **5.1 / 5.2 / 5.3** — Privacy Policy, Terms, Thank You page (compliance + tracking, do first)
2. **7.1 / 7.2** — Improve Contact Us + Homepage (quick wins, high visibility)
3. **6.1 / 6.4** — About Us + Our Process (trust-building)
4. **6.2** — Pricing page
5. **6.3** — Industries page
6. **7.3** — Improve Services pages
7. **6.5 / 6.6** — Careers + Support (lowest priority, do when relevant)
