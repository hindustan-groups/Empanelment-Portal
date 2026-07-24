# Hindustan Projects Admin Portal — Next-Level Roadmap

Based on the full audit report (React 19 + Node/Express 5 + Prisma + PostgreSQL, 206 files,
23 DB models, 25 admin pages, currently SUPER_ADMIN + ADMIN roles only).

**How to use:** Feed one prompt at a time to Claude Code inside the portal repo, in phase
order. Do not skip ahead — Phase B (Staff role) and Phase C (Client Portal) both depend on
Phase A fixes (especially activity logging and route validation) being in place first.

**Audit rule for `[AUDIT-FIRST]` items:** the AI must first check the actual current state
in code before changing anything:
- ✅ Exists and works correctly → leave it alone, just confirm.
- 🔧 Exists but incomplete/broken → improve it.
- 🆕 Doesn't exist → build it fresh.

---

## PHASE A — Critical Fixes (do these first, ~1 week)

These are small, high-impact fixes identified directly in the audit. No new features yet,
just closing existing gaps.

### A.1 Wire Up Visit Tracking

```
My admin portal has a PageVisit database model and a Monitoring dashboard page that's
supposed to show traffic, but the frontend never actually calls the tracking endpoint, so
traffic always shows 0. Find the PageVisit model and the Monitoring page's data source in
my React 19 + Node/Express 5 + Prisma codebase.

1) Add a lightweight tracking call (e.g. in a root layout/App-level effect) that fires on
   route change and logs to the PageVisit table via the existing backend endpoint (or
   create one if it doesn't exist).
2) Make sure it does NOT track authenticated admin routes' own internal navigation as
   public site traffic if that's not the intent -- confirm with me what PageVisit is
   actually meant to track (public site visits vs admin panel usage) before wiring it, by
   checking how PageVisit relates to other models.
3) Confirm the Monitoring dashboard correctly reflects real data after this fix.
Tell me exactly which files you changed.
```

### A.2 Wrap App with ErrorBoundary

```
My React 19 admin portal does not have an ErrorBoundary wrapping the app, so any runtime
crash shows a blank white screen with nothing logged. Fix this:
1) Create (or find if one already exists elsewhere unused) an ErrorBoundary component that
   catches render errors and shows a friendly fallback UI ("Something went wrong" + a
   "Reload" button) instead of a blank screen.
2) Wrap the app's root in main.jsx (or equivalent entry point) with this ErrorBoundary.
3) Log caught errors to the existing ErrorLog model/backend (the audit shows an ErrorLog
   model already exists -- reuse it, don't create a duplicate logging system).
Confirm the fix by describing how you'd test it (e.g. throwing a test error in a
component).
```

### A.3 Fix Sidebar Role Gating (UI-level)

```
In my admin portal, SUPER_ADMIN-only pages (Backup, Integrations, Monitoring) currently
appear in the sidebar for ADMIN role users too -- they only get blocked at the API level
(403), which is confusing UX and a minor information-leak (ADMIN sees links to pages they
can't use). Fix the sidebar/navigation component:
1) Find where the sidebar menu items are defined and how the current user's role is
   available in that context.
2) Add role-based conditional rendering so SUPER_ADMIN-only menu items are simply not
   rendered at all for ADMIN role users.
3) Do a full audit of ALL sidebar items against actual route permissions (check route
   guards/middleware) and fix any other mismatches you find between "what's shown in
   sidebar" vs "what the role can actually access" -- list every mismatch found and fixed.
```

### A.4 Add Input Validation on CMS Admin Routes

```
The audit found that CMS admin routes (Services, Projects, Team, FAQs, Testimonials,
Milestones, Partners, Blog Posts) do not have input validation, unlike other parts of the
app. Fix this using the same validation approach/library already used elsewhere in the
codebase if one exists (check other routes for express-validator or similar patterns
first, and stay consistent -- don't introduce a second validation library).
1) Add validation for all CREATE and UPDATE endpoints in these CMS modules: required
   fields, string length limits, proper types, and sanitization against XSS for any
   rich-text/HTML fields.
2) Return clear, consistent error messages matching the format used elsewhere in the API.
3) List every route you added validation to.
```

### A.5 Expand Activity Log to Cover CMS Actions

