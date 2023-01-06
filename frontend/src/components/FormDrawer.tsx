import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

type Props = {
  drawerOpen: boolean;
  toggleDrawerState: (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
  children: JSX.Element;
};

export default function FormDrawer(props: Props) {
  const { drawerOpen, toggleDrawerState, children } = props;
  return (
    <>
      <Button onClick={toggleDrawerState}></Button>
      <Drawer
        sx={{
          zIndex: 2000,
          maxWidth: { sm: '50vw' }
        }}
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawerState}
      >
        {children}
      </Drawer>
    </>
  );
}
