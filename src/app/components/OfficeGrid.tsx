import React from 'react';
import { CompanyState } from '../../models/company';

export function OfficeGrid({ company }: { company: CompanyState }) {
  const cellW = 64;
  const cellH = 64;

  return (
    <svg width={company.office.width * cellW} height={company.office.height * cellH} style={{ background: '#f8f8f8', border: '1px solid #ccc' }}>
      {Array.from({ length: company.office.height }).map((_, row) =>
        Array.from({ length: company.office.width }).map((__, col) => (
          <rect key={`cell-${row}-${col}`} x={col * cellW} y={row * cellH} width={cellW} height={cellH} fill="transparent" stroke="#eee" />
        ))
      )}
      {company.office.items.map(item => (
        <rect key={item.id} x={item.x * cellW} y={item.y * cellH} width={cellW} height={cellH} stroke="black" fill="lightgray" />
      ))}
    </svg>
  );
}
