import { create } from "zustand";
import { authService } from "@/services/auth.service";

import type { LoginRequest, RegisterRequest, User } from "@/types/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;

  setAuth: (user: User, accessToken: string) => void;

  clearAuth: () => void;

  login: (data: LoginRequest) => Promise<void>;

  register: (data: RegisterRequest) => Promise<void>;

  logout: () => Promise<void>;

  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,
  initialized: false,

  setAuth: (user, accessToken) => {
    localStorage.setItem("accessToken", accessToken);

    set({
      user,
      accessToken,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const response = await authService.login(data);

      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true });

    try {
      const response = await authService.register(data);

      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("accessToken");

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    }
  },

  initialize: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      set({ initialized: true });
      return;
    }

    set({ isLoading: true });

    try {
      const response = await authService.getMe();

      set({
        user: response.data,
        accessToken: token,
        isAuthenticated: true,
      });
    } catch {
      localStorage.removeItem("accessToken");

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isLoading: false,
        initialized: true,
      });
    }
  },
}));
