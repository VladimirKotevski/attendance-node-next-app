import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { ErrorHelper } from '../../../helpers/ErrorHelper';

type ErrorDialogProps = {
  open: boolean;
  onAck?: () => void;
  error?: any;
};

export function ErrorDialog({ open, onAck, error = (new Error('error.unknown')) }: ErrorDialogProps) {
  const err = ErrorHelper.parseError(error);

  return (
    <Dialog open={open} onClose={onAck} >
      <DialogTitle>{err.error}</DialogTitle>
      <DialogContent>
        <ul dangerouslySetInnerHTML={{ __html: err.message }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onAck} color="primary">
          Acknowledge
          </Button>
      </DialogActions>
    </Dialog>
  );
}