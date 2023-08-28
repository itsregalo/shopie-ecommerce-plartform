USE shopie_ecommerce;
GO

-- procedures to get all products
CREATE OR ALTER PROCEDURE get_all_products
AS
BEGIN
    SELECT * FROM product;
END;
GO

-- procedures to get all products by category
CREATE OR ALTER PROCEDURE get_all_products_by_category
    @category_name VARCHAR(255)
AS
BEGIN
    SELECT * FROM product WHERE product_category_id = @category_name;
END;
GO

-- procedures to get product by id
CREATE OR ALTER PROCEDURE get_product_by_id
    @product_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM product WHERE id = @product_id;
END;
GO

-- procedures to get all products by name
CREATE OR ALTER PROCEDURE get_all_products_by_name
    @product_name VARCHAR(255)
AS
BEGIN
    SELECT * FROM product WHERE product_name = @product_name;
END;
GO

-- procedure to create a category
CREATE OR ALTER PROCEDURE create_category
    @id VARCHAR(255),
    @category_name VARCHAR(255)
AS
BEGIN
    INSERT INTO product_category (id, category_name)
    VALUES (@id, @category_name);
END;
GO

-- procedure to get all categories
CREATE OR ALTER PROCEDURE get_all_categories
AS
BEGIN
    SELECT * FROM product_category;
END;
GO

-- procedure to get category by id
CREATE OR ALTER PROCEDURE get_category_by_id
    @category_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM product_category WHERE id = @category_id;
END;
GO

-- procedure to get category by name
CREATE OR ALTER PROCEDURE get_category_by_name
    @category_name VARCHAR(255)
AS
BEGIN
    SELECT * FROM product_category WHERE category_name = @category_name;
END;
GO

-- add product
CREATE OR ALTER PROCEDURE add_product
    @id VARCHAR(255),
    @product_name VARCHAR(255),
    @product_description VARCHAR(255),
    @product_category_id VARCHAR(255),
    @product_initial_price INT,
    @product_price INT,
    @product_image VARCHAR(255),
    @product_stock INT
AS
BEGIN
    INSERT INTO product (id, product_name, product_description, product_category_id, product_initial_price, product_price, product_image, product_stock)
    VALUES (@id, @product_name, @product_description, @product_category_id, @product_initial_price, @product_price, @product_image, @product_stock);
END;
GO

-- update product
CREATE OR ALTER PROCEDURE update_product
    @id VARCHAR(255),
    @product_name VARCHAR(255),
    @product_description VARCHAR(255),
    @product_category_id VARCHAR(255),
    @product_initial_price INT,
    @product_price INT,
    @product_image VARCHAR(255),
    @product_stock INT
AS
BEGIN
    UPDATE product
    SET product_name = @product_name, product_description = @product_description, product_category_id = @product_category_id, product_initial_price = @product_initial_price, product_price = @product_price, product_image = @product_image, product_stock = @product_stock
    WHERE id = @id;
END;
GO  

-- delete product
CREATE OR ALTER PROCEDURE delete_product
    @product_id VARCHAR(255)
AS
BEGIN
    DELETE FROM product WHERE id = @product_id;
END;
GO

-- add product to cart
CREATE OR ALTER PROCEDURE add_product_to_cart
    @id VARCHAR(255),
    @cart_id VARCHAR(255),
    @product_id VARCHAR(255),
    @product_quantity INT
AS
BEGIN
    INSERT INTO cart_item (id, cart_id, product_id, product_quantity)
    VALUES (@id, @cart_id, @product_id, @product_quantity);
END;
GO  

-- get all products in cart
CREATE OR ALTER PROCEDURE get_all_products_in_cart
    @cart_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM cart_item WHERE cart_id = @cart_id;
END;
GO

-- get product in cart by id
CREATE OR ALTER PROCEDURE get_product_in_cart_by_id
    @cart_id VARCHAR(255),
    @product_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM cart_item WHERE cart_id = @cart_id AND product_id = @product_id;
END;
GO

CREATE OR ALTER PROCEDURE get_category_by_id
    @category_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM product_category WHERE id = @category_id;
END;
GO