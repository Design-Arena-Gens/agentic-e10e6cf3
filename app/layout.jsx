import './globals.css';

export const metadata = {
  title: 'Eiffel Noir ? Cinematic Slow Zoom',
  description: 'Slow zoom of the Eiffel Tower at night with rain and fog.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
