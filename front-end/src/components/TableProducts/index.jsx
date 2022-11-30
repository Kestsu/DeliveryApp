import React, { useEffect, useState } from 'react';
import Tabela from '../ProductAdd';

const dada = [
  { description: 'OII', quantidade: 2, value: 2, SubTotal: 10 },
  { description: 'OII', quantidade: 2, value: 2, SubTotal: 10 },
  { description: 'OII', quantidade: 2, value: 2, SubTotal: 10 },
  { description: 'OII', quantidade: 2, value: 2, SubTotal: 10 },
];

function TableProducts() {
  const [Total, setTotal] = useState(0);
  const [TypeURL] = useState('checkout');

  const handleReflex = () => {
    const initialValue = 0;
    const soma = dada.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantidade,
      initialValue,
    );
    setTotal(soma);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handleReflex();
  }, []);

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
          {dada.map((item, index) => (
            <Tabela
              key={ item.id }
              index={ index }
              products={ item }
              fun={ handleReflex }
              type={ TypeURL }
            />
          ))}
        </tbody>
      </table>
      <div>{`Total: R$${Total}`}</div>
    </div>
  );
}
export default TableProducts;
