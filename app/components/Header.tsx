import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center mb-8 bg-zinc-900 border-b border-green-500 shadow-md z-1">
      <Link href="/" passHref>
        <Image
          src="/kabousse.png" 
          alt="Kabousse Logo"
          width={150} 
          height={150}
          className="cursor-pointer"
        />
      </Link>
    </header>
  );
}
