import '@b3tracy/bt-professional/fonts.css';
import '@b3tracy/bt-professional/styles.css';
import './docs.css';

export const metadata = {
  title: 'BT Professional',
  description: 'Design tokens, CSS classes and React components for Ben\'s apps.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
