const restaurants = [
  {
    id: "pate-grill-house-fajar",
    name: "Pate Grill House Fajar",
    location: "Fajar Complex, Jalan Haji Karim",
    phone: "+60 11-3174 1312",
    hours: "11:30 AM – 9:30 PM",
    category: "Grill & Western",
    rating: 4.6,
    description: "A popular grill restaurant in Fajar Complex serving grilled dishes and casual dining.",
   lat: 4.24646,
lon: 117.88971,
    image: "images/restaurants/pate-grill-house.jpg"
  },

  {
    id: "sri-titingan-seafood",
    name: "Sri Titingan Seafood Restaurant",
    location: "Jalan St. Patrick",
    phone: "+60 89-778 311",
    hours: "11:00 AM – 10:30 PM",
    category: "Seafood",
    rating: 4.0,
    description: "Seafood restaurant located in central Tawau.",
 lat: 4.24900,
lon: 117.89100,
    image: "images/restaurants/sri-titingan.jpg"
  },

  {
    id: "kam-ling-seafood",
    name: "Kam Ling Seafood Restaurant",
    location: "Kubota Square",
    phone: "+60 19-883 2511",
    hours: "12:00 PM – 2:30 PM & 4:30 PM – 10:00 PM",
    category: "Seafood",
    rating: 4.1,
    description: "Seafood restaurant at Kubota Square, suitable for lunch and dinner.",
lat: 4.242845,
lon: 117.890244,
    image: "images/restaurants/kam-ling.jpg"
  },

  {
    id: "good-view-seafood",
    name: "Good View Seafood Restaurant",
    location: "Jalan Chen Fook",
    phone: "+60 13-883 7589",
    hours: "3:30 PM – 10:30 PM",
    category: "Seafood",
    rating: null,
    description: "A seafood dining option along Jalan Chen Fook, Tawau.",
    lat: 4.242505,
lon: 117.888084,
    image: "images/restaurants/good-view.jpg"
  },

  {
    id: "thai-spoon",
    name: "Thai Spoon Kitchen & Cafe",
    location: "Jalan Air Panas",
    phone: "+60 16-576 6612",
    hours: "11:30 AM – 10:00 PM",
    category: "Thai",
    rating: 4.9,
    description: "Thai restaurant and cafe serving Thai-inspired dishes in Tawau.",
   lat: 4.25800,
lon: 117.90000,

    image: "images/restaurants/thai-spoon.jpg"
  },

  {
    id: "dojo-nanyang",
    name: "Dojo Nanyang Kopihouse",
    location: "Jalan Haji Karim",
    phone: "+60 16-851 3178",
    hours: "9:00 AM – 10:00 PM",
    category: "Cafe & Kopitiam",
    rating: null,
    description: "A local-style kopitiam suitable for breakfast, coffee and casual meals.",
    lat: 4.24700,
lon: 117.88900,
    image: "images/restaurants/dojo-nanyang.jpg"
  },

  {
    id: "olive-bistro",
    name: "Olive Bistro",
    location: "Jalan Chong Thien Vun",
    phone: "+60 19-873 2631",
    hours: "11:30 AM – 9:30 PM",
    category: "Italian",
    rating: 4.2,
    description: "Italian-style restaurant offering a relaxed dining experience in Tawau.",
 lat: 4.25700,
lon: 117.91900,
    image: "images/restaurants/olive-bistro.jpg"
  },

  {
    id: "sage-cafe",
    name: "Sage Cafe & Restaurant",
    location: "Kubota Sentral",
    phone: "+60 14-376 7004",
    hours: "11:30 AM – 10:00 PM",
    category: "Cafe & Restaurant",
    rating: 4.1,
    description: "Cafe and restaurant located at Kubota Sentral.",
    lat: 4.25600,
lon: 117.91600,
    image: "images/restaurants/sage-cafe.jpg"
  },

  {
    id: "chiffonade-tawau",
    name: "Chiffonade Tawau",
    location: "Kubota Square",
    phone: "+60 11-3521 1973",
    hours: "6:30 AM – 9:45 PM",
    category: "Cafe & Restaurant",
    rating: 4.3,
    description: "A cafe and restaurant at Kubota Square, open from early morning.",
 lat: 4.25598,
lon: 117.91577,
    image: "images/restaurants/chiffonade.jpg"
  },

  {
    id: "gathering-grill-chill",
    name: "Gathering Grill & Chill",
    location: "Kubota Square",
    phone: "+60 89-704 694",
    hours: "11:30 AM – 9:30 PM",
    category: "Grill",
    rating: null,
    description: "Casual grill and dining spot at Kubota Square.",
  lat: 4.25698,
lon: 117.91552,
    image: "images/restaurants/gathering-grill.jpg"
  },

  {
    id: "taste-two",
    name: "Taste Two",
    location: "Bandar Tawau",
    phone: "+60 89-772 424",
    hours: "11:00 AM – 10:00 PM",
    category: "Restaurant",
    rating: 4.0,
    description: "Restaurant located in Bandar Tawau offering casual dining.",
lat: 4.258494,
lon: 117.922232,
    image: "images/restaurants/taste-two.jpg"
  },

  {
    id: "trufflebar",
    name: "Trufflebar & Restaurant",
    location: "Kubota Sentral",
    phone: "+60 16-429 7272",
    hours: "11:00 AM – 9:00 PM",
    category: "Restaurant",
    rating: null,
    description: "Restaurant located at Kubota Sentral.",
lat: 4.25600,
lon: 117.91700,
    image: "images/restaurants/trufflebar.jpg"
  },

  {
    id: "raizu",
    name: "RAIZU",
    location: "Jalan Haji Karim",
    phone: "+60 14-695 2799",
    hours: "11:00 AM – 9:00 PM",
    category: "Chicken Restaurant",
    rating: 4.8,
    description: "Popular chicken restaurant located near Jalan Haji Karim.",
   lat: 4.24750,
lon: 117.89050,
    image: "images/restaurants/raizu.jpg"
  },

  {
    id: "cottage-garden",
    name: "Cottage Garden",
    location: "Taman Unipark",
    phone: "+60 11-1882 3489",
    hours: "11:30 AM – 10:00 PM",
    category: "Restaurant",
    rating: 4.4,
    description: "A restaurant located in Taman Unipark, Tawau.",
    lat: 4.25700,
lon: 117.90000,
    image: "images/restaurants/cottage-garden.jpg"
  },

  {
    id: "restoran-sri-keningau",
    name: "Restoran Sri Keningau",
    location: "Jalan Haji Karim",
    phone: "+60 19-851 1231",
    hours: "7:00 AM – 10:00 PM",
    category: "Local Restaurant",
    rating: 4.0,
    description: "Local restaurant along Jalan Haji Karim, suitable for breakfast and daily meals.",
   lat: 4.24698,
lon: 117.88984,
    image: "images/restaurants/sri-keningau.jpg"
  }
];