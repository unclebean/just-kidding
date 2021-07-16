import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { PrimaryWidget } from '../../components/widgetsHelper/PrimaryWidget';
import { SecondaryWidget } from '../../components/widgetsHelper/SecondaryWidget';
import { ClientsAndCifsWidget } from '../../views/clientsAndCifs/ClientsAndCifsWidget';
import { ContactHistoryListWidget } from '../../views/contactHisotry/ContactHisotryWidget';
import { PositionsWidget } from '../../views/positions/PositionsWidget';
import { WidgetsLayout } from '../../components/customLayout/WidgetsLayout';
import { CurrentAccountsWidget } from '../../views/currentAccounts/CurrentAccountsWidget';
import { CorporateActionsWidget } from '../../views/corporateActions/CorporateActionsWidget';
import { Overlay } from '../../components/overlay/Overlay';

export interface WidgetMeta {
  widgetName: string;
  isUsed: boolean;
  desc: string;
  widgetCategory: 'primary' | 'secondary';
  component: React.FC;
}

const data = {
  tasks: {
    currentAccoounts: {
      id: 'currentAccoounts',
      content: 'Current Accounts',
    },
    corporateActions: {
      id: 'corporateActions',
      content: 'Corporate Actions',
    },
    clientAndCifs: {
      id: 'clientAndCifs',
      content: 'Client & CIFS',
    },
    positions: {
      id: 'positions',
      content: 'Positions',
    },
    contactHistory: {
      id: 'contactHistory',
      content: 'Contact History',
    },
  },
  columns: {
    allWidgets: {
      id: 'allWidgets',
      title: 'All Widgets',
      taskIds: ['currentAccoounts', 'corporateActions'],
    },
    primaryWidgets: {
      id: 'primaryWidgets',
      title: 'Primary Widgets',
      taskIds: ['clientAndCifs', 'positions'],
    },
    secondaryWidgets: {
      id: 'secondaryWidgets',
      title: 'Secondary Widgets',
      taskIds: ['contactHistory'],
    },
  },
  columnOrder: ['allWidgets', 'primaryWidgets', 'secondaryWidgets'],
};

const AllWidgets: Array<WidgetMeta> = [
  {
    widgetName: 'currentAccoounts',
    isUsed: false,
    desc: 'Current Accounts',
    widgetCategory: 'primary',
    component: CurrentAccountsWidget,
  },
  {
    widgetName: 'corporateActions',
    isUsed: false,
    desc: 'Corporate Actions',
    widgetCategory: 'secondary',
    component: CorporateActionsWidget,
  },
  {
    widgetName: 'clientAndCifs',
    isUsed: true,
    desc: 'Client & CIFS',
    widgetCategory: 'primary',
    component: ClientsAndCifsWidget,
  },
  {
    widgetName: 'positions',
    isUsed: true,
    desc: 'Positions',
    widgetCategory: 'primary',
    component: PositionsWidget,
  },
  {
    widgetName: 'contactHistory',
    isUsed: true,
    desc: 'Contact History',
    widgetCategory: 'secondary',
    component: ContactHistoryListWidget,
  },
];

export const ARMDashboard = () => {
  let state = useOverlayTriggerState({});
  const [allWidgets, updateAllWidgets] = useState(AllWidgets);
  const [primaryWidgets, updatePrimaryWidgets] = useState(
    allWidgets.filter((w) => w.widgetCategory === 'primary' && w.isUsed),
  );
  const [config, updateConfig] = useState(data);
  const [secondaryWidgets, updateSecondaryWidgets] = useState(
    allWidgets.filter((w) => w.widgetCategory === 'secondary' && w.isUsed),
  );
  const updateWidgets = (data: any) => {
    updateConfig(data);
    const hiddenWidgets = data.columns.allWidgets.taskIds;
    const primaryWidgets = data.columns.primaryWidgets.taskIds;
    const secondaryWidgets = data.columns.secondaryWidgets.taskIds;
    updateAllWidgets(
      allWidgets.map((w) => {
        if (hiddenWidgets.indexOf(w.widgetName) !== -1) {
          w.isUsed = false;
        }
        if (primaryWidgets.indexOf(w.widgetName) !== -1) {
          w.widgetCategory = 'primary';
        }
        if (secondaryWidgets.indexOf(w.widgetName) !== -1) {
          w.widgetCategory = 'secondary';
        }
        return w;
      }),
    );
    updatePrimaryWidgets(
      primaryWidgets.map((widgetName: string) => {
        return allWidgets.find((w: WidgetMeta) => w.widgetName === widgetName);
      }),
    );
    updateSecondaryWidgets(
      secondaryWidgets.map((widgetName: string) => {
        return allWidgets.find((w: WidgetMeta) => w.widgetName === widgetName);
      }),
    );
  };
  const renderPrimaryWidgets = () => {
    return primaryWidgets.map((w) => {
      const Widget = w.component;
      return (
        <PrimaryWidget key={w.widgetName}>
          <Widget />
        </PrimaryWidget>
      );
    });
  };
  const renderSecondaryWidgets = () => {
    return secondaryWidgets.map((w) => {
      const Widget = w.component;
      return (
        <SecondaryWidget key={w.widgetName}>
          <Widget />
        </SecondaryWidget>
      );
    });
  };
  return (
    <div style={{ padding: '10px' }}>
      <button onClick={state.open}>Configuration</button>
      <Dashboard>
        <PrimaryWidgets>{renderPrimaryWidgets()}</PrimaryWidgets>
        <SecondaryWidgets>
          <SecondaryWidget>{renderSecondaryWidgets()}</SecondaryWidget>
        </SecondaryWidgets>
        {state.isOpen && (
          <Overlay onClose={state.close} isDismissable>
            <WidgetsLayout data={config} callback={updateWidgets} />
          </Overlay>
        )}
      </Dashboard>
    </div>
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
  padding: 5px;
  * + * {
    margin-top: 5px;
  }
`;

const SecondaryWidgets = styled.div`
  flex: 0.4;
  padding: 5px;
  * + * {
    margin-top: 5px;
  }
`;
