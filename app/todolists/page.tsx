import BackButton from '@/components/BackButton'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import TodoListForm from '../lists/_components/TodoListForm'

const TodoListPage = () => {
    return (
        <>
            <Toaster />
            <div>
                <BackButton>Back</BackButton>
                <div>
                    TodoListPage
                </div>
            </div>
        </>
    )
}

export default TodoListPage