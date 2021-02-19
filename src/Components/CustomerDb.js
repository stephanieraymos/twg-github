import React, { useState } from 'react';
import customers from './customers-data';
import SingleCustomer from './CustomerDetails';

function CustomerDatabase() {
  const [customer, setCustomer] = useState(customers)

  return (
    <main>
      <div className="container">
        <h3>Customer Details Accordian</h3>
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