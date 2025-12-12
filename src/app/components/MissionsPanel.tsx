import React from 'react';
import { Mission } from '../../models/mission';
import { useI18n } from '../i18n';

export function MissionsPanel({ missions, darkMode }: { missions: Mission[], darkMode?: boolean }) {
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
 <h3 style={{ color: darkMode ? '#fff' : '#222' }}>{t('missions.title')}</h3>
 {missions.length ===0 && <div style={{ color: darkMode ? '#aaa' : '#777' }}>{t('missions.empty')}</div>}
 <ul style={{ paddingLeft:18, margin:0 }}>
 {missions.map(m => (
 <li key={m.id} style={{ marginBottom:6 }}>
 <strong>{m.description}</strong> <span style={{ color: m.completed ? '#0a0' : '#888' }}>({m.progress}/{m.target})</span>
 {m.completed && <span style={{ color:'#0a0', fontWeight:600, marginLeft:8 }}>{t('missions.completed')}</span>}
 {m.reward && (
 <span style={{ color:'#0077cc', fontSize:12, marginLeft:8 }}>{t('missions.reward')}: {m.reward.funds ? `+${m.reward.funds} ` : ''}{m.reward.reputation ? `+${m.reward.reputation} ${t('competitors.reputation')}` : ''}</span>
 )}
 </li>
 ))}
 </ul>
 </div>
 );
}
