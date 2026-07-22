import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ku', 'ar');
  CREATE TYPE "public"."enum_website_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'whatsapp', 'x');
  CREATE TABLE "speakers_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar NOT NULL
  );
  
  CREATE TABLE "speakers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "speakers_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news_articles_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "news_articles_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar NOT NULL
  );
  
  CREATE TABLE "news_articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_articles_locales" (
  	"title" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar DEFAULT 'Uploaded file',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"speakers_id" integer,
  	"news_articles_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "website_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"display" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "website_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "website_header_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "website_footer_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "website_footer_nav_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "website_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_website_footer_social_links_platform" NOT NULL,
  	"href" varchar DEFAULT '#' NOT NULL
  );
  
  CREATE TABLE "website_footer_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "website_footer_program_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "website_footer_program_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "website" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"contact_email" varchar DEFAULT 'info@bipprograms.com' NOT NULL,
  	"header_ctas_contact_href" varchar DEFAULT '/contact',
  	"header_ctas_join_href" varchar DEFAULT '/join',
  	"enable_english" boolean DEFAULT true,
  	"enable_kurdish" boolean DEFAULT true,
  	"enable_arabic" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "website_locales" (
  	"site_title" varchar DEFAULT 'BIP Summit' NOT NULL,
  	"title_template" varchar DEFAULT '%s | BIP Summit' NOT NULL,
  	"meta_description" varchar DEFAULT 'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.' NOT NULL,
  	"copyright" varchar DEFAULT '© 2026, BIP Program. All rights reserved to BIP Program.' NOT NULL,
  	"pioneering_headline" varchar DEFAULT 'A pioneering program that unites companies, innovators, and investors for a shared future of prosperity.' NOT NULL,
  	"program_blurb" varchar DEFAULT 'The Becoming International Professionals (BIP) Program connects global expertise with regional opportunity across construction, banking, green energy, tourism, AI, healthcare, and franchise development.' NOT NULL,
  	"program_intro" varchar DEFAULT 'The Becoming International Professionals (BIP) Program is a specialized international initiative that turns introductions into investment outcomes.' NOT NULL,
  	"cta_band_body" varchar DEFAULT 'BIP connects companies, innovators, and investors to build lasting prosperity across the region.' NOT NULL,
  	"cta_band_heading" varchar DEFAULT 'Get in Touch' NOT NULL,
  	"header_ctas_contact_label" varchar DEFAULT 'Contact',
  	"header_ctas_join_label" varchar DEFAULT 'Join Us',
  	"header_ctas_ask_ai_label" varchar DEFAULT 'Ask BIP AI',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_locales" (
  	"home_seo_title" varchar DEFAULT 'BIP Summit' NOT NULL,
  	"home_seo_description" varchar DEFAULT 'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.' NOT NULL,
  	"about_seo_title" varchar DEFAULT 'About' NOT NULL,
  	"about_seo_description" varchar DEFAULT 'Learn about the BIP Program — connecting companies, innovators, and investors across the Kurdistan Region.' NOT NULL,
  	"about_eyebrow" varchar DEFAULT 'About Us' NOT NULL,
  	"summits_seo_title" varchar DEFAULT 'Summits' NOT NULL,
  	"summits_seo_description" varchar DEFAULT 'Explore BIP Summit editions — agendas, outcomes, and investment conversations from Erbil.' NOT NULL,
  	"news_seo_title" varchar DEFAULT 'News & Blogs' NOT NULL,
  	"news_seo_description" varchar DEFAULT 'News and stories from BIP Summits and the BIP Program community.' NOT NULL,
  	"speakers_seo_title" varchar DEFAULT 'Speakers' NOT NULL,
  	"speakers_seo_description" varchar DEFAULT 'Meet the speakers shaping BIP Summit conversations.' NOT NULL,
  	"speakers_listing_title" varchar DEFAULT 'Meet Our Speakers' NOT NULL,
  	"join_seo_title" varchar DEFAULT 'Join BIP Program' NOT NULL,
  	"join_seo_description" varchar DEFAULT 'Join the BIP Program and stay connected to summits, dealrooms, and follow-up.' NOT NULL,
  	"join_form_title" varchar DEFAULT 'Join BIP Program' NOT NULL,
  	"join_success_title" varchar DEFAULT 'Successfully Registered' NOT NULL,
  	"partner_seo_title" varchar DEFAULT 'Become a Partner' NOT NULL,
  	"partner_seo_description" varchar DEFAULT 'Become a BIP partner — sponsor a track or collaborate on market entry.' NOT NULL,
  	"partner_form_title" varchar DEFAULT 'Become a Partner' NOT NULL,
  	"partner_benefits_heading" varchar DEFAULT 'Program Benefits' NOT NULL,
  	"contact_seo_title" varchar DEFAULT 'Contact' NOT NULL,
  	"contact_seo_description" varchar DEFAULT 'Get in touch with the BIP Program team.' NOT NULL,
  	"contact_eyebrow" varchar DEFAULT 'Contact Us' NOT NULL,
  	"contact_heading" varchar DEFAULT 'Get in Touch' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sections_mission_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_mission_tabs_locales" (
  	"label" varchar NOT NULL,
  	"lead" varchar NOT NULL,
  	"emphasis" varchar NOT NULL,
  	"trail" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "sections_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_sectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "sections_sectors_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_summit_editions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"href" varchar DEFAULT '/summits' NOT NULL
  );
  
  CREATE TABLE "sections_summit_editions_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"youtube_url" varchar DEFAULT 'https://www.youtube.com' NOT NULL,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "sections_videos_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "sections_gallery_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_media_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "sections_media_channels_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_program_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "sections_program_highlights_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections_partnership_sponsor_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "sections_partnership_collaborator_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "sections_ai_chat_replies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "sections_ai_chat_replies_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sections_locales" (
  	"partnership_sponsor_title" varchar NOT NULL,
  	"partnership_sponsor_description" varchar NOT NULL,
  	"partnership_collaborator_title" varchar NOT NULL,
  	"partnership_collaborator_description" varchar NOT NULL,
  	"section_intros_speakers" varchar DEFAULT 'Hear from founders, policymakers, and operators who are shaping investment and innovation across the Kurdistan Region and beyond.' NOT NULL,
  	"section_intros_sectors" varchar DEFAULT 'BIP focuses capital and collaboration on the industries driving the next decade of regional growth.' NOT NULL,
  	"section_intros_youtube" varchar DEFAULT 'Catch keynotes, panels, and dealroom moments from recent BIP Summit editions.' NOT NULL,
  	"section_intros_news" varchar DEFAULT 'Updates from the BIP community — summits, partnerships, and the deals taking shape on the ground.' NOT NULL,
  	"section_intros_summits" varchar DEFAULT 'Each BIP Summit edition builds on the last: sharper agendas, deeper networks, clearer investment outcomes.' NOT NULL,
  	"section_intros_gallery" varchar DEFAULT 'Scenes from BIP Summit stages, site visits, and the conversations that turn introductions into partnerships.' NOT NULL,
  	"section_intros_media" varchar DEFAULT 'BIP Summit coverage across regional and international outlets covering investment, technology, and public–private collaboration.' NOT NULL,
  	"section_intros_countries" varchar DEFAULT 'Delegates and partners join BIP from across the Middle East, Europe, Asia, and North America.' NOT NULL,
  	"section_intros_related" varchar DEFAULT 'More stories from BIP Summits and the wider program network.' NOT NULL,
  	"form_intros_register" varchar DEFAULT 'Reserve your place at the next BIP Summit — two intensive days in Erbil with sector dealrooms, site visits, and structured follow-up.' NOT NULL,
  	"form_intros_join" varchar DEFAULT 'The Becoming International Professionals (BIP) Program is a specialized international initiative.' NOT NULL,
  	"form_intros_partner" varchar DEFAULT 'Partner with BIP to host a sector track, meet decision-makers, and stay connected to the deals that start on site.' NOT NULL,
  	"form_intros_contact" varchar DEFAULT 'Tell us what you are exploring — registration, partnership, press, or investment introductions — and the BIP team will respond.' NOT NULL,
  	"ai_chat_welcome" varchar DEFAULT 'Welcome to BIP AI' NOT NULL,
  	"ai_chat_subtitle" varchar DEFAULT 'Ask anything about BIP Summit' NOT NULL,
  	"ai_chat_placeholder" varchar DEFAULT 'Ask Here...' NOT NULL,
  	"ai_chat_typing" varchar DEFAULT 'BIP AI is typing…' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "translations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "translations_locales" (
  	"register" varchar DEFAULT 'Register' NOT NULL,
  	"learn_more" varchar DEFAULT 'Learn More' NOT NULL,
  	"explore" varchar DEFAULT 'Explore' NOT NULL,
  	"view_all" varchar DEFAULT 'View All' NOT NULL,
  	"submit" varchar DEFAULT 'Submit' NOT NULL,
  	"join" varchar DEFAULT 'Join' NOT NULL,
  	"send_message" varchar DEFAULT 'Send Message' NOT NULL,
  	"contact" varchar DEFAULT 'Contact' NOT NULL,
  	"join_us" varchar DEFAULT 'Join Us' NOT NULL,
  	"ask_bip_ai" varchar DEFAULT 'Ask BIP AI' NOT NULL,
  	"close" varchar DEFAULT 'Close' NOT NULL,
  	"close_dialog" varchar DEFAULT 'Close dialog' NOT NULL,
  	"close_overlay" varchar DEFAULT 'Close {title}' NOT NULL,
  	"nav_home" varchar DEFAULT 'Home' NOT NULL,
  	"nav_about" varchar DEFAULT 'About' NOT NULL,
  	"nav_summits" varchar DEFAULT 'Summits' NOT NULL,
  	"nav_news" varchar DEFAULT 'News & Blogs' NOT NULL,
  	"nav_programs" varchar DEFAULT 'Programs' NOT NULL,
  	"nav_contact_us" varchar DEFAULT 'Contact Us' NOT NULL,
  	"nav_work_with_us" varchar DEFAULT 'Work With Us' NOT NULL,
  	"nav_register" varchar DEFAULT 'Register' NOT NULL,
  	"footer_nav_title" varchar DEFAULT 'NAVIGATION' NOT NULL,
  	"footer_social_title" varchar DEFAULT 'SOCIAL MEDIA' NOT NULL,
  	"footer_programs_title" varchar DEFAULT 'LAST PROGRAMS' NOT NULL,
  	"footer_contact_title" varchar DEFAULT 'Contact Dilnia' NOT NULL,
  	"footer_blurb" varchar DEFAULT 'Empowering innovation through strategic partnerships and sustainable growth solutions.' NOT NULL,
  	"logo_home_aria" varchar DEFAULT 'BIP Summit home' NOT NULL,
  	"logo_alt" varchar DEFAULT 'BIP Summit' NOT NULL,
  	"primary_nav_aria" varchar DEFAULT 'Primary' NOT NULL,
  	"mobile_nav_aria" varchar DEFAULT 'Mobile' NOT NULL,
  	"open_chat_aria" varchar DEFAULT 'Open BIP AI chat' NOT NULL,
  	"toggle_menu_aria" varchar DEFAULT 'Toggle menu' NOT NULL,
  	"social_facebook" varchar DEFAULT 'Facebook' NOT NULL,
  	"social_instagram" varchar DEFAULT 'Instagram' NOT NULL,
  	"social_linkedin" varchar DEFAULT 'Linkedin' NOT NULL,
  	"social_youtube" varchar DEFAULT 'Youtube' NOT NULL,
  	"social_whatsapp" varchar DEFAULT 'Whatsapp' NOT NULL,
  	"social_x" varchar DEFAULT 'X' NOT NULL,
  	"meet_our_speakers" varchar DEFAULT 'Meet Our Speakers' NOT NULL,
  	"key_sectors" varchar DEFAULT 'Key Sectors' NOT NULL,
  	"youtube_highlights" varchar DEFAULT 'YouTube Highlights' NOT NULL,
  	"news_blog" varchar DEFAULT 'News & Blog' NOT NULL,
  	"summits" varchar DEFAULT 'Summits' NOT NULL,
  	"gallery" varchar DEFAULT 'Gallery' NOT NULL,
  	"media_channels" varchar DEFAULT 'Media & Channels' NOT NULL,
  	"participating_countries" varchar DEFAULT 'Participating Countries' NOT NULL,
  	"program_benefits" varchar DEFAULT 'Program Benefits' NOT NULL,
  	"related_articles" varchar DEFAULT 'Related Articles' NOT NULL,
  	"about_speaker" varchar DEFAULT 'About Speaker' NOT NULL,
  	"about_us" varchar DEFAULT 'About Us' NOT NULL,
  	"contact_us" varchar DEFAULT 'Contact Us' NOT NULL,
  	"get_in_touch" varchar DEFAULT 'Get in Touch' NOT NULL,
  	"cta_band_heading" varchar DEFAULT 'Get in Touch' NOT NULL,
  	"pioneering_part1" varchar DEFAULT 'A pioneering program that unites ' NOT NULL,
  	"pioneering_part2" varchar DEFAULT 'companies, innovators, and investors ' NOT NULL,
  	"pioneering_part3" varchar DEFAULT 'for a shared future of prosperity.' NOT NULL,
  	"full_name" varchar DEFAULT 'Full Name' NOT NULL,
  	"last_name" varchar DEFAULT 'Last Name' NOT NULL,
  	"company_name" varchar DEFAULT 'Company Name' NOT NULL,
  	"position_title" varchar DEFAULT 'Position / Title' NOT NULL,
  	"email_address" varchar DEFAULT 'Email Address' NOT NULL,
  	"phone_number" varchar DEFAULT 'Phone Number' NOT NULL,
  	"address" varchar DEFAULT 'Address' NOT NULL,
  	"country_region" varchar DEFAULT 'Country Region' NOT NULL,
  	"industry_sector" varchar DEFAULT 'Industry sector' NOT NULL,
  	"partnership_type" varchar DEFAULT 'Partnership Type' NOT NULL,
  	"subject" varchar DEFAULT 'Subject' NOT NULL,
  	"message" varchar DEFAULT 'Message' NOT NULL,
  	"register_form_title" varchar DEFAULT 'Register for BIP Program' NOT NULL,
  	"register_submit" varchar DEFAULT 'Register' NOT NULL,
  	"join_form_title" varchar DEFAULT 'Join BIP Program' NOT NULL,
  	"join_submit" varchar DEFAULT 'Join' NOT NULL,
  	"consent_email_privacy" varchar DEFAULT 'I agree to receive email updates and accept the Privacy Policy.' NOT NULL,
  	"consent_newsletters" varchar DEFAULT 'I agree to receive newsletters, updates, and promotional offers. I can unsubscribe at any time.' NOT NULL,
  	"join_success_title" varchar DEFAULT 'Successfully Registered' NOT NULL,
  	"partner_form_title" varchar DEFAULT 'Become a Partner' NOT NULL,
  	"partner_submit" varchar DEFAULT 'Submit' NOT NULL,
  	"contact_submit" varchar DEFAULT 'Send Message' NOT NULL,
  	"option_kurdistan" varchar DEFAULT 'Kurdistan Region' NOT NULL,
  	"option_iraq" varchar DEFAULT 'Iraq' NOT NULL,
  	"option_uae" varchar DEFAULT 'United Arab Emirates' NOT NULL,
  	"option_other" varchar DEFAULT 'Other' NOT NULL,
  	"option_technology" varchar DEFAULT 'Technology & AI' NOT NULL,
  	"option_energy" varchar DEFAULT 'Green Energy' NOT NULL,
  	"option_healthcare" varchar DEFAULT 'Healthcare' NOT NULL,
  	"option_construction" varchar DEFAULT 'Construction' NOT NULL,
  	"option_banking" varchar DEFAULT 'Banking & Finance' NOT NULL,
  	"option_tourism" varchar DEFAULT 'Tourism & Hospitality' NOT NULL,
  	"option_franchise" varchar DEFAULT 'Franchise Development' NOT NULL,
  	"option_investment" varchar DEFAULT 'Investment' NOT NULL,
  	"option_sponsor" varchar DEFAULT 'Sponsor' NOT NULL,
  	"option_collaborator" varchar DEFAULT 'Collaborator' NOT NULL,
  	"option_media_partner" varchar DEFAULT 'Media Partner' NOT NULL,
  	"previous_image" varchar DEFAULT 'Previous image' NOT NULL,
  	"next_image" varchar DEFAULT 'Next image' NOT NULL,
  	"world_map_alt" varchar DEFAULT 'World map showing BIP Summit participating countries' NOT NULL,
  	"browse_news_aria" varchar DEFAULT 'Browse news articles' NOT NULL,
  	"browse_speakers_aria" varchar DEFAULT 'Browse speakers' NOT NULL,
  	"about_bip_aria" varchar DEFAULT 'About BIP' NOT NULL,
  	"page_coming_soon" varchar DEFAULT 'This page is coming soon.' NOT NULL,
  	"media_hero_alt" varchar DEFAULT 'Audience at a BIP Summit event' NOT NULL,
  	"chat_welcome" varchar DEFAULT 'Welcome to BIP AI' NOT NULL,
  	"chat_subtitle" varchar DEFAULT 'Ask anything about BIP Summit' NOT NULL,
  	"chat_placeholder" varchar DEFAULT 'Ask Here...' NOT NULL,
  	"send_message_aria" varchar DEFAULT 'Send message' NOT NULL,
  	"close_chat_aria" varchar DEFAULT 'Close BIP AI chat' NOT NULL,
  	"chat_sr_only" varchar DEFAULT 'BIP AI chat' NOT NULL,
  	"chat_typing" varchar DEFAULT 'BIP AI is typing…' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "speakers_bio" ADD CONSTRAINT "speakers_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "speakers" ADD CONSTRAINT "speakers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "speakers_locales" ADD CONSTRAINT "speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_articles_tags" ADD CONSTRAINT "news_articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_articles_tags_locales" ADD CONSTRAINT "news_articles_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_articles_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_articles_body" ADD CONSTRAINT "news_articles_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_articles_locales" ADD CONSTRAINT "news_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_speakers_fk" FOREIGN KEY ("speakers_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_articles_fk" FOREIGN KEY ("news_articles_id") REFERENCES "public"."news_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_phones" ADD CONSTRAINT "website_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_header_links" ADD CONSTRAINT "website_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_header_links_locales" ADD CONSTRAINT "website_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_footer_nav_links" ADD CONSTRAINT "website_footer_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_footer_nav_links_locales" ADD CONSTRAINT "website_footer_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_footer_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_footer_social_links" ADD CONSTRAINT "website_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_footer_social_links_locales" ADD CONSTRAINT "website_footer_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_footer_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_footer_program_links" ADD CONSTRAINT "website_footer_program_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_footer_program_links_locales" ADD CONSTRAINT "website_footer_program_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_footer_program_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website" ADD CONSTRAINT "website_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_locales" ADD CONSTRAINT "website_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_mission_tabs" ADD CONSTRAINT "sections_mission_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_mission_tabs_locales" ADD CONSTRAINT "sections_mission_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_mission_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_stats" ADD CONSTRAINT "sections_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_stats_locales" ADD CONSTRAINT "sections_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_sectors" ADD CONSTRAINT "sections_sectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_sectors_locales" ADD CONSTRAINT "sections_sectors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_summit_editions" ADD CONSTRAINT "sections_summit_editions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_summit_editions_locales" ADD CONSTRAINT "sections_summit_editions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_summit_editions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_videos" ADD CONSTRAINT "sections_videos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_videos" ADD CONSTRAINT "sections_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_videos_locales" ADD CONSTRAINT "sections_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_gallery" ADD CONSTRAINT "sections_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_gallery" ADD CONSTRAINT "sections_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_gallery_locales" ADD CONSTRAINT "sections_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_media_channels" ADD CONSTRAINT "sections_media_channels_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_media_channels" ADD CONSTRAINT "sections_media_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_media_channels_locales" ADD CONSTRAINT "sections_media_channels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_media_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_program_highlights" ADD CONSTRAINT "sections_program_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_program_highlights_locales" ADD CONSTRAINT "sections_program_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_program_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_partnership_sponsor_benefits" ADD CONSTRAINT "sections_partnership_sponsor_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_partnership_collaborator_benefits" ADD CONSTRAINT "sections_partnership_collaborator_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_ai_chat_replies" ADD CONSTRAINT "sections_ai_chat_replies_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sections_ai_chat_replies" ADD CONSTRAINT "sections_ai_chat_replies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_ai_chat_replies_locales" ADD CONSTRAINT "sections_ai_chat_replies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections_ai_chat_replies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_locales" ADD CONSTRAINT "sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "translations_locales" ADD CONSTRAINT "translations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "speakers_bio_order_idx" ON "speakers_bio" USING btree ("_order");
  CREATE INDEX "speakers_bio_parent_id_idx" ON "speakers_bio" USING btree ("_parent_id");
  CREATE INDEX "speakers_bio_locale_idx" ON "speakers_bio" USING btree ("_locale");
  CREATE UNIQUE INDEX "speakers_slug_idx" ON "speakers" USING btree ("slug");
  CREATE INDEX "speakers_image_idx" ON "speakers" USING btree ("image_id");
  CREATE INDEX "speakers_updated_at_idx" ON "speakers" USING btree ("updated_at");
  CREATE INDEX "speakers_created_at_idx" ON "speakers" USING btree ("created_at");
  CREATE UNIQUE INDEX "speakers_locales_locale_parent_id_unique" ON "speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_articles_tags_order_idx" ON "news_articles_tags" USING btree ("_order");
  CREATE INDEX "news_articles_tags_parent_id_idx" ON "news_articles_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "news_articles_tags_locales_locale_parent_id_unique" ON "news_articles_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_articles_body_order_idx" ON "news_articles_body" USING btree ("_order");
  CREATE INDEX "news_articles_body_parent_id_idx" ON "news_articles_body" USING btree ("_parent_id");
  CREATE INDEX "news_articles_body_locale_idx" ON "news_articles_body" USING btree ("_locale");
  CREATE UNIQUE INDEX "news_articles_slug_idx" ON "news_articles" USING btree ("slug");
  CREATE INDEX "news_articles_image_idx" ON "news_articles" USING btree ("image_id");
  CREATE INDEX "news_articles_cover_image_idx" ON "news_articles" USING btree ("cover_image_id");
  CREATE INDEX "news_articles_updated_at_idx" ON "news_articles" USING btree ("updated_at");
  CREATE INDEX "news_articles_created_at_idx" ON "news_articles" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_articles_locales_locale_parent_id_unique" ON "news_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_speakers_id_idx" ON "payload_locked_documents_rels" USING btree ("speakers_id");
  CREATE INDEX "payload_locked_documents_rels_news_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("news_articles_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "website_phones_order_idx" ON "website_phones" USING btree ("_order");
  CREATE INDEX "website_phones_parent_id_idx" ON "website_phones" USING btree ("_parent_id");
  CREATE INDEX "website_header_links_order_idx" ON "website_header_links" USING btree ("_order");
  CREATE INDEX "website_header_links_parent_id_idx" ON "website_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "website_header_links_locales_locale_parent_id_unique" ON "website_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "website_footer_nav_links_order_idx" ON "website_footer_nav_links" USING btree ("_order");
  CREATE INDEX "website_footer_nav_links_parent_id_idx" ON "website_footer_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "website_footer_nav_links_locales_locale_parent_id_unique" ON "website_footer_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "website_footer_social_links_order_idx" ON "website_footer_social_links" USING btree ("_order");
  CREATE INDEX "website_footer_social_links_parent_id_idx" ON "website_footer_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "website_footer_social_links_locales_locale_parent_id_unique" ON "website_footer_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "website_footer_program_links_order_idx" ON "website_footer_program_links" USING btree ("_order");
  CREATE INDEX "website_footer_program_links_parent_id_idx" ON "website_footer_program_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "website_footer_program_links_locales_locale_parent_id_unique" ON "website_footer_program_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "website_hero_image_idx" ON "website" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "website_locales_locale_parent_id_unique" ON "website_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_mission_tabs_order_idx" ON "sections_mission_tabs" USING btree ("_order");
  CREATE INDEX "sections_mission_tabs_parent_id_idx" ON "sections_mission_tabs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_mission_tabs_locales_locale_parent_id_unique" ON "sections_mission_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_stats_order_idx" ON "sections_stats" USING btree ("_order");
  CREATE INDEX "sections_stats_parent_id_idx" ON "sections_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_stats_locales_locale_parent_id_unique" ON "sections_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_sectors_order_idx" ON "sections_sectors" USING btree ("_order");
  CREATE INDEX "sections_sectors_parent_id_idx" ON "sections_sectors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_sectors_locales_locale_parent_id_unique" ON "sections_sectors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_summit_editions_order_idx" ON "sections_summit_editions" USING btree ("_order");
  CREATE INDEX "sections_summit_editions_parent_id_idx" ON "sections_summit_editions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_summit_editions_locales_locale_parent_id_unique" ON "sections_summit_editions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_videos_order_idx" ON "sections_videos" USING btree ("_order");
  CREATE INDEX "sections_videos_parent_id_idx" ON "sections_videos" USING btree ("_parent_id");
  CREATE INDEX "sections_videos_image_idx" ON "sections_videos" USING btree ("image_id");
  CREATE UNIQUE INDEX "sections_videos_locales_locale_parent_id_unique" ON "sections_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_gallery_order_idx" ON "sections_gallery" USING btree ("_order");
  CREATE INDEX "sections_gallery_parent_id_idx" ON "sections_gallery" USING btree ("_parent_id");
  CREATE INDEX "sections_gallery_image_idx" ON "sections_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "sections_gallery_locales_locale_parent_id_unique" ON "sections_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_media_channels_order_idx" ON "sections_media_channels" USING btree ("_order");
  CREATE INDEX "sections_media_channels_parent_id_idx" ON "sections_media_channels" USING btree ("_parent_id");
  CREATE INDEX "sections_media_channels_logo_idx" ON "sections_media_channels" USING btree ("logo_id");
  CREATE UNIQUE INDEX "sections_media_channels_locales_locale_parent_id_unique" ON "sections_media_channels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_program_highlights_order_idx" ON "sections_program_highlights" USING btree ("_order");
  CREATE INDEX "sections_program_highlights_parent_id_idx" ON "sections_program_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sections_program_highlights_locales_locale_parent_id_unique" ON "sections_program_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sections_partnership_sponsor_benefits_order_idx" ON "sections_partnership_sponsor_benefits" USING btree ("_order");
  CREATE INDEX "sections_partnership_sponsor_benefits_parent_id_idx" ON "sections_partnership_sponsor_benefits" USING btree ("_parent_id");
  CREATE INDEX "sections_partnership_sponsor_benefits_locale_idx" ON "sections_partnership_sponsor_benefits" USING btree ("_locale");
  CREATE INDEX "sections_partnership_collaborator_benefits_order_idx" ON "sections_partnership_collaborator_benefits" USING btree ("_order");
  CREATE INDEX "sections_partnership_collaborator_benefits_parent_id_idx" ON "sections_partnership_collaborator_benefits" USING btree ("_parent_id");
  CREATE INDEX "sections_partnership_collaborator_benefits_locale_idx" ON "sections_partnership_collaborator_benefits" USING btree ("_locale");
  CREATE INDEX "sections_ai_chat_replies_order_idx" ON "sections_ai_chat_replies" USING btree ("_order");
  CREATE INDEX "sections_ai_chat_replies_parent_id_idx" ON "sections_ai_chat_replies" USING btree ("_parent_id");
  CREATE INDEX "sections_ai_chat_replies_image_idx" ON "sections_ai_chat_replies" USING btree ("image_id");
  CREATE UNIQUE INDEX "sections_ai_chat_replies_locales_locale_parent_id_unique" ON "sections_ai_chat_replies_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sections_locales_locale_parent_id_unique" ON "sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "translations_locales_locale_parent_id_unique" ON "translations_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "speakers_bio" CASCADE;
  DROP TABLE "speakers" CASCADE;
  DROP TABLE "speakers_locales" CASCADE;
  DROP TABLE "news_articles_tags" CASCADE;
  DROP TABLE "news_articles_tags_locales" CASCADE;
  DROP TABLE "news_articles_body" CASCADE;
  DROP TABLE "news_articles" CASCADE;
  DROP TABLE "news_articles_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "website_phones" CASCADE;
  DROP TABLE "website_header_links" CASCADE;
  DROP TABLE "website_header_links_locales" CASCADE;
  DROP TABLE "website_footer_nav_links" CASCADE;
  DROP TABLE "website_footer_nav_links_locales" CASCADE;
  DROP TABLE "website_footer_social_links" CASCADE;
  DROP TABLE "website_footer_social_links_locales" CASCADE;
  DROP TABLE "website_footer_program_links" CASCADE;
  DROP TABLE "website_footer_program_links_locales" CASCADE;
  DROP TABLE "website" CASCADE;
  DROP TABLE "website_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "sections_mission_tabs" CASCADE;
  DROP TABLE "sections_mission_tabs_locales" CASCADE;
  DROP TABLE "sections_stats" CASCADE;
  DROP TABLE "sections_stats_locales" CASCADE;
  DROP TABLE "sections_sectors" CASCADE;
  DROP TABLE "sections_sectors_locales" CASCADE;
  DROP TABLE "sections_summit_editions" CASCADE;
  DROP TABLE "sections_summit_editions_locales" CASCADE;
  DROP TABLE "sections_videos" CASCADE;
  DROP TABLE "sections_videos_locales" CASCADE;
  DROP TABLE "sections_gallery" CASCADE;
  DROP TABLE "sections_gallery_locales" CASCADE;
  DROP TABLE "sections_media_channels" CASCADE;
  DROP TABLE "sections_media_channels_locales" CASCADE;
  DROP TABLE "sections_program_highlights" CASCADE;
  DROP TABLE "sections_program_highlights_locales" CASCADE;
  DROP TABLE "sections_partnership_sponsor_benefits" CASCADE;
  DROP TABLE "sections_partnership_collaborator_benefits" CASCADE;
  DROP TABLE "sections_ai_chat_replies" CASCADE;
  DROP TABLE "sections_ai_chat_replies_locales" CASCADE;
  DROP TABLE "sections" CASCADE;
  DROP TABLE "sections_locales" CASCADE;
  DROP TABLE "translations" CASCADE;
  DROP TABLE "translations_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_website_footer_social_links_platform";`)
}
