// src/app/components/EventLog.tsx
import React from 'react';
import { useI18n } from '../i18n';

export function EventLog({ events, darkMode }: { events: string[], darkMode?: boolean }) {
 const { t } = useI18n();
 const panelStyle = {
 border: '1px solid',
 borderColor: darkMode ? '#444' : '#ccc',
 borderRadius:6,
 padding:10,
 background: darkMode ? '#232323' : '#fff',
 color: darkMode ? '#fff' : '#222',
 marginBottom:12,
 minHeight:60
 };
 return (
 <div style={panelStyle}>
 <h3 style={{ color: darkMode ? '#fff' : '#222' }}>{t('log.title')}</h3>
 {(!events || events.length ===0) ? (
 <div style={{ color: darkMode ? '#aaa' : '#777' }}>{t('log.empty')}</div>
 ) : (
 <ul style={{ paddingLeft:18, margin:0 }}>
 {events.map((e, i) => (
 <li key={i} style={{ color: darkMode ? '#ccc' : '#222', fontSize:13 }}>{e}</li>
 ))}
 </ul>
 )}
 </div>
 );
}
