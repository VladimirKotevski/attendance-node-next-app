"use client";

import { useState } from 'react';
import { ErrorDialog } from '../components/Dialogs/ErrorDialog/ErrorDialog';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleClose = () => {
    setDialogOpen(false);
    reset();
  };

  return (
    <>
      <ErrorDialog
        open={dialogOpen}
        onAck={handleClose}
        error={error}
      />
    </>
  );
}