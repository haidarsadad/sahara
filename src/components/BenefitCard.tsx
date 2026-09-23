import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:shadow-xl hover:border-white/40 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-secondary/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
        <Icon className="w-6 h-6 text-secondary" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
