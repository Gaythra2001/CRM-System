-- CRM extension schema for financial_crm_db
-- Customers, Leads, Contacts, Deals, Tasks, Interactions, Notifications, Documents, Settings

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS customers (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) DEFAULT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  created_by INT NOT NULL,
  owner_id INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_customers_owner (owner_id),
  KEY idx_customers_email (email),
  CONSTRAINT fk_customers_owner FOREIGN KEY (owner_id) REFERENCES users (id),
  CONSTRAINT fk_customers_created_by FOREIGN KEY (created_by) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS leads (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) DEFAULT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  source VARCHAR(100) DEFAULT NULL,
  status ENUM('new','contacted','qualified','lost') DEFAULT 'new',
  value DECIMAL(12,2) DEFAULT 0,
  notes TEXT,
  next_action_at DATETIME DEFAULT NULL,
  created_by INT NOT NULL,
  owner_id INT NOT NULL,
  converted_customer_id INT DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_leads_owner (owner_id),
  KEY idx_leads_status (status),
  CONSTRAINT fk_leads_owner FOREIGN KEY (owner_id) REFERENCES users (id),
  CONSTRAINT fk_leads_created_by FOREIGN KEY (created_by) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS contacts (
  id INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) DEFAULT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  title VARCHAR(100) DEFAULT NULL,
  is_primary TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contacts_customer (customer_id),
  CONSTRAINT fk_contacts_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS deals (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  customer_id INT NOT NULL,
  amount DECIMAL(12,2) DEFAULT 0,
  stage ENUM('prospect','negotiation','won','lost') DEFAULT 'prospect',
  probability TINYINT UNSIGNED DEFAULT 0,
  expected_close DATE DEFAULT NULL,
  owner_id INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_deals_customer (customer_id),
  KEY idx_deals_owner (owner_id),
  CONSTRAINT fk_deals_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE,
  CONSTRAINT fk_deals_owner FOREIGN KEY (owner_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS tasks (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date DATETIME DEFAULT NULL,
  status ENUM('open','in_progress','done') DEFAULT 'open',
  reminder_at DATETIME DEFAULT NULL,
  related_type ENUM('lead','customer','deal','ticket') DEFAULT NULL,
  related_id INT DEFAULT NULL,
  assigned_to INT NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_tasks_assigned (assigned_to),
  KEY idx_tasks_related (related_type, related_id),
  CONSTRAINT fk_tasks_assigned FOREIGN KEY (assigned_to) REFERENCES users (id),
  CONSTRAINT fk_tasks_created FOREIGN KEY (created_by) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS interactions (
  id INT NOT NULL AUTO_INCREMENT,
  related_type ENUM('lead','customer','deal','ticket') NOT NULL,
  related_id INT NOT NULL,
  type ENUM('call','email','meeting','sms','note') NOT NULL,
  summary TEXT,
  occurred_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_interactions_related (related_type, related_id),
  CONSTRAINT fk_interactions_created FOREIGN KEY (created_by) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS notifications (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  message VARCHAR(255) NOT NULL,
  read_at DATETIME DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_notifications_user (user_id),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS documents (
  id INT NOT NULL AUTO_INCREMENT,
  related_type ENUM('lead','customer','deal','ticket') NOT NULL,
  related_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  uploaded_by INT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_documents_related (related_type, related_id),
  CONSTRAINT fk_documents_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) NOT NULL,
  `value` TEXT,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS=1;
