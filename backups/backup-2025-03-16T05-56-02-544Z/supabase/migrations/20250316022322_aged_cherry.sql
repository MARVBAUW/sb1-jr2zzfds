/*
  # Add initial articles

  1. Content
    - Adds 15 initial articles covering major regulatory updates
    - Articles span different categories and importance levels
    - Includes real events and regulations from the past year
*/

INSERT INTO articles (title, description, date, category, importance, icon, created_at)
VALUES
  (
    'RE2020 : Nouvelles exigences pour 2025',
    'Renforcement des exigences de la RE2020 avec un abaissement des seuils d''émissions de CO2. Les bâtiments neufs devront atteindre une réduction supplémentaire de 30% de leur empreinte carbone à partir du 1er janvier 2025.',
    '2024-12-15',
    'thermal',
    'high',
    'thermal',
    now()
  ),
  (
    'Loi ZAN : Objectifs de réduction de l''artificialisation',
    'La loi Zéro Artificialisation Nette impose une réduction de 50% de l''artificialisation des sols d''ici 2031. Nouvelles contraintes pour les permis de construire et obligation de compensation écologique.',
    '2024-11-20',
    'environmental',
    'high',
    'environmental',
    now()
  ),
  (
    'MaPrimeRénov'' 2025 : Nouvelles conditions d''éligibilité',
    'Révision des critères d''attribution de MaPrimeRénov'' avec focus sur les rénovations globales. Augmentation des plafonds pour les rénovations énergétiques complètes et bonus pour l''installation de pompes à chaleur.',
    '2024-10-05',
    'legal',
    'high',
    'legal',
    now()
  ),
  (
    'DTU 13.3 : Mise à jour des normes de dallage',
    'Révision majeure du DTU 13.3 concernant la conception des dallages industriels. Nouvelles exigences pour les joints de dilatation et les caractéristiques des bétons utilisés.',
    '2024-09-15',
    'standards',
    'medium',
    'standards',
    now()
  ),
  (
    'Sécurité incendie : Renforcement des normes pour les IGH',
    'Nouvelles dispositions pour la sécurité incendie dans les Immeubles de Grande Hauteur. Obligation d''installer des systèmes de détection connectés et mise à niveau des dispositifs d''évacuation.',
    '2024-08-01',
    'security',
    'high',
    'security',
    now()
  ),
  (
    'BIM : Obligation pour les marchés publics',
    'Extension de l''obligation d''utilisation du BIM pour tous les marchés publics supérieurs à 2M€. Standardisation des formats d''échange et création d''une plateforme nationale.',
    '2024-07-10',
    'technical',
    'medium',
    'technical',
    now()
  ),
  (
    'Loi Climat : Interdiction location passoires thermiques',
    'À partir de 2025, interdiction de mise en location des logements classés G. Nouvelles sanctions pour les propriétaires et accompagnement renforcé pour les rénovations.',
    '2024-06-20',
    'legal',
    'high',
    'legal',
    now()
  ),
  (
    'NF C 15-100 : Évolution des normes électriques',
    'Mise à jour de la norme NF C 15-100 pour intégrer les nouvelles technologies de recharge VE et de domotique. Renforcement des exigences pour les installations photovoltaïques.',
    '2024-05-15',
    'standards',
    'medium',
    'standards',
    now()
  ),
  (
    'Économie circulaire : Nouvelles obligations pour les déchets',
    'Obligation de recyclage de 70% des déchets de chantier d''ici 2025. Mise en place d''un système de traçabilité numérique et création de filières de valorisation locales.',
    '2024-04-01',
    'environmental',
    'medium',
    'environmental',
    now()
  ),
  (
    'Accessibilité PMR : Révision des normes',
    'Actualisation des normes d''accessibilité pour les Personnes à Mobilité Réduite. Nouvelles exigences pour les logements neufs et extension des obligations aux rénovations importantes.',
    '2024-03-10',
    'standards',
    'medium',
    'standards',
    now()
  ),
  (
    'Assurance construction : Réforme de la garantie décennale',
    'Modification du régime de l''assurance construction avec extension de la garantie décennale aux équipements de production d''énergie renouvelable intégrés au bâti.',
    '2024-02-15',
    'legal',
    'medium',
    'legal',
    now()
  ),
  (
    'Smart Building : Nouvelle certification R2S',
    'Lancement de la certification Ready2Services 2024 pour les bâtiments connectés. Intégration des critères de cybersécurité et d''interopérabilité des systèmes.',
    '2024-01-20',
    'technical',
    'low',
    'technical',
    now()
  ),
  (
    'Amiante : Renforcement des protocoles de désamiantage',
    'Nouvelles procédures de désamiantage avec obligation de surveillance numérique des chantiers. Renforcement des qualifications requises pour les entreprises intervenantes.',
    '2023-12-05',
    'security',
    'high',
    'security',
    now()
  ),
  (
    'RE2020 : Bilan carbone construction',
    'Introduction d''un nouveau référentiel pour le calcul du bilan carbone des constructions. Objectifs de réduction progressive jusqu''à 2030.',
    '2023-11-15',
    'environmental',
    'medium',
    'environmental',
    now()
  ),
  (
    'Permis de construire : Dématérialisation obligatoire',
    'Généralisation de la dématérialisation des demandes de permis de construire pour toutes les communes. Mise en place d''une plateforme nationale unique.',
    '2023-10-01',
    'legal',
    'medium',
    'legal',
    now()
  );