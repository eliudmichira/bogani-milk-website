import { 
  ShieldCheck, 
  Activity,
  Droplets
} from "lucide-react";

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Sarah Kimani",
    image: "/api/placeholder/60/60", // Replace with actual customer image
    rating: 5,
    text: "I've been consuming Bogani probiotic yogurt daily for three months and have noticed a significant improvement in my digestion. The taste is incredible too!"
  },
  {
    id: 2,
    name: "Daniel Otieno",
    image: "/api/placeholder/60/60", // Replace with actual customer image
    rating: 5,
    text: "My children love the strawberry flavor. As a parent, I'm happy they're enjoying something that's actually good for them. The subscription delivery is so convenient!"
  },
  {
    id: 3,
    name: "Grace Mwangi",
    image: "/api/placeholder/60/60", // Replace with actual customer image
    rating: 4.5,
    text: "The quality of Bogani yogurt is unmatched in the market. It's creamy, rich, and you can taste the premium quality. I appreciate that it's made with all-natural ingredients."
  }
];

// Recipe ideas
export const recipes = [
  {
    title: "Berry Parfait",
    image: "/api/placeholder/300/200", // Replace with actual recipe image
    description: "Layer Bogani vanilla yogurt with fresh berries and granola for a nutritious breakfast.",
    ingredients: ["1 cup Bogani vanilla yogurt", "1/2 cup mixed berries", "1/4 cup granola", "1 tsp honey"],
    prepTime: "5 minutes",
    servings: 1
  },
  {
    title: "Mango Smoothie",
    image: "/api/placeholder/300/200", // Replace with actual recipe image
    description: "Blend Bogani yogurt with fresh mango for a tropical treat.",
    ingredients: ["1 cup Bogani vanilla yogurt", "1 ripe mango", "1/2 cup ice", "1 tbsp honey (optional)"],
    prepTime: "3 minutes",
    servings: 2
  },
  {
    title: "Overnight Oats",
    image: "/api/placeholder/300/200", // Replace with actual recipe image
    description: "Combine Bogani yogurt with oats for a delicious make-ahead breakfast.",
    ingredients: ["1/2 cup Bogani plain yogurt", "1/2 cup rolled oats", "1 tbsp chia seeds", "1 tbsp maple syrup"],
    prepTime: "5 minutes + overnight",
    servings: 1
  }
];

// Instagram posts
export const instagramPosts = [
  {
    id: 1,
    image: "/api/placeholder/300/300", // Replace with actual Instagram content
    likes: 342,
    caption: "Start your day right! #BoganiYogurt #HealthyBreakfast"
  },
  {
    id: 2,
    image: "/api/placeholder/300/300", // Replace with actual Instagram content
    likes: 287,
    caption: "Probiotics for the win! #GutHealth #Bogani"
  },
  {
    id: 3,
    image: "/api/placeholder/300/300", // Replace with actual Instagram content
    likes: 456,
    caption: "Strawberry perfection #BoganiLove #Foodie"
  },
  {
    id: 4,
    image: "/api/placeholder/300/300", // Replace with actual Instagram content
    likes: 201,
    caption: "Make healthy choices #Probiotics #Yogurt"
  }
];

// Products data
export const products = [
  {
    image: "strawberryYogurtImg", // This will be replaced with actual import in component
    flavor: "strawberry",
    name: "Strawberry Yogurt",
    description: "Delicious probiotic yogurt with real strawberry flavor. Rich, creamy, and packed with live cultures for your gut health.",
    price: "Ksh 120",
    badge: "Bestseller",
    nutrition: {
      calories: 120,
      protein: "5g",
      calcium: "15% DV",
      probiotics: "10B CFU"
    }
  },
  {
    image: "vanillaYogurtImg", // This will be replaced with actual import in component
    flavor: "vanilla",
    name: "Vanilla Yogurt",
    description: "Smooth vanilla probiotic yogurt. Naturally sweet, creamy, and full of all the goodness you deserve.",
    price: "Ksh 120",
    badge: "Popular",
    nutrition: {
      calories: 110,
      protein: "5g",
      calcium: "15% DV",
      probiotics: "10B CFU"
    }
  }
];

// Health benefits data
export const healthBenefits = [
  {
    title: "Improved Digestion",
    icon: <Activity className="w-6 h-6" />,
    description: "Probiotics help maintain a healthy balance of gut bacteria, improving digestive function and comfort."
  },
  {
    title: "Enhanced Immunity",
    icon: <ShieldCheck className="w-6 h-6" />,
    description: "70% of your immune system is in your gut. Our probiotics help strengthen your body's natural defenses."
  },
  {
    title: "Better Nutrient Absorption",
    icon: <Droplets className="w-6 h-6" />,
    description: "A healthy gut microbiome improves absorption of essential vitamins and minerals from your food."
  }
];