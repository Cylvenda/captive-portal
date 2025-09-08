export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}