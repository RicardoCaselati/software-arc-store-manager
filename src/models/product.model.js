const connection = require('./connection');

const productsModelGetAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  // throw new Error("whatever");
  return result;
};

const productsModelGetById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );

  return result;
};

const productsModelInsert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );

  return insertId;
};

const productsModelUpdateById = async (prodId, dataToUpdate) => {
  const [result] = await connection
    .execute(`UPDATE StoreManager.products SET name = "${dataToUpdate}" WHERE id = ?`, [prodId]);

  if (result.affectedRows > 0) {
    return { id: prodId, name: dataToUpdate };
  }
};

const productsModelDeleteById = async (prodId) => {
  const [result] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?', [prodId]);
  
  console.log(result.affectedRows);
  return result.affectedRows;
};

module.exports = {
  productsModelGetAll,
  productsModelGetById,
  productsModelInsert,
  productsModelUpdateById,
  productsModelDeleteById,
};
