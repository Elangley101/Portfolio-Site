import { ImageResponse } from 'next/og';
import { heroMetrics } from '@/content/metrics';
import { seo, site } from '@/content/site';

export const alt = seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated at build time so no binary asset needs to live in the repo. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0a0c0f',
        backgroundImage:
          'linear-gradient(to right, rgba(232,236,242,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,236,242,0.05) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        padding: '72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: '#4fc3a1',
            color: '#06231c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          EL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#e8ecf2', fontSize: 24, fontWeight: 600 }}>{site.name}</span>
          <span style={{ color: '#78838f', fontSize: 15, letterSpacing: 2 }}>
            DATA PLATFORM CONSULTING
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span
          style={{
            color: '#e8ecf2',
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.6,
            maxWidth: 940,
          }}
        >
          Reliable data platforms without another full-time hire.
        </span>
        <span style={{ color: '#97a3b2', fontSize: 26, maxWidth: 900, lineHeight: 1.4 }}>
          Snowflake, dbt, Airflow, Databricks, Python and internal AI systems — delivered as
          assessments, sprints or fractional support.
        </span>
      </div>

      <div style={{ display: 'flex', gap: 24, borderTop: '1px solid #222a34', paddingTop: 28 }}>
        {heroMetrics.map((metric) => (
          <div
            key={metric.label}
            style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 6 }}
          >
            <span style={{ color: '#4fc3a1', fontSize: 34, fontWeight: 600 }}>
              {metric.prefix ?? ''}
              {metric.value}
              {metric.suffix}
            </span>
            <span style={{ color: '#97a3b2', fontSize: 18 }}>{metric.label}</span>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
