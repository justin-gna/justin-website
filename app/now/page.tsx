import type { Metadata } from 'next'
import Now from '@/components/Now'

export const metadata: Metadata = {
  title: 'now — justin gnananadchtheram',
}

export default function NowPage() {
  return <Now />
}
