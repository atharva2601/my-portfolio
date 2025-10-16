export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 text-center text-sm text-gray-500">
      <p>&copy; {currentYear} Atharva Patel. All rights reserved. | Built with elegance.</p>
    </footer>
  );
};