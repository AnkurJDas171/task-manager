type Navigation = {
    navigate: (args: string) => void,
    goBack: () => void
}

export type HomeScreenProps = {
    navigation: Navigation
}

export type TaskCreateScreenProps = {
    navigation: Navigation
}

export type TaskEditScreenProps = {
    navigation: Navigation
}
