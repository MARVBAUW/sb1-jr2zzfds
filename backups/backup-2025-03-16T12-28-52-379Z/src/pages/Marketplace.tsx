import React, { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Building2, Users2, Hammer, HomeIcon, Factory, Briefcase, Ruler, FileText, PaintBucket, Thermometer, ClipboardCheck, Wrench, Truck, HardHat, ShoppingBag } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../contexts/AuthContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  coordinates: [number, number];
  category: string;
  profession: string[];
  company: string;
  rating: number;
  reviews: number;
  image: string;
}

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Suite logicielle BIM complète',
    description: 'Accès premium à notre suite complète d\'outils BIM pour la modélisation et la collaboration.',
    price: 299.99,
    location: 'France',
    coordinates: [46.603354, 1.888334],
    category: 'Logiciel',
    profession: ['maitre_oeuvre', 'entreprise'],
    company: 'BIMTech Solutions',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '2',
    title: 'Étude thermique RE2020',
    description: 'Réalisation d\'études thermiques complètes selon la réglementation RE2020.',
    price: 1200,
    location: 'Paris',
    coordinates: [48.8566, 2.3522],
    category: 'Service',
    profession: ['maitre_oeuvre', 'entreprise'],
    company: 'ThermoExpert',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '3',
    title: 'Diagnostic immobilier complet',
    description: 'Pack complet de diagnostics immobiliers obligatoires.',
    price: 399,
    location: 'Lyon',
    coordinates: [45.7578, 4.8320],
    category: 'Service',
    profession: ['agent_immobilier', 'particulier'],
    company: 'DiagExpress',
    rating: 4.7,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1581092921461-39b21c514edb?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '4',
    title: 'Plans d\'architecte sur mesure',
    description: 'Conception de plans personnalisés pour votre projet de construction.',
    price: 2500,
    location: 'Bordeaux',
    coordinates: [44.8378, -0.5792],
    category: 'Service',
    profession: ['maitre_oeuvre', 'particulier'],
    company: 'ArchiDesign',
    rating: 4.8,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1574344094732-f49683562a6e?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '5',
    title: 'Construction maison individuelle',
    description: 'Service complet de construction de maison individuelle, du terrain à la remise des clés.',
    price: 180000,
    location: 'Nantes',
    coordinates: [47.2184, -1.5536],
    category: 'Service',
    profession: ['particulier'],
    company: 'MaisonPlus',
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '6',
    title: 'Rénovation peinture professionnelle',
    description: 'Service de peinture intérieure et extérieure pour projets résidentiels et commerciaux.',
    price: 2800,
    location: 'Toulouse',
    coordinates: [43.6047, 1.4442],
    category: 'Service',
    profession: ['entreprise', 'particulier'],
    company: 'ColorPro',
    rating: 4.7,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '7',
    title: 'Pack matériaux écologiques',
    description: 'Matériaux de construction écologiques certifiés avec livraison incluse.',
    price: 1299.99,
    location: 'Lyon',
    coordinates: [45.7578, 4.8320],
    category: 'Matériaux',
    profession: ['entreprise', 'maitre_oeuvre', 'particulier'],
    company: 'EcoConstruct',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '8',
    title: 'Location équipements chantier',
    description: 'Location d\'équipements professionnels pour chantiers de construction.',
    price: 450,
    location: 'Marseille',
    coordinates: [43.2965, 5.3698],
    category: 'Equipement',
    profession: ['entreprise'],
    company: 'EquipPro',
    rating: 4.5,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1581092921461-39b21c514edb?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '9',
    title: 'Étude de sol géotechnique',
    description: 'Étude complète du sol pour projets de construction.',
    price: 1800,
    location: 'Strasbourg',
    coordinates: [48.5734, 7.7521],
    category: 'Service',
    profession: ['maitre_oeuvre', 'entreprise'],
    company: 'GeoExpert',
    rating: 4.8,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1581092921461-39b21c514edb?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: '10',
    title: 'Logiciel de gestion de chantier',
    description: 'Solution numérique pour le suivi et la gestion de chantiers.',
    price: 199.99,
    location: 'France',
    coordinates: [46.603354, 1.888334],
    category: 'Logiciel',
    profession: ['entreprise', 'maitre_oeuvre'],
    company: 'BuildTech',
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=400&h=300'
  }
];

const categories = [
  { id: 'logiciel', name: 'Logiciels', icon: Briefcase },
  { id: 'service', name: 'Services', icon: Users2 },
  { id: 'materiaux', name: 'Matériaux', icon: Building2 },
  { id: 'equipement', name: 'Équipements', icon: Factory },
  { id: 'diagnostic', name: 'Diagnostics', icon: ClipboardCheck },
  { id: 'etude', name: 'Études', icon: FileText },
  { id: 'construction', name: 'Construction', icon: HardHat },
  { id: 'renovation', name: 'Rénovation', icon: Wrench },
  { id: 'supply_chain', name: 'Supply Chain', icon: Truck },
  { id: 'marketplace_pro', name: 'Marketplace Pro', icon: ShoppingBag }
];

