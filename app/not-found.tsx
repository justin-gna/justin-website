import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1rem',
      textAlign: 'center',
      padding: '0 1.5rem',
    }}>
      <p style={{ fontSize: '16rem', fontWeight: 'bolder'}}>404</p>
      <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>this page doesn&apos;t exist.</p>
      <Link href="/" style={{ color: '#ec2651' }}>back home →</Link>
    </div>
  )
}
