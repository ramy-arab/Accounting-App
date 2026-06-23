-- =====================================================
-- COST ACCOUNTING APP DATABASE SCHEMA (PRO VERSION)
-- PostgreSQL
-- =====================================================

-- =========================
-- 0. projects
-- =========================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, -- مثال: 'مصنع النسيج'
    currency TEXT DEFAULT 'د.ج'
);


-- =========================
-- 1. PRODUCTS
-- =========================
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    unit TEXT,
    selling_price NUMERIC DEFAULT 0,
    expected_volume INTEGER DEFAULT 0,
    actual_volume INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- 2. PRODUCT MATERIALS (Standard Costs)
-- =========================
CREATE TABLE product_materials (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    quantity NUMERIC DEFAULT 0,
    unit TEXT,
    unit_price NUMERIC DEFAULT 0
);

-- =========================
-- 3. PRODUCT LABOR (Standard Costs)
-- =========================
CREATE TABLE product_labor (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    hours NUMERIC DEFAULT 0,
    hourly_rate NUMERIC DEFAULT 0
);

-- =========================
-- 4. ACTUAL COSTS (OPTIONAL DETAIL TRACKING)
-- =========================
CREATE TABLE product_actual_costs (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,

    material_total_qty_used NUMERIC DEFAULT 0,
    material_unit_price_paid NUMERIC DEFAULT 0,

    labor_total_hours_used NUMERIC DEFAULT 0,
    labor_rate_paid NUMERIC DEFAULT 0,

    period TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- 5. FIXED COSTS
-- =========================
CREATE TABLE fixed_costs (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- 6. OVERHEAD COST POOLS (ABC)
-- =========================
CREATE TABLE overhead_cost_pools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cost NUMERIC DEFAULT 0,
    driver_name TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- 7. POOL DRIVERS (ABC ALLOCATION)
-- =========================
CREATE TABLE pool_drivers (
    id SERIAL PRIMARY KEY,
    pool_id TEXT REFERENCES overhead_cost_pools(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    driver_value NUMERIC DEFAULT 0
);

-- =========================
-- 8. COST SNAPSHOTS (REPORTING / HISTORY)
-- =========================
CREATE TABLE cost_snapshots (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),

    products_snapshot JSONB,
    fixed_costs_snapshot JSONB,
    overhead_snapshot JSONB
);

-- =========================
-- 9. OPTIONAL: USER SETTINGS (future multi-user)
-- =========================
CREATE TABLE app_settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE,
    value JSONB
);