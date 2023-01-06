import { Button, styled } from '@mui/material';

const SecondaryButton = styled(Button)({
  textTransform: 'none',
  fontSize: '.875rem',
  width: 'max-content',
  fontWeight: 500,
  margin: '.25rem auto',
  padding: '6px 1.25rem',
  lineHeight: '1.55rem',
  borderRadius: '50px',
  maxHeight: '2rem',
  borderWidth: '5px',
  borderColor: '#277af7',
  color: '#277af7',
  backgroundColor: '#fff',
  zIndex: 1,
  '&:hover': {
    color: '#277af7',
    backgroundColor: '#fff',
    transition: 'all 100ms ease-in'
  },
  '&:active': {
    top: '2px',
    transition: 'top 200ms ease-in'
  },
  '&:focus': {
    boxShadow: '0.2 0.2 0.2 0.2rem #000'
  },
  '&:disabled': {
    backgroundColor: 'rgba(0,0,0,0.2) ',
    color: '#000 ',
    pointerEvents: 'auto ',
    cursor: 'not-allowed '
  }
});

export default SecondaryButton;
