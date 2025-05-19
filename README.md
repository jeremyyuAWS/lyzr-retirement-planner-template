📄 PRD: AI Webinar Outreach Agent Demo App  
📍 Goal: Reach out to 1000+ prospects via multi-channel outreach (email, SMS, LinkedIn, voice), convert them into webinar registrants using agent automation and a chat-first UI.

=====================
🔧 1. SYSTEM OVERVIEW
=====================
This demo app simulates an AI-powered agent workflow to drive webinar registrations through personalized outbound engagement. It supports modular tabs, scoped conversation flows, and synthetic data, built using `shadcn/ui`, React, and Tailwind.

===========================
🧱 2. ARCHITECTURE & SETUP
===========================
- Modular folder structure for each tab/agent
- Simulated data in JSON format (no live APIs)
- UI-first design (chat + visual content per tab)
- Pre-written, multi-turn conversations autoplayed

**/components/**
- ChatModal.tsx
- EmailOutreach.tsx
- SMSAgent.tsx
- LinkedInAgent.tsx
- CallAgent.tsx
- RegistrationDashboard.tsx

**/data/**
- leads.json
- webinar_details.json
- outreach_templates.json
- simulated_responses.json

**/agents/**
- email_agent.json
- sms_agent.json
- linkedin_agent.json
- call_agent.json

**/public/images/**
- avatars, webinar flyer, outreach screenshots

===============================
🧠 3. CORE MODULES & FEATURES
===============================

### 1. **Plan Campaign** (Tab 1)
- Set up webinar title, date, CTA link
- Upload contact CSV or choose segment
- Agent recommends best outreach channels based on metadata

### 2. **Email + SMS Outreach** (Tab 2)
- Simulate email + SMS drip sequence (template + personalization)
- Show example outreach with open/response tracking

### 3. **LinkedIn Outreach** (Tab 3)
- Simulate AI reaching out via InMail + DMs
- Suggests message variants by title, location, or company

### 4. **Voice Agent Outreach** (Tab 4)
- Simulate a voice call campaign (TTS sample using ElevenLabs or similar)
- Show lead responses + follow-up automation

### 5. **Registration Conversion Dashboard** (Tab 5)
- Display synthetic stats: reach rate, conversions, bounce rate
- Show feedback loop to retrain messages (Agentic loop)

=======================================
🧹 4. RETIREMENT PLANNER CLEAN-UP GUIDE
=======================================

Delete these files and references from the existing Retirement Planner Bolt app:

🗑️ **Components to Delete**  
- `/components/Plan.tsx`  
- `/components/Simulate.tsx`  
- `/components/Compare.tsx`  
- `/components/Finalize.tsx`

🗑️ **Data Files to Delete**  
- `/data/retirement_plan.json`  
- `/data/retirement_assumptions.json`  
- `/data/simulation_results.json`

🗑️ **Images to Delete**  
- Any `/public/images/retirement_*.*` files

🧼 **Other Clean-up**  
- Replace `/agents/*retirement*.json` with outreach agent configs  
- Update project metadata (README, titles, and tab labels)

=======================
📈 5. UX & UI PRINCIPLES
=======================
- Chat modal with "Auto Play Demo" per tab  
- Floating chat on bottom right, single click open/close  
- Use realistic avatars for each agent (email, SMS, etc.)  
- Autotyping animation for realism  
- "Reset" and "Replay Tab" buttons  
- Rich visuals (email previews, SMS screenshots, audio waveform)

==============================
🧪 6. DEMO BEHAVIOR SIMULATION
==============================

Pre-written chat sequences for:
- Email outreach with subject line A/B testing
- SMS timing effectiveness
- LinkedIn message variants
- Voice call script: AI asks, waits, responds, then sends link

=================================
🔚 7. DELIVERABLES & NEXT STEPS
=================================

✅ Fully modular Bolt app  
✅ Simulated outreach logic and data  
✅ Clear tab-based navigation  
✅ Marketing demo narrative  
✅ Clean removal of all retirement planner content  

---

📌 Name Suggestion: `WebiGenie`  
📣 Tagline: *“AI-Powered Outreach to Fill Your Webinar Room”*

Let me know if you want a starter folder structure or markdown-based `README.md` for GitHub/Bolt.