```
My admin portal has an ActivityLog model, but the audit found it currently only logs
Work Management actions, not CMS actions (Services, Projects, Team, Testimonials, FAQs,
Milestones, Partners, Blog edits/deletes). Fix this:
1) Find how ActivityLog entries are currently created for Work Management (the existing
   pattern) and replicate the same approach for all CMS CRUD operations.
2) Every CREATE, UPDATE, and DELETE across CMS modules should log: which admin did it,
   what action, what record, and timestamp.
3) Confirm the existing Activity Log admin page correctly displays these new CMS log
   entries alongside Work Management ones (same list, filterable by module if that's
   already supported, or add a simple module filter dropdown if not).
This is important groundwork before adding the Staff role in Phase B, since accountability
matters more once more people have write access.
```

---

## PHASE B — Staff Role (new role, limited access)

Goal: add a real STAFF role so employees can log in and manage only their own work,
without touching CMS, CRM, Settings, or other admins' data.

### B.1 Add STAFF Role to Schema & Auth

```
Add a new STAFF role to my admin portal (currently only SUPER_ADMIN and ADMIN exist in
the Prisma schema and auth middleware). Requirements:
1) Add STAFF to the role enum in the Prisma schema and run/prepare the migration.
2) Update the JWT/auth middleware so STAFF role users can log in through the existing
   auth flow (same JWT httpOnly cookie + refresh token system, same 2FA if currently
   required for all roles -- confirm and keep consistent) but are recognized as a
   distinct role in all permission checks.
3) Do NOT give STAFF access to any route yet in this step -- just get the role type
   working end-to-end (schema, login, JWT payload, role check middleware recognizes it).
Show me the exact files changed.
```

### B.2 Define & Enforce Staff Permissions

```
Now define what STAFF role can actually access in my admin portal, based on the existing
route/module structure (CMS, CRM/Leads, Careers/HR, Blog, Work Management, Site Settings,
Integrations, Backup, Monitoring). Requirements:
1) STAFF should have access to: Work Management module (Tasks/Kanban, Notes, Calendar) --
   but ONLY tasks/notes assigned to or created by them, not all staff's data. Check how
   WorkTask and QuickNote models relate to users and filter queries accordingly.
2) STAFF should have READ-ONLY access to: CRM/Leads (so they can see leads relevant to
   their work) -- no create/edit/delete.
3) STAFF should have NO access to: CMS, Careers/HR admin, Blog admin, Site Settings,
   Integrations, Backup, Monitoring, Activity Log (full log -- they can see their own
   actions only if needed).
4) Update backend route middleware for every affected route to enforce these rules.
5) Update the sidebar (using the same pattern fixed in Phase A.3) so STAFF only sees menu
   items they actually have access to.
List every route and every sidebar item affected.
```

### B.3 Staff-Specific Dashboard View

```
Check my admin portal's existing Dashboard page. First tell me what it currently shows
and whether it's role-aware (different content per role) or shows the same thing to
everyone.

IF DASHBOARD IS ALREADY ROLE-AWARE AND JUST NEEDS A STAFF VIEW ADDED: add it.
IF DASHBOARD SHOWS THE SAME CONTENT TO EVERYONE: refactor it to be role-aware, adding a
STAFF-specific view without breaking the existing SUPER_ADMIN/ADMIN views.

Requirements for the STAFF dashboard view: show only their own assigned tasks (count +
upcoming deadlines), their recent notes, and a simple calendar snippet of their own
upcoming items. No company-wide stats, no leads/CRM numbers, no financial data.
```

### B.4 Staff Account Management (Admin Side)

```
Check my admin portal for how SUPER_ADMIN/ADMIN currently create and manage admin
accounts. First tell me what exists (is there already an "Admin Users" management page?).

IF ADMIN USER MANAGEMENT EXISTS: extend it so SUPER_ADMIN/ADMIN can create new STAFF
accounts (name, email, initial password/invite flow, assign role) using the same UI
pattern already used for creating ADMIN accounts.
IF IT DOES NOT EXIST AT ALL: build a simple "Team Members" admin page where SUPER_ADMIN
can view all admin/staff accounts, create new ones (STAFF and ADMIN), deactivate/reactivate
accounts (don't hard-delete, to preserve activity log integrity -- check if a soft
delete/isActive flag pattern already exists on the Admin model and reuse it, or add one).
```

---

## PHASE C — Client Portal (new role, filtered access)

Goal: give clients a limited login to check their own project status, milestones,
invoices, and documents — reducing manual follow-up calls/WhatsApp messages.

### C.1 Add CLIENT Role & Separate Login

