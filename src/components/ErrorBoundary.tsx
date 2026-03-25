"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  name: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-40">
          <p className="text-gray-500 text-xs">{this.props.name} 로드 실패</p>
          <button
            className="mt-2 text-xs text-blue-400 hover:text-blue-300"
            onClick={() => this.setState({ hasError: false })}
          >
            재시도
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
