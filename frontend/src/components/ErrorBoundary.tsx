import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Custom fallback. Gets a `reset` callback that clears the error and re-renders children. */
  fallback?: (reset: () => void) => ReactNode;
  /** When this value changes, a caught error is cleared automatically (e.g. pass the route path
   *  so navigating away from a broken page recovers without a full reload). */
  resetKey?: unknown;
  /** Shown in the console log to locate which boundary tripped. */
  label?: string;
}

interface State {
  error: Error | null;
}

/**
 * Stops one broken subtree from taking down the whole app. React unmounts the entire
 * tree on an uncaught render error unless a boundary catches it — wrap anything that
 * can fail independently (a route, a modal, a heavy widget) so its failure stays local.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary${this.props.label ? ` ${this.props.label}` : ''}]`, error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(this.reset);

    return (
      <div className="ts-center-note" style={{ textAlign: 'center' }}>
        <p>Этот раздел не открылся. Остальной сайт работает — попробуйте вернуться назад.</p>
        <button
          className="ts-btn-outline small"
          style={{ marginTop: 12 }}
          onClick={() => window.location.reload()}
        >
          Обновить
        </button>
      </div>
    );
  }
}
