import { create } from 'zustand';

interface DogamState {
  type: string;
  info: string;
}

interface DogamActions {
  setType: (type: string) => void;
  setInfo: (info: string) => void;
  reset: () => void;
}

const initialState: DogamState = {
  type: '',
  info: '',
};

export const useDogamStore = create<DogamState & DogamActions>((set) => ({
  ...initialState,
  setType: (type) => set({ type }),
  setInfo: (info) => set({ info }),
  reset: () => set(initialState),
}));
