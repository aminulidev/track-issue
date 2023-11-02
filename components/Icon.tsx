'use client'

import Link from "next/link"
import { Button } from "./ui/button"

interface Props {
    href: string;
    children: React.ReactNode
}
const Icon = ({href, children}: Props) => {
  return (
    <Button variant='link' size='link'>
        <Link href={href}>{children}</Link>
    </Button>
  )
}

export default Icon