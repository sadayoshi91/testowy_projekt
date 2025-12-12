import React from 'react';
import { Research } from '../../models/research';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n';

export function ResearchPanel({ researches, onStart, onInvest, darkMode }: {
 researches: Research[],
 onStart: (id: string) => void,
 onInvest: (id: string) => void,
 darkMode?: boolean
}) {
 const { formatMoney } = useCurrency();
 const { t } = useI18n();
 const panelStyle = {
 border: '1px solid',
 borderColor: darkMode ? '#444' : '#ccc',
 borderRadius:6,
 padding:10,
 background: darkMode ? '#232323' : '#fff',
 color: darkMode ? '#fff' : '#222',
 marginBottom:12,
 minHeight:120
 };
 const buttonStyle = {
 background: darkMode ? '#333' : '#fff',
 color: darkMode ? '#fff' : '#222',
 border: '1px solid',
 borderColor: darkMode ? '#555' : '#ccc',
 borderRadius:4,
 padding: '4px 10px',
 cursor: 'pointer',
 marginTop:4
 } as React.CSSProperties;
 return (
 <div style={panelStyle}>
 <h3 style={{ color: darkMode ? '#fff' : '#222' }}>{t('research.title')}</h3>
 {(!researches || researches.length ===0) ? (
 <div style={{ color: darkMode ? '#aaa' : '#777' }}>{t('research.none')}</div>
 ) : (
 researches.map(research => {
 const progressPct = Math.round(Math.min(100, Math.max(0, (research.progress || 0) * 100)));
 const daysLeft = research.status === 'in_progress'
   ? Math.max(0, (research.durationDays || 0) - Math.max(0, Math.floor((research.progress || 0) * (research.durationDays || 0))))
   : research.durationDays;
 return (
 <div key={research.id} style={{ borderBottom: '1px solid', borderColor: darkMode ? '#333' : '#eee', marginBottom:8, paddingBottom:8 }}>
 <div><strong>{research.name}</strong> <small>({research.status})</small></div>
 <div style={{ fontSize:13, color: darkMode ? '#ccc' : '#555' }}>{research.description}</div>
 <div>{t('research.cost')}: <strong>{formatMoney(research.cost || 0)}</strong></div>
 <div>{t('research.duration')}: {research.durationDays} {t('research.days')}</div>
 {research.unlocks && <div style={{ fontSize:12, color: '#0a0' }}>{t('research.unlocks')}: {research.unlocks.join(', ')}</div>}
 {research.status === 'available' && (
 <button style={buttonStyle} onClick={() => onStart(research.id)}>{t('research.start')}</button>
 )}
 {research.status === 'in_progress' && (
 <div style={{ marginTop:8 }}>
 <div>{t('research.daysLeft')}: {daysLeft}</div>
 <div className="progress-bar"><span style={{ width: `${progressPct}%` }} /><small>{progressPct}%</small></div>
 <button style={buttonStyle} onClick={() => onInvest(research.id)}>
 {research.invested ? t('research.reinvest') : t('research.invest', { amount: formatMoney(research.nextStageCost ?? research.cost ?? 0) })}
 </button>
 </div>
 )}
 {research.status === 'completed' && <span style={{ color: '#00a' }}>{t('research.completed')}</span>}
 </div>
 );
 })
 )}
 </div>
 );
}
