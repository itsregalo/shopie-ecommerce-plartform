USE shopie_ecommerce
GO

DROP PROCEDURE IF EXISTS resetPasswordPROC
GO

CREATE PROCEDURE resetPasswordPROC
    @email NVARCHAR(255),
    @password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

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