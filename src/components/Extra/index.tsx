'use client'

import { LetterboxdDiary } from 'letterboxd-diary'

const apiUrl = process.env.NEXT_PUBLIC_LETTERBOXD_API_URL

function Extra() {
  return (
    <section id="extra" style={{ backgroundColor: '#121212', padding: '90px 0 120px' }}>
      <h2 style={{ textAlign: 'center', maxWidth: '56rem', margin: '0 auto 64px', padding: '0 3rem' }}>extra</h2>
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 48px' }}>
        {apiUrl && (
          <LetterboxdDiary
            apiUrl={apiUrl}
            name="justin"
            count={6}
            layout="list"
            showReviews={true}
          />
        )}
      </div>
      <div style={{ maxWidth: '56rem', margin: '64px auto 0', padding: '0 3rem' }}>
        <h3>blog</h3>
        <p style={{ marginTop: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>coming soon</p>
      </div>
    </section>
  )
}

export default Extra
