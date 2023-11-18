import TodoListForm from '@/app/lists/_components/TodoListForm'
import BackButton from '@/components/BackButton'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const NewTodoListPage = () => {
    return (
        <>
            <Toaster />
            <div>
                <BackButton>Back</BackButton>
                <TodoListForm />
            </div>
        </>
    )
}

export default NewTodoListPage