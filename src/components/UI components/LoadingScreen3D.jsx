import React from 'react';
import { Html } from '@react-three/drei';

const spinnerStyle = {
  width: '24px',
  height: '24px',
  border: '2px solid rgba(255,255,255,0.18)',
  borderTop: '2px solid rgba(255,255,255,0.7)',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
  margin: '0 auto',
  background: 'none',
};

const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

export default function LoadingScreen3D({ message = 'Loading...' }) {
  return (
    <Html center style={{ pointerEvents: 'none' }}>
      <style>{keyframes}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={spinnerStyle}></div>
        <div style={{ marginTop: 8, fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400, textAlign: 'center', letterSpacing: 0.1 }}>{message}</div>
      </div>
    </Html>
  );
}