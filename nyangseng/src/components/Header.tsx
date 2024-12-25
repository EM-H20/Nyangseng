// src/components/Header.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="냥생뭐였니 로고"
            width={40}
            height={40}
            className="mr-2"
            style={{ width: "auto", height: "auto" }}
          />
          <span className="text-xl font-bold">냥생뭐였니</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
