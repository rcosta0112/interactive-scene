import "./normalize.css";
import "./globals.css";

export const metadata = {
  title: "Interactive Scene",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="images/favicon.ico" sizes="any" />
        <link href="images/webclip.jpg" rel="apple-touch-icon" /> 
      </head>
      <body>{children}</body>
    </html>
  );
}
