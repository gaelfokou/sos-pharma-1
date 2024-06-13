import ReducerLayout from "./redux/ReducerLayout";
import LayoutWrapper from "./components/LayoutWrapper";
import NetworkProvider from "./utils/NetworkContext";

export const metadata = {
  title: "SOS Pharma - Commandez vos médicaments en ligne",
  description: "SOS Pharma vous permet de commander vos médicaments en ligne, et vous faire livrer partout au Cameroun. 100% sécurisé, 100% garantie. Essayez maintenant.",
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
          <NetworkProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </NetworkProvider>
        </ReducerLayout>
      </body>
    </html>
  );
}
