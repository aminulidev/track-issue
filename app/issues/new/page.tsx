import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const NewIssuePage = () => {
    return (
        <div>
            <div className='bg-slate-100 p-3 sm:p-5 rounded-sm max-w-xl mx-auto space-y-3'>
                <Input placeholder='Title' />
                <Textarea />
                <Button type='submit'>Submit New Issue</Button>
            </div>
        </div>
    )
}

export default NewIssuePage