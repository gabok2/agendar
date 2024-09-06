import Image from "next/image";

interface LogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function Logo({ src, alt, width, height }: LogoProps) {
  return <Image src={src} alt={alt} width={width} height={height} />;
}
