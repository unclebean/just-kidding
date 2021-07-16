import React from 'react';
import { BulletList } from 'react-content-loader';

export const CurrentAccountsWidget = () => {
  return (
    <div style={{ border: '1px solid #DADADA', padding: '10px' }}>
      <h4>Current Accounts</h4>
      <BulletList />
    </div>
  );
};
