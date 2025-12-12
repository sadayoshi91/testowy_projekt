import React, { useEffect } from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineXMark
} from 'react-icons/hi2';
import { useI18n } from '../i18n';

export type ToastItem = { id: string, type: 'info'|'success'|'warning'|'error', title?: string, message: string, ttl?: number };

type IconComponent = React.ComponentType<{ className?: string }>;

const ICON_MAP: Record<ToastItem['type'], IconComponent> = {
  success: HiOutlineCheckCircle,
  error: HiOutlineExclamationCircle,
  warning: HiOutlineExclamationTriangle,
  info: HiOutlineInformationCircle,
};

export function Toasts({ list = [], onRemove }: { list?: ToastItem[], onRemove: (id:string)=>void }) {
  const { t } = useI18n();
  useEffect(() => {
    const timers: any[] = [];
    (list || []).forEach(item => {
      const ttl = item.ttl ?? 2200;
      const t = setTimeout(() => onRemove(item.id), ttl);
      timers.push(t);
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [list, onRemove]);

  if (!list || list.length === 0) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {list.map((toast) => {
        const Icon = ICON_MAP[toast.type];
        return (
          <article key={toast.id} className={`toast-card ${toast.type}`}>
            <div className="toast-card__content">
              <div className="toast-card__icon" aria-hidden="true">
                <Icon />
              </div>
              <div className="toast-card__body">
                <p className="toast-card__title">{toast.title ?? toast.type.toUpperCase()}</p>
                <small>{toast.message}</small>
              </div>
              <button
                type="button"
                aria-label={t('toast.dismiss')}
                onClick={() => onRemove(toast.id)}
                className="toast-card__close"
              >
                <span className="toast-card__close-icon" aria-hidden="true">
                  <HiOutlineXMark />
                </span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