const professions = [
  { id: 'maitre_oeuvre', name: 'Maître d\'œuvre', icon: Hammer },
  { id: 'entreprise', name: 'Entreprise & Fournisseur', icon: Factory, featured: true },
  { id: 'particulier', name: 'Particulier', icon: Users2, featured: true },
  { id: 'agent_immobilier', name: 'Agent immobilier', icon: HomeIcon }
];

const locations = [
  'France',
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Toulouse',
  'Nantes',
  'Strasbourg',
];

export function Marketplace() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [radius, setRadius] = useState(50);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Get user's profession based on role
  const userProfession = useMemo(() => {
    switch (user?.role) {
      case 'maitre_oeuvre': return 'maitre_oeuvre';
      case 'agent_immobilier': return 'agent_immobilier';
      case 'entreprise': return 'entreprise';
      default: return 'particulier';
    }
  }, [user]);

  const filteredListings = useMemo(() => {
    return mockListings.filter(listing => {
      // Filter by search term
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by location
      const matchesLocation = !selectedLocation || listing.location === selectedLocation;

      // Filter by profession (show only listings available for user's profession)
      const matchesProfession = listing.profession.includes(userProfession);

      // Filter by selected professions (additional filter)
      const matchesSelectedProfessions = selectedProfessions.length === 0 ||
                                       listing.profession.some(p => selectedProfessions.includes(p));

      // Filter by categories
      const matchesCategories = selectedCategories.length === 0 ||
                              selectedCategories.includes(listing.category.toLowerCase());

      // Filter by price range
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];

      return matchesSearch && matchesLocation && matchesProfession && 
             matchesSelectedProfessions && matchesCategories && matchesPrice;
    });
  }, [searchTerm, selectedLocation, userProfession, selectedProfessions, selectedCategories, priceRange]);

  return (
    <div className="min-h-screen bg-dark-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Marketplace
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                  text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 
                  focus:ring-1 focus:ring-cyan-500/50 w-64"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200"
            >
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                showMap
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-dark-700/50 border border-gray-700/50 text-gray-400 hover:border-cyan-500/50'
              }`}
            >
              {showMap ? 'Vue liste' : 'Vue carte'}
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="mb-6 p-6 rounded-lg bg-dark-700/50 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Localisation</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Toutes les localisations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Rayon de recherche</h3>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{radius} km</div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategories(prev =>
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      )}
                      className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all duration-200 ${
                        selectedCategories.includes(category.id)
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                          : 'bg-dark-600/50 text-gray-400 border border-gray-700/50 hover:border-cyan-500/30'
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Corps de métiers</h3>
                <div className="flex flex-col gap-3">
                  {professions.map((profession) => (
                    <button
                      key={profession.id}
                      onClick={() => setSelectedProfessions(prev =>
                        prev.includes(profession.id)
                          ? prev.filter(id => id !== profession.id)
                          : [...prev, profession.id]
                      )}
                      className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all duration-200 ${
                        profession.featured 
                          ? 'text-base font-medium px-4 py-2.5' 
                          : ''
                      } ${
                        selectedProfessions.includes(profession.id)
                          ? `bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 ${
                              profession.featured ? 'shadow-lg shadow-cyan-500/20' : ''
                            }`
                          : `bg-dark-600/50 text-gray-400 border border-gray-700/50 hover:border-cyan-500/30 ${
                              profession.featured ? 'hover:bg-dark-500/50' : ''
                            }`
                      }`}
                    >
                      <profession.icon className={`w-4 h-4 ${profession.featured ? 'w-5 h-5' : ''}`} />
                      {profession.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {showMap ? (
          <div className="h-[600px] rounded-lg overflow-hidden glass-panel">
            <MapContainer
              center={[46.603354, 1.888334]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredListings.map(listing => (
                <Marker key={listing.id} position={listing.coordinates}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium text-dark-800">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.company}</p>
                      <p className="text-sm font-medium text-cyan-600 mt-1">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(listing.price)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <div
                key={listing.id}
                className="glass-panel overflow-hidden group transform transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/20">
                        {listing.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <span>★</span>
                        <span className="text-sm">{listing.rating}</span>
                        <span className="text-xs text-gray-400">({listing.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-200 mb-2">{listing.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{listing.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.location}</span>
                    </div>
                    <p className="text-lg font-medium text-cyan-400">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(listing.price)}
                    </p>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 
                    border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-200">
                    Voir les détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}