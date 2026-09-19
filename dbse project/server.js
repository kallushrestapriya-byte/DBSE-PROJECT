/**
 * HomeServe Backend API Server
 * Built with native Node.js http module (Zero External Dependencies)
 * Database Schema: home_service_db
 * Port: 5000
 */

import http from 'http';
import { parse } from 'url';

const PORT = 5000;

// Data Store matching home_service_db schema
let users = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya@example.com",
    password: "password123",
    phone: "+91 98999 12345",
    age: 28,
    gender: "Female",
    place: "Indiranagar",
    address: "Flat 402, Sunshine Heights, 10th Main Road",
    pincode: "560038",
    role: "customer"
  }
];

let services = [
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

let locations = [
  {
    id: 1,
    user_id: 1,
    place: "Home",
    address: "Flat 402, Sunshine Heights, 10th Main Road",
    city: "Bengaluru",
    pincode: "560038",
    latitude: "12.9716",
    longitude: "77.6412"
  }
];

let technicians = [
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
  }
];

let service_requests = [
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
    problem_description: "Master bedroom split AC is blowing warm air.",
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
    problem_description: "Kitchen sink drain pipe leak.",
    status: "Pending",
    created_at: "2026-09-14 14:15:00"
  }
];

let bookings = [
  {
    id: 5001,
    request_id: 1001,
    technician_id: 103,
    technician_name: "Vikram Singh",
    service_name: "AC Repair & Servicing",
    booking_date: "2026-09-18",
    start_time: "10:00 AM",
    end_time: "11:30 AM",
    status: "Confirmed",
    created_at: "2026-09-15 10:00:00"
  }
];

let payments = [
  {
    id: 8001,
    booking_id: 5001,
    amount: 699,
    payment_method: "UPI",
    payment_status: "Pending",
    payment_time: "Awaiting Service Completion"
  }
];

// Helper to send JSON response with CORS headers
function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper to parse JSON body
function getRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ROUTE HANDLERS
  if (path === '/api/auth/register' && method === 'POST') {
    const body = await getRequestBody(req);
    const newUser = { id: Date.now(), ...body, role: "customer" };
    users.push(newUser);
    return sendJSON(res, { success: true, token: `jwt-homeserve-${newUser.id}`, user: newUser, message: "Registration successful" });
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const body = await getRequestBody(req);
    const user = users.find(u => u.email.toLowerCase() === (body.email || '').toLowerCase());
    const targetUser = user || users[0];
    return sendJSON(res, { success: true, token: `jwt-homeserve-${targetUser.id}`, user: targetUser, message: "Login successful" });
  }

  if (path === '/api/services' && method === 'GET') {
    return sendJSON(res, services);
  }

  if (path.startsWith('/api/services/') && method === 'GET') {
    const serviceId = path.split('/')[3];
    const service = services.find(s => String(s.id) === String(serviceId));
    if (service) return sendJSON(res, service);
    return sendJSON(res, { error: "Service not found" }, 404);
  }

  if (path === '/api/locations' && method === 'GET') {
    return sendJSON(res, locations);
  }

  if (path === '/api/locations' && method === 'POST') {
    const body = await getRequestBody(req);
    const newLoc = { id: Date.now(), ...body };
    locations.push(newLoc);
    return sendJSON(res, newLoc);
  }

  if (path === '/api/requests' && method === 'GET') {
    return sendJSON(res, service_requests);
  }

  if (path.startsWith('/api/requests/') && method === 'GET') {
    const reqId = path.split('/')[3];
    const item = service_requests.find(r => String(r.id) === String(reqId));
    if (item) return sendJSON(res, item);
    return sendJSON(res, { error: "Request not found" }, 404);
  }

  if (path === '/api/requests' && method === 'POST') {
    const body = await getRequestBody(req);
    const newReq = {
      id: Math.floor(1000 + Math.random() * 9000),
      user_id: 1,
      status: "Pending",
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ...body
    };
    service_requests.unshift(newReq);
    return sendJSON(res, newReq);
  }

  if (path === '/api/bookings' && method === 'GET') {
    return sendJSON(res, bookings);
  }

  if (path.startsWith('/api/bookings/') && method === 'GET') {
    const bookingId = path.split('/')[3];
    const booking = bookings.find(b => String(b.id) === String(bookingId));
    if (booking) return sendJSON(res, booking);
    return sendJSON(res, { error: "Booking not found" }, 404);
  }

  if (path.startsWith('/api/payments/booking/') && method === 'GET') {
    const bookingId = path.split('/')[4];
    const payment = payments.find(p => String(p.booking_id) === String(bookingId));
    if (payment) return sendJSON(res, payment);
    return sendJSON(res, {
      id: Math.floor(8000 + Math.random() * 1000),
      booking_id: Number(bookingId),
      amount: 699,
      payment_method: "Cash / UPI on Service",
      payment_status: "Pending",
      payment_time: "Awaiting Service Completion"
    });
  }

  if (path === '/api/users/profile' && method === 'GET') {
    return sendJSON(res, users[0]);
  }

  if (path === '/api/users/profile' && method === 'PUT') {
    const body = await getRequestBody(req);
    users[0] = { ...users[0], ...body };
    return sendJSON(res, { success: true, user: users[0], message: "Profile updated successfully" });
  }

  if (path.startsWith('/api/technicians/') && method === 'GET') {
    const techId = path.split('/')[3];
    const tech = technicians.find(t => String(t.id) === String(techId));
    return sendJSON(res, tech || technicians[0]);
  }

  // Default 404
  return sendJSON(res, { error: "API Route not found" }, 404);
});

server.listen(PORT, () => {
  console.log(`[HomeServe Backend API Server] Running on http://localhost:${PORT}`);
});
