// homePageData.ts
// Mock data for the home page components

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "Bogani yogurt has become my post-workout essential. The protein content is perfect and the taste is divine!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Nutritionist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote: "I recommend Bogani to all my clients. It's the perfect balance of nutrition and taste with live cultures that support gut health.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Chef & Food Blogger",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    quote: "The quality of Bogani yogurt is exceptional. I use it in my recipes and the creamy texture is consistent every time.",
    rating: 4
  }
];

export const recipes = [
  {
    id: 1,
    title: "Berry Breakfast Parfait",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Start your day with layers of Bogani yogurt, fresh berries, and crunchy granola.",
    ingredients: [
      "1 cup Bogani Natural Yogurt",
      "1/2 cup mixed berries (strawberries, blueberries, raspberries)",
      "1/4 cup granola",
      "1 tbsp honey or maple syrup",
      "Mint leaves for garnish"
    ]
  },
  {
    id: 2,
    title: "Mango Tango Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "A tropical blend of Bogani yogurt and fresh mango topped with coconut flakes.",
    ingredients: [
      "1 cup Bogani Vanilla Yogurt",
      "1 ripe mango, diced",
      "1/2 frozen banana",
      "2 tbsp coconut flakes",
      "1 tbsp chia seeds",
      "Fresh fruit for topping"
    ]
  },
  {
    id: 3,
    title: "Savory Yogurt Cucumber Dip",
    image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "A refreshing dip made with Bogani yogurt, cucumber, and herbs. Perfect for parties!",
    ingredients: [
      "2 cups Bogani Natural Yogurt",
      "1 cucumber, finely diced",
      "2 cloves garlic, minced",
      "2 tbsp fresh dill, chopped",
      "1 tbsp olive oil",
      "Salt and pepper to taste"
    ]
  }
];

export const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    caption: "Starting my day right with @BoganiBrands' creamy yogurt and fresh fruits! #HealthyBreakfast",
    likes: 342,
    user: "healthylifestyle"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1514995669114-6081e934b693?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    caption: "This yogurt parfait made with @BoganiBrands is the perfect afternoon snack! #SnackTime",
    likes: 218,
    user: "foodie_adventures"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    caption: "Meal prep made easy with @BoganiBrands yogurt. Creating these protein-packed snacks for the week! #MealPrep",
    likes: 457,
    user: "fitness_journey"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    caption: "Nothing beats a refreshing yogurt bowl on a hot summer day! Thank you @BoganiBrands #SummerTreats",
    likes: 299,
    user: "summerlover"
  }
];

export const products = [
  {
    id: 1,
    name: "Classic Natural Yogurt",
    image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Our signature probiotic yogurt with a creamy texture and tangy flavor.",
    price: 4.99,
    tags: ["Probiotic", "High Protein", "No Added Sugar"]
  },
  {
    id: 2,
    name: "Strawberry Delight",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Creamy yogurt blended with real strawberries for a fruity experience.",
    price: 5.49,
    tags: ["Probiotic", "Real Fruit", "Low Fat"]
  },
  {
    id: 3,
    name: "Vanilla Bean",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Smooth yogurt infused with premium vanilla beans for a rich flavor.",
    price: 5.49,
    tags: ["Probiotic", "Calcium Rich", "Gluten Free"]
  },
  {
    id: 4,
    name: "Greek Style Protein",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Thick and creamy Greek-style yogurt with extra protein for fitness enthusiasts.",
    price: 6.99,
    tags: ["20g Protein", "Low Carb", "Keto Friendly"]
  }
];

export const healthBenefits = [
  {
    id: 1,
    title: "Gut Health Support",
    description: "Live probiotic cultures promote a healthy gut microbiome, aiding digestion and immunity.",
    icon: "ShieldCheck"
  },
  {
    id: 2,
    title: "Rich in Protein",
    description: "High-quality protein helps build and repair muscles, keeping you fuller for longer.",
    icon: "Activity"
  },
  {
    id: 3,
    title: "Calcium Boost",
    description: "Essential calcium for strong bones and teeth, supporting long-term skeletal health.",
    icon: "Droplets"
  },
  {
    id: 4,
    title: "Vitamins & Minerals",
    description: "Packed with essential vitamins and minerals like B12, riboflavin, phosphorus, and potassium.",
    icon: "Sparkles"
  }
]; 