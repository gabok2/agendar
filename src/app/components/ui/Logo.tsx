import Image from "next/image";

interface LogoProps {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export function Logo({ src, alt, width, height }: LogoProps) {
  return <Image src={src} alt={alt} width={width} height={height} />;
}
