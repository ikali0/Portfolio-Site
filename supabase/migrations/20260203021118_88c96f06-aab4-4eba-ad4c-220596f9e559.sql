-- RLS Policy for contact_rate_limits table
-- This table is used by the edge function (service role) to track IP-based rate limits
-- No user authentication is required - the edge function handles all operations

-- Allow the edge function (using service role) to manage rate limits
-- Service role bypasses RLS, so we only need policies for anon/authenticated if needed

-- Policy: Allow INSERT for anyone (the edge function inserts with service role, 
-- but we add this for safety if someone tries to call directly)
CREATE POLICY "Edge function can insert rate limits"
ON public.contact_rate_limits
FOR INSERT
TO anon, authenticated
WITH CHECK (false);  -- Block direct inserts from client, only service role can insert

-- Policy: Block SELECT for clients (only edge function with service role can read)
CREATE POLICY "Block direct reads from rate limits"
ON public.contact_rate_limits
FOR SELECT
TO anon, authenticated
USING (false);

-- Policy: Block UPDATE for everyone
CREATE POLICY "Block updates to rate limits"
ON public.contact_rate_limits
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Policy: Block DELETE for clients (only service role can delete via cleanup function)
CREATE POLICY "Block direct deletes from rate limits"
ON public.contact_rate_limits
FOR DELETE
TO anon, authenticated
USING (false);