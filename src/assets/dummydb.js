export const users = [
  {
    id: 1,
    email: "philip@example.com",
    password: "123456",
    displayName: "Philip Shaba",
    username: "philipshaba",
    bio: "Frontend Developer | Tech Enthusiast | Lifelong Learner",
    avatar: "/assets/avatars/philip.png", // optional path or URL
    profileCompletion: 85, // new field for progress tracking
    verified: true,
    otp: "123456",
  },
  {
    id: 2,
    email: "mary@example.com",
    password: "password",
    displayName: "Mary Segbo",
    username: "marysegbo",
    bio: "Virtual Assistant | Organized and Efficient",
    avatar: "/assets/avatars/mary.png",
    profileCompletion: 90,
    verified: true,
    otp: "654321",
  },
];

export const ideas = [
  {
    id: 1,
    title: "AI-Powered Personal Finance App",
    description:
      "An app that uses AI to help users manage their personal finances, track expenses, and create budgets.",
    category: "Finance",
    tags: ["AI", "Finance", "App"],
    authorId: 1,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    description:
      "A platform connecting eco-conscious consumers with sustainable fashion brands and designers.",
    category: "Fashion",
    tags: ["Sustainability", "Fashion", "Marketplace"],
    authorId: 2,
    createdAt: "2024-02-20T14:30:00Z",
  },
];