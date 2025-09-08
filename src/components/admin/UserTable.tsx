import { useState } from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { UserX, Ban, Trash2 } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onUpdateStatus: (id: string, status: 'active' | 'inactive') => void;
  onRemoveUser: (id: string) => void;
}

export const UserTable = ({ users, onUpdateStatus, onRemoveUser }: UserTableProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState<'disable' | 'remove'>('disable');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAction = (user: User, action: 'disable' | 'remove') => {
    setSelectedUser(user);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;

    if (actionType === 'disable') {
      const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active';
      onUpdateStatus(selectedUser.id, newStatus);
    } else {
      onRemoveUser(selectedUser.id);
    }

    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {truncateAddress(user.walletAddress)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(user, 'disable')}
                        className="flex items-center gap-1"
                      >
                        {user.status === 'active' ? (
                          <>
                            <Ban className="w-3 h-3" />
                            Disable
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3" />
                            Enable
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleAction(user, 'remove')}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmAction}
        title={`${actionType === 'disable' ? 'Toggle User Status' : 'Remove User'}`}
        message={
          actionType === 'disable'
            ? `Are you sure you want to ${selectedUser?.status === 'active' ? 'disable' : 'enable'} ${selectedUser?.firstName} ${selectedUser?.lastName}?`
            : `Are you sure you want to permanently remove ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`
        }
        confirmText={actionType === 'disable' ? 'Confirm' : 'Remove'}
        isDestructive={actionType === 'remove'}
      />
    </>
  );
};