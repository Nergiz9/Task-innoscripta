import { ReactNode } from 'react';
import Header from '../Elements/Header';
import { Footer } from '../Elements/Footer';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};
