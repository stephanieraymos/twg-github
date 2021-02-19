import React, { useState } from 'react';
import customers from './customers-data';
import SingleCustomer from './CustomerDetails';

function CustomerDatabase() {
  const [customer, setCustomer] = useState(customers)

  return (
    <main>
      <div className="container">
        <h1>Customer Details Accordion</h1>
        <section className="info">
          {
            customers.map((customer) => {
              return <SingleCustomer key={customer.id} {...customer} />
            })
          }
        </section>
      </div>
    </main>
  );
}


export default CustomerDatabase;

// TP-56