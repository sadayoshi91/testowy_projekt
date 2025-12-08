// src/app/components/ErrorBoundary.tsx
import React from 'react';

export class ErrorBoundary extends React.Component<{children:any}, {hasError:boolean, error?:any}> {
  constructor(props:any){
    super(props);
    this.state = { hasError:false };
  }

  static getDerivedStateFromError(err:any){
    return { hasError:true, error:err };
  }

  componentDidCatch(err:any, info:any){
    console.error("ErrorBoundary caught:", err, info);
  }

  render(){
    if (this.state.hasError){
      return (
        <div style={{ padding:20 }}>
          <h2>Something went wrong</h2>
          <pre>{String(this.state.error)}</pre>
          <button onClick={()=>location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
