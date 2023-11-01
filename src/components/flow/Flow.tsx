import React, {useState, useCallback, useEffect} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';

import 'reactflow/dist/style.css';
import {Connection, Edge} from "@reactflow/core/dist/esm/types";
import {IFlow} from "../../interfaces";

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' },
    type: 'input', },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Flow = ({nodesData, edgesData, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect}: IFlow) => {

    return (
        <ReactFlow
            nodes={nodesData}
            edges={edgesData}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        >
            <MiniMap />
            <Controls />
            <Background />
        </ReactFlow>
    );
};

export default React.memo(Flow);