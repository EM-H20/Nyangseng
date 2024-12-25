// src/components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 py-2 text-center">
      <div className="container mx-auto">
        © {new Date().getFullYear()} 냥생뭐였니. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
