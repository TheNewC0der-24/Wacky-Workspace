import React from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { ROOT_FOLDER } from '../Hooks/useFolder';

export default function FolderBreadcrumbs({ currentFolder }) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) path = [...path, ...currentFolder.path]

    return (
        <Breadcrumbs sx={{ flexGrow: 1 }}>
            {path.map((folder, index) => (
                <Link
                    key={folder.id}
                    className='link'
                    to={folder.id ? `/folder/${folder.id}` : "/"}
                    state={{ folder: { ...folder, path: path.slice(0, index) } }}
                >
                    {folder.name}
                </Link>
            ))}

            {currentFolder && (
                <Typography color="text.secondary">
                    {currentFolder.name}
                </Typography>
            )}
        </Breadcrumbs>
    )
}
