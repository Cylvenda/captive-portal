import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, Loader2 } from 'lucide-react';
import { formatAddress } from '@/utils/metamask';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  address: string;
  isSubmitting: boolean;
  connectionMethod: 'metamask' | 'manual';
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  address,
  isSubmitting,
  connectionMethod
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="portal-card max-w-md animate-fade-in">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            {connectionMethod === 'metamask' ? (
              <Wallet className="w-8 h-8 text-primary" />
            ) : (
              <CheckCircle className="w-8 h-8 text-primary" />
            )}
          </div>
          <DialogTitle className="text-xl font-semibold">
            Confirm Connection
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              {connectionMethod === 'metamask' 
                ? 'MetaMask wallet detected:' 
                : 'Manual address entered:'}
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <code className="text-sm font-mono text-primary break-all">
                {address}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Formatted: {formatAddress(address)}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 portal-button-secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm}
              disabled={isSubmitting}
              className="flex-1 portal-button-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect to Network'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};