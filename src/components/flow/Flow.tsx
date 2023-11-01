import {useCallback, useEffect} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
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

const Flow = ({nodesData, edgesData}: IFlow) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(nodesData);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)), [setEdges]);

    useEffect(()=>{
        setNodes(nodesData);
    }, [nodesData]);

    useEffect(()=>{
        setEdges(edgesData);
    }, [edgesData]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
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

export default Flow;