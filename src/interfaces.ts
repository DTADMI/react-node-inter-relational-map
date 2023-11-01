import firebase from "firebase/compat";
import {Connection, Edge} from "@reactflow/core/dist/esm/types";
import {addEdge, Node, OnConnect, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState} from "reactflow";
import {useCallback} from "react";

export interface IUser {
    firebaseUser?: firebase.User,
    userId: string
}

export interface IMapCard {
    id?: string;
    name: string,
    description?: string,
    people: Array<string>,
    relationships: Set<string>,
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
    relationType?: string,
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
    nodesData: Node[],
    edgesData: Edge[],
    setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>,
    setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>,
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    onConnect: OnConnect
}
