# Re-enrollment Dashboard Prototype

Interactive prototype for Maria's re-enrollment command center — built for the Brightwheel take-home assignment.

**Live demo:** https://costark-bloom.github.io/brightwheel-reenrollment/

**Source code:** https://github.com/costark-bloom/brightwheel-reenrollment

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## What this prototype demonstrates

### Director-side (Maria)
- **Re-enrollment dashboard** under My School → Re-enrollment
- **At-a-glance stats**: confirmed, pending, unconfirmed families, and revenue at risk
- **Priority-sorted family list** by status, days since last contact, and monthly revenue
- **One-click nudges** — individual, bulk-selected, or all unconfirmed
- **Director-approved messaging** with recommended templates and in-app + SMS channel toggles
- **Real-time status updates** when nudges are sent or families confirm

### Parent-side (preview)
- Click **Preview** on any family row to see the parent confirmation flow
- One-tap confirmation with no login required
- Confirming updates Maria's dashboard in real time

## Scenario data

The prototype reflects Maria's case:
- 11 unconfirmed families
- Last bulk reminder sent 10 days ago
- Re-enrollment deadline 2 weeks away (July 8, 2026)

## Tech stack

- React + Vite
- No external UI libraries — custom CSS matching Brightwheel's purple sidebar and teal accent palette
