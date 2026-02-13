"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfettiButton } from "@/components/ui/confetti"

interface FirstLoginModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function FirstLoginModal({ isOpen, onComplete }: FirstLoginModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from("user_profiles")
          .update({
            name: name.trim(),
            first_login_completed: true,
            updated_at: new Date().toISOString()
          })
          .eq("id", user.id);

        if (error) throw error;
        
        onComplete();
      }
    } catch (error) {
      console.error("Erro ao salvar nome:", error);
      alert("Erro ao salvar o nome. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-md space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Bem-vindo(a)! 🎉</h2>
          <p className="text-muted-foreground mt-2">
            Para começar, nos diga qual é o seu nome:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <ConfettiButton
            type="submit"
            className="w-full"
            disabled={loading || !name.trim()}
          >
            {loading ? "Salvando..." : "Continuar"}
          </ConfettiButton>
        </form>
      </div>
    </div>
  );
}