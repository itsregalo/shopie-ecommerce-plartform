USE shopie_ecommerce;
GO

DROP PROCEDURE IF EXISTS createNewUserPROC;
GO

CREATE OR ALTER PROCEDURE createNewUserPROC(@id VARCHAR(255), @first_name VARCHAR(255), @last_name VARCHAR(255), @email VARCHAR(255), @password VARCHAR(MAX))
AS
BEGIN
    INSERT INTO users(id, first_name, last_name, email, password)
    VALUES(@id, @first_name, @last_name, @email, @password)
END
GO
