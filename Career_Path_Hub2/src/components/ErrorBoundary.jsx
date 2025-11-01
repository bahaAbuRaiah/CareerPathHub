import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // يمكننا تغيير حالة error هنا إذا أردنا
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // يمكننا تسجيل الخطأ في الخارج أو في أي خدمة متخصصة
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // يمكن عرض واجهة مخصصة عند حدوث الخطأ
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
