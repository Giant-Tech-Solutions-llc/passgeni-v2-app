-- =============================================================
-- PASSGENI — SUPABASE RPC FUNCTIONS
-- =============================================================
-- Run this in Supabase SQL Editor AFTER running schema.sql
-- These functions are called from the API via db.rpc(...)
-- =============================================================

-- ─── ATOMIC USAGE INCREMENT ───────────────────────────────────
-- Inserts a new usage_daily row with count=1, or increments
-- the existing row for today. Returns the new count.
-- This is atomic — safe for concurrent API calls.
CREATE OR REPLACE FUNCTION increment_usage(p_key_id UUID, p_date DATE)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO usage_daily (key_id, date, call_count)
  VALUES (p_key_id, p_date, 1)
  ON CONFLICT (key_id, date) DO UPDATE
    SET call_count = usage_daily.call_count + 1
  RETURNING call_count INTO new_count;

  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── GET CUSTOMER DASHBOARD SUMMARY ──────────────────────────
-- Returns all dashboard data for a customer in one round-trip.
-- Called by GET /api/dashboard/summary
CREATE OR REPLACE FUNCTION get_customer_summary(p_customer_id UUID)
RETURNS JSON AS $$
DECLARE
  today       DATE := CURRENT_DATE;
  ago_7       DATE := CURRENT_DATE - INTERVAL '7 days';
  result      JSON;
BEGIN
  SELECT json_build_object(
    'customer', row_to_json(c.*),
    'keys', (
      SELECT json_agg(k.*)
      FROM api_keys k
      WHERE k.customer_id = p_customer_id AND k.is_active = true
    ),
    'usage_today', (
      SELECT COALESCE(SUM(ud.call_count), 0)
      FROM usage_daily ud
      JOIN api_keys ak ON ak.id = ud.key_id
      WHERE ak.customer_id = p_customer_id AND ud.date = today
    ),
    'usage_week', (
      SELECT json_agg(daily ORDER BY daily.date)
      FROM (
        SELECT ud.date, SUM(ud.call_count) AS total
        FROM usage_daily ud
        JOIN api_keys ak ON ak.id = ud.key_id
        WHERE ak.customer_id = p_customer_id AND ud.date >= ago_7
        GROUP BY ud.date
      ) daily
    ),
    'team_members', (
      SELECT json_agg(tm.*)
      FROM team_members tm
      WHERE tm.customer_id = p_customer_id
    )
  )
  INTO result
  FROM customers c
  WHERE c.id = p_customer_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
