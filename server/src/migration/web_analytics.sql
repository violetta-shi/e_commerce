-- Create web_analytics table
CREATE TABLE IF NOT EXISTS web_analytics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    session_id VARCHAR(255) NOT NULL,
    event_type ENUM('page_view', 'product_view', 'search', 'add_to_cart', 'remove_from_cart', 'checkout_start', 'checkout_complete', 'category_view') NOT NULL,
    page_url VARCHAR(255) NOT NULL,
    referrer_url VARCHAR(255),
    product_id BIGINT,
    category_id BIGINT,
    search_query VARCHAR(255),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

-- Create index for faster queries
CREATE INDEX idx_web_analytics_user_id ON web_analytics(user_id);
CREATE INDEX idx_web_analytics_event_type ON web_analytics(event_type);
CREATE INDEX idx_web_analytics_created_at ON web_analytics(created_at);
CREATE INDEX idx_web_analytics_product_id ON web_analytics(product_id);
CREATE INDEX idx_web_analytics_category_id ON web_analytics(category_id);

-- Create analytics_summary table for aggregated data
CREATE TABLE IF NOT EXISTS analytics_summary (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    event_type ENUM('page_view', 'product_view', 'search', 'add_to_cart', 'remove_from_cart', 'checkout_start', 'checkout_complete', 'category_view') NOT NULL,
    total_count INT NOT NULL DEFAULT 0,
    unique_users INT NOT NULL DEFAULT 0,
    category_id BIGINT,
    product_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL,
    UNIQUE KEY unique_date_event (date, event_type, category_id, product_id)
); 