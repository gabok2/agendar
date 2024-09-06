import { Logo } from "@/app/components/ui/Logo";
import { Typography } from "@/app/components/ui/Typography";

export const BrandLogo = () => (
  <div className="flex items-center">
    <Logo src="/icon.svg" alt="Logo" width={33} height={34} />
    <Typography variant="h1" color="primary" fontWeight="bold" className="pl-5">
      AGENDAR
    </Typography>
  </div>
);
