CREATE TABLE public.whitelist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  email TEXT NOT NULL,
  x_username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX whitelist_signups_wallet_address_key ON public.whitelist_signups (lower(wallet_address));
CREATE UNIQUE INDEX whitelist_signups_email_key ON public.whitelist_signups (lower(email));

GRANT ALL ON public.whitelist_signups TO service_role;

ALTER TABLE public.whitelist_signups ENABLE ROW LEVEL SECURITY;