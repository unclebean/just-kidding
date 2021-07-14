import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PrimaryWidgetProps {
  children: ReactNode;
}

export const PrimaryWidget = ({ children }: PrimaryWidgetProps) => {
  return <PrimaryWidgetWrapper>{children}</PrimaryWidgetWrapper>;
};

const PrimaryWidgetWrapper = styled.div`
  flex: 0.5;
`;
