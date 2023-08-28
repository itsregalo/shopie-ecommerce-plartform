USE shopie_ecommerce
GO


CREATE OR ALTER PROCEDURE resetPasswordProc(@passowrd VARCHAR(MAX), @email VARCHAR(255))
AS
BEGIN
    UPDATE users SET password = @passowrd, token = NULL WHERE email = @email
END