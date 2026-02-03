
# Plan: Add EmailJS Environment Variables

## Overview

Add the EmailJS public configuration variables to the `.env` file so the contact form works correctly and the security scan no longer flags them as missing.

---

## What Will Be Added

```text
.env file additions:
─────────────────────────────────────────
VITE_EMAILJS_SERVICE_ID=altruisticxai@gmail.com
VITE_EMAILJS_PUBLIC_KEY=65eWYLkIKGyzzMajE
VITE_EMAILJS_TEMPLATE_ID=SITE_FORM
─────────────────────────────────────────
```

---

## Security Note

**The private key will NOT be added.** You mentioned `VITE_EMAILJS_PRIVATE_KEY`, but:

1. Any variable prefixed with `VITE_` is exposed to the browser - this would leak your private key to anyone viewing your site
2. EmailJS browser SDK only needs the **public key** - the private key is never used client-side
3. We just deleted this secret from Cloud for this exact reason

If you ever need server-side email functionality, the private key should be stored as a Cloud secret (without the `VITE_` prefix) and used only in edge functions.

---

## Service ID Verification

The value `altruisticxai@gmail.com` looks like an email address rather than a typical EmailJS service ID (usually `service_xxx`). 

**Please verify in your EmailJS dashboard:**
1. Go to https://dashboard.emailjs.com/admin
2. Click "Email Services" in the sidebar
3. The Service ID is shown next to your email service (not the connected email address)

If `altruisticxai@gmail.com` is correct, I'll use it. Otherwise, provide the actual service ID.

---

## File Changes

| File | Action |
|------|--------|
| `.env` | Add 3 EmailJS variables |

---

## Technical Details

```text
// Current .env
VITE_SUPABASE_PROJECT_ID="hypzrzcwddqrgwxdubfv"
VITE_SUPABASE_PUBLISHABLE_KEY="..."
VITE_SUPABASE_URL="https://..."

// After update
VITE_SUPABASE_PROJECT_ID="hypzrzcwddqrgwxdubfv"
VITE_SUPABASE_PUBLISHABLE_KEY="..."
VITE_SUPABASE_URL="https://..."
VITE_EMAILJS_SERVICE_ID="altruisticxai@gmail.com"
VITE_EMAILJS_PUBLIC_KEY="65eWYLkIKGyzzMajE"
VITE_EMAILJS_TEMPLATE_ID="SITE_FORM"
```

---

## After Implementation

- The contact form will use these values from `import.meta.env`
- Security scan will no longer show missing EmailJS config
- No secrets will be exposed in client-side code
