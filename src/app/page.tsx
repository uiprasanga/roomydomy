"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

// Type for dome data
interface Dome {
  img: string;
  title: string;
  size: string;
  people: string;
  price: string;
  description: string;
  features: string;
}

// Modal component for dome details
function DomeDetailsModal({ open, onClose, dome }: { open: boolean; onClose: () => void; dome: Dome | null }) {
  const [tab, setTab] = useState<'overview' | 'features' | 'gallery'>('overview');
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});

  // Customization options (static for demo, can be dynamic)
  const options = [
    {
      group: 'Decks',
      items: [
        { key: 'mediumDeck', label: 'Medium Deck', desc: '200 sq ft wooden deck with eco-friendly composite material', price: 14000 },
        { key: 'largeDeck', label: 'Large Deck', desc: '350 sq ft wooden deck with railing and steps', price: 22000 },
        { key: 'premiumDeck', label: 'Premium Deck', desc: '450 sq ft premium deck with integrated seating and pergola', price: 32000 },
      ],
    },
    {
      group: 'Pergolas',
      items: [
        { key: 'standardPergola', label: 'Standard Pergola', desc: '200 sq ft wooden pergola with retractable shade', price: 12500 },
        { key: 'deluxePergola', label: 'Deluxe Pergola', desc: 'Solar pergola with integrated lighting and speakers', price: 25000 },
      ],
    },
    {
      group: 'Outdoor Features',
      items: [
        { key: 'mediumPool', label: 'Medium Pool', desc: '12\' diameter soaking pool with natural filtration', price: 35000 },
        { key: 'outdoorKitchen', label: 'Outdoor Kitchen', desc: 'Complete outdoor kitchen with grill, sink and refrigerator', price: 18500 },
        { key: 'firepitLounge', label: 'Firepit Lounge', desc: 'Natural gas firepit with surrounding seating', price: 9500 },
        { key: 'zenGarden', label: 'Zen Garden', desc: 'Japanese-inspired garden with water feature', price: 7800 },
      ],
    },
  ];

  // Calculate total price
  const basePrice = dome ? Number(dome.price.replace(/[^\d.]/g, '')) : 0;
  const selectedTotal = options.flatMap(g => g.items).reduce((sum, item) => selectedOptions[item.key] ? sum + item.price : sum, 0);
  const totalPrice = basePrice + selectedTotal;
  const deposit = 2500;

  if (!open || !dome) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-label="Close modal"
      />
      {/* Modal Content */}
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-0 relative animate-fade-in flex flex-col md:flex-row z-50"
        onClick={e => e.stopPropagation()}
      >
        {/* Left: Tabs and Content */}
        <div className="flex-1 p-8 min-w-[320px]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-green-700 text-2xl font-bold focus:outline-none"
            aria-label="Close details"
          >
            ×
          </button>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button className={`px-4 py-2 font-semibold ${tab === 'overview' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`} onClick={() => setTab('overview')}>Overview</button>
            <button className={`px-4 py-2 font-semibold ${tab === 'features' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`} onClick={() => setTab('features')}>Features</button>
            <button className={`px-4 py-2 font-semibold ${tab === 'gallery' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`} onClick={() => setTab('gallery')}>Gallery</button>
          </div>
          {/* Tab Content */}
          {tab === 'overview' && (
            <div>
              <h3 className="text-2xl font-extrabold text-green-800 mb-2">{dome.title}</h3>
              <div className="text-gray-600 mb-2">{dome.size} · {dome.people}</div>
              <div className="text-base text-gray-700 mb-3">{dome.description}</div>
              <div className="bg-green-50 rounded p-3 mb-3 text-green-800 text-sm font-medium">A Sustainable Living Experience</div>
              <ul className="text-gray-600 text-sm space-y-1 mb-4">
                <li>🌿 Open concept living area</li>
                <li>🍳 Full kitchen</li>
                <li>🛁 One bathroom</li>
                <li>👨‍👩‍👧‍👦 Perfect for families</li>
              </ul>
            </div>
          )}
          {tab === 'features' && (
            <div>
              <div className="whitespace-pre-line text-gray-700 mb-3">{dome.features}</div>
              <ul className="list-disc pl-5 text-gray-600 text-sm">
                <li>Solar energy integration</li>
                <li>Rainwater collection system</li>
                <li>Eco-friendly materials</li>
                <li>Customizable add-ons</li>
              </ul>
            </div>
          )}
          {tab === 'gallery' && (
            <div className="flex gap-2">
              <Image src={dome.img} alt={dome.title} className="rounded-lg w-32 h-24 object-cover" width={128} height={96} />
              {/* Add more images if available */}
            </div>
          )}
        </div>
        {/* Right: Customization & Summary */}
        <div className="w-full md:w-96 bg-gray-50 border-l border-gray-200 p-6 flex flex-col gap-4">
          <div className="font-bold text-lg mb-2 text-green-900">Base Model <span className="float-right text-green-700 font-extrabold">${basePrice.toLocaleString()}</span></div>
          <div className="font-semibold text-gray-700 mb-2">Customize Your Dome</div>
          <div className="overflow-y-auto max-h-72 pr-2">
            {options.map(group => (
              <div key={group.group} className="mb-4">
                <div className="font-semibold text-gray-600 mb-1">{group.group}</div>
                {group.items.map(item => (
                  <label key={item.key} className="flex items-start gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!selectedOptions[item.key]}
                      onChange={() => setSelectedOptions(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="mt-1 accent-green-700"
                    />
                    <span className="flex-1">
                      <span className="font-medium text-gray-800">{item.label}</span>
                      <span className="block text-xs text-gray-500">{item.desc}</span>
                    </span>
                    <span className="font-semibold text-gray-700">${item.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-green-100 rounded-xl p-4 mt-2 mb-2">
            <div className="flex justify-between font-semibold text-green-900 text-base mb-1">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Required Deposit</span>
              <span className="font-bold text-green-700">${deposit.toLocaleString()}</span>
            </div>
          </div>
          <button className="bg-green-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-green-800 transition-all duration-200 w-full text-lg mt-2">Start Project - Pay Deposit</button>
          <div className="text-xs text-gray-400 text-center mt-1">Secure payment · Full refund within 14 days</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Background images for the slider - Nature photos for dome building
  const backgroundImages = [
    "/home-screen.jpg",
    "/main/aegean/img-1.webp",
    "/main/aegean/img-2.jpg", 
    "/main/aegean/img-3.jpg",
    "/main/atlas/img-1.jpg",
    "/main/atlas/img-2.jpg",
    "/main/atlas/img-3.jpg",
    "/main/assos/img-1.jpg",
    "/main/assos/img-2.jpg",
    "/main/assos/img-3.jpg"
  ];
 

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Dome data for cards and modal
  const domes: Dome[] = [
    {
      img: "/main/domy/d6/img.jpg",
      title: "Compact Studio",
      size: "400 sq ft",
      people: "1-2 people",
      price: "$150,000",
      description: "A cozy, efficient dome perfect for singles or couples. Customizable with decks, outdoor features, and pergolas.",
      features: "+ Decks\n+ Outdoor Features\n+ Pergolas",
    },
    {
      img: "/main/domy/d7/img-1.jpg",
      title: "Current Model",
      size: "700 sq ft",
      people: "2-3 people",
      price: "$175,000",
      description: "Spacious enough for a small family, with all the eco-friendly features and customization options you need.",
      features: "+ Decks\n+ Outdoor Features\n+ Pergolas",
    },
    {
      img: "/main/domy/d8/img-1.jpg",
      title: "Two-Level Haven",
      size: "1000 sq ft",
      people: "2-4 people",
      price: "$225,000",
      description: "A two-level dome for families or those wanting more space. Expand with decks, pergolas, and more.",
      features: "+ Decks\n+ Outdoor Features\n+ Pergolas",
    },
    {
      img: "/main/domy/d9/img-1.jpg",
      title: "Family Dome",
      size: "1500 sq ft",
      people: "4-6 people",
      price: "$275,000",
      description: "Ideal for larger families, this dome offers ample space and all signature eco features.",
      features: "+ Decks\n+ Outdoor Features\n+ Pergolas",
    },
    {
      img: "/main/domy/d10/img-1.jpg",
      title: "Grand Dome",
      size: "2000 sq ft",
      people: "6-8 people",
      price: "$350,000",
      description: "Our largest dome, perfect for big families or those who love to entertain.",
      features: "+ Decks\n+ Outdoor Features\n+ Pergolas",
    },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDome, setSelectedDome] = useState<Dome | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add environment domes carousel state and data to Home component
  const envDomes = [
    {
      img: "/main/aegean/img-2.jpg",
      badge: "Temperate Riverside",
      badgeClass: "absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full",
      icon: <svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#22d3ee' strokeWidth='2'/></svg>,
      location: "Riverside Locations",
      title: "Riverside Sanctuary",
      description: "Wake up to the gentle sound of flowing water in our riverside domes. Featuring enhanced moisture control, flood-resistant foundations, and panoramic river views. Perfect for nature lovers who want to live by the water.",
      priceClass: "text-xs bg-blue-50 text-blue-700 rounded px-2 py-1 inline-block mb-2",
      priceLabel: "Temperate Riverside",
      price: "Starting from $280,000",
      features: [
        { iconClass: "text-blue-500", text: "Enhanced moisture control systems" },
        { iconClass: "text-blue-500", text: "Flood-resistant foundation design" },
        { iconClass: "text-blue-500", text: "Panoramic river view windows" },
      ],
      button: "Explore Riverside Sanctuary",
    },
    {
      img: "/main/aegean/img-1.webp",
      badge: "Ocean Breeze",
      badgeClass: "absolute top-4 left-4 bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full",
      icon: <svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#0ea5e9' strokeWidth='2'/></svg>,
      location: "Coastal Locations",
      title: "Seaside Retreat",
      description: "Experience comfort living in our salt-resistant seaside domes. Built to withstand coastal conditions, featuring corrosion-resistant materials, hurricane-proof design, and stunning ocean vistas. Your perfect beachfront paradise.",
      priceClass: "text-xs bg-blue-100 text-blue-800 rounded px-2 py-1 inline-block mb-2",
      priceLabel: "Ocean Breeze",
      price: "Starting from $320,000",
      features: [
        { iconClass: "text-blue-500", text: "Salt-resistant construction materials" },
        { iconClass: "text-blue-500", text: "Hurricane-proof structural design" },
        { iconClass: "text-blue-500", text: "Ocean breeze ventilation systems" },
      ],
      button: "Explore Seaside Retreat",
    },
    {
      img: "/main/domy/d8/img-1.jpg",
      badge: "Forest Canopy",
      badgeClass: "absolute top-4 left-4 bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full",
      icon: <svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#22c55e' strokeWidth='2'/></svg>,
      location: "Woodland Areas",
      title: "Forest Haven",
      description: "Immerse yourself in nature with our forest domes, designed to blend seamlessly with woodland surroundings. Features natural camouflage, wildlife-friendly design, and forest-inspired interiors that connect you with the natural world.",
      priceClass: "text-xs bg-green-100 text-green-800 rounded px-2 py-1 inline-block mb-2",
      priceLabel: "Forest Canopy",
      price: "Starting from $260,000",
      features: [
        { iconClass: "text-green-500", text: "Natural camouflage exterior design" },
        { iconClass: "text-green-500", text: "Wildlife-friendly construction" },
        { iconClass: "text-green-500", text: "Forest-inspired interior themes" },
      ],
      button: "Explore Forest Haven",
    },
    {
      img: "/main/domy/d9/img-1.jpg",
      badge: "Alpine/Arctic",
      badgeClass: "absolute top-4 left-4 bg-blue-300 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full",
      icon: <svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke="#38bdf8" strokeWidth='2'/></svg>,
      location: "Cold Climate Zones",
      title: "Winter Wonderland",
      description: "Stay warm and cozy in our winter optimized domes. Enhanced insulation and heating systems make this the perfect retreat for cold climates. Features snow-load resistant design and energy-efficient heating for year-round comfort.",
      priceClass: "text-xs bg-blue-200 text-blue-900 rounded px-2 py-1 inline-block mb-2",
      priceLabel: "Alpine/Arctic",
      price: "Starting from $340,000",
      features: [
        { iconClass: "text-blue-500", text: "Snow-load resistant structure" },
        { iconClass: "text-blue-500", text: "Advanced insulation systems" },
        { iconClass: "text-blue-500", text: "Energy-efficient heating" },
      ],
      button: "Explore Winter Wonderland",
    },
    {
      img: "/main/domy/d10/img-1.jpg",
      badge: "Tropical/Mediterranean",
      badgeClass: "absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full",
      icon: <svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke="#facc15" strokeWidth='2'/></svg>,
      location: "Warm Climate Zones",
      title: "Summer Paradise",
      description: "Beat the heat in our summer optimized domes featuring advanced cooling systems and sun-shading technology. Perfect for tropical and Mediterranean climates with natural ventilation and heat-reflective materials for ultimate comfort.",
      priceClass: "text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-1 inline-block mb-2",
      priceLabel: "Tropical/Mediterranean",
      price: "Starting from $300,000",
      features: [
        { iconClass: "text-yellow-500", text: "Advanced cooling systems" },
        { iconClass: "text-yellow-500", text: "Sun-shading technology" },
        { iconClass: "text-yellow-500", text: "Heat-reflective materials" },
      ],
      button: "Explore Summer Paradise",
    },
  ];
  const [envCarouselIndex, setEnvCarouselIndex] = useState(0);
  const [envVisibleCards, setEnvVisibleCards] = useState(3);
  useEffect(() => {
    function handleResizeEnv() {
      if (window.innerWidth < 640) setEnvVisibleCards(1);
      else if (window.innerWidth < 1024) setEnvVisibleCards(2);
      else setEnvVisibleCards(3);
    }
    handleResizeEnv();
    window.addEventListener('resize', handleResizeEnv);
    return () => window.removeEventListener('resize', handleResizeEnv);
  }, []);

  /** --- IMPROVED 'Explore Our House Types' SECTION START --- */
  const houseTypes = {
    aFrame: [
      {
        img: "/main/taurus/img-1.jpg",
        title: "A-Frame Compact",
        price: "$150,000",
        badge: "Popular",
        badgeColor: "bg-lime-400 text-green-900",
        features: [
          "Compact 1-2 bedroom layout",
          "Vaulted ceilings",
          "Energy-efficient windows",
          "Eco-insulated walls"
        ],
        details: "Perfect for couples or small families seeking a cozy, modern retreat with a small footprint.",
      },
      {
        img: "/main/talia/img-1.jpg",
        title: "A-Frame Standard",
        price: "$220,000",
        badge: "New",
        badgeColor: "bg-green-200 text-green-900",
        features: [
          "2-3 bedrooms",
          "Open-plan living",
          "Large deck option",
          "Solar-ready roof"
        ],
        details: "A versatile A-Frame for families, with flexible living space and outdoor connection.",
      },
      {
        img: "/main/assos/img-1.jpg",
        title: "A-Frame Deluxe",
        price: "$300,000",
        badge: "Luxury",
        badgeColor: "bg-yellow-200 text-yellow-800",
        features: [
          "3+ bedrooms",
          "Premium finishes",
          "Smart home features",
          "Panoramic windows"
        ],
        details: "Spacious, high-end A-Frame for those who want the best in comfort and design.",
      },
    ],
    box: [
      {
        img: "/main/atlas/img-1.jpg",
        title: "Box Modern",
        price: "$180,000",
        badge: "Efficient",
        badgeColor: "bg-blue-200 text-blue-800",
        features: [
          "Minimalist design",
          "2 bedrooms",
          "Green roof option",
          "Rainwater harvesting"
        ],
        details: "A modern, efficient box house with a focus on sustainability and simplicity.",
      },
      {
        img: "/main/atlas/img-2.jpg",
        title: "Box Family",
        price: "$240,000",
        badge: "Family",
        badgeColor: "bg-green-300 text-green-900",
        features: [
          "3 bedrooms",
          "Spacious kitchen",
          "Private backyard",
          "EV charging ready"
        ],
        details: "Ideal for families who want a modern, sustainable home with room to grow.",
      },
      {
        img: "/main/atlas/img-3.jpg",
        title: "Box Luxe",
        price: "$320,000",
        badge: "Premium",
        badgeColor: "bg-yellow-300 text-yellow-900",
        features: [
          "4+ bedrooms",
          "Luxury appliances",
          "Home office",
          "Rooftop terrace"
        ],
        details: "A luxury box house with all the amenities for modern living and entertaining.",
      },
    ]
  };

  const [houseTab, setHouseTab] = useState<'aFrame' | 'box'>("aFrame");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // ... existing code ...

  {/* Section: Explore Our House Types */}
  <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-gradient-to-b from-white to-green-50 overflow-hidden">
    {/* Decorative background pattern */}
    <div className="absolute z-10 inset-0 pointer-events-none select-none opacity-30 z-0">
      <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <ellipse cx="300" cy="100" rx="320" ry="80" fill="#bbf7d0" />
        <ellipse cx="300" cy="120" rx="220" ry="60" fill="#f0fdf4" />
      </svg>
    </div>
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2 relative z-10">Explore Our House Types</h2>
    <div className="text-green-700 text-base font-semibold mb-2 text-center relative z-10">Modern designs for every lifestyle</div>
    <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg relative z-10">Beyond our signature dome homes, we offer beautiful A-Frame and Box house options. Each design combines modern architecture with sustainable living principles.</p>
    {/* House type selector with animated underline */}
    <div className="flex w-full max-w-xl mb-8 relative z-10" role="tablist" aria-label="House Types">
      <button
        role="tab"
        aria-selected={houseTab === 'aFrame'}
        tabIndex={houseTab === 'aFrame' ? 0 : -1}
        className={`flex-1 px-4 py-2 font-semibold rounded-l shadow border-r border-green-200 transition-all duration-200 focus:outline-none relative ${houseTab === 'aFrame' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
        onClick={() => { setHouseTab('aFrame'); setExpandedCard(null); }}
      >
        <span className="inline-flex items-center gap-2"><svg width="20" height="20" fill="none"><polygon points="10,2 18,18 2,18" fill="#bef264" /></svg> A-Frame Houses</span>
        {houseTab === 'aFrame' && <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-400 rounded transition-all duration-300" />}
      </button>
      <button
        role="tab"
        aria-selected={houseTab === 'box'}
        tabIndex={houseTab === 'box' ? 0 : -1}
        className={`flex-1 px-4 py-2 font-semibold rounded-r shadow transition-all duration-200 focus:outline-none relative ${houseTab === 'box' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
        onClick={() => { setHouseTab('box'); setExpandedCard(null); }}
      >
        <span className="inline-flex items-center gap-2"><svg width="20" height="20" fill="none"><rect x="4" y="4" width="12" height="12" rx="2" fill="#a3e635" /></svg> Box Houses</span>
        {houseTab === 'box' && <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-400 rounded transition-all duration-300" />}
        {houseTab !== 'box' && <span className="absolute top-1 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">Coming Soon</span>}
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl relative z-10">
      {houseTypes[houseTab].map((card, idx) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-400 transition-all duration-300 group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-lime-400"
          tabIndex={0}
          aria-expanded={expandedCard === idx}
          onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpandedCard(expandedCard === idx ? null : idx); }}
        >
          {/* Badge */}
          <span className={`absolute z-10 top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow ${card.badgeColor} animate-pulse`}>{card.badge}</span>
          {/* Icon */}
        
          <Image src={card.img} alt={card.title} className="rounded-lg h-40 w-full object-cover mb-3 group-hover:brightness-95 transition" width={320} height={160} />
          <h3 className="font-bold text-xl text-gray-900 mb-1 mt-2">{card.title}</h3>
          <div className="text-base text-gray-500 mb-1">Starting from {card.price}</div>
          {/* Feature list */}
          <ul className="mb-3 mt-2 text-sm text-gray-700 space-y-1">
            {card.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2"><span className="text-lime-400">•</span> {f}</li>
            ))}
          </ul>
          {/* Expandable details */}
          <button
            className="text-green-700 text-xs font-semibold underline mb-2 self-start focus:outline-none"
            tabIndex={0}
            aria-controls={`details-${idx}`}
            aria-expanded={expandedCard === idx}
            onClick={e => { e.stopPropagation(); setExpandedCard(expandedCard === idx ? null : idx); }}
          >
            {expandedCard === idx ? 'Hide Details' : 'Learn More'}
          </button>
          <div
            id={`details-${idx}`}
            className={`transition-all duration-300 overflow-hidden text-gray-600 text-sm ${expandedCard === idx ? 'max-h-32 opacity-100 mb-2' : 'max-h-0 opacity-0'}`}
            aria-hidden={expandedCard !== idx}
          >
            {card.details}
          </div>
          <button className="bg-lime-400 text-green-900 font-semibold px-4 py-2 rounded shadow hover:bg-lime-300 hover:scale-105 transition-all duration-200 mt-auto">View Details</button>
        </div>
      ))}
    </div>
  </section>
  /** --- IMPROVED 'Explore Our House Types' SECTION END --- */

  // 1. Add state and data for the carousel near the top of the Home component (after other carousel states)
  const [availableCarouselIndex, setAvailableCarouselIndex] = useState(0);
  const [availableVisibleCards, setAvailableVisibleCards] = useState(3);

  const availableLocations = [
    {
      img: "/main/domy/d6/img.jpg",
      badge: "Available",
      badgeClass: "absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full",
      title: "Monteverde Retreat",
      location: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#06b6d4' strokeWidth='2'/></svg> Monteverde, Costa Rica</>,
      climate: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#fbbf24' strokeWidth='2'/></svg> Tropical Climate</>,
      description: "Immerse yourself in biodiversity. Our eco-domes are inspired by the rich flora, offering an unparalleled sustainable living experience in the heart of Costa Rica's cloud forest.",
      features: [
        { iconClass: "text-green-500", text: "Cloud forest integration" },
        { iconClass: "text-green-500", text: "Biodiversity preservation" },
        { iconClass: "text-green-500", text: "Sustainable tourism focus" },
      ],
      button: "Explore Location",
      buttonClass: "bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto"
    },
    {
      img: "/main/domy/d7/img-1.jpg",
      badge: "Available",
      badgeClass: "absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full",
      title: "Adriatic Haven",
      location: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#0ea5e9' strokeWidth='2'/></svg> Dubrovnik, Croatia</>,
      climate: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#fbbf24' strokeWidth='2'/></svg> Mediterranean Climate</>,
      description: "Perched on the stunning Adriatic coastline, these domes are designed for sea breezes and historic cultural sites. Experience the perfect blend of luxury and Mediterranean charm.",
      features: [
        { iconClass: "text-blue-500", text: "Adriatic sea views" },
        { iconClass: "text-blue-500", text: "Historic site proximity" },
        { iconClass: "text-blue-500", text: "Mediterranean architecture" },
      ],
      button: "Explore Location",
      buttonClass: "bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto"
    },
    {
      img: "/main/domy/d8/img-1.jpg",
      badge: "Available",
      badgeClass: "absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full",
      title: "Algarve Coastal Village",
      location: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#22c55e' strokeWidth='2'/></svg> Lagos, Portugal</>,
      climate: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#fbbf24' strokeWidth='2'/></svg> Mediterranean Climate</>,
      description: "Beachfront eco-village with sustainable living and direct access to golden sand beaches and the crystal blue waters of Portugal's famous Algarve region.",
      features: [
        { iconClass: "text-green-500", text: "Beachfront access" },
        { iconClass: "text-green-500", text: "Algarve region charm" },
        { iconClass: "text-green-500", text: "Coastal village lifestyle" },
      ],
      button: "Explore Location",
      buttonClass: "bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto"
    },
    {
      img: "/main/domy/d9/img-1.jpg",
      badge: "Under Development",
      badgeClass: "absolute top-4 right-4 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full",
      title: "Pocono Mountain Retreat",
      location: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#a3a3a3' strokeWidth='2'/></svg> Pocono Mountains, PA, United States</>,
      climate: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#fbbf24' strokeWidth='2'/></svg> Continental Climate</>,
      description: "Nestled in Pennsylvania's beautiful Pocono Mountains, these domes offer four-season living with easy access to hiking, skiing, and pristine lakes.",
      features: [
        { iconClass: "text-gray-500", text: "Four-season mountain living" },
        { iconClass: "text-gray-500", text: "Outdoor recreation access" },
        { iconClass: "text-gray-500", text: "Mountain views and privacy" },
      ],
      button: "View Details",
      buttonClass: "bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded shadow mt-auto cursor-not-allowed"
    },
    {
      img: "/main/domy/d10/img-1.jpg",
      badge: "Coming Soon",
      badgeClass: "absolute top-4 right-4 bg-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full",
      title: "Thousand Lakes Sanctuary",
      location: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke='#a3a3a3' strokeWidth='2'/></svg> Muskoka, Ontario, Canada</>,
      climate: <><svg width='16' height='16' fill='none'><circle cx='8' cy='8' r='7' stroke="#fbbf24" strokeWidth='2'/></svg> Continental Climate</>,
      description: "Located in Canada's stunning Thousand Lakes region, these domes provide lakeside living with incredible natural beauty and abundant wildlife.",
      features: [
        { iconClass: "text-blue-500", text: "Lakeside living experience" },
        { iconClass: "text-blue-500", text: "Wildlife observation" },
        { iconClass: "text-blue-500", text: "Canadian wilderness access" },
      ],
      button: "View Details",
      buttonClass: "bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded shadow mt-auto cursor-not-allowed"
    },
  ];

  // Responsive handler for visible cards
  useEffect(() => {
    function handleResizeAvailable() {
      if (window.innerWidth < 640) setAvailableVisibleCards(1);
      else if (window.innerWidth < 1024) setAvailableVisibleCards(2);
      else setAvailableVisibleCards(3);
    }
    handleResizeAvailable();
    window.addEventListener('resize', handleResizeAvailable);
    return () => window.removeEventListener('resize', handleResizeAvailable);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col font-['Inter','Geist','Montserrat',sans-serif] bg-white">
      {/* Background Image with Overlay */}
    

      {/* Navigation - Improved */}
      <nav className="sticky top-0 z-100 bg-green-900/90 backdrop-blur-md shadow-md flex justify-between items-center px-6 sm:px-12 py-4 transition-all">
        <div className="flex items-center gap-3">
          {/* SVG Logo */}
          <span aria-label="RoomyDomy Logo" className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf h-8 w-8 text-lime-400"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
          </span>
          <span className="text-white font-extrabold text-2xl tracking-tight">RoomyDomy</span>
        </div>
        <ul className="hidden md:flex gap-8 text-white font-medium text-base">
          <li><a href="#features" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">Features</a></li>
          <li><a href="#dome" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">Dome Homes</a></li>
          <li><a href="#aframe" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">A-Frame & Box</a></li>
          <li><a href="#amenities" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">Amenities</a></li>
          <li><a href="#gallery" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">Gallery</a></li>
          <li><a href="#partners" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">Partners</a></li>
          <li><a href="#contact" className="hover:text-lime-300 transition border-b-2 border-transparent hover:border-lime-300 pb-1">Contact</a></li>
        </ul>
        {/* Hamburger for mobile (UI only) */}
        <div className="md:hidden flex items-center">
          <button className="text-white hover:text-lime-300 focus:outline-none p-2 rounded transition" aria-label="Open menu">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect y="4" width="24" height="2" rx="1" fill="currentColor"/><rect y="11" width="24" height="2" rx="1" fill="currentColor"/><rect y="18" width="24" height="2" rx="1" fill="currentColor"/></svg>
          </button>
        </div>
        <div className="hidden md:flex gap-2 ml-6">
          <button className="px-4 py-2 rounded bg-white/10 border border-white/30 text-white hover:bg-white/20 transition">Partner Login</button>
          <button className="px-4 py-2 rounded bg-white/10 border border-white/30 text-white hover:bg-white/20 transition">Admin Login</button>
          <button className="px-4 py-2 rounded bg-lime-400 text-green-900 font-semibold hover:bg-lime-300 transition shadow">Join as Partner</button>
        </div>
      </nav>

      {/* Hero Content - Background Image Slider */}
      <section className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-10 pb-20 overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 w-full h-full -z-10">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover object-right"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 via-green-800/50 to-green-700/40" />
            </div>
          ))}
        </div>

        {/* Slider Navigation Dots - Centered */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-lime-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl w-full flex flex-col items-start bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl py-12 px-8 sm:px-12 lg:px-16 mt-20 mb-8 border border-white/20">
          <div className="mb-6 flex items-center gap-3 text-lime-200 font-semibold tracking-widest text-base">
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#A3E635" strokeWidth="2"/><path d="M7 10l2 2 4-4" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            SUSTAINABLE LIVING REIMAGINED
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-br from-white via-lime-200 to-green-300 bg-clip-text text-transparent drop-shadow-2xl text-left">
            Transform Your Life With <br />
            <span className="text-lime-300">An</span>{" "}
            <span className="text-lime-400">Eco-Friendly Dome Home</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 font-medium drop-shadow-sm text-left max-w-3xl">
            Save up to 70% on energy costs while living in harmony with nature. Our customizable dome homes combine cutting-edge sustainability with modern comfort and timeless design.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg border border-white/40 bg-white/95 text-green-900 min-w-[280px] shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-300 transition-all duration-200 text-base"
            />
            <button className="bg-lime-400 text-green-900 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-lime-300 hover:scale-105 transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-lime-400 text-base">
              Get Free Quote
            </button>
          </form>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white text-sm font-medium w-full max-w-3xl">
            <div className="flex items-center gap-2"><span className="text-lime-300">🛡️</span> 30-Year Warranty</div>
            <div className="flex items-center gap-2"><span className="text-lime-300">🌱</span> Energy Efficient</div>
            <div className="flex items-center gap-2"><span className="text-lime-300">🏗️</span> Disaster Resistant</div>
            <div className="flex items-center gap-2"><span className="text-lime-300">🛠️</span> Customizable Design</div>
            <div className="flex items-center gap-2"><span className="text-lime-300">💰</span> Financing Available</div>
            <div className="flex items-center gap-2"><span className="text-lime-300">🏦</span> Tax Incentive Eligible</div>
          </div>
        </div>
        
        {/* Scroll Indicator */}

      </section>

      {/* Section Divider */}
      <div className="w-full h-8 bg-gradient-to-b from-green-50 to-white my-8" />

      {/* Section 1: Build Your Perfect Eco-Home */}
      <section className="relative z-10 flex flex-col items-center justify-center py-20 bg-white">
        <div className="max-w-4xl w-full flex flex-col items-center mb-14">
          <div className="mb-3 text-green-700 font-bold tracking-widest text-base uppercase">Sustainability & Customization</div>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 text-center leading-tight">Build Your Perfect Eco-Home</h2>
          <p className="text-gray-600 text-center max-w-2xl mb-8 text-xl">Our innovative dome homes combine cutting-edge sustainable technology with a customizable approach. Choose your base model and add the features that matter most to you, creating a truly personalized eco-friendly living space.</p>
          <button className="bg-green-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-green-800 hover:scale-105 transition-all duration-200 text-lg">Explore Dome Options</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start gap-3 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
            <span className="bg-lime-100 text-lime-600 rounded-full p-3 mb-2"><svg width='28' height='28' fill='none'><circle cx='14' cy='14' r='12' stroke='#A3E635' strokeWidth='2.5'/><path d='M14 8v7l4 4' stroke='#A3E635' strokeWidth='2.5' strokeLinecap='round'/></svg></span>
            <h3 className="font-bold text-xl text-gray-900">Solar Energy Integration</h3>
            <p className="text-gray-600 text-lg">Our domes harness the power of the sun with integrated solar panels, providing sustainable electricity for all your needs.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start gap-3 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
            <span className="bg-lime-100 text-lime-600 rounded-full p-3 mb-2"><svg width='28' height='28' fill='none'><circle cx='14' cy='14' r='12' stroke='#A3E635' strokeWidth='2.5'/><path d='M14 10v6l3 3' stroke='#A3E635' strokeWidth='2.5' strokeLinecap='round'/></svg></span>
            <h3 className="font-bold text-xl text-gray-900">Water Collection System</h3>
            <p className="text-gray-600 text-lg">Advanced rainwater collection and filtration systems ensure a constant supply of clean water.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start gap-3 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
            <span className="bg-lime-100 text-lime-600 rounded-full p-3 mb-2"><svg width='28' height='28' fill='none'><circle cx='14' cy='14' r='12' stroke='#A3E635' strokeWidth='2.5'/><path d='M10 14h8' stroke='#A3E635' strokeWidth='2.5' strokeLinecap='round'/></svg></span>
            <h3 className="font-bold text-xl text-gray-900">Eco-Friendly Materials</h3>
            <p className="text-gray-600 text-lg">Built with sustainable materials that reduce environmental impact while providing superior insulation.</p>
          </div>
        </div>
      </section>

     
 
      {/* Section: Large Green Callout with Background Slider */}
      <section className="relative min-h-[520px] sm:min-h-[600px] md:h-screen z-10 flex flex-col items-center justify-center py-10 sm:py-16 overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 w-full h-full -z-10">
          {backgroundImages.map((image, index) => (
            <div
              key={`callout-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Nature background ${index + 1}`}
                fill
                className="object-cover object-center scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-green-700/40" />
            </div>
          ))}
        </div>
        
        <div className="max-w-full sm:max-w-4xl w-full flex flex-col items-center bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl py-8 sm:py-16 px-3 xs:px-4 sm:px-8 md:px-16 border border-white/30 relative mx-2">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent"></div>
          
          {/* Badge */}
          <div className="mb-4 sm:mb-6 flex items-center gap-2 bg-lime-400/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-lime-400/30">
            <svg width="16" height="16" fill="none" className="text-lime-300">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lime-200 font-semibold text-xs sm:text-sm tracking-wider">SUSTAINABLE LIVING</span>
          </div>
          
          <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            Domed in Nature, 
            <span className="block text-lime-300">Rooted in Comfort</span>
          </h3>
          
          <p className="text-white/95 text-center mb-5 sm:mb-8 text-base xs:text-lg sm:text-xl leading-relaxed max-w-3xl drop-shadow-lg">
            Your Roomydomy home is not just built on the land – it is rooted in it. From foundation to finish, every element is designed to create lasting comfort while maintaining the delicate balance of your natural surroundings.
          </p>
          
          <div className="bg-white/25 backdrop-blur-xl rounded-2xl px-4 sm:px-8 py-4 sm:py-6 mb-6 sm:mb-8 text-white text-center font-medium border border-white/40 shadow-xl w-full">
            <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-lime-200">Choose Roomydomy</div>
            <div className="text-white/90 text-sm sm:text-base leading-relaxed">Where every sunrise reminds you that you are not just living in a house, you are living in harmony with the world around you.</div>
          </div>
          
          <p className="text-white/95 text-center mb-6 sm:mb-10 text-base xs:text-lg sm:text-xl leading-relaxed max-w-3xl drop-shadow-lg">
            Ready to make nature your neighbor? Contact Roomydomy today and discover how luxury living can be beautifully, responsibly, naturally yours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
            <button className="bg-lime-400 text-green-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl hover:bg-lime-300 hover:scale-105 transition-all duration-300 transform hover:shadow-lime-400/25 w-full sm:w-auto">
              Contact Us Today
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        
      </section>

      {/* Section: Testimonials */}
      <section className="relative z-10 flex flex-col items-center justify-center py-20 bg-gradient-to-b from-white to-green-50">
        <div className="mb-4 text-green-700 font-bold tracking-widest text-sm text-center uppercase">Customer Stories</div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-4">What Our <span className="text-green-700">Homeowners Say</span></h2>
        <p className="text-gray-600 text-center max-w-3xl mb-16 text-xl leading-relaxed">Real experiences from real EcoDome homeowners who have transformed their lives with sustainable living. Discover how our dome homes are making a difference.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            {/* Quote icon */}
            <div className="flex items-start gap-4 mb-2">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <svg className="text-green-600 w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">Our EcoDome has transformed our lives. We are saving over 70% on energy costs, and the natural light is incredible. Best decision we ever made!</p>
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
              <Image src="/team/testi-01.jpg" alt="Sarah Johnson" className="w-14 h-14 rounded-full object-cover ring-4 ring-green-100" width={56} height={56} />
              <div>
                <div className="font-bold text-gray-900 text-lg">Sarah Johnson</div>
                <div className="text-green-600 font-medium">Colorado</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="text-xs text-gray-400 ml-2">Verified Owner</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            {/* Quote icon */}
            <div className="flex items-start gap-4 mb-2">
              <div className="bg-lime-100 rounded-full p-3 flex-shrink-0">
                <svg className="text-lime-600 w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">We have lived in our dome for 2 years now. The customizability was perfect - we added the solar pergola and natural pool. It is like living in a resort!</p>
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
              <Image src="/team/testi-02.jpg" alt="Michael & Emma Davis" className="w-14 h-14 rounded-full object-cover ring-4 ring-lime-100" width={56} height={56} />
              <div>
                <div className="font-bold text-gray-900 text-lg">Michael & Emma Davis</div>
                <div className="text-green-600 font-medium">Oregon</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="text-xs text-gray-400 ml-2">Verified Owner</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            {/* Quote icon */}
            <div className="flex items-start gap-4 mb-2">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <svg className="text-green-600 w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">After researching sustainable homes for years, the EcoDome stood out for quality and value. The rainwater collection system is brilliant engineering.</p>
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
              <Image src="/team/testi-03.jpg" alt="Robert Chen" className="w-14 h-14 rounded-full object-cover ring-4 ring-green-100" width={56} height={56} />
              <div>
                <div className="font-bold text-gray-900 text-lg">Robert Chen</div>
                <div className="text-green-600 font-medium">Washington</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="text-xs text-gray-400 ml-2">Verified Owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Happy Families</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">70%</div>
            <div className="text-gray-600 font-medium">Energy Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">4.9★</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">30yr</div>
            <div className="text-gray-600 font-medium">Warranty</div>
          </div>
        </div>
      </section>

      {/* Section: Sustainable Living CTA */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-gradient-to-br from-green-700 via-green-800 to-lime-700 overflow-hidden">
        {/* Decorative Blurred Glowing Shapes */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-lime-400 opacity-30 rounded-full filter blur-3xl z-0 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500 opacity-20 rounded-full filter blur-2xl z-0 animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 w-96 h-40 bg-lime-200 opacity-20 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2" />
        {/* Decorative Leaf Icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 pointer-events-none">
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110" cy="60" rx="100" ry="50" fill="#A3E635" />
          </svg>
        </div>
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl py-12 px-6 sm:px-14 border border-green-800 relative z-10">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-lime-400/30 rounded-full p-2"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" stroke="#A3E635" strokeWidth="2"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="#A3E635" strokeWidth="2"/></svg></span>
              <span className="text-lime-200 font-semibold tracking-wider text-base">SUSTAINABLE LIVING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 drop-shadow">Ready to Start Your Sustainable Living Journey?</h3>
            <p className="text-green-100 mb-4 text-lg">Schedule a consultation and get a personalized quote for your dream eco-home today.</p>
            <div className="text-xs text-lime-200 font-medium bg-lime-400/10 rounded-full px-3 py-1 inline-block mb-2">100% Free Consultation</div>
          </div>
          {/* Improved Form Layout */}
          <form className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-md">
            <input type="email" placeholder="Your Email" className="flex-1 px-5 py-3 rounded-l-lg border border-green-200 bg-white text-green-900 shadow focus:outline-none focus:ring-2 focus:ring-lime-300 transition-all duration-200 text-base min-w-[180px]" />
            <button className="bg-lime-400 text-green-900 font-bold px-7 py-3 rounded-r-lg shadow-lg hover:bg-lime-300 hover:scale-105 transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-lime-400 text-base">Request a Quote</button>
          </form>
        </div>
      </section>

      {/* Add keyframes for slow pulse animation in your global CSS if not present: */}
      {/*
      @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
      .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      @keyframes pulse-slower { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.35; } }
      .animate-pulse-slower { animation: pulse-slower 10s ease-in-out infinite; }
      */}

      {/* Section: Choose Your Perfect Dome */}
      <section className="relative z-20 flex flex-col items-center justify-center py-16 bg-white">
        <div className="mb-2 text-green-700 font-semibold tracking-widest text-sm text-center">CUSTOMIZABLE ECO-LIVING</div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 text-center">Choose Your Perfect Dome</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg">
          Select your ideal dome size and customize with add-ons like decks, pergolas, pools, and outdoor kitchens. Start with a base model and build your dream eco-home with the features that matter most to you.
        </p>
        {/* Carousel Implementation */}
        <div className="relative w-full max-w-6xl mb-8 px-2 sm:px-0">
          {/* Carousel Arrows */}
          <button
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-lime-200 text-green-700 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ left: '-2.5rem' }}
            onClick={() => setCarouselIndex((prev) => Math.max(prev - visibleCards, 0))}
            disabled={carouselIndex === 0}
            aria-label="Previous domes"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-lime-200 text-green-700 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ right: '-2.5rem' }}
            onClick={() => setCarouselIndex((prev) => Math.min(prev + visibleCards, domes.length - visibleCards))}
            disabled={carouselIndex >= domes.length - visibleCards}
            aria-label="Next domes"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Carousel Cards */}
          <div className="overflow-x-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(carouselIndex * (100 / visibleCards))}%)` }}
            >
              {domes.map((dome) => (
                <div
                  key={dome.title}
                  className={`bg-white rounded-xl shadow p-4 flex flex-col border border-gray-100 relative transition-transform duration-200 group min-w-0${visibleCards === 1 ? '' : ' mx-2'}`}
                  style={{ flex: `0 0 ${100 / visibleCards}%`, maxWidth: `${100 / visibleCards}%` }}
                >
                  <Image src={dome.img} alt={dome.title} className="rounded-lg h-40 w-full object-cover mb-3 group-hover:brightness-95 transition" width={320} height={160} />
                  <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow m-[3px]">Options</span>
                  <div className="text-sm text-gray-500 mb-1">{dome.size} · {dome.people}</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{dome.title}</h3>
                  <div className="text-sm bg-gray-100 text-gray-700 rounded px-2 py-1 inline-block mb-2">Base Model</div>
                  <div className="text-base mb-2 text-gray-700 whitespace-pre-line">Customizable with:\n{dome.features}</div>
                  <div className="font-semibold text-green-700 mb-2">Starting from <span className="text-gray-900">{dome.price}</span></div>
                  <button
                    className="bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 hover:scale-105 transition-all duration-200 mt-auto focus:outline-none focus:ring-2 focus:ring-lime-400"
                    onClick={() => { setSelectedDome(dome); setModalOpen(true); }}
                  >
                    Customize & View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(domes.length / visibleCards) }).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${carouselIndex / visibleCards === i ? 'bg-lime-400 scale-125' : 'bg-gray-300'} transition-all`}
                onClick={() => setCarouselIndex(i * visibleCards)}
                aria-label={`Go to domes slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <DomeDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} dome={selectedDome} />
        <div className="text-gray-500 text-base text-center mb-4">
          All dome models include our signature eco-friendly features: solar power, rainwater collection, and sustainable materials.
        </div>
        <button className="bg-green-100 text-green-800 font-semibold px-6 py-2 rounded shadow hover:bg-green-200 transition-all duration-200">Schedule a Consultation</button>
      </section>

      {/* Section: Domes Designed for Your Environment */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-white">
        <div className="mb-2 text-green-700 font-semibold tracking-widest text-sm text-center">LOCATION-SPECIFIC DESIGN</div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 text-center">Domes Designed for Your Environment</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg">Each location presents unique challenges and opportunities. Our specialized dome designs are optimized for specific environments, ensuring perfect harmony with your chosen setting.</p>
        {/* Carousel Implementation */}
        <div className="relative w-full max-w-6xl mb-8 px-2 sm:px-0">
          {/* Carousel Arrows */}
          <button
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-lime-200 text-green-700 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ left: '-2.5rem' }}
            onClick={() => setEnvCarouselIndex((prev) => Math.max(prev - envVisibleCards, 0))}
            disabled={envCarouselIndex === 0}
            aria-label="Previous environment domes"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-lime-200 text-green-700 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ right: '-2.5rem' }}
            onClick={() => setEnvCarouselIndex((prev) => Math.min(prev + envVisibleCards, envDomes.length - envVisibleCards))}
            disabled={envCarouselIndex >= envDomes.length - envVisibleCards}
            aria-label="Next environment domes"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Carousel Cards */}
          <div className="overflow-x-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(envCarouselIndex * (100 / envVisibleCards))}%)` }}
            >
              {envDomes.map((card) => (
                <div
                  key={card.title}
                  className={`bg-white rounded-xl shadow p-4 flex flex-col border border-gray-100 relative transition-transform duration-200 group min-w-0${envVisibleCards === 1 ? '' : ' mx-2'}`}
                  style={{ flex: `0 0 ${100 / envVisibleCards}%`, maxWidth: `${100 / envVisibleCards}%` }}
                >
                  <Image src={card.img} alt={card.title} className="rounded-lg h-40 w-full object-cover mb-3" width={320} height={160} />
                  <span className={card.badgeClass + ' m-[3px]'}>{card.badge}</span>
                  <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">{card.icon}{card.location}</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-base mb-2 text-gray-600">{card.description}</p>
                  <div className={card.priceClass}>{card.priceLabel} <span className="font-semibold">{card.price}</span></div>
                  <div className="text-sm text-gray-600 mb-3">
                    {card.features.map((f, i) => (
                      <div className="flex items-center gap-2 mb-1" key={i}><span className={f.iconClass}>✓</span> {f.text}</div>
                    ))}
                  </div>
                  <button className="bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto">{card.button}</button>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(envDomes.length / envVisibleCards) }).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${envCarouselIndex / envVisibleCards === i ? 'bg-lime-400 scale-125' : 'bg-gray-300'} transition-all`}
                onClick={() => setEnvCarouselIndex(i * envVisibleCards)}
                aria-label={`Go to environment domes slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="text-gray-500 text-base text-center mb-4">
          Need a dome for a specific location or climate? Our design team can create custom solutions.
        </div>
        <button className="bg-green-100 text-green-800 font-semibold px-6 py-2 rounded shadow hover:bg-green-200 transition-all duration-200">Request Custom Design</button>
      </section>

      {/* Section: Investment in Your Future (Pricing) */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-white">
        <div className="mb-2 text-green-700 font-semibold tracking-widest text-sm text-center">TRANSPARENT PRICING</div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 text-center">Investment in Your Future</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg">Our eco-domes are an investment in sustainable living that pays dividends through energy savings, increased property value, and reduced environmental impact.</p>
        <div className="flex gap-4 mb-8">
          <button className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow hover:bg-green-200 transition-all duration-200">Base Price</button>
          <button className="bg-white text-green-800 font-semibold px-4 py-2 rounded shadow border border-green-200 hover:bg-green-50 transition-all duration-200">With Energy Savings</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-8">
          {/* Starter Dome */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col border border-gray-100">
            <div className="font-bold text-xl text-gray-900 mb-1">Starter Dome</div>
            <div className="text-base text-gray-500 mb-4">Perfect for individuals or couples looking for a sustainable living home.</div>
            <div className="text-3xl font-extrabold text-green-700 mb-1">$89k</div>
            <div className="text-xs text-gray-400 mb-4">Base price: $89,000</div>
            <ul className="mb-6 text-base text-gray-700 space-y-2">
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 600-900 sq ft living space</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Basic solar panel system</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Rainwater collection system</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Eco-friendly materials</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Standard insulation package</li>
            </ul>
            <button className="bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto">Request Quote</button>
          </div>
          {/* Family Dome (Most Popular) */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col border-2 border-green-700 relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-semibold px-4 py-1 rounded-full">Most Popular</div>
            <div className="font-bold text-xl text-gray-900 mb-1 mt-4">Family Dome</div>
            <div className="text-base text-gray-500 mb-4">Ideal for small families with space for comfortable sustainable living.</div>
            <div className="text-3xl font-extrabold text-green-700 mb-1">$149k</div>
            <div className="text-xs text-gray-400 mb-4">Base price: $149,000</div>
            <ul className="mb-6 text-base text-gray-700 space-y-2">
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 800-1200 sq ft living space</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Advanced solar array</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Complete water management system</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Premium eco-friendly materials</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Enhanced insulation package</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Smart home integration</li>
            </ul>
            <button className="bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto">Request Quote</button>
          </div>
          {/* Luxury Dome */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col border border-gray-100">
            <div className="font-bold text-xl text-gray-900 mb-1">Luxury Dome</div>
            <div className="text-base text-gray-500 mb-4">Our premium offering with maximum space and cutting-edge sustainability features.</div>
            <div className="text-3xl font-extrabold text-green-700 mb-1">$249k</div>
            <div className="text-xs text-gray-400 mb-4">Base price: $249,000</div>
            <ul className="mb-6 text-base text-gray-700 space-y-2">
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 1500-2000+ sq ft living space</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Premium full battery system</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Advanced water reclamation</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Maximum insulation package</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Full smart home ecosystem</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Customizable add-on packages included</li>
            </ul>
            <button className="bg-green-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-800 transition-all duration-200 mt-auto">Request Quote</button>
          </div>
        </div>
        <div className="text-gray-500 text-sm text-center mb-4 max-w-2xl mx-auto">
          All prices are starting points. Final pricing depends on specific customizations, location, and additional features. Contact us for a personalized quote tailored to your needs and location.
        </div>
        <button className="bg-green-100 text-green-800 font-semibold px-6 py-2 rounded shadow hover:bg-green-200 transition-all duration-200">Get Custom Quote</button>
      </section>

      {/* Section: Explore Our House Types */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-gradient-to-b from-white to-green-50 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute z-10 inset-0 pointer-events-none select-none opacity-30 z-0">
          <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="300" cy="100" rx="320" ry="80" fill="#bbf7d0" />
            <ellipse cx="300" cy="120" rx="220" ry="60" fill="#f0fdf4" />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2 relative z-10">Explore Our House Types</h2>
        <div className="text-green-700 text-base font-semibold mb-2 text-center relative z-10">Modern designs for every lifestyle</div>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg relative z-10">Beyond our signature dome homes, we offer beautiful A-Frame and Box house options. Each design combines modern architecture with sustainable living principles.</p>
        {/* House type selector with animated underline */}
        <div className="flex w-full max-w-xl mb-8 relative z-10" role="tablist" aria-label="House Types">
          <button
            role="tab"
            aria-selected={houseTab === 'aFrame'}
            tabIndex={houseTab === 'aFrame' ? 0 : -1}
            className={`flex-1 px-4 py-2 font-semibold rounded-l shadow border-r border-green-200 transition-all duration-200 focus:outline-none relative ${houseTab === 'aFrame' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
            onClick={() => { setHouseTab('aFrame'); setExpandedCard(null); }}
          >
            <span className="inline-flex items-center gap-2"><svg width="20" height="20" fill="none"><polygon points="10,2 18,18 2,18" fill="#bef264" /></svg> A-Frame Houses</span>
            {houseTab === 'aFrame' && <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-400 rounded transition-all duration-300" />}
          </button>
          <button
            role="tab"
            aria-selected={houseTab === 'box'}
            tabIndex={houseTab === 'box' ? 0 : -1}
            className={`flex-1 px-4 py-2 font-semibold rounded-r shadow transition-all duration-200 focus:outline-none relative ${houseTab === 'box' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            onClick={() => { setHouseTab('box'); setExpandedCard(null); }}
          >
            <span className="inline-flex items-center gap-2"><svg width="20" height="20" fill="none"><rect x="4" y="4" width="12" height="12" rx="2" fill="#a3e635" /></svg> Box Houses</span>
            {houseTab === 'box' && <span className="absolute left-0 bottom-0 w-full h-1 bg-lime-400 rounded transition-all duration-300" />}
            {houseTab !== 'box' && <span className="absolute top-1 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">Coming Soon</span>}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl relative z-10">
          {houseTypes[houseTab].map((card, idx) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-400 transition-all duration-300 group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-lime-400"
              tabIndex={0}
              aria-expanded={expandedCard === idx}
              onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpandedCard(expandedCard === idx ? null : idx); }}
            >
              {/* Badge */}
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow ${card.badgeColor} animate-pulse`}>{card.badge}</span>
              {/* Icon */}
          
              <Image src={card.img} alt={card.title} className="rounded-lg h-40 w-full object-cover mb-3 group-hover:brightness-95 transition" width={320} height={160} />
              <h3 className="font-bold text-xl text-gray-900 mb-1 mt-2">{card.title}</h3>
              <div className="text-base text-gray-500 mb-1">Starting from {card.price}</div>
              {/* Feature list */}
              <ul className="mb-3 mt-2 text-sm text-gray-700 space-y-1">
                {card.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-lime-400">•</span> {f}</li>
                ))}
              </ul>
              {/* Expandable details */}
              <button
                className="text-green-700 text-xs font-semibold underline mb-2 self-start focus:outline-none"
                tabIndex={0}
                aria-controls={`details-${idx}`}
                aria-expanded={expandedCard === idx}
                onClick={e => { e.stopPropagation(); setExpandedCard(expandedCard === idx ? null : idx); }}
              >
                {expandedCard === idx ? 'Hide Details' : 'Learn More'}
              </button>
              <div
                id={`details-${idx}`}
                className={`transition-all duration-300 overflow-hidden text-gray-600 text-sm ${expandedCard === idx ? 'max-h-32 opacity-100 mb-2' : 'max-h-0 opacity-0'}`}
                aria-hidden={expandedCard !== idx}
              >
                {card.details}
              </div>
              <button className="bg-lime-400 text-green-900 font-semibold px-4 py-2 rounded shadow hover:bg-lime-300 hover:scale-105 transition-all duration-200 mt-auto">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Dome Gallery */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-gray-50 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0">
          <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="300" cy="100" rx="320" ry="80" fill="#bbf7d0" />
            <ellipse cx="300" cy="120" rx="220" ry="60" fill="#f0fdf4" />
          </svg>
        </div>
        <div className="mb-2 text-gray-500 font-semibold tracking-widest text-sm text-center relative z-10">OUR DESIGNS</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2 relative z-10">Dome Gallery</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg relative z-10">Explore our beautiful dome designs and configurations that blend seamlessly with different natural environments.</p>
        {/* Improved Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl relative z-10">
          {[
            { src: "/main/domy/d6/img.jpg", title: "Compact Studio" },
            { src: "/main/domy/d7/img-1.jpg", title: "Current Model" },
            { src: "/main/domy/d8/img-1.jpg", title: "Two-Level Haven" },
            { src: "/main/domy/d7/img-2.jpg", title: "Dome Interior" },
            { src: "/main/domy/d9/img-1.jpg", title: "Family Dome" },
            { src: "/main/domy/d10/img-1.jpg", title: "Grand Dome" },
          ].map((img) => (
            <div
              key={img.src}
              className="relative group rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              // onClick={() => { setGalleryModal({ open: true, img }); }} // Modal logic stub
              tabIndex={0}
              aria-label={`View ${img.title}`}
            >
              <Image
                src={img.src}
                alt={img.title}
                width={320}
                height={224}
                className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white text-lg font-bold drop-shadow mb-1">{img.title}</div>
                <div className="text-lime-200 text-xs font-medium drop-shadow">Click to enlarge</div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal logic would go here (stubbed for now) */}
      </section>

      {/* Section: Where Our Domes Are Available */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-white">
        <div className="mb-2 text-green-700 font-semibold tracking-widest text-sm text-center">GLOBAL PRESENCE</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2">Where Our Domes Are Available</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg">Discover our eco-dome communities around the world. From tropical retreats to coastal havens, our sustainable living solutions are designed to integrate with diverse climates and landscapes.</p>
        {/* Carousel Implementation */}
        <div className="relative w-full max-w-6xl mb-8 px-2 sm:px-0">
          {/* Carousel Arrows */}
          <button
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-lime-200 text-green-700 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ left: '-2.5rem' }}
            onClick={() => setAvailableCarouselIndex((prev) => Math.max(prev - availableVisibleCards, 0))}
            disabled={availableCarouselIndex === 0}
            aria-label="Previous locations"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-lime-200 text-green-700 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ right: '-2.5rem' }}
            onClick={() => setAvailableCarouselIndex((prev) => Math.min(prev + availableVisibleCards, availableLocations.length - availableVisibleCards))}
            disabled={availableCarouselIndex >= availableLocations.length - availableVisibleCards}
            aria-label="Next locations"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Carousel Cards */}
          <div className="overflow-x-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(availableCarouselIndex * (100 / availableVisibleCards))}%)` }}
            >
              {availableLocations.map((card) => (
                <div
                  key={card.title}
                  className={`bg-white rounded-xl shadow p-4 flex flex-col border border-gray-100 relative transition-transform duration-200 group min-w-0${availableVisibleCards === 1 ? '' : ' mx-2'}`}
                  style={{ flex: `0 0 ${100 / availableVisibleCards}%`, maxWidth: `${100 / availableVisibleCards}%` }}
                >
                  <Image src={card.img} alt={card.title} className="rounded-lg h-32 w-full object-cover mb-3" width={320} height={128} />
                  <span className={card.badgeClass}>{card.badge}</span>
                  <div className="font-bold text-xl text-gray-900 mb-1">{card.title}</div>
                  <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">{card.location}</div>
                  <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">{card.climate}</div>
                  <p className="text-base mb-4 text-gray-800">{card.description}</p>
                  <div className="text-sm text-gray-600 mb-3">
                    {card.features.map((f, i) => (
                      <div className="flex items-center gap-2 mb-1" key={i}><span className={f.iconClass}>✓</span> {f.text}</div>
                    ))}
                  </div>
                  <button className={card.buttonClass}>{card.button}</button>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(availableLocations.length / availableVisibleCards) }).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${availableCarouselIndex / availableVisibleCards === i ? 'bg-lime-400 scale-125' : 'bg-gray-300'} transition-all`}
                onClick={() => setAvailableCarouselIndex(i * availableVisibleCards)}
                aria-label={`Go to locations slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="text-gray-500 text-base text-center mb-4">
          Don not see your preferred location? We are constantly expanding our available sites.
        </div>
        <button className="bg-green-100 text-green-800 font-semibold px-6 py-2 rounded shadow hover:bg-green-200 transition-all duration-200">Request a New Location</button>
      </section>

      {/* Section: Our Solution Partners */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-gray-50 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0">
          <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="300" cy="100" rx="320" ry="80" fill="#bbf7d0" />
            <ellipse cx="300" cy="120" rx="220" ry="60" fill="#f0fdf4" />
          </svg>
        </div>
        <div className="mb-2 text-green-700 font-semibold tracking-widest text-sm text-center relative z-10">COLLABORATION</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2 relative z-10">Our Solution Partners</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg relative z-10">Join our network of professionals to help clients achieve their sustainable living dreams. We partner with top experts in various fields to deliver exceptional results.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mb-8 relative z-10">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-400 transition-all duration-300 group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-lime-400">
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow bg-lime-100 text-green-800 animate-pulse">Real Estate</span>
            <div className="mb-3 mt-2">
              {/* Home/Key Icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M3 10.5L12 4l9 6.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="14" width="10" height="6" rx="2" stroke="#22c55e" strokeWidth="2"/></svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1 mt-1">Real Estate Agents</h3>
            <p className="text-base text-gray-500 mb-4 text-center">Connect with clients seeking eco-friendly housing solutions.</p>
            <button className="bg-lime-100 text-green-800 font-semibold px-4 py-2 rounded shadow hover:bg-lime-200 hover:scale-105 transition-all duration-200 flex items-center gap-2 group-hover:bg-lime-200">Learn More <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-400 transition-all duration-300 group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-lime-400">
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow bg-green-100 text-green-900 animate-pulse">Builder</span>
            <div className="mb-3 mt-2">
              {/* Construction Icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="13" width="18" height="7" rx="2" stroke="#22c55e" strokeWidth="2"/><path d="M7 13V7a5 5 0 0 1 10 0v6" stroke="#22c55e" strokeWidth="2"/></svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1 mt-1">Builders</h3>
            <p className="text-base text-gray-500 mb-4 text-center">Join our network of sustainable construction specialists.</p>
            <button className="bg-green-100 text-green-900 font-semibold px-4 py-2 rounded shadow hover:bg-green-200 hover:scale-105 transition-all duration-200 flex items-center gap-2 group-hover:bg-green-200">Learn More <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-400 transition-all duration-300 group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-lime-400">
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow bg-yellow-100 text-yellow-800 animate-pulse">Designer</span>
            <div className="mb-3 mt-2">
              {/* Interior Icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2" stroke="#eab308" strokeWidth="2"/><rect x="8" y="4" width="8" height="6" rx="2" stroke="#eab308" strokeWidth="2"/></svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1 mt-1">Interior Designers</h3>
            <p className="text-base text-gray-500 mb-4 text-center">Create stunning interiors for our eco-dome homes.</p>
            <button className="bg-yellow-100 text-yellow-800 font-semibold px-4 py-2 rounded shadow hover:bg-yellow-200 hover:scale-105 transition-all duration-200 flex items-center gap-2 group-hover:bg-yellow-200">Learn More <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-400 transition-all duration-300 group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-lime-400">
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow bg-blue-100 text-blue-800 animate-pulse">Architect</span>
            <div className="mb-3 mt-2">
              {/* Architect Icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2" stroke="#38bdf8" strokeWidth="2"/><path d="M12 10V4" stroke="#38bdf8" strokeWidth="2"/><path d="M8 4h8" stroke="#38bdf8" strokeWidth="2"/></svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1 mt-1">Architects</h3>
            <p className="text-base text-gray-500 mb-4 text-center">Design innovative additions to our sustainable dome homes.</p>
            <button className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded shadow hover:bg-blue-200 hover:scale-105 transition-all duration-200 flex items-center gap-2 group-hover:bg-blue-200">Learn More <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
        </div>
        <button className="bg-gradient-to-r from-lime-400 via-green-400 to-green-700 text-white font-bold px-8 py-3 rounded-full shadow-xl hover:from-lime-300 hover:to-green-800 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-lg mt-2 relative z-10">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Become a Partner
        </button>
      </section>

      {/* Section: Interested in a RomyDomy? (Contact) */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16 bg-green-50 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0">
          <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="300" cy="100" rx="320" ry="80" fill="#bbf7d0" />
            <ellipse cx="300" cy="120" rx="220" ry="60" fill="#f0fdf4" />
          </svg>
        </div>
        <div className="mb-2 text-green-700 font-semibold tracking-widest text-sm text-center relative z-10">GET IN TOUCH</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2 relative z-10">Interested in a RomyDomy?</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-6 text-lg relative z-10">Have questions or want to learn more about our eco-friendly domes? Fill out the form below and one of our specialists will contact you shortly.</p>
        <div className="flex gap-4 mb-10 relative z-10">
          <button className="bg-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:bg-green-800 transition-all duration-200">Get Quote</button>
          <button className="bg-white text-green-800 font-semibold px-6 py-2 rounded shadow border border-green-200 hover:bg-green-100 transition-all duration-200">Schedule Tour</button>
        </div>
        <div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-start bg-white/90 rounded-2xl shadow-2xl border border-green-100 p-6 md:p-10 z-10">
          {/* Contact Form */}
          <form className="flex-1 flex flex-col gap-5 min-w-[280px]">
            <div className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
              <span className="bg-lime-400/30 rounded-full p-1"><svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#A3E635" strokeWidth="2"/></svg></span>
              Send us a message
            </div>
            {/* Floating label input with icon */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" stroke="#22c55e" strokeWidth="2"/></svg></span>
              <input type="text" id="contact-name" placeholder=" " className="pl-10 pr-3 py-3 rounded border border-gray-200 bg-gray-50 text-gray-900 w-full focus:ring-2 focus:ring-lime-300 focus:border-lime-400 transition peer" required />
              <label htmlFor="contact-name" className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 origin-left bg-white px-1 text-sm peer-focus:-translate-y-6 peer-focus:text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm">Your Name</label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" stroke="#22c55e" strokeWidth="2"/><path d="M4 7l8 5 8-5" stroke="#22c55e" strokeWidth="2"/></svg></span>
              <input type="email" id="contact-email" placeholder=" " className="pl-10 pr-3 py-3 rounded border border-gray-200 bg-gray-50 text-gray-900 w-full focus:ring-2 focus:ring-lime-300 focus:border-lime-400 transition peer" required />
              <label htmlFor="contact-email" className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 origin-left bg-white px-1 text-sm peer-focus:-translate-y-6 peer-focus:text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm">Email Address</label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" stroke="#22c55e" strokeWidth="2"/><path d="M6 9h6v4H6z" stroke="#22c55e" strokeWidth="2"/></svg></span>
              <input type="text" id="contact-phone" placeholder=" " className="pl-10 pr-3 py-3 rounded border border-gray-200 bg-gray-50 text-gray-900 w-full focus:ring-2 focus:ring-lime-300 focus:border-lime-400 transition peer" />
              <label htmlFor="contact-phone" className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 origin-left bg-white px-1 text-sm peer-focus:-translate-y-6 peer-focus:text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm">Phone Number</label>
            </div>
            <div className="relative">
              <textarea id="contact-message" placeholder=" " className="pl-3 pr-3 py-3 rounded border border-gray-200 bg-gray-50 text-gray-900 w-full focus:ring-2 focus:ring-lime-300 focus:border-lime-400 transition min-h-[80px] resize-none peer" required />
              <label htmlFor="contact-message" className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 origin-left bg-white px-1 text-sm peer-focus:-translate-y-6 peer-focus:text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm">What would you like to know?</label>
            </div>
            <button type="submit" className="bg-green-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-green-800 transition-all duration-200 mt-2 flex items-center justify-center gap-2 text-base focus:outline-none focus:ring-2 focus:ring-lime-400">
              <span>Send Message</span>
            </button>
            <div className="text-xs text-gray-400 text-center mt-1">We respect your privacy. Your information is never shared.</div>
          </form>
          {/* Vertical divider for desktop */}
          <div className="hidden md:block w-px bg-gradient-to-b from-green-200 via-green-100 to-transparent h-full mx-2 self-stretch" />
          {/* Contact Info */}
          <div className="flex-1 flex flex-col gap-6 min-w-[220px] bg-white/95 rounded-xl shadow-lg border border-green-100 p-6">
            <div>
              <div className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2"><svg width='20' height='20' fill='none'><circle cx='10' cy='10' r='9' stroke='#22c55e' strokeWidth='2'/></svg>Contact Information</div>
              <div className="flex items-center gap-2 text-gray-700 text-sm mb-1"><svg width='18' height='18' fill='none'><circle cx='9' cy='9' r='8' stroke='#22c55e' strokeWidth='2'/></svg> 123 Eco Drive, Green Valley, Sustainable City</div>
              <div className="flex items-center gap-2 text-gray-700 text-sm mb-1"><svg width='18' height='18' fill='none'><circle cx='9' cy='9' r='8' stroke='#22c55e' strokeWidth='2'/></svg> info@romydomy.com</div>
              <div className="flex items-center gap-2 text-gray-700 text-sm"><svg width='18' height='18' fill='none'><circle cx='9' cy='9' r='8' stroke='#22c55e' strokeWidth='2'/></svg> +1 (555) 123-4567</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2"><svg width='20' height='20' fill='none'><circle cx='10' cy='10' r='9' stroke='#22c55e' strokeWidth='2'/></svg>Business Hours</div>
              <div className="flex justify-between text-gray-700 text-sm"><span>Monday - Friday:</span><span>9:00 AM - 6:00 PM</span></div>
              <div className="flex justify-between text-gray-700 text-sm"><span>Saturday:</span><span>10:00 AM - 4:00 PM</span></div>
              <div className="flex justify-between text-gray-700 text-sm"><span>Sunday:</span><span>Closed</span></div>
            </div>
            <div className="mt-4 text-green-700 text-sm font-medium bg-green-50 rounded-lg px-3 py-2 border border-green-100 flex items-center gap-2"><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" stroke="#22c55e" strokeWidth="2"/></svg>Our team typically responds within 24 hours.</div>
          </div>
        </div>
      </section>

      {/* Footer matching screenshot - improved UI */}
      <footer className="bg-green-800 text-gray-100 pt-12 pb-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand & Social */}
          <div>
            <div className="font-extrabold text-xl mb-2 tracking-tight">RomyDomy</div>
            <div className="text-sm mb-4 text-gray-200">Sustainable and <span className="text-lime-200 font-semibold">luxury</span> eco-friendly dome homes for the future.</div>
            <div className="flex gap-3 mt-3">
              <a href="#" aria-label="Facebook" className="rounded-full p-2 hover:bg-green-700 transition"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z"/></svg></a>
              <a href="#" aria-label="Twitter" className="rounded-full p-2 hover:bg-green-700 transition"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .387.045.763.127 1.124C7.728 8.816 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg></a>
              <a href="#" aria-label="Instagram" className="rounded-full p-2 hover:bg-green-700 transition"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <div className="font-bold mb-3 text-lg text-lime-200">Quick Links</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-lime-300 transition">Features</a></li>
              <li><a href="#amenities" className="hover:text-lime-300 transition">Amenities</a></li>
              <li><a href="#gallery" className="hover:text-lime-300 transition">Gallery</a></li>
              <li><a href="#contact" className="hover:text-lime-300 transition">Contact</a></li>
            </ul>
          </div>
          {/* Sustainability */}
          <div>
            <div className="font-bold mb-3 text-lg text-lime-200">Sustainability</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#approach" className="hover:text-lime-300 transition">Our Approach</a></li>
              <li><a href="#materials" className="hover:text-lime-300 transition">Materials</a></li>
              <li><a href="#energy" className="hover:text-lime-300 transition">Energy Systems</a></li>
              <li><a href="#water" className="hover:text-lime-300 transition">Water Management</a></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <div className="font-bold mb-3 text-lg text-lime-200">Legal</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-lime-300 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-lime-300 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-lime-300 transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-700/60 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-200 px-4 max-w-7xl mx-auto">
          <div className="mb-2 md:mb-0">© 2025 RomyDomy. All rights reserved.</div>
          <div>Designed for Prasanga.</div>
        </div>
      </footer>
    </div>
  );
}
