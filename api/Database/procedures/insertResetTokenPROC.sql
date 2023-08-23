USE shopie_ecommerce;
GO

DROP PROCEDURE IF EXISTS insertResetTokenPROC;
GO

-- Create or alter the stored procedure to insert reset token
CREATE OR ALTER PROCEDURE insertResetTokenPROC
    @email VARCHAR(255),
    @token VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user with the provided email exists
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        -- Update the user's reset token
        UPDATE users
        SET token = @token,
            updated_at = GETDATE() -- Set the updated timestamp
        WHERE email = @email;

        -- Return success message
        SELECT 'Reset token inserted successfully' AS message;
    END
    ELSE
    BEGIN
        -- Return error message
        SELECT 'Failed to insert reset token' AS error;
    END
END;
GO

