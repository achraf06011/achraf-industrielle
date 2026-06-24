import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ACHRAF INDUSTRIELLE — Partenaire Industriel à Marrakech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050A14 0%, #0A1628 50%, #0F2040 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(15,76,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,76,129,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow top */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(15,76,129,0.4) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #0A3560, #1A6AB0)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            border: '2px solid rgba(255,255,255,0.15)',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: '42px',
              fontWeight: '900',
              letterSpacing: '-2px',
            }}
          >
            A
          </div>
        </div>

        {/* Company name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ color: 'white', fontSize: '52px', fontWeight: '800', letterSpacing: '4px' }}>
            ACHRAF
          </div>
          <div style={{ color: '#00A8E8', fontSize: '22px', fontWeight: '600', letterSpacing: '8px' }}>
            INDUSTRIELLE
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0F4C81, transparent)',
            margin: '28px 0',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '20px',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: '1.5',
          }}
        >
          Construction Métallique · Maintenance Industrielle · Électricité
        </div>

        {/* Location badge */}
        <div
          style={{
            marginTop: '32px',
            padding: '10px 24px',
            background: 'rgba(15,76,129,0.3)',
            border: '1px solid rgba(15,76,129,0.5)',
            borderRadius: '50px',
            color: '#00A8E8',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '1px',
          }}
        >
          📍 Marrakech, Maroc — Depuis 2016
        </div>

        {/* Bottom website */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '14px',
          }}
        >
          achraf-industrielle.com
        </div>
      </div>
    ),
    { ...size }
  )
}
