import React from 'react';

export function ConfirmationModal({ open, title, body, onConfirm, onCancel }: { open: boolean, title: string, body: React.ReactNode, onConfirm: ()=>void, onCancel: ()=>void }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', left:0, top:0, right:0, bottom:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000 }}>
      <div style={{ width:480, background:'#fff', borderRadius:8, padding:16 }}>
        <h3 style={{ marginTop:0 }}>{title}</h3>
        <div style={{ marginTop:8 }}>{body}</div>
        <div style={{ marginTop:12, display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
