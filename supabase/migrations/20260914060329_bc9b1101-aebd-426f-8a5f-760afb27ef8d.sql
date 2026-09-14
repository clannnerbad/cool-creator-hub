ALTER TABLE public.whitelist_signups DROP COLUMN IF EXISTS email;

ALTER TABLE public.whitelist_signups ADD COLUMN IF NOT EXISTS x_comment_link text NOT NULL DEFAULT '';

DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT indexname FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'whitelist_signups' AND indexdef ILIKE '%email%' LOOP
    EXECUTE format('DROP INDEX public.%I', r.indexname);
  END LOOP;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS whitelist_signups_wallet_lower_uidx ON public.whitelist_signups (lower(wallet_address));
CREATE UNIQUE INDEX IF NOT EXISTS whitelist_signups_x_username_lower_uidx ON public.whitelist_signups (lower(x_username));