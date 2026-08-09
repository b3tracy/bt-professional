import '@b3tracy/base-case-productivity/fonts.css';
import '@b3tracy/base-case-productivity/styles.css';
import './docs.css';

export const metadata = {
  title: 'Base Case Productivity',
  description: 'Design tokens, CSS classes and React components for Ben\'s apps.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
