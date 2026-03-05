// Sample user data
export const sampleUsers = [
  {
    id: 1,
    name: 'John Kamau',
    email: 'john.kamau@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    farmSize: '5 hectares',
    crops: ['Maize', 'Beans'],
    joinedDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Amina Hassan',
    email: 'amina.hassan@example.com',
    phone: '+255 765 432 109',
    location: 'Dar es Salaam, Tanzania',
    farmSize: '3 hectares',
    crops: ['Rice', 'Vegetables'],
    joinedDate: '2024-02-10',
  },
  {
    id: 3,
    name: 'Emmanuel Nkunda',
    email: 'emmanuel.nkunda@example.com',
    phone: '+250 788 123 456',
    location: 'Kigali, Rwanda',
    farmSize: '2 hectares',
    crops: ['Coffee', 'Tea'],
    joinedDate: '2024-03-05',
  },
]

// Sample sensor data
export const sampleSensors = [
  {
    id: 'SENS-001',
    name: 'Field A - North',
    type: 'Soil Moisture',
    status: 'active',
    battery: 85,
    lastReading: '2024-11-27 14:30',
    value: 45,
    unit: '%',
    location: { lat: -1.9441, lng: 30.0619 },
  },
  {
    id: 'SENS-002',
    name: 'Field A - South',
    type: 'Soil pH',
    status: 'active',
    battery: 72,
    lastReading: '2024-11-27 14:28',
    value: 6.5,
    unit: 'pH',
    location: { lat: -1.9445, lng: 30.0625 },
  },
  {
    id: 'SENS-003',
    name: 'Field B - Center',
    type: 'Temperature',
    status: 'active',
    battery: 91,
    lastReading: '2024-11-27 14:32',
    value: 24,
    unit: '°C',
    location: { lat: -1.9450, lng: 30.0630 },
  },
  {
    id: 'SENS-004',
    name: 'Field B - East',
    type: 'Soil Moisture',
    status: 'warning',
    battery: 15,
    lastReading: '2024-11-27 12:15',
    value: 25,
    unit: '%',
    location: { lat: -1.9455, lng: 30.0635 },
  },
]

// Sample soil moisture data for charts
export const soilMoistureData = [
  { date: '2024-11-20', value: 42, optimal: 50 },
  { date: '2024-11-21', value: 38, optimal: 50 },
  { date: '2024-11-22', value: 45, optimal: 50 },
  { date: '2024-11-23', value: 48, optimal: 50 },
  { date: '2024-11-24', value: 52, optimal: 50 },
  { date: '2024-11-25', value: 46, optimal: 50 },
  { date: '2024-11-26', value: 43, optimal: 50 },
  { date: '2024-11-27', value: 45, optimal: 50 },
]

// Sample pH data
export const phData = [
  { date: '2024-11-20', value: 6.2 },
  { date: '2024-11-21', value: 6.3 },
  { date: '2024-11-22', value: 6.4 },
  { date: '2024-11-23', value: 6.5 },
  { date: '2024-11-24', value: 6.4 },
  { date: '2024-11-25', value: 6.6 },
  { date: '2024-11-26', value: 6.5 },
  { date: '2024-11-27', value: 6.5 },
]

// Sample temperature data
export const temperatureData = [
  { date: '2024-11-20', value: 22, min: 18, max: 26 },
  { date: '2024-11-21', value: 23, min: 19, max: 27 },
  { date: '2024-11-22', value: 24, min: 20, max: 28 },
  { date: '2024-11-23', value: 25, min: 21, max: 29 },
  { date: '2024-11-24', value: 23, min: 19, max: 27 },
  { date: '2024-11-25', value: 24, min: 20, max: 28 },
  { date: '2024-11-26', value: 24, min: 20, max: 28 },
  { date: '2024-11-27', value: 24, min: 20, max: 28 },
]

// Sample AI recommendations
export const aiRecommendations = [
  {
    id: 1,
    type: 'irrigation',
    priority: 'high',
    title: 'Increase Irrigation in Field B',
    description: 'Soil moisture levels have dropped below optimal range. Recommend increasing irrigation by 20% for the next 3 days.',
    date: '2024-11-27',
    icon: '💧',
  },
  {
    id: 2,
    type: 'fertilizer',
    priority: 'medium',
    title: 'Apply Nitrogen Fertilizer',
    description: 'Based on soil analysis, nitrogen levels are slightly low. Consider applying nitrogen-rich fertilizer.',
    date: '2024-11-26',
    icon: '🌱',
  },
  {
    id: 3,
    type: 'pest',
    priority: 'low',
    title: 'Monitor for Aphids',
    description: 'Weather conditions favorable for aphid activity. Regular monitoring recommended.',
    date: '2024-11-25',
    icon: '🐛',
  },
]

// Sample irrigation schedule
export const irrigationSchedule = [
  { field: 'Field A - North', time: '06:00', duration: '45 min', status: 'completed' },
  { field: 'Field A - South', time: '06:50', duration: '40 min', status: 'completed' },
  { field: 'Field B - Center', time: '14:00', duration: '60 min', status: 'scheduled' },
  { field: 'Field B - East', time: '15:10', duration: '50 min', status: 'scheduled' },
]

// Sample notifications
export const notifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Low Battery Warning',
    message: 'Sensor SENS-004 battery level is at 15%',
    time: '30 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'success',
    title: 'Irrigation Completed',
    message: 'Field A - North irrigation cycle completed successfully',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Weather Update',
    message: 'Rain expected tomorrow. Adjust irrigation schedule accordingly.',
    time: '5 hours ago',
    read: true,
  },
]

