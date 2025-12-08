// src/app/components/EventLog.tsx
import React from 'react';

export function EventLog({ events }: { events: string[] }) {
  return (
    <div style={{ border: '1px solid #eee', padding:8, borderRadius:6, maxHeight:200, overflowY:'auto', background:'#fff' }}>
      <h4>Event Log</h4>
      <div style={{ fontSize:12, color:'#333' }}>
        {events.length === 0 && <div style={{ color:'#666' }}>No events yet</div>}
        {events.map((ev, idx) => <div key={idx} style={{ padding:4, borderBottom:'1px dashed #f0f0f0' }}>{ev}</div>)}
      </div>
    </div>
  );
}
