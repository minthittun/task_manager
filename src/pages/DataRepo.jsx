import React from 'react'
import { Tree } from 'antd';
const { DirectoryTree } = Tree;
const treeData = [
    {
        title: 'Hate Speech Data Project',
        key: '0-0',
        children: [
            {
                title: 'Model v1.0',
                key: '0-0-0-0',
                children: [
                    {
                        title: 'Model zip',
                        key: '0-0-0-0-1',
                        isLeaf: true,
                    }
                ]
            },
            {
                title: 'Model v1.0.1 zip',
                key: '0-0-1',
                isLeaf: true,
            },
        ],
    }
];



function DataRepo() {

    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };
    const onExpand = (keys, info) => {
        //console.log('Trigger Expand', keys, info);
    };

    return (
        <div className='main-content-padding'>
            <DirectoryTree
                multiple
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
            />
        </div>
    )
}

export default DataRepo
