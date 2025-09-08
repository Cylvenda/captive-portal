import { create } from 'zustand';
import { User, UserStats } from '@/types/user';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    walletAddress: '0x1234567890123456789012345678901234567890',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    walletAddress: '0x0987654321098765432109876543210987654321',
    status: 'active',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    walletAddress: '0x5555666677778888999900001111222233334444',
    status: 'inactive',
    createdAt: '2024-01-10T09:45:00Z'
  }
];

interface UserState {
  users: User[];
  stats: UserStats;
  isLoading: boolean;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUserStatus: (id: string, status: 'active' | 'inactive') => void;
  removeUser: (id: string) => void;
  calculateStats: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: mockUsers,
  stats: {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'active').length,
    inactiveUsers: mockUsers.filter(u => u.status === 'inactive').length,
  },
  isLoading: false,
  
  addUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    set(state => ({
      users: [...state.users, newUser]
    }));
    get().calculateStats();
  },
  
  updateUserStatus: (id, status) => {
    set(state => ({
      users: state.users.map(user =>
        user.id === id ? { ...user, status } : user
      )
    }));
    get().calculateStats();
  },
  
  removeUser: (id) => {
    set(state => ({
      users: state.users.filter(user => user.id !== id)
    }));
    get().calculateStats();
  },
  
  calculateStats: () => {
    const { users } = get();
    set({
      stats: {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        inactiveUsers: users.filter(u => u.status === 'inactive').length,
      }
    });
  },
}));