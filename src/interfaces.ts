import firebase from "firebase/compat";

export interface IUser {
    firebaseUser?: firebase.User,
    userId: string
}

export interface IMapCard {
    id?: string;
    name: string,
    description?: string,
    people: Array<string>,
    imgSrc?: string,
    owner: string
}

export interface IPersonCard {
    id?: string,
    names: Array<string>,
    familyNames?: Array<string>,
    titles?: Array<string>,
    relations?: Array<string>,
    stories?: Array<string>
}

export interface IStoryCard {
    id?: string,
    title: string,
    datePeriod?: string,
    characters?: Array<string>,
    description: string
}

export interface IRelationCard {
    id?: string,
    personSourceId: string,
    personTargetId: string,
    type?: string
    description?: string
}

export interface INodeData {
    id: string,
    data: { label: string },
    position: { x: number, y: number },
    type?: string
}

export interface IEdgeData {
    id: string,
    source: string,
    target: string,
    label?: string,
    type?: string
}

export interface IFlow {
    nodesData: INodeData[],
    edgesData: IEdgeData[]
}
