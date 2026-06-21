/**
 * Static data for EcoTwin scenarios, twin characteristics, and doppelgänger types.
 */

export const PRESET_SCENARIOS = [
  {
    id: 'vegetarian',
    title: 'Become Vegetarian',
    description: 'Switch to a fully plant-based diet',
    icon: 'Leaf',
    color: 'emerald',
  },
  {
    id: 'electric-vehicle',
    title: 'Switch to Electric Vehicle',
    description: 'Replace your ICE car with an EV',
    icon: 'Zap',
    color: 'teal',
  },
  {
    id: 'public-transport',
    title: 'Use Public Transport',
    description: 'Commute via bus or train instead of car',
    icon: 'Bus',
    color: 'blue',
  },
  {
    id: 'reduce-ac',
    title: 'Reduce AC Usage',
    description: 'Cut air conditioning usage by 3 hours daily',
    icon: 'Thermometer',
    color: 'cyan',
  },
  {
    id: 'stop-fast-fashion',
    title: 'Stop Fast Fashion',
    description: 'Eliminate fast fashion purchases entirely',
    icon: 'Shirt',
    color: 'purple',
  },
  {
    id: 'reduce-flights',
    title: 'Reduce Flights',
    description: 'Cut your annual flights by half',
    icon: 'Plane',
    color: 'orange',
  },
  {
    id: 'work-from-home',
    title: 'Work From Home',
    description: 'Reduce commuting to once a week',
    icon: 'Home',
    color: 'green',
  },
  {
    id: 'cycle-to-work',
    title: 'Cycle to Work',
    description: 'Switch your daily commute to cycling',
    icon: 'Bike',
    color: 'lime',
  },
];

export const TWIN_CHARACTERISTICS = {
  energyConsumer: {
    label: 'Energy Consumer',
    description: 'High home energy usage',
    threshold: (profile) => (profile.acHours || 0) + (profile.tvHours || 0) > 6,
  },
  consciousTraveler: {
    label: 'Conscious Traveler',
    description: 'Moderate travel footprint',
    threshold: (profile) => (profile.flightsPerYear || 0) <= 2,
  },
  greenCommuter: {
    label: 'Green Commuter',
    description: 'Uses eco-friendly transport',
    threshold: (profile) => ['bicycle', 'walking', 'train', 'bus'].includes(profile.transportType),
  },
  mindfulEater: {
    label: 'Mindful Eater',
    description: 'Plant-forward diet choices',
    threshold: (profile) => profile.dietType === 'vegetarian',
  },
  climateChampion: {
    label: 'Climate Champion',
    description: 'Below-average carbon footprint',
    threshold: (_profile, ecoScore) => ecoScore >= 60,
  },
  sustainableShopper: {
    label: 'Sustainable Shopper',
    description: 'Minimal fast fashion consumption',
    threshold: (profile) => (profile.fastFashionFrequency || 0) === 0,
  },
};

export const DOPPELGANGER_TYPES = [
  {
    type: 'Urban Engineering Student',
    description: 'Moderate energy use, public transport, budget-conscious shopping',
    matchCondition: (carbon) => carbon.total >= 2000 && carbon.total < 4000 && carbon.transport < 1000,
  },
  {
    type: 'Remote Software Developer',
    description: 'Low commute emissions, high energy usage, moderate online shopping',
    matchCondition: (carbon) => carbon.energy > carbon.transport && carbon.total < 5000,
  },
  {
    type: 'Sustainable Commuter',
    description: 'Green transport choices, balanced lifestyle, eco-conscious decisions',
    matchCondition: (carbon) => carbon.transport < 500 && carbon.total < 3500,
  },
  {
    type: 'Frequent Traveler',
    description: 'High travel emissions, moderate home footprint',
    matchCondition: (carbon) => carbon.travel > 1500,
  },
  {
    type: 'Eco-Conscious Urbanite',
    description: 'Balanced lifestyle with room for improvement in specific areas',
    matchCondition: (carbon) => carbon.total >= 3000 && carbon.total < 6000,
  },
  {
    type: 'Climate-Forward Individual',
    description: 'Below-average footprint across most categories',
    matchCondition: (carbon) => carbon.total < 2000,
  },
  {
    type: 'Modern Consumer',
    description: 'Typical urban lifestyle with significant shopping and energy footprint',
    matchCondition: () => true, // Default fallback
  },
];

export const TRANSPORT_OPTIONS = [
  { id: 'car', label: 'Car', icon: 'Car' },
  { id: 'scooter', label: 'Scooter', icon: 'Bike' },
  { id: 'bus', label: 'Bus', icon: 'Bus' },
  { id: 'train', label: 'Train', icon: 'Train' },
  { id: 'bicycle', label: 'Bicycle', icon: 'Bike' },
  { id: 'walking', label: 'Walking', icon: 'Footprints' },
];

export const DIET_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian', description: 'Plant-based diet' },
  { id: 'mixed', label: 'Mixed Diet', description: 'Balanced meat and vegetables' },
  { id: 'heavy-meat', label: 'Heavy Meat', description: 'Regular meat consumption' },
];

