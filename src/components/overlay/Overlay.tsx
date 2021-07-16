import React from 'react';
import {
  OverlayContainer,
  OverlayProps as AriaOverldayProps,
  useModal,
  useOverlay,
  usePreventScroll,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { AriaDialogProps } from '@react-types/dialog';

interface OverlayProps extends AriaOverldayProps, AriaDialogProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Overlay = ({ children, onClose, ...otherProps }: OverlayProps) => {
  let ref = React.useRef(null);
  let { overlayProps, underlayProps } = useOverlay(otherProps, ref);
  let { dialogProps, titleProps } = useDialog(otherProps, ref);
  let { modalProps } = useModal();
  usePreventScroll();
  return (
    <OverlayContainer>
      <div
        style={{
          position: 'fixed',
          zIndex: 100,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...underlayProps}
      >
        <div {...overlayProps} {...dialogProps} {...modalProps} ref={ref}>
          <h3>test</h3>
          {children}
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </OverlayContainer>
  );
};
