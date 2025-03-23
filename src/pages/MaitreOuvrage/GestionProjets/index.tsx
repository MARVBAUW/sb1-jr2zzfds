import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Saisie } from './Saisie';
import { Dashboard } from './Dashboard';
import { Fiche } from './Fiche';
import { Estimations } from './Estimations';
import { Administratif } from './Administratif';
import { Planification } from './Planification';
import { Facturation } from './Facturation';
import { AppelsOffres } from './AppelsOffres';
import { OutilsTechniques } from './OutilsTechniques';

export function GestionProjets() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="saisie" element={<Saisie />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="fiche" element={<Fiche />} />
      <Route path="estimations" element={<Estimations />} />
      <Route path="administratif" element={<Administratif />} />
      <Route path="planification" element={<Planification />} />
      <Route path="facturation" element={<Facturation />} />
      <Route path="appels-offres" element={<AppelsOffres />} />
      <Route path="outils-techniques" element={<OutilsTechniques />} />
    </Routes>
  );
}