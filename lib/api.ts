const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // ==================== AUTH ====================
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },

  // ==================== USERS ====================
  getUser: async (id: number) => {
    const res = await fetch(`${API_URL}/users/${id}`);
    return res.json();
  },

  getAllUsers: async () => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  },

  createUser: async (data: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ==================== ACCOUNTS ====================
  getUserAccounts: async (userId: number) => {
    const res = await fetch(`${API_URL}/accounts/user/${userId}`);
    return res.json();
  },

  getAccount: async (id: number) => {
    const res = await fetch(`${API_URL}/accounts/${id}`);
    return res.json();
  },

  getAccountByNumber: async (accountNumber: string) => {
    const res = await fetch(`${API_URL}/accounts/number/${accountNumber}`);
    return res.json();
  },

  getAllAccounts: async () => {
    const res = await fetch(`${API_URL}/accounts`);
    return res.json();
  },

  createAccount: async (data: {
    userId: number;
    accountNumber: string;
    balance?: number;
    type: string;
    alias?: string;
  }) => {
    const res = await fetch(`${API_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ==================== TRANSACTIONS ====================
  getAccountTransactions: async (accountId: number) => {
    const res = await fetch(`${API_URL}/transactions/account/${accountId}`);
    return res.json();
  },

  getAllTransactions: async () => {
    const res = await fetch(`${API_URL}/transactions`);
    return res.json();
  },

  createTransaction: async (data: {
    accountId: number;
    targetAccount: string;
    amount: number;
    description: string;
    type: string;
  }) => {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  transfer: async (data: {
    fromAccountId: number;
    toAccountNumber: string;
    amount: number;
    description: string;
  }) => {
    const res = await fetch(`${API_URL}/transactions/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ==================== RECIPIENTS ====================
  getUserRecipients: async (userId: number) => {
    const res = await fetch(`${API_URL}/recipients/user/${userId}`);
    return res.json();
  },

  getAllRecipients: async () => {
    const res = await fetch(`${API_URL}/recipients`);
    return res.json();
  },

  saveRecipient: async (data: {
    userId: number;
    accountNumber: string;
    alias: string;
    bankName?: string;
    accountType?: string;
  }) => {
    const res = await fetch(`${API_URL}/recipients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteRecipient: async (id: number) => {
    const res = await fetch(`${API_URL}/recipients/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
