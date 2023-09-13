USE shopie_ecommerce;
GO

CREATE OR ALTER PROCEDURE createResetPasswordToken(@email VARCHAR(255), @token VARCHAR(255))
AS
BEGIN
   UPDATE users SET token = @token WHERE email = @email;
END

