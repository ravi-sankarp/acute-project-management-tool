import { useState } from 'react';

function useToggleDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerState = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen((prev) => !prev);
  };
  return { drawerOpen, toggleDrawerState };
}

export default useToggleDrawer;
