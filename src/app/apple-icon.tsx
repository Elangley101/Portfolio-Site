import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** iOS ignores transparency and rounds the corners itself, so this is a full bleed tile. */
export default function AppleIcon() {
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
        fontSize: 84,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        fontFamily: 'monospace',
      }}
    >
      EL
    </div>,
    size,
  );
}
