import ReducerLayout from "./redux/ReducerLayout";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "SOS Pharma",
  description: "Livraison de médicaments à domicile",
  icons: {
    icon: {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
    },
    shortcut: { rel: "icon", type: "image/png", url: "/favicon.png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReducerLayout>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ReducerLayout>
      </body>
    </html>
  );
}
