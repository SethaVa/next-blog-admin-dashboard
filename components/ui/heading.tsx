import React from "react";

interface HeaderProps {
  title: string;
  description?: string;
}

const Heading: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div>
      <div className="text-3xl font-bold tracking-tight">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
};

export default Heading;
