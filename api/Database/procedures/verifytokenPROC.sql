USE shopie_ecommerce;
GO

DROP PROCEDURE IF EXISTS verifyResetTokenPROC;
GO

CREATE PROCEDURE verifyResetTokenPROC
    @token NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TokenExists INT;

    -- Check if the token exists in the database
    SELECT @TokenExists = COUNT(*)
    FROM users
    WHERE Token = @token;

    -- If the token exists, return the corresponding record
    IF @TokenExists > 0
    BEGIN
        SELECT 1 AS TokenExists;
    END
    ELSE
    BEGIN
        SELECT 0 AS TokenExists;
    END
END;
