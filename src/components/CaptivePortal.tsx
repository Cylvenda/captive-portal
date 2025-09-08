import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ConfirmationModal } from './ConfirmationModal';
import { useWalletStore } from '@/stores/walletStore';
import { connectMetaMask, checkMetaMaskAvailability, validateEthereumAddress } from '@/utils/metamask';
import { useToast } from '@/hooks/use-toast';
import { Wallet, WifiOff, Shield, ExternalLink, AlertCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import axios from 'axios';
import { assets } from '@/assets/assets';

export const CaptivePortal = () => {
  const [manualAddress, setManualAddress] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<'metamask' | 'manual'>('metamask');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { 
    address, 
    isConnecting, 
    error, 
    setAddress, 
    setConnecting, 
    setError, 
    setConnected 
  } = useWalletStore();

  const handleMetaMaskConnect = async () => {
    setConnecting(true);
    setError(null);
    
    try {
      const walletAddress = await connectMetaMask();
      setAddress(walletAddress);
      setConnectionMethod('metamask');
      setShowConfirmation(true);
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: err.message,
      });
    } finally {
      setConnecting(false);
    }
  };

  const handleManualSubmit = () => {
    setError(null);
    
    if (!manualAddress.trim()) {
      setError('Please enter an Wallet address.');
      return;
    }
    
    if (!validateEthereumAddress(manualAddress.trim())) {
      setError('Please enter a valid Wallet address.');
      return;
    }
    
    setAddress(manualAddress.trim());
    setConnectionMethod('manual');
    setShowConfirmation(true);
  };

  const handleConfirmConnection = async () => {
    if (!address) return;
    
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/wallet', {
        address: address
      });
      
      setConnected(true);
      setShowConfirmation(false);
      
      toast({
        title: "Connection Successful",
        description: "You are now connected to the network!",
        className: "bg-success text-success-foreground",
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to connect to the network. Please try again.';
      toast({
        variant: "destructive",
        title: "Network Connection Failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in relative">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* Documentation Link */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/docs')}
            className="text-muted-foreground hover:text-foreground"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>

        <Card className="portal-card animate-slide-up">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-24 h-20 bg-primary/10 p-2 shadow-2xl rounded-full flex items-center justify-center animate-bounce-gentle">
            <img src={assets.ega} alt="e-GA" sizes="100"  />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold mb-2">
              RIDC Network Access Portal
            </CardTitle>
            <p className="text-muted-foreground">
              Connect your Wallet to access the network
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Option 1: Connect with MetaMask</h3>
              {!checkMetaMaskAvailability() ? (
                <div className="space-y-3">
                  <Alert>
                    <WifiOff className="h-4 w-4" />
                    <AlertDescription>
                      MetaMask not detected. Please install MetaMask browser extension.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    variant="outline" 
                    className="w-full portal-button-secondary"
                    onClick={() => window.open('https://metamask.io/', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Install MetaMask
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleMetaMaskConnect}
                  disabled={isConnecting}
                  className="w-full portal-button-primary"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </Button>
              )}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Option 2: Manual Entry</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Enter your Ethereum address (0x...)"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="portal-input"
                />
                <Button 
                  onClick={handleManualSubmit}
                  className="w-full portal-button-secondary"
                >
                  Submit Address
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-muted-foreground">
            <p>Secure connection via valid blockchain wallet verification</p>
          </div>
        </CardContent>
        </Card>
      </div>
      
      {address && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmConnection}
          address={address}
          isSubmitting={isSubmitting}
          connectionMethod={connectionMethod}
        />
      )}
    </div>
  );
};