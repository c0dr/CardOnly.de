import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';

const ScreenSizeAlert = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="screenSizeAlert">
        <DialogHeader>
          <DialogTitle>Bildschrimgröße</DialogTitle>
        </DialogHeader>
        <Alert variant="warning" className="my-4">
          <AlertDescription>
            <p>Vielen Dank für Ihr Interesse an dem umfangreichen Kreditkartenvergleich von CardOnly.de</p>
            <p>Für das bessere Benutzererlebnis empfehlen wir den Besuch mit einem großen Bildschirm.</p>
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScreenSizeAlert;
