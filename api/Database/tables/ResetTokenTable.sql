USE shopie_ecommerce;
GO

DROP TABLE IF EXISTS ResetTokens;

-- Create the ResetTokens table to store reset tokens
CREATE TABLE ResetTokens (
    id INT PRIMARY KEY IDENTITY,
    token NVARCHAR(500) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create an index on the token column for quicker lookups
CREATE INDEX IX_ResetTokens_Token ON ResetTokens (token);

SELECT * FROM ResetTokens;



-- Drop the foreign key constraint in the ResetTokens table
USE shopie_ecommerce;
GO

-- Drop the foreign key constraint
ALTER TABLE ResetTokens
DROP CONSTRAINT FK_ResetTokens_Users;

-- Drop the ResetTokens table
DROP TABLE ResetTokens;

-- Drop the users table
DROP TABLE users;
