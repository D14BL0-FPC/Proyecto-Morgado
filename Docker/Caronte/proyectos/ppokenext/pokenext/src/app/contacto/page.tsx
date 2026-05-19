"use client";
import { useLanguage } from '@/context/LanguageContext';

export default function Contacto() {
  const { t } = useLanguage();
  return (
    <div className="p-20 text-center">
      <p className="text-xl font-medium">{t.contact_text}</p>
    </div>
  );
}