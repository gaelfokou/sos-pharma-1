import ReducerLayout from "./redux/ReducerLayout";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
