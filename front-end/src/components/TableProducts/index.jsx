import React, { useEffect, useState } from 'react';
import Tabela from '../ProductAdd';

function TableProducts() {
  const [Total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [TypeURL] = useState('checkout');

  useEffect(() => {
    const storagedProducts = JSON.parse(localStorage.getItem('products'));
    setProducts(storagedProducts);

    // set total price
  }, []);

  useEffect(() => {
    const storagedProducts = JSON.parse(localStorage.getItem('products'));
    let total = 0;
    storagedProducts.forEach((product) => {
      total += Number(product.price) * Number(product.quantity);
    });
    setTotal(total.toFixed(2));
  }, [products]);

  const removeItem = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {TypeURL === 'checkout' ? <th>Remover Item</th> : ''}
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <Tabela
              key={ item.id }
              index={ index }
              item={ item }
              type={ TypeURL }
              removeItem={ removeItem }
            />
          ))}
        </tbody>
      </table>
      <div>{`Total: R$${Total}`}</div>
    </div>
  );
}
export default TableProducts;
