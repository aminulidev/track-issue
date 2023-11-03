"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

const BackButton = ({ children }: PropsWithChildren) => {
    const router = useRouter();

    return (
        <Button onClick={() => router.back()}>{children}</Button>
    )
}

export default BackButton