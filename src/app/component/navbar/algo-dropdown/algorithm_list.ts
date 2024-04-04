export interface Algorithm {
    name: string,
    is_weighted: boolean
}

export const algorithm_list: Algorithm[] = [
    {
        name: "Breath First Search",
        is_weighted: false
    },
    {
        name: "Depth First Search",
        is_weighted: false
    },
    {
        name: "Dijktras",
        is_weighted: true
    },
    {
        name: "Bidirectional",
        is_weighted: false
    },
    {
        name: "Astar",
        is_weighted: true
    }
]