import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Matches the monogram in the site header. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0e7c63',
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        fontFamily: 'monospace',
        borderRadius: 14,
      }}
    >
      EL
    </div>,
    size,
  );
}
