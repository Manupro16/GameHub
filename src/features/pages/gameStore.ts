// gameStore.js
import { create } from 'zustand';

export interface GameStoreState {
    selectedGameId: number | null;
    setSelectedGameId: (id: number | null) => void;
}


const useGameStore = create<GameStoreState>((set) => ({
    selectedGameId: null,
    setSelectedGameId: (id) => set({ selectedGameId: id }),
}));


export default useGameStore;