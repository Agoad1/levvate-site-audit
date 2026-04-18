# Levvate Site Audit Tool

An AI-powered site assessment tool built for the Levvate sales team. Paste in a client's website URL, generate a structured audit in seconds, and download it as a PDF to use in sales conversations.

## What It Does

- Sales rep enters their email + a client's website URL
- Backend scrapes the site via Apify
- Claude analyzes the data and returns a structured audit
- Audit is displayed on screen broken into 4 sections: SEO Issues, Page Structure, AEO Improvements, and Recommendations
- Rep downloads the audit as a PDF and routes it to the client

## Tech Stack

- **Frontend:** Next.js 16.2.3, Tailwind CSS
- **Backend:** n8n workflow (webhook → Apify scrape → Claude node → respond)
- **PDF Export:** jsPDF / html2canvas
- **Deployment:** Vercel

## n8n Workflow

1. Webhook node — receives URL + email from frontend
2. Apify node — scrapes the target website
3. Claude node — analyzes scraped data, returns structured JSON audit
4. Respond to Webhook — sends JSON back to frontend

## Environment Variables

```
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url_here
```

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
/app
  page.tsx          # Main audit input + results page
  layout.tsx        # Root layout
/components
  AuditResults.tsx  # Renders the 4-section audit display
  PDFExport.tsx     # Handles PDF download
```

---

Built by Adam Goad — [Spengo](https://spengo.io)
