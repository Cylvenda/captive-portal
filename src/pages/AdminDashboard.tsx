import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { OverviewCards } from '@/components/admin/OverviewCards';
import { UserTable } from '@/components/admin/UserTable';
import { RegisterUserForm } from '@/components/admin/RegisterUserForm';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Shield } from 'lucide-react';

export const AdminDashboard = () => {
  const { users, stats, addUser, updateUserStatus, removeUser, calculateStats } = useUserStore();

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage users and access control</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <OverviewCards stats={stats} />
          </section>

          {/* Register Form */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <RegisterUserForm onRegister={addUser} />
          </section>

          {/* User Table */}
          <section>
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <UserTable 
              users={users} 
              onUpdateStatus={updateUserStatus} 
              onRemoveUser={removeUser} 
            />
          </section>
        </div>
      </main>
    </div>
  );
};