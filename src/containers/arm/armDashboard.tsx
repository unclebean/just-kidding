import React from 'react';
import styled from 'styled-components';
import { PrimaryWidget } from '../../components/widgetsHelper/primaryWidget';
import { SecondaryWidget } from '../../components/widgetsHelper/secondaryWidget';
import { CifListWidget } from '../../views/cifs/cifsWidget';
import { ContactHistoryListWidget } from '../../views/contactHisotry/contactHisotryWidget';
import { TopMoverWidget } from '../../views/topMover/topMoverWidget';

export const ARMDashboard = () => {
  return (
    <Dashboard>
      <PrimaryWidgets>
        <PrimaryWidget>
          <CifListWidget />
        </PrimaryWidget>
        <PrimaryWidget>
          <TopMoverWidget />
        </PrimaryWidget>
      </PrimaryWidgets>
      <SecondaryWidgets>
        <SecondaryWidget>
          <ContactHistoryListWidget />
        </SecondaryWidget>
      </SecondaryWidgets>
    </Dashboard>
  );
};

const Dashboard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const PrimaryWidgets = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;
`;

const SecondaryWidgets = styled.div`
  flex: 0.4;
`;
