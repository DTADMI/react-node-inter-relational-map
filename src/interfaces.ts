export interface IMapCard {
    mapName: string,
    mapDescription?: string,
    imgSrc?: string
}

export interface IMapPerson {
    personId: string,
    names: Array<string>,
    familyNames?: Array<string>,
    titles?: Array<string>,
    relations?: Array<string>,
    stories?: Array<string>
}

export interface IMapStory {
    storyId: string,
    title: string,
    datePeriod?: string,
    characters?: Array<string>,
    description: string
}

export interface IMapRelation {
    relationId: string,
    personId: string,
    type: string
}
