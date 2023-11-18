import BackButton from '@/components/BackButton'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import ListForm from '../_components/ListForm'

const ListNewPage = () => {
    return (
        <>
            <Toaster />
            <div>
                <BackButton>Back</BackButton>
                <ListForm />
            </div>
        </>
    )
}

export default ListNewPage