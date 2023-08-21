USE shopie_ecommerce;
GO

CREATE OR ALTER PROCEDURE fetchUserByEmailPROC(@email VARCHAR(255))
AS
BEGIN
    SELECT * FROM users WHERE email = @email
END
GO

EXEC fetchUserByEmailPROC 'rachaelmuga2@gmail.com'