import React from 'react';
import { GameEvent } from '../../models/event';
import { useI18n } from '../i18n';

export function GameEventsPanel({ events, darkMode }: { events: GameEvent[], darkMode?: boolean }) {
 const { t } = useI18n();
 const panelStyle = {
 border: '1px solid',
 borderColor: darkMode ? '#444' : '#ccc',
 borderRadius:6,
 padding:10,
 background: darkMode ? '#232323' : '#fff',
 color: darkMode ? '#fff' : '#222',
 marginBottom:12,
 minHeight:80
 };
 return (
 <div style={panelStyle}>
 <h3 style={{ color: darkMode ? '#fff' : '#222' }}>{t('events.title')}</h3>
 {events.length ===0 && <div style={{ color: darkMode ? '#aaa' : '#777' }}>{t('events.empty')}</div>}
 <ul style={{ paddingLeft:18, margin:0 }}>
 {events.map(ev => (
 <li key={ev.id} style={{ marginBottom:6 }}>
 <strong>{ev.title}</strong> <span style={{ color: darkMode ? '#aaa' : '#666' }}>{t('eventsPanel.type', { type: ev.type })}</span> {t('eventsPanel.descriptionSeparator')} {ev.description} <span style={{ fontSize:12, color:'#888' }}>{t('events.day')}: {ev.day}</span>
 </li>
 ))}
 </ul>
 </div>
 );
}
