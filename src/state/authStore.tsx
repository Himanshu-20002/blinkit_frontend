import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';


interface authStore {
  user: Record<string, any> | null; //- It can either be an object (with string keys and values of any type) or `null`, indicating that no user is currently authenticated.
  setUser: (user: any) => void;
  setCurrentOrder: (order: Record<string, any> | null) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
}
export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: order => set({currentOrder: order}),
      setUser: user => set({user}),
      logout: () => set({user: null, currentOrder: null}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
