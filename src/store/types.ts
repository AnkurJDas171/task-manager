import { cardData } from "../components/types"

export type StateType = {
    listData: cardData[],
    isHomePageLoading: boolean,
    isEditPageLoading: boolean,
    isCreatePageLoading: boolean,
    selectedCardId: string,
    taskTitle: string,
    taskDescription: string,
    taskStatus: string,
    setListData: (arg: cardData[]) => void,
    setIsHomePageLoading: (arg: boolean) => void,
    setIsEditPageLoading: (arg: boolean) => void,
    setIsCreatePageLoading: (arg: boolean) => void,
    setSelectedCardId: (arg: string) => void,
    setTaskTitle: (arg: string) => void,
    setTaskDescription: (arg: string) => void,
    setTaskStatus: (arg: string) => void
}