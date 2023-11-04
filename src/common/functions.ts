import {IMapCardSerialized, IMapCardUnserialized} from "../interfaces";

export const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const unserializeMapCardObject = (mapCard: IMapCardSerialized, newRelations?: Array<string>) => {
    const { relationships, ...baseCard  } = mapCard;
    const unserializedRelationships = relationships.length ? new Set(relationships) : new Set<string>();
    return {...baseCard, relationships: newRelations ? new Set(newRelations) : unserializedRelationships } as IMapCardUnserialized;
}

export const serializeMapCardObject = (mapCard: IMapCardUnserialized, newRelations?: Set<string>) => {
    const { relationships, ...baseCard  } = mapCard;
    const serializedRelationships = relationships.size ? Array.from(relationships) : new Array<string>();
    return {...baseCard, relationships: newRelations? Array.from(newRelations) : serializedRelationships} as IMapCardSerialized;
}