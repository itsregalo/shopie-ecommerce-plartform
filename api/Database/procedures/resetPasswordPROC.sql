<<<<<<< HEAD
USE shopie_ecommerce;
GO

DROP PROCEDURE IF EXISTS resetPasswordPROC;
GO

-- Create the stored procedure to reset a user's password
CREATE PROCEDURE resetPasswordPROC
    @email VARCHAR(255),
    @password VARCHAR(255)
=======
USE shopie_ecommerce
GO

DROP PROCEDURE IF EXISTS resetPasswordPROC
GO

CREATE PROCEDURE resetPasswordPROC
    @email NVARCHAR(255),
    @password NVARCHAR(255)
>>>>>>> dev
AS
BEGIN
    SET NOCOUNT ON;

<<<<<<< HEAD
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
=======
    DECLARE @userId NVARCHAR(255);

    -- Get the user ID based on the provided email
    SELECT @userId = id
    FROM users
    WHERE email = @email;

    -- If the user exists, update the password
    IF @userId IS NOT NULL
    BEGIN
        -- Update the user's password
        UPDATE users
        SET password = @password
        WHERE id = @userId;

        -- Return a success message
        SELECT 'Password reset successful' AS Message;
    END
    ELSE
    BEGIN
        -- Return an error message if the user does not exist
        SELECT 'Password reset failed' AS Error;
    END
END;
GO
>>>>>>> dev
