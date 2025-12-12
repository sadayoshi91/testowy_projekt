import React from 'react';
import { Language, useI18n } from '../i18n';

interface MainMenuProps {
  canContinue: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  onLoadGame: () => void;
  onToggleOptions?: () => void;
  onExit?: () => void;
  onClose?: () => void;
  lang: Language;
  onChangeLanguage: (lang: Language) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  canContinue,
  onNewGame,
  onContinue,
  onLoadGame,
  onToggleOptions,
  onExit,
  onClose,
  lang,
  onChangeLanguage,
}) => {
  const { t } = useI18n();
  return (
    <div className="menu-overlay">
      <div className="menu-card">
        <p className="menu-eyebrow">{t('menu.mode')}</p>
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
        <div className="menu-actions">
          <button className="primary" onClick={onNewGame}>
            {t('menu.new')}
          </button>
          <button onClick={onContinue} disabled={!canContinue}>
            {t('menu.continue')}
          </button>
          <button onClick={onLoadGame}>{t('menu.load')}</button>
          {onToggleOptions && <button onClick={onToggleOptions}>{t('menu.options')}</button>}
          {onExit && (
            <button className="btn-outline" onClick={onExit}>
              {t('menu.exit')}
            </button>
          )}
          {onClose && (
            <button className="btn-outline" onClick={onClose}>
              {t('menu.back')}
            </button>
          )}
        </div>
        <div className="option-grid" style={{ marginTop: 20 }}>
          <div className="option-card">
            <h4>{t('menu.language')}</h4>
            <div className="chip-row">
              <button
                className={lang === 'en' ? 'chip selected' : 'chip'}
                onClick={() => onChangeLanguage('en')}
                type="button"
              >
                {t('menu.language.en')}
              </button>
              <button
                className={lang === 'pl' ? 'chip selected' : 'chip'}
                onClick={() => onChangeLanguage('pl')}
                type="button"
              >
                {t('menu.language.pl')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