export const FREQUENCY_OPTIONS = [
  { id: 'rare', label: 'Rarely' },
  { id: 'occasional', label: 'Occasionally' },
  { id: 'frequent', label: 'Frequently' },
];

export const FOOD_WASTE_OPTIONS = [
  { id: 'low', label: 'Low', description: 'Minimal food waste' },
  { id: 'moderate', label: 'Moderate', description: 'Some food waste' },
  { id: 'high', label: 'High', description: 'Significant food waste' },
];

export const LIFESTYLE_TRANSFORMATIONS = [
  { id: 'college-student', title: 'College Student', description: 'Budget meals, public transport, shared housing.', icon: 'GraduationCap', color: 'blue' },
  { id: 'hostel-living', title: 'Hostel Living', description: 'High shared resources, minimal personal footprint.', icon: 'Building2', color: 'indigo' },
  { id: 'remote-worker', title: 'Remote Worker', description: 'No commute, higher home energy usage.', icon: 'Laptop', color: 'slate' },
  { id: 'sustainable-traveler', title: 'Sustainable Traveler', description: 'Fewer flights, trains over planes.', icon: 'Train', color: 'emerald' },
  { id: 'minimalist-living', title: 'Minimalist Living', description: 'Reduced shopping and fast fashion.', icon: 'BoxSelect', color: 'stone' },
  { id: 'zero-waste', title: 'Zero Waste Lifestyle', description: 'Composting, bulk buying, no single-use plastics.', icon: 'Recycle', color: 'teal' },
  { id: 'ev-owner', title: 'EV Owner', description: 'Electric vehicle for all driving needs.', icon: 'Zap', color: 'yellow' },
  { id: 'eco-shopper', title: 'Eco-Conscious Shopper', description: 'Thrifting, sustainable brands only.', icon: 'ShoppingBag', color: 'rose' },
  { id: 'cycling-commuter', title: 'Cycling Commuter', description: 'Biking everywhere, zero transport emissions.', icon: 'Bike', color: 'green' },
  { id: 'digital-nomad', title: 'Digital Nomad', description: 'Frequent flights, but minimal belongings.', icon: 'Globe', color: 'sky' },
  { id: 'urban-professional', title: 'Urban Professional', description: 'High convenience, online deliveries, moderate travel.', icon: 'Briefcase', color: 'amber' },
  { id: 'green-family', title: 'Green Family', description: 'Shared meals, carpooling, bulk shopping.', icon: 'Users', color: 'emerald' },
];

export const LIFE_EVENTS = [
  { id: 'moving-city', title: 'Moving to Another City', description: 'Changes commute distances and housing types.', icon: 'MapPin', color: 'violet' },
  { id: 'new-job', title: 'Starting a New Job', description: 'Daily commute changes, new routines.', icon: 'Briefcase', color: 'blue' },
  { id: 'living-hostel', title: 'Living in a Hostel', description: 'Drastically reduced personal energy usage.', icon: 'Building2', color: 'indigo' },
  { id: 'renting-apartment', title: 'Renting an Apartment', description: 'Sole responsibility for energy and utilities.', icon: 'Home', color: 'orange' },
  { id: 'buying-car', title: 'Buying a Car', description: 'Switch from public transport to personal ICE vehicle.', icon: 'Car', color: 'red' },
  { id: 'buying-ev', title: 'Buying an EV', description: 'Zero-emission personal transport.', icon: 'Zap', color: 'emerald' },
  { id: 'working-home', title: 'Working From Home', description: 'Eliminated commute, higher AC/Laptop usage.', icon: 'Monitor', color: 'slate' },
  { id: 'studying-abroad', title: 'Studying Abroad', description: 'Frequent long-distance flights.', icon: 'Plane', color: 'sky' },
  { id: 'business-travel', title: 'Frequent Business Travel', description: 'High flight and hotel footprints.', icon: 'Briefcase', color: 'rose' },
  { id: 'starting-family', title: 'Starting a Family', description: 'Increased food, energy, and waste footprints.', icon: 'Baby', color: 'pink' },
];

export const BADGE_TYPES = [
  { id: 'climate-explorer', name: 'Climate Explorer', description: 'Simulate your first scenario.', icon: 'Compass', condition: (scenariosRun) => scenariosRun >= 1 },
  { id: 'green-commuter', name: 'Green Commuter', description: 'Choose a zero-emission transport scenario.', icon: 'Bike', condition: (scenarioId) => ['cycle-to-work', 'cycling-commuter', 'public-transport'].includes(scenarioId) },
  { id: 'sustainable-shopper', name: 'Sustainable Shopper', description: 'Commit to reducing your shopping footprint.', icon: 'ShoppingBag', condition: (scenarioId) => ['stop-fast-fashion', 'minimalist-living', 'eco-shopper'].includes(scenarioId) },
  { id: 'energy-saver', name: 'Energy Saver', description: 'Significantly reduce your home energy usage.', icon: 'Zap', condition: (scenarioId) => ['reduce-ac', 'zero-waste'].includes(scenarioId) },
  { id: 'future-guardian', name: 'Future Guardian', description: 'Find a scenario that reduces emissions by over 30%.', icon: 'Shield', condition: (savingsPercent) => savingsPercent >= 30 },
];
