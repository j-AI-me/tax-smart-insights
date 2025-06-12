
import { useState } from "react";
import LandingSection from "@/components/LandingSection";
import TaxForm from "@/components/TaxForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <TaxForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen">
      <LandingSection onStartForm={() => setShowForm(true)} />
    </div>
  );
};

export default Index;