```
The audit shows a ClientProject model already exists in my Prisma schema, but there's no
CLIENT role or client-facing login. Build this out:
1) Add a CLIENT role (or a separate Client model entirely if that's cleaner given how
   ClientProject currently relates to data -- check the schema and recommend the better
   approach, then implement it).
2) Build a SEPARATE login flow/route for clients (e.g. portal.hindustanprojects.in/client-login),
   distinct from the admin login -- do not mix client auth into the same login page as
   SUPER_ADMIN/ADMIN/STAFF, for clarity and security separation. Reuse the existing JWT
   httpOnly cookie approach for consistency, but scope the token/session clearly as a
   client session.
3) Clients should NOT have 2FA required by default (keep onboarding simple for
   non-technical clients) unless I say otherwise -- confirm this assumption with me in
   your response.
Show me the schema changes and new auth routes.
```

### C.2 Client Account Creation Flow (Admin Side)

```
Build a way for SUPER_ADMIN/ADMIN to create client login accounts linked to an existing
ClientProject record. Requirements:
1) On the Client Projects admin page (check what exists there already per the audit --
   it's listed as a working module), add an action to "Create Client Login" for a given
   project/client -- generates credentials or sends an invite email (reuse existing email
   notification system already in place per the audit) with a set-password link.
2) One client account should be linkable to one or more of their ClientProject records
   (in case the same client has multiple projects with us) -- check the current data
   model and design accordingly.
3) SUPER_ADMIN/ADMIN should be able to deactivate a client's login access without
   deleting their project history.
```

### C.3 Client-Facing Portal Pages

```
Build the actual client-facing pages for the new CLIENT role, scoped so each client only
ever sees their own linked ClientProject data (never other clients' data -- enforce this
at the query level, not just UI hiding). Requirements:
1) Client Dashboard: overview of their project(s) -- current status, next milestone,
   recent updates.
2) Project Detail page: milestones list (using the existing Milestone model if it's
   shared/reusable, or a client-specific equivalent), current phase, and a simple status
   timeline.
3) Documents section: list of files shared with them for this project (this depends on
   Phase D's file attachment system -- if that's not built yet, scaffold this page to be
   ready for it, but you can build a basic version now using simple file URLs stored on
   the ClientProject record if a full attachment system isn't ready).
4) Keep the design simple and clean, matching the main site's red/blue/white brand but
   visually distinct enough from the internal admin panel that it feels like "their own
   space", not an internal tool.
Do NOT include invoice/payment status in this phase unless a Payment/Invoice model already
exists in my schema -- check first and tell me if it doesn't, since that would need to be
built separately before this page can show real data.
```

### C.4 Client Notification on Project Updates

```
Check my admin portal's existing notification system (the audit shows email + WhatsApp
notifications already work for leads). Extend this pattern (don't build a new system) so
that when a project's status or milestone changes in the admin panel, the linked client
automatically gets an email notification: "Your project [Name] has an update -- check your
portal". Keep it simple, one notification type for now, using the existing email sending
setup.
```

---

## PHASE D — Enhanced Admin Features

Goal: the "future/nice-to-have" items from the audit, now prioritized for real
implementation since the portal is maturing.

### D.1 Global Search (Cross-Module)

```
Check my admin portal for any existing search beyond the Blog search mentioned in the
audit. Build a global search feature:
1) A search bar in the admin header, accessible from every page.
2) Search across: Leads (name, email, phone), Client Projects (project name, client
   name), Work Tasks (title), Blog Posts (title), Team Members (name) -- and any other
   modules you find with a clear "name/title" field.
3) Results grouped by module in a dropdown/results page, each linking directly to the
   relevant record's edit/detail view.
4) Respect role permissions -- a STAFF user's search results should only include what
   they're allowed to see (reuse the permission logic from Phase B.2), and CLIENT role
   should never have access to this global search at all (it's admin-only).
Keep the implementation simple -- a basic SQL LIKE/ILIKE query across the relevant tables
is fine for current data volume, no need for a dedicated search engine.
```

### D.2 Soft Delete / Recycle Bin

```
Check my admin portal's current delete behavior across modules (CMS, CRM, Work
Management, etc.) -- the audit indicates SUPER_ADMIN can hard-delete records. Implement
soft delete:
1) Add a `deletedAt` (nullable timestamp) field to the key models where accidental
   deletion would be costly: Services, Projects, TeamMember, Testimonial, ClientProject,
   WorkTask, ContactLead (check the full model list and confirm which ones make sense --
   skip logs/system tables).
2) Update all existing DELETE endpoints for these models to set `deletedAt` instead of
   actually removing the row, and update all existing READ/LIST queries to exclude
   soft-deleted records by default.
3) Build a simple "Recycle Bin" admin page (SUPER_ADMIN only) listing soft-deleted items
   across modules with "Restore" and "Delete Permanently" actions.
4) Add a scheduled cleanup note (don't necessarily automate it yet, just document): items
   older than 30 days in the recycle bin could be candidates for permanent deletion.
List every model and endpoint you changed.
```

