ALTER TABLE "visitors" ADD COLUMN IF NOT EXISTS "device" text;--> statement-breakpoint
ALTER TABLE "visitors" ADD COLUMN IF NOT EXISTS "browser" text;--> statement-breakpoint
ALTER TABLE "visitors" ADD COLUMN IF NOT EXISTS "first_campaign_id" text;--> statement-breakpoint
ALTER TABLE "visitors" ADD COLUMN IF NOT EXISTS "last_campaign_id" text;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD COLUMN IF NOT EXISTS "content" text;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD COLUMN IF NOT EXISTS "term" text;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD COLUMN IF NOT EXISTS "campaign_id" text;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD COLUMN IF NOT EXISTS "referrer" text;
