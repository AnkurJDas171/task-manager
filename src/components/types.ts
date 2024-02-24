export type Navigation = {
    navigate: (arg: string) => void,
    goBack: () => void
}

export type DateViewerProps = {
    currentDate: Date | null
}

export type TimeViewerProps = {
    currentTime: Date | null
}

export type ButtonProps = {
    children: JSX.Element,
    handlePress: () => void
}

export type CreateTaskButtonProps = {
    navigation: Navigation
}

export type TaskListProps = {
    navigation: Navigation
}

export type TaskTitleProps = {
    title: string
}

export type cardData = {
    id: string,
    title: string,
    description: string,
    status: string
}

export type ListItemProps = {
    item: cardData,
    navigation: Navigation
}

export type EditCardTitleProps = {
    prevTitle?: string | null
}

export type EditCardDescriptionProps = {
    prevDescription?: null | string
}

export type DropDownProps = {
    defaultValue?: string
}

export type DropDownListProps = {
    hanldeSelect: (args: string) => void
}

export type Timeout = ReturnType<typeof setTimeout>

export type SaveButtonProps = {
    handleSave: () => void
}

export type CancelButtonProps = {
    hadleCancel: () => void
}
