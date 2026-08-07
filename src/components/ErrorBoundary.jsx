import React from 'react';

/**
 * Global React Error Boundary — catches any unexpected JS/render crash
 * anywhere in the component tree and shows a clean recovery UI.
 * Prevents the entire app from going blank/white on error.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console for debugging — can be replaced with Sentry etc.
    console.error('[Hindustan Projects Portal] Uncaught Error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
          padding: '2rem',
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          textAlign: 'center'
        }}>
          {/* Logo / Icon */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg,#0047AB,#0B1B3D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', marginBottom: '1.5rem',
            boxShadow: '0 8px 24px rgba(0,71,171,0.25)'
          }}>🏗️</div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: 420, lineHeight: 1.6, marginBottom: '0.5rem' }}>
            The Hindustan Projects Empanelment Portal encountered an unexpected error.
            Your data has been saved. Please click below to return to the home page.
          </p>

          {/* Error details (dev-friendly) */}
          {this.state.error && (
            <div style={{
              margin: '1rem 0', padding: '0.6rem 1rem', borderRadius: 8,
              background: '#FFF1F2', border: '1px solid #FECDD3',
              fontSize: '0.75rem', color: '#BE123C', fontFamily: 'monospace',
              maxWidth: 460, wordBreak: 'break-all', textAlign: 'left'
            }}>
              {this.state.error.toString()}
            </div>
          )}

          <button
            onClick={this.handleReload}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 2rem',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              background: '#0047AB',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(0,71,171,0.3)',
              transition: 'all 0.2s'
            }}
          >
            🏠 Return to Home Page
          </button>
          <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '1rem' }}>
            If this keeps happening, contact support at industrial@hindustanprojects.in
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
