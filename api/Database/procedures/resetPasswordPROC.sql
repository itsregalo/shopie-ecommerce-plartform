USE shopie_ecommerce;
GO

DROP PROCEDURE IF EXISTS resetPasswordPROC;
GO

CREATE PROCEDURE resetPasswordPROC
    @email NVARCHAR(255),
    @password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user exists based on the provided email
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        -- Update the user's password
        UPDATE users
        SET password = @password,
            updated_at = GETDATE() -- Set the updated timestamp
        WHERE email = @email;

        -- Return success message
        SELECT 'Password reset successful' AS message;
    END
    ELSE
    BEGIN
        -- Return error message
        SELECT 'Password reset failed' AS error;
    END;
END;
