import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, Globe, Code, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/5 p-4 relative">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portal
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Learn how to connect to the network using MetaMask or manual wallet entry
          </p>
        </div>

        <div className="grid gap-8">
          {/* MetaMask Connection */}
          <Card className="portal-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">MetaMask Connection</CardTitle>
                  <CardDescription>Connect automatically using your MetaMask wallet</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">How it works:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Install MetaMask Extension</p>
                      <p className="text-sm text-muted-foreground">
                        Download MetaMask from{' '}
                        <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          metamask.io
                        </a>{' '}
                        and add it to your browser
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Click "Connect with MetaMask"</p>
                      <p className="text-sm text-muted-foreground">
                        The system will automatically detect MetaMask and request connection
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Approve in MetaMask</p>
                      <p className="text-sm text-muted-foreground">
                        MetaMask will open asking for permission to connect - click "Connect"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Confirm Connection</p>
                      <p className="text-sm text-muted-foreground">
                        Review your wallet address in the confirmation modal and click "Connect to Network"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Technical Details:</h4>
                <code className="text-sm bg-muted rounded px-2 py-1 block">
                  ethereum.request({'{'}method: "eth_requestAccounts"{'}'})
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Uses the standard Ethereum provider API to request account access
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Manual Entry */}
          <Card className="portal-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Manual Wallet Entry</CardTitle>
                  <CardDescription>Enter your Ethereum address manually</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">How it works:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Copy Your Wallet Address</p>
                      <p className="text-sm text-muted-foreground">
                        Get your Ethereum address from your wallet (MetaMask, Coinbase, etc.)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Paste in Input Field</p>
                      <p className="text-sm text-muted-foreground">
                        Enter the address in the "Enter wallet address" field
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Automatic Validation</p>
                      <p className="text-sm text-muted-foreground">
                        The system validates the address format in real-time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Submit & Confirm</p>
                      <p className="text-sm text-muted-foreground">
                        Click "Submit" and confirm your address in the popup modal
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Valid Address Format:</h4>
                <code className="text-sm bg-muted rounded px-2 py-1 block">
                  0x742d35Cc6634C0532925a3b8D29c5B8B9b010f60
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Must start with "0x" followed by 40 hexadecimal characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Backend API */}
          <Card className="portal-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Backend API Integration</CardTitle>
                  <CardDescription>How wallet addresses are sent to the server</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">API Endpoint:</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <code className="text-sm font-mono">
                    POST http://localhost:3000/api/wallet
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Request Format:</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <pre className="text-sm font-mono overflow-x-auto">
{`{
  "address": "0x742d35Cc6634C0532925a3b8D29c5B8B9b010f60",
  "connectionMethod": "metamask" | "manual"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Response Handling:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-700 dark:text-green-400">Success (200)</p>
                      <p className="text-sm text-muted-foreground">
                        Shows success toast: "Successfully connected to network!"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Error (4xx/5xx)</p>
                      <p className="text-sm text-muted-foreground">
                        Shows error toast with server message or "Connection failed"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Implementation:</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <pre className="text-sm font-mono overflow-x-auto">
{`const response = await axios.post(
  'http://localhost:3000/api/wallet',
  {
    address: walletAddress,
    connectionMethod: method
  }
);`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notes */}
          <Card className="portal-card border-amber-200/50 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-xl text-amber-800 dark:text-amber-200">Security Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Read-Only Access</p>
                  <p className="text-sm text-muted-foreground">
                    The portal only reads your wallet address - no signing or transactions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">No Private Keys</p>
                  <p className="text-sm text-muted-foreground">
                    Your private keys never leave your wallet - completely safe
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address Validation</p>
                  <p className="text-sm text-muted-foreground">
                    All addresses are validated before sending to prevent errors
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;