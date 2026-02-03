

# Fix EmailJS "API calls are disabled for non-browser applications" Error

## Problem Identified

The edge function logs show this error:
```
EmailJS error: API calls are disabled for non-browser applications
```

**Root Cause**: The current edge function uses EmailJS's REST API with only the **Public Key** (`user_id`). However, EmailJS requires a **Private Key** (called `accessToken`) for server-side/non-browser API calls. The public key is designed exclusively for browser SDK usage.

---

## Solution Overview

Add the EmailJS **Private Key** to the edge function's API request. This is the correct approach because:
- Keeps server-side rate limiting (secure)
- Private key stays in the backend (never exposed to browser)
- Maintains the existing secure architecture

---

## Implementation Steps

### Step 1: Add EmailJS Private Key Secret

You need to add your EmailJS Private Key as a secret in Lovable Cloud:

1. Go to your EmailJS dashboard at [emailjs.com](https://dashboard.emailjs.com)
2. Navigate to **Account** (top right) then **API Keys**
3. Copy your **Private Key** (not the Public Key)
4. In Lovable, the system will prompt you to add this secret

Secret name: `EMAILJS_PRIVATE_KEY`

---

### Step 2: Update Edge Function

Modify `supabase/functions/send-contact-email/index.ts` to include the `accessToken` in the API request:

**Current code (broken):**
```typescript
body: JSON.stringify({
  service_id: emailjsServiceId,
  template_id: emailjsTemplateId,
  user_id: emailjsPublicKey,  // Only public key - won't work server-side
  template_params: { ... },
}),
```

**Fixed code:**
```typescript
body: JSON.stringify({
  service_id: emailjsServiceId,
  template_id: emailjsTemplateId,
  user_id: emailjsPublicKey,
  accessToken: emailjsPrivateKey,  // ADD: Private key for server-side auth
  template_params: { ... },
}),
```

---

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/send-contact-email/index.ts` | Add `accessToken` field with private key to EmailJS API request |

---

## Code Changes Detail

### Edge Function Update

1. Read the new secret:
```typescript
const emailjsPrivateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");
```

2. Validate it exists:
```typescript
if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey || !emailjsPrivateKey) {
  console.error("Missing EmailJS configuration");
  throw new Error("Email service configuration is missing");
}
```

3. Include in API request body:
```typescript
body: JSON.stringify({
  service_id: emailjsServiceId,
  template_id: emailjsTemplateId,
  user_id: emailjsPublicKey,
  accessToken: emailjsPrivateKey,  // Required for server-side calls
  template_params: {
    from_name: name,
    reply_to: email,
    subject: subject,
    message: message,
  },
}),
```

---

## Security Notes

- The Private Key is stored securely in Lovable Cloud secrets (encrypted)
- It is only used in the edge function (server-side), never exposed to the browser
- This approach maintains the secure rate-limiting architecture already in place

---

## After Implementation

Once the private key is added and the edge function is updated:
1. The contact form submissions will work correctly
2. Server-side rate limiting remains active (3 submissions per hour per IP)
3. All EmailJS credentials stay secure on the backend

