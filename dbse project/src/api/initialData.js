export const INITIAL_SERVICES = [
  {
    id: 1,
    name: "Plumbing Repair & Leak Fixing",
    category: "Plumbing",
    description: "Expert repair for leaking taps, pipe bursts, bathroom blockages, flush tank issues, and basin installations.",
    price: 399,
    duration: "45 mins",
    image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Electrical Repair & Wiring",
    category: "Electrical",
    description: "Complete electrical troubleshooting, switchboard repairs, short-circuit resolution, fan fitting, and fuse fixes.",
    price: 299,
    duration: "30 mins",
    image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "AC Repair & Servicing",
    category: "AC Repair",
    description: "Comprehensive AC jet foam cleaning, gas refill, cooling check, filter replacement, and compressor diagnosis.",
    price: 699,
    duration: "60 mins",
    image_url: "https://images.unsplash.com/photo-1631545806261-710e206085a6?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Carpentry & Furniture Assembly",
    category: "Carpentry",
    description: "Custom wood repair, door lock installation, bed frame assembly, wardrobe hinges replacement, and shelf fitting.",
    price: 499,
    duration: "60 mins",
    image_url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "House Interior Painting",
    category: "Painting",
    description: "Full wall interior painting, waterproofing coat, texture designs, touch-up painting, and protective masking.",
    price: 1499,
    duration: "2-3 Days",
    image_url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Washing Machine Repair",
    category: "Appliance",
    description: "Diagnose drum issues, water drainage problems, motor errors, and PCB repair for top load and front load washers.",
    price: 449,
    duration: "45 mins",
    image_url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Refrigerator Repair",
    category: "Appliance",
    description: "Single and double door fridge cooling repairs, thermostat replacement, gas charging, and door gasket sealing.",
    price: 549,
    duration: "60 mins",
    image_url: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "RO Water Purifier Service",
    category: "Appliance",
    description: "Filter replacement, membrane deep cleaning, TDS check, UV lamp test, and leakage fix for all RO brands.",
    price: 349,
    duration: "30 mins",
    image_url: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Pest Control Treatment",
    category: "Pest Control",
    description: "Odorless chemical spray and gel treatment for cockroaches, bed bugs, ants, termites, and mosquitoes.",
    price: 899,
    duration: "90 mins",
    image_url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    name: "Full Home Deep Cleaning",
    category: "Cleaning",
    description: "Deep scrubbing of kitchen, bathrooms, living spaces, balconies, windows, fan blades, and floor polishing.",
    price: 1999,
    duration: "3-4 Hours",
    image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_TECHNICIANS = [
  {
    id: 101,
    user_id: 201,
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.tech@homeserve.com",
    specialization: "Plumbing & Pipe Specialist",
    rating: 4.9,
    availability: "Available",
    completed_jobs: 142
  },
  {
    id: 102,
    user_id: 202,
    name: "Suresh Sharma",
    phone: "+91 98111 22334",
    email: "suresh.electric@homeserve.com",
    specialization: "Electrical Systems & Appliances",
    rating: 4.8,
    availability: "Available",
    completed_jobs: 98
  },
  {
    id: 103,
    user_id: 203,
    name: "Vikram Singh",
    phone: "+91 97222 33445",
    email: "vikram.ac@homeserve.com",
    specialization: "HVAC & AC Master Technician",
    rating: 5.0,
    availability: "On Assignment",
    completed_jobs: 215
  },
  {
    id: 104,
    user_id: 204,
    name: "Amit Patel",
    phone: "+91 96333 44556",
    email: "amit.clean@homeserve.com",
    specialization: "Home Deep Cleaning & Pest Control",
    rating: 4.7,
    availability: "Available",
    completed_jobs: 76
  }
];

export const INITIAL_USER = {
  id: 1,
  name: "Ananya Sharma",
  email: "ananya@example.com",
  phone: "+91 98999 12345",
  age: 28,
  gender: "Female",
  place: "Indiranagar",
  address: "Flat 402, Sunshine Heights, 10th Main Road",
  pincode: "560038",
  role: "customer"
};

export const INITIAL_LOCATIONS = [
  {
    id: 1,
    user_id: 1,
    place: "Home",
    address: "Flat 402, Sunshine Heights, 10th Main Road",
    city: "Bengaluru",
    pincode: "560038",
    latitude: "12.9716",
    longitude: "77.6412"
  },
  {
    id: 2,
    user_id: 1,
    place: "Parents Place",
    address: "House 12, Green Avenue, Indiranagar 2nd Stage",
    city: "Bengaluru",
    pincode: "560038",
    latitude: "12.9720",
    longitude: "77.6450"
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 1001,
    user_id: 1,
    service_id: 3,
    service_name: "AC Repair & Servicing",
    service_price: 699,
    service_duration: "60 mins",
    location_id: 1,
    preferred_date: "2026-09-18",
    preferred_time: "10:00 AM - 12:00 PM",
    problem_description: "Master bedroom split AC is blowing warm air and making noise.",
    status: "Confirmed",
    created_at: "2026-09-15 09:30:00"
  },
  {
    id: 1002,
    user_id: 1,
    service_id: 1,
    service_name: "Plumbing Repair & Leak Fixing",
    service_price: 399,
    service_duration: "45 mins",
    location_id: 1,
    preferred_date: "2026-09-16",
    preferred_time: "02:00 PM - 04:00 PM",
    problem_description: "Kitchen sink drain pipe is dripping continuously.",
    status: "Pending",
    created_at: "2026-09-14 14:15:00"
  },
  {
    id: 1003,
    user_id: 1,
    service_id: 10,
    service_name: "Full Home Deep Cleaning",
    service_price: 1999,
    service_duration: "3-4 Hours",
    location_id: 2,
    preferred_date: "2026-09-10",
    preferred_time: "09:00 AM - 01:00 PM",
    problem_description: "Full deep cleaning required before festival event.",
    status: "Completed",
    created_at: "2026-09-08 11:00:00"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 5001,
    request_id: 1001,
    technician_id: 103,
    booking_date: "2026-09-18",
    start_time: "10:00 AM",
    end_time: "11:30 AM",
    status: "Confirmed",
    created_at: "2026-09-15 10:00:00"
  },
  {
    id: 5002,
    request_id: 1003,
    technician_id: 104,
    booking_date: "2026-09-10",
    start_time: "09:00 AM",
    end_time: "01:00 PM",
    status: "Completed",
    created_at: "2026-09-08 12:00:00"
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: 8001,
    booking_id: 5001,
    amount: 699,
    payment_method: "UPI",
    payment_status: "Pending",
    payment_time: "Pending Service Completion"
  },
  {
    id: 8002,
    booking_id: 5002,
    amount: 1999,
    payment_method: "Card",
    payment_status: "Completed",
    payment_time: "2026-09-10 13:15:22"
  }
];
