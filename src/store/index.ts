import { create } from 'zustand';

import { StateType } from './types';
import { cardData } from '../components/types';

const useStore = create<StateType>()((set) => ({
    listData: [],
    isHomePageLoading: false,
    isEditPageLoading: false,
    isCreatePageLoading: false,
    selectedCardId: "",
    taskTitle: "",
    taskDescription: "",
    taskStatus: "",
    setListData: (data: cardData[]) => set(() => ({ listData: data })),
    setIsHomePageLoading: (data: boolean) => set(() => ({ isHomePageLoading: data })),
    setIsEditPageLoading: (data: boolean) => set(() => ({ isEditPageLoading: data })),
    setIsCreatePageLoading: (data: boolean) => set(() => ({ isCreatePageLoading: data })),
    setSelectedCardId: (data: string) => set(() => ({ selectedCardId: data })),
    setTaskTitle: (data: string) => set(() => ({ taskTitle: data })),
    setTaskDescription: (data: string) => set(() => ({ taskDescription: data })),
    setTaskStatus: (data: string) => set(() => ({ taskStatus: data })),
}));

export default useStore;

