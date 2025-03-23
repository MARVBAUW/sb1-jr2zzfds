import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routes = {
  '/venture': 'Novaesta Venture',
  '/venture/swipe': 'Découvrir les projets',
  '/venture/project/new': 'Nouveau projet',
  '/venture/project': 'Détails du projet'
};

export function VentureNavigation() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs = pathSegments.map((_, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      path,
      label: routes[path as keyof typeof routes] || pathSegments[index]
    };
  });

  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <Link
            to={crumb.path}
            className={`transition-colors duration-200 ${
              index === breadcrumbs.length - 1
                ? 'text-emerald-400 font-medium'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {crumb.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}