-- Gallaa B2B Marketplace Database Schema
-- PostgreSQL 14+

/*
  # Database Setup for Gallaa Luxury B2B Marketplace

  1. User Management
    - `users` - Core user authentication and profile
    - `manufacturer_profiles` - Extended manufacturer information
    - `retailer_profiles` - Extended retailer information
    - `user_verifications` - KYC and verification status

  2. Product Catalog
    - `categories` - Product categories hierarchy
    - `products` - Product listings with specifications
    - `product_images` - Product image management
    - `inventory` - Stock and availability tracking

  3. Credit System
    - `credit_applications` - Credit limit applications
    - `credit_lines` - Approved credit facilities
    - `credit_transactions` - Credit usage and payments
    - `risk_assessments` - AI-generated risk scores

  4. Orders & Transactions
    - `orders` - Purchase orders between parties
    - `order_items` - Individual items in orders
    - `payments` - Payment transactions
    - `shipments` - Shipping and logistics

  5. Analytics & Reporting
    - `user_analytics` - User behavior tracking
    - `transaction_analytics` - Business metrics
    - `audit_logs` - Security and compliance logs
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Core user management
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('manufacturer', 'retailer', 'admin')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Manufacturer extended profiles
CREATE TABLE IF NOT EXISTS manufacturer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  gst_number text UNIQUE NOT NULL,
  pan_number text,
  annual_revenue numeric DEFAULT 0,
  establishment_year integer,
  website text,
  description text,
  certifications text[] DEFAULT '{}',
  product_categories text[] DEFAULT '{}',
  address jsonb NOT NULL,
  bank_details jsonb,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Retailer extended profiles  
CREATE TABLE IF NOT EXISTS retailer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  owner_name text NOT NULL,
  gst_number text UNIQUE NOT NULL,
  pan_number text,
  business_type text CHECK (business_type IN ('retail', 'wholesale', 'online', 'hybrid')),
  store_locations integer DEFAULT 1,
  expected_purchase_volume numeric DEFAULT 0,
  current_brands text[] DEFAULT '{}',
  target_categories text[] DEFAULT '{}',
  address jsonb NOT NULL,
  bank_details jsonb,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product categories with hierarchy
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product catalog
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id),
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  short_description text,
  sku text UNIQUE NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  currency text DEFAULT 'INR',
  cost_price numeric CHECK (cost_price >= 0),
  minimum_order_quantity integer DEFAULT 1 CHECK (minimum_order_quantity > 0),
  specifications jsonb DEFAULT '{}',
  dimensions jsonb DEFAULT '{}',
  weight numeric,
  materials text[] DEFAULT '{}',
  colors_available text[] DEFAULT '{}',
  sizes_available text[] DEFAULT '{}',
  brand text,
  model text,
  warranty_months integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  seo_title text,
  seo_description text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_manufacturer_slug UNIQUE (manufacturer_id, slug)
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Inventory tracking
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity_available integer DEFAULT 0 CHECK (quantity_available >= 0),
  quantity_reserved integer DEFAULT 0 CHECK (quantity_reserved >= 0),
  reorder_level integer DEFAULT 0,
  last_restocked_at timestamptz,
  location text,
  batch_number text,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Credit applications
CREATE TABLE IF NOT EXISTS credit_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  requested_amount numeric NOT NULL CHECK (requested_amount > 0),
  purpose text NOT NULL CHECK (purpose IN ('inventory', 'expansion', 'working_capital')),
  business_plan text,
  financial_documents jsonb DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Approved credit lines
CREATE TABLE IF NOT EXISTS credit_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  application_id uuid REFERENCES credit_applications(id),
  credit_limit numeric NOT NULL CHECK (credit_limit > 0),
  available_credit numeric NOT NULL CHECK (available_credit >= 0),
  interest_rate numeric NOT NULL CHECK (interest_rate >= 0 AND interest_rate <= 100),
  tenure_months integer NOT NULL CHECK (tenure_months > 0),
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed')),
  approved_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  last_payment_date date,
  next_payment_date date,
  payment_frequency text DEFAULT 'monthly' CHECK (payment_frequency IN ('weekly', 'monthly', 'quarterly')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Credit transactions and payments
CREATE TABLE IF NOT EXISTS credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_line_id uuid REFERENCES credit_lines(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('utilization', 'payment', 'interest', 'fee', 'adjustment')),
  amount numeric NOT NULL,
  balance_after numeric NOT NULL,
  description text,
  reference_id text,
  order_id uuid,
  payment_method text,
  transaction_date timestamptz DEFAULT now(),
  due_date date,
  created_at timestamptz DEFAULT now()
);

-- AI-powered risk assessments
CREATE TABLE IF NOT EXISTS risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  assessment_type text DEFAULT 'credit_application' CHECK (assessment_type IN ('credit_application', 'periodic_review', 'transaction_based')),
  risk_score integer CHECK (risk_score >= 300 AND risk_score <= 900),
  risk_category text CHECK (risk_category IN ('low', 'medium', 'high')),
  factors_analyzed jsonb DEFAULT '{}',
  model_version text,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 1),
  recommendations text[],
  assessed_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_by text DEFAULT 'ai_system'
);

-- Purchase orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  buyer_id uuid REFERENCES users(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES users(id) ON DELETE SET NULL,
  order_type text DEFAULT 'regular' CHECK (order_type IN ('regular', 'credit', 'sample')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'failed', 'refunded')),
  subtotal numeric DEFAULT 0 CHECK (subtotal >= 0),
  tax_amount numeric DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_amount numeric DEFAULT 0 CHECK (shipping_amount >= 0),
  discount_amount numeric DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount numeric DEFAULT 0 CHECK (total_amount >= 0),
  currency text DEFAULT 'INR',
  billing_address jsonb NOT NULL,
  shipping_address jsonb NOT NULL,
  notes text,
  internal_notes text,
  expected_delivery_date date,
  actual_delivery_date date,
  cancelled_at timestamptz,
  cancellation_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order line items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  product_sku text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  tax_rate numeric DEFAULT 0 CHECK (tax_rate >= 0),
  discount_rate numeric DEFAULT 0 CHECK (discount_rate >= 0 AND discount_rate <= 100),
  specifications jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Payment transactions
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  payer_id uuid REFERENCES users(id) ON DELETE SET NULL,
  payee_id uuid REFERENCES users(id) ON DELETE SET NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('razorpay', 'stripe', 'bank_transfer', 'credit_line', 'upi')),
  payment_gateway text,
  gateway_payment_id text,
  gateway_order_id text,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text DEFAULT 'INR',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
  failure_reason text,
  gateway_response jsonb DEFAULT '{}',
  processing_fee numeric DEFAULT 0,
  net_amount numeric,
  settled_at timestamptz,
  refunded_at timestamptz,
  refund_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shipping and logistics
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  tracking_number text UNIQUE,
  carrier text,
  service_type text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned')),
  shipped_from jsonb,
  shipped_to jsonb NOT NULL,
  weight numeric,
  dimensions jsonb,
  shipping_cost numeric DEFAULT 0,
  estimated_delivery_date date,
  actual_delivery_date date,
  tracking_updates jsonb DEFAULT '[]',
  signature_required boolean DEFAULT false,
  insurance_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User behavior analytics
CREATE TABLE IF NOT EXISTS user_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  session_id text,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}',
  page_url text,
  user_agent text,
  ip_address inet,
  country text,
  city text,
  device_type text,
  created_at timestamptz DEFAULT now()
);

-- Business metrics and reporting
CREATE TABLE IF NOT EXISTS transaction_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  metric_type text NOT NULL,
  metric_name text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  dimensions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_daily_metric UNIQUE (date, metric_type, metric_name)
);

-- Security and compliance audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text,
  resource_id text,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  severity text DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for manufacturer profiles
CREATE POLICY "Manufacturers can manage own profile"
  ON manufacturer_profiles FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Public can view verified manufacturer profiles"
  ON manufacturer_profiles FOR SELECT
  TO authenticated
  USING (verification_status = 'verified');

-- RLS Policies for retailer profiles
CREATE POLICY "Retailers can manage own profile"
  ON retailer_profiles FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Manufacturers can view verified retailer profiles"
  ON retailer_profiles FOR SELECT
  TO authenticated
  USING (verification_status = 'verified' AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'manufacturer'
  ));

-- RLS Policies for products
CREATE POLICY "Manufacturers can manage own products"
  ON products FOR ALL
  TO authenticated
  USING (manufacturer_id = auth.uid());

CREATE POLICY "Verified users can view active products"
  ON products FOR SELECT
  TO authenticated
  USING (is_active = true AND EXISTS (
    SELECT 1 FROM users u 
    LEFT JOIN manufacturer_profiles mp ON u.id = mp.user_id
    LEFT JOIN retailer_profiles rp ON u.id = rp.user_id
    WHERE u.id = auth.uid() 
    AND (
      (u.role = 'manufacturer' AND mp.verification_status = 'verified')
      OR
      (u.role = 'retailer' AND rp.verification_status = 'verified')
      OR
      u.role = 'admin'
    )
  ));

-- RLS Policies for orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Buyers can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Order participants can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- RLS Policies for credit lines
CREATE POLICY "Users can view own credit lines"
  ON credit_lines FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (payer_id = auth.uid() OR payee_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

CREATE INDEX IF NOT EXISTS idx_manufacturer_profiles_user_id ON manufacturer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_manufacturer_profiles_gst ON manufacturer_profiles(gst_number);
CREATE INDEX IF NOT EXISTS idx_manufacturer_profiles_verification ON manufacturer_profiles(verification_status);

CREATE INDEX IF NOT EXISTS idx_retailer_profiles_user_id ON retailer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_retailer_profiles_gst ON retailer_profiles(gst_number);
CREATE INDEX IF NOT EXISTS idx_retailer_profiles_verification ON retailer_profiles(verification_status);

CREATE INDEX IF NOT EXISTS idx_products_manufacturer ON products(manufacturer_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_name_gin ON products USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_tags_gin ON products USING gin(tags);

CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);

CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_payer ON payments(payer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

CREATE INDEX IF NOT EXISTS idx_credit_lines_user ON credit_lines(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_lines_status ON credit_lines(status);
CREATE INDEX IF NOT EXISTS idx_credit_lines_expires ON credit_lines(expires_at);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_line ON credit_transactions(credit_line_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_date ON credit_transactions(transaction_date);

CREATE INDEX IF NOT EXISTS idx_user_analytics_user ON user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_event ON user_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_user_analytics_created ON user_analytics(created_at);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_manufacturer_profiles_updated_at BEFORE UPDATE ON manufacturer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_retailer_profiles_updated_at BEFORE UPDATE ON retailer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credit_lines_updated_at BEFORE UPDATE ON credit_lines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  sequence_num INTEGER;
  order_number TEXT;
BEGIN
  -- Get next sequence number for today
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 11) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM orders 
  WHERE order_number LIKE 'GAL' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '%';
  
  -- Generate order number: GAL + YYYYMMDD + sequence (4 digits)
  order_number := 'GAL' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN order_number;
END;
$$ LANGUAGE plpgsql;

-- Create function to update credit line available balance
CREATE OR REPLACE FUNCTION update_credit_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- Update available credit based on transaction type
  IF NEW.transaction_type = 'utilization' THEN
    UPDATE credit_lines 
    SET available_credit = available_credit - NEW.amount
    WHERE id = NEW.credit_line_id;
  ELSIF NEW.transaction_type = 'payment' THEN
    UPDATE credit_lines 
    SET available_credit = available_credit + NEW.amount,
        last_payment_date = CURRENT_DATE
    WHERE id = NEW.credit_line_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_credit_balance_trigger 
  AFTER INSERT ON credit_transactions
  FOR EACH ROW EXECUTE FUNCTION update_credit_balance();

-- Create views for common queries
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
  u.id,
  u.email,
  u.phone,
  u.role,
  u.status,
  u.email_verified,
  u.phone_verified,
  u.last_login,
  u.created_at,
  CASE 
    WHEN u.role = 'manufacturer' THEN 
      json_build_object(
        'company_name', mp.company_name,
        'contact_person', mp.contact_person,
        'gst_number', mp.gst_number,
        'verification_status', mp.verification_status,
        'annual_revenue', mp.annual_revenue
      )
    WHEN u.role = 'retailer' THEN
      json_build_object(
        'business_name', rp.business_name,
        'owner_name', rp.owner_name,
        'gst_number', rp.gst_number,
        'verification_status', rp.verification_status,
        'store_locations', rp.store_locations
      )
    ELSE NULL
  END as profile
FROM users u
LEFT JOIN manufacturer_profiles mp ON u.id = mp.user_id
LEFT JOIN retailer_profiles rp ON u.id = rp.user_id;

-- Create materialized view for analytics dashboard
CREATE MATERIALIZED VIEW daily_metrics AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) FILTER (WHERE role = 'manufacturer') as new_manufacturers,
  COUNT(*) FILTER (WHERE role = 'retailer') as new_retailers,
  COUNT(*) as total_registrations
FROM users
GROUP BY DATE(created_at)
WITH DATA;

CREATE UNIQUE INDEX ON daily_metrics (date);

-- Create function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_analytics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY daily_metrics;
END;
$$ LANGUAGE plpgsql;

-- Insert initial data
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Jewelry', 'jewelry', 'Luxury jewelry and precious accessories', 1),
('Watches', 'watches', 'Premium timepieces and luxury watches', 2),
('Fashion', 'fashion', 'High-end clothing and fashion accessories', 3),
('Electronics', 'electronics', 'Premium electronics and gadgets', 4),
('Home & Decor', 'home-decor', 'Luxury home furnishings and decor', 5),
('Automobiles', 'automobiles', 'Luxury vehicles and automotive accessories', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert subcategories for Jewelry
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Gold Jewelry', 'gold-jewelry', 'Pure gold jewelry and ornaments', id, 1 FROM categories WHERE slug = 'jewelry'
UNION ALL
SELECT 'Diamond Jewelry', 'diamond-jewelry', 'Premium diamond jewelry', id, 2 FROM categories WHERE slug = 'jewelry'
UNION ALL  
SELECT 'Silver Jewelry', 'silver-jewelry', 'Sterling silver and silver jewelry', id, 3 FROM categories WHERE slug = 'jewelry'
ON CONFLICT (slug) DO NOTHING;

-- Create admin user (password should be hashed in real implementation)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@gallaa.com') THEN
    INSERT INTO users (email, phone, password_hash, role, email_verified, phone_verified)
    VALUES (
      'admin@gallaa.com',
      '+919876543210',
      '$2b$12$placeholder_hash_for_admin_password',
      'admin',
      true,
      true
    );
  END IF;
END $$;