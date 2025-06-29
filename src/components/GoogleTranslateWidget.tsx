import React, { useEffect } from 'react';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'ta,hi,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '10px 20px 0 0'
    }}>
      <div
        id="google_translate_element"
        style={{
          borderRadius: '6px',
          background: '#f4f4f4',
          padding: '4px 12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
          fontSize: '1rem',
          border: '1px solid #e0e0e0',
          minWidth: 120
        }}
      />
      <style>
        {`
          .goog-logo-link, .goog-te-gadget span {
            display: none !important;
          }
          .goog-te-gadget {
            color: #333 !important;
            font-family: inherit !important;
          }
          .goog-te-combo {
            border-radius: 4px;
            padding: 4px 8px;
            border: 1px solid #ccc;
            font-size: 1rem;
            background: #fff;
            color: #333;
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

export default GoogleTranslateWidget;