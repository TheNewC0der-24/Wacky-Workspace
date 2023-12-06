import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { BsFolderFill } from 'react-icons/bs'

export default function Folder({ folder }) {

    return (
        <Link
            to={`/folder/${folder.id}`}
            state={{ folder: folder }}
        >
            <Button
                fullWidth
                startIcon={<BsFolderFill />}
                variant="outlined"
                sx={{ textTransform: 'none' }}
            >
                {folder.name.length > 20 ? folder.name.substring(0, 20) + "..." : folder.name}
            </Button>
        </Link>
    )
}
