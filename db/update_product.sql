UPDATE Products
SET product = $2, price = $3, description = $4, imgurl = $5
WHERE id = $1;
