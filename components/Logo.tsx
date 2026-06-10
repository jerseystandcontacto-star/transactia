import Image from 'next/image';

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="Transactia"
      width={180}
      height={46}
      style={inverted ? { filter: 'invert(1)' } : undefined}
      priority
    />
  );
}