### D.3 Bulk CSV Import

```
The audit shows CSV export already works for Leads and Job Applications, but no bulk
import exists anywhere. Build bulk CSV import for at least the Leads module (extend to
others if the pattern is reusable):
1) An "Import CSV" button on the Leads admin page with a file upload + column mapping UI
   (let the admin map CSV columns to Lead fields, since exported files from other CRMs
   won't match exactly).
2) Validate each row before import (reuse validation logic from Phase A.4 if applicable)
   and show a summary before committing: "X valid rows, Y rows with errors" with error
   details per row.
3) Log the bulk import action in the Activity Log (Phase A.5 pattern).
4) Handle duplicates sensibly -- check by email/phone and let the admin choose to skip or
   update existing records.
```

### D.4 File Attachments (Leads, Tasks, Client Projects)

```
My admin portal has Cloudinary already integrated (per the audit, under Integrations).
Build a file attachment system reusing this existing Cloudinary setup:
1) Add attachment support to: ContactLead (e.g. attached brief/requirements doc), WorkTask
   (reference files), and ClientProject (deliverables/contracts -- this also feeds Phase
   C.3's client-facing documents section).
2) Add an `Attachment` model (fileName, fileUrl, fileType, uploadedBy, linked record
   type+id, uploadedAt) if one doesn't already exist -- check first.
3) Build a simple reusable upload component (drag-drop or click-to-upload) used across
   these three modules, uploading via the existing Cloudinary integration.
4) Enforce reasonable file size/type limits and show upload progress.
5) Make sure CLIENT role users (Phase C) can only see attachments explicitly meant for
   them on their own ClientProject, not internal-only files -- add a simple
   `visibleToClient` boolean flag on attachments tied to ClientProject.
```

### D.5 PDF / Report Export

```
Check my admin portal's existing export functionality (audit shows CSV export and
JSON/SQL/HTML backup exports already exist). Add PDF report generation for:
1) Monthly Leads Summary (count by status, source breakdown if tracked).
2) Work Management summary (tasks completed vs pending per staff member, if Phase B is
   done -- otherwise per admin).
3) A single Client Project status report (usable both internally and as something
   downloadable from the Client Portal in Phase C.3).
Use a Node-compatible PDF library consistent with what's already available in my stack
(check package.json for anything already installed before adding a new dependency).
Add "Export as PDF" buttons on the relevant existing pages rather than building new pages
just for this.
```

### D.6 Dashboard Analytics Charts

```
Check my admin portal's existing Dashboard page (audit confirms it exists and is
functional, but doesn't mention charts). Add visual analytics:
1) Leads over time (line/bar chart, last 30/90 days).
2) Task completion rate (Work Management module).
3) Traffic overview chart (once Phase A.1's visit tracking fix is in place -- don't build
   this chart until that's confirmed working, or it'll show empty/zero data).
Use a charting library already in the project if one exists (check package.json), 
otherwise pick a lightweight React-compatible option and confirm with me before adding a
new dependency. Keep charts role-aware per Phase B.3 (STAFF shouldn't see company-wide
charts).
```

### D.7 Dedicated Pages for Partial Features

```
The audit found two features that are "partial" -- working in the backend/widget but
without a dedicated management page:
1) Social Post Drafts -- currently only a dashboard widget. Build a full dedicated admin
   page to create, edit, schedule (if scheduling logic exists), and delete social post
   drafts, instead of only the limited dashboard widget view.
2) Chatbot Inquiries -- currently only visible in the notification dropdown. Build a
   dedicated admin page listing all chatbot inquiries with status (new/responded/closed),
   search/filter, and the ability to mark as handled or respond directly if a response
   channel exists.
Check both existing implementations first and reuse their data/backend logic --  you're
building the missing UI layer, not new backend systems.
```

---

## Priority Order (overall)

1. **Phase A** (all 5) — critical fixes, do first, low effort
2. **Phase B** (Staff role) — unlocks safe delegation to employees
3. **Phase C** (Client Portal) — directly reduces manual client follow-up, client-facing value
4. **Phase D** — pick based on actual pain points once A-C are live:
   - If losing track of records → D.2 (Soft delete) + D.1 (Global search) first
   - If manually re-entering old data → D.3 (Bulk import) first
   - If sending files over WhatsApp/email → D.4 (Attachments) first
   - Reporting to clients/stakeholders → D.5 (PDF export) + D.6 (Dashboard charts)
   - D.7 (Social Drafts + Chatbot pages) — do whenever convenient, low urgency
