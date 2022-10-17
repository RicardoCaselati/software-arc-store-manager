const camelize = require('camelize');
const connection = require('./connection');

const salesModelGetAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sales_products.sale_id, sales.date, sales_products.product_id, sales_products.quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.products
      ON sales_products.product_id = products.id
      INNER JOIN StoreManager.sales
      ON sales.id = sales_products.sale_id
      ORDER BY StoreManager.sales_products.sale_id, StoreManager.sales_products.product_id`,
  );
  // throw new Error("whatever");
  return camelize(result);
};

const salesModelGetById = async (productId) => {
  const [result] = await connection.execute(
    `SELECT 
    sales_products.product_id, sales_products.quantity, sales.date
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.products
    ON sales_products.product_id = products.id
    INNER JOIN StoreManager.sales
    ON sales.id = sales_products.sale_id
    WHERE sales_products.sale_id = ?
    ORDER BY StoreManager.sales_products.sale_id, StoreManager.sales_products.product_id`,
    [productId],
  );

  return camelize(result);
};

const salesProductValidateById = async (sale) => {
  const saleProductsIds = sale.map((eachSale) => eachSale.productId);

  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  const existingIds = result.map((eachId) => eachId.id);

  const comparingIds = saleProductsIds.some((eacheNumber) => !existingIds.includes(eacheNumber));

  if (comparingIds) {
    return false;
  }
  return true;
};

const salesInsertProductOnDB = async (insertId, sale) => {
  sale.forEach(async (eachSale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, eachSale.productId, eachSale.quantity],
    );
  });

  const saleObject = {
    id: insertId,
    itemsSold: sale,
  };

  return saleObject;
};

const salesModelInsertProduct = async (sale) => {
  const productIdExist = await salesProductValidateById(sale);
  if (productIdExist === true) {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (id) VALUE (NULL)',
    );
    return salesInsertProductOnDB(insertId, sale);
  }
};

module.exports = {
  salesModelInsertProduct,
  salesModelGetAll,
  salesModelGetById,
};
