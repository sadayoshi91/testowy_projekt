import React, { useMemo } from 'react';
import { useI18n } from '../i18n';

export type SaveSlot = {
  name: string;
  updatedAt?: number;
  size?: number;
  path?: string;
  source?: 'fs' | 'local';
};

interface SaveManagerModalProps {
  open: boolean;
  slots: SaveSlot[];
  loading?: boolean;
  busy?: boolean;
  saveNameValue: string;
  saveNameError?: string | null;
  onSaveNameChange: (value: string) => void;
  onClose: () => void;
  onRefresh: () => void;
  onLoad: (slot: SaveSlot) => void;
  onCreate: () => void;
  onQuickSave: () => void;
}

const formatBytes = (bytes?: number) => {
  if (!bytes && bytes !== 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
};

export const SaveManagerModal: React.FC<SaveManagerModalProps> = ({
  open,
  slots,
  loading,
  busy,
  saveNameValue,
  saveNameError,
  onSaveNameChange,
  onClose,
  onRefresh,
  onLoad,
  onCreate,
  onQuickSave,
}) => {
  const { t } = useI18n();
  const sortedSlots = useMemo(() => {
    return [...(slots || [])].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [slots]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card save-modal">
        <div className="modal-header">
          <h2>{t('saves.title')}</h2>
          <button className="text" onClick={onClose}>{t('saves.close')}</button>
        </div>
        <div className="save-actions">
          <button className="primary" onClick={onQuickSave} disabled={busy}>
            {t('saves.quick')}
          </button>
          <button onClick={onRefresh} disabled={loading}>
            {loading ? t('saves.refreshing') : t('saves.refresh')}
          </button>
        </div>
        <div className="save-new">
          <input
            type="text"
            placeholder={t('saves.placeholder')}
            value={saveNameValue}
            onChange={(e) => onSaveNameChange(e.target.value)}
          />
          <button onClick={onCreate} disabled={busy || !!saveNameError || !saveNameValue.trim()}>
            {t('saves.create')}
          </button>
        </div>
        {saveNameError && <div className="input-hint error">{saveNameError}</div>}
        <div className="save-slots" role="list">
          {loading && <div className="muted">{t('saves.loading')}</div>}
          {!loading && sortedSlots.length === 0 && (
            <div className="muted">{t('saves.empty')}</div>
          )}
          {!loading && sortedSlots.map((slot) => (
            <div key={slot.name} className="save-slot" role="listitem">
              <div>
                <div className="slot-name">{slot.name}</div>
                <div className="slot-meta">
                  {t('saves.updated')}: {slot.updatedAt ? new Date(slot.updatedAt).toLocaleString() : t('saves.unknown')} • {formatBytes(slot.size)}
                </div>
              </div>
              <div className="slot-actions">
                <button onClick={() => onLoad(slot)}>{t('saves.load')}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
