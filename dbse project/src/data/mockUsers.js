export const MOCK_USERS = {
  customer: {
    id: "usr-cust-101",
    name: "Ananya Sharma",
    email: "ananya@example.com",
    phone: "+91 98765 43210",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    address: "B-402, Green Valley Heights, Sector 62, Noida, UP",
    city: "Noida",
    pincode: "201309",
    savedAddresses: [
      { id: "addr-1", label: "Home", text: "B-402, Green Valley Heights, Sector 62, Noida, UP", isPrimary: true },
      { id: "addr-2", label: "Parents Office", text: "Plot 14, Commercial Hub, Sector 18, Noida, UP", isPrimary: false }
    ]
  },
  technician: {
    id: "usr-tech-201",
    name: "Rajesh Kumar",
    email: "rajesh.tech@example.com",
    phone: "+91 98112 34567",
    role: "technician",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    specialization: "Plumbing & AC Repair",
    experienceYears: 6,
    rating: 4.8,
    reviewsCount: 142,
    availability: "Available",
    completedJobsCount: 128,
    bio: "Certified senior technician with over 6 years of hands-on experience in residential plumbing, pipe leakage fixing, and modern inverter AC diagnostics.",
    skills: ["Plumbing", "AC Repair", "Pipe Fitting", "Gas Refill", "Leak Detection"]
  },
  admin: {
    id: "usr-admin-301",
    name: "Vikram Malhotra (Admin)",
    email: "admin@fixitnow.com",
    phone: "+91 99999 88888",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    department: "System Administration"
  }
};
