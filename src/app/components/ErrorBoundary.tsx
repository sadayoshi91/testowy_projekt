// src/app/components/ErrorBoundary.tsx
import React from 'react';
import { I18nContext } from '../i18n';

export class ErrorBoundary extends React.Component<{children:any}, {hasError:boolean, error?:any}> {
  constructor(props:any){
    super(props);
    this.state = { hasError:false };
  }

  static contextType = I18nContext;
  declare context: React.ContextType<typeof I18nContext>;

  static getDerivedStateFromError(err:any){
    return { hasError:true, error:err };
  }

  componentDidCatch(err:any, info:any){
    console.error("ErrorBoundary caught:", err, info);
  }

  render(){
    const t = this.context?.t || ((key: string) => key);
    if (this.state.hasError){
      return (
        <div style={{ padding:20 }}>
          <h2>{t('error.title')}</h2>
          <pre>{String(this.state.error)}</pre>
          <button onClick={()=>location.reload()}>{t('error.reload')}</button>
        </div>
      );
    }
    return this.props.children;
  }
}
