export const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} NewsHub. All rights reserved.</p>
      </div>
    </footer>
  );
};
