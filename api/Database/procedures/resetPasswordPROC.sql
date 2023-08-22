USE shopie_ecommerce;
GO

DROP PROCEDURE IF EXISTS resetPasswordPROC;
GO

-- Create the stored procedure to reset a user's password
CREATE PROCEDURE resetPasswordPROC
    @email VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user with the provided email exists
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
    END
END;
GO
