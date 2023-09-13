USE shopie_ecommerce;
GO

CREATE OR ALTER PROCEDURE fetchUserByEmailPROC(@email VARCHAR(255))
AS
BEGIN
    SELECT * FROM users WHERE email = @email
END
GO

CREATE OR ALTER PROCEDURE fetchUserByEmailUpgradedPROC(@email VARCHAR(255))
AS
BEGIN
    UPDATE users SET is_admin = 1 WHERE email = @email
END
GO

EXEC fetchUserByEmailUpgradedPROC @email = 'admin@gmail.com';