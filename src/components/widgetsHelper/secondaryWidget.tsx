import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface SecondaryWidgetProps {
  children: ReactNode;
}

export const SecondaryWidget = ({ children }: SecondaryWidgetProps) => {
  return <SecondaryWidgetWrapper>{children}</SecondaryWidgetWrapper>;
};

const SecondaryWidgetWrapper = styled.div`
  flex: 0.5;
`;
