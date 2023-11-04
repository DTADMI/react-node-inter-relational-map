import React from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {IFlow} from "../../interfaces";

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