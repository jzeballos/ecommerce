SELECT DISTINCT product, price, quantity, user_id, cart.id
FROM products
  LEFT JOIN cart
    ON products.id = product_id
WHERE user_id = $1;
