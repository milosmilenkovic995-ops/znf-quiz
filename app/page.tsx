"use client";

import { useMemo, useState } from "react";

const questions = [
  {
    id: 1,
    title: "What does your ideal morning look like?",
    options: [
      { value: "fast", label: "Quick and simple" },
      { value: "coffee", label: "A smooth coffee ritual" },
      { value: "blend", label: "A blended drink or smoothie" },
      { value: "varies", label: "It changes day to day" },
    ],
  },
  {
    id: 2,
    title: "What are you looking for most?",
    options: [
      { value: "easy", label: "Something easy to add to my routine" },
      { value: "taste", label: "A richer, more enjoyable drink" },
      { value: "versatile", label: "Something flexible for different uses" },
      { value: "simple", label: "A straightforward everyday option" },
    ],
  },
  {
    id: 3,
    title: "Which option sounds most like your style?",
    options: [
      { value: "neutral", label: "Neutral and easy to mix" },
      { value: "creamy", label: "Creamy and coffee-friendly" },
      { value: "functional", label: "A more elevated daily blend" },
    ],
  },
  {
    id: 4,
    title: "Which best describes you?",
    options: [
      { value: "minimal", label: "I like to keep things simple" },
      { value: "foodie", label: "I enjoy trying new recipes" },
      { value: "routine", label: "I like products that fit daily habits" },
      { value: "explore", label: "I like having a few good options" },
    ],
  },
];

const products = {
  mct: {
    key: "mct",
    badge: "Best Match",
    name: "Organic MCT Oil Powder",
    subtitle:
      "A neutral, versatile option that fits easily into simple daily routines.",
    bullets: [
      "Easy to mix into smoothies, shakes, and everyday recipes",
      "A flexible option for simple daily use",
      "Great fit when you want a clean, straightforward routine",
    ],
    cta: "Shop Organic MCT Oil Powder",
    image: "/images/mct-oil-powder.png",
  },
  collagen: {
    key: "collagen",
    badge: "Also Worth Trying",
    name: "Collagen MCT Creamer",
    subtitle:
      "A richer blended option for customers who want a more complete drink experience.",
    bullets: [
      "Great for coffee-style drinks, smoothies, or shakes",
      "A convenient choice for streamlined routines",
      "Nice fit when you enjoy fuller flavored blends",
    ],
    cta: "Shop Collagen MCT Creamer",
    image: "/images/collagen-mct-creamer.png",
  },
  cacao: {
    key: "cacao",
    badge: "Also Worth Trying",
    name: "Organic Cognitive Cacao and Coffee",
    subtitle:
      "A more elevated coffee-style option with a richer, more indulgent profile.",
    bullets: [
      "Great fit for customers who enjoy a flavorful daily cup",
      "Works especially well in coffee-centered routines",
      "Adds variety when you want more than a neutral powder",
    ],
    cta: "Shop Organic Cognitive Cacao and Coffee",
    image: "/images/cognitive-cacao-and-coffee.png",
  },
};

const recipeSets = {
  mct: [
    {
      title: "Simple Morning MCT Latte",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Creamy Vanilla MCT Smoothie",
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Easy Iced MCT Mocha",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    },
  ],
  collagen: [
    {
      title: "Collagen Creamer Coffee",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Creamy Collagen Shake",
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Morning Creamer Blend",
      image:
        "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    },
  ],
  cacao: [
    {
      title: "Warm Cacao Coffee Latte",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Iced Cacao Coffee Blend",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Chocolate Mocha Smoothie",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

function getResult(answers: Record<number, string>) {
  const values = Object.values(answers);

  const creamyScore = values.filter((v) =>
    ["coffee", "taste", "creamy"].includes(v)
  ).length;
  const functionalScore = values.filter((v) =>
    ["blend", "functional", "foodie"].includes(v)
  ).length;

  if (creamyScore >= 2) {
    return {
      primary: products.cacao,
      secondary: [products.collagen, products.mct],
      recipes: recipeSets.cacao,
      reason:
        "Based on your answers, a richer coffee-style option looks like the best match for your routine.",
    };
  }

  if (functionalScore >= 2) {
    return {
      primary: products.collagen,
      secondary: [products.mct, products.cacao],
      recipes: recipeSets.collagen,
      reason:
        "Based on your answers, a fuller blended option appears to be the strongest fit for your routine.",
    };
  }

  return {
    primary: products.mct,
    secondary: [products.collagen, products.cacao],
    recipes: recipeSets.mct,
    reason:
      "Based on your answers, a simple and versatile MCT option seems like the strongest fit.",
  };
}

function Progress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const width = `${(current / total) * 100}%`;

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          color: "#5f5347",
        }}
      >
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div
        style={{
          height: 8,
          width: "100%",
          overflow: "hidden",
          borderRadius: 999,
          background: "#e6dfd5",
        }}
      >
        <div
          style={{
            height: "100%",
            width,
            borderRadius: 999,
            background: "#2e7723",
            transition: "all 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div
        style={{
          borderBottom: "1px solid #ded6ca",
          background: "#f6f4f1",
          fontSize: 12,
          color: "#6d6257",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            padding: "8px 16px",
            flexWrap: "wrap",
          }}
        >
          <div>📦 Free shipping for orders within the contiguous US over $75</div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div>⏰ Mon-Fri 9AM-5:30PM EST</div>
            <div>📞 (888) 963-6637</div>
            <div>★★★★★ 6293 REVIEWS</div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#1f8b43",
          padding: "12px 16px",
          textAlign: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        Be Sure to Check Out All of Our Specials!
      </div>

      <div style={{ borderBottom: "1px solid #ddd4c7", background: "#fff" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            padding: "24px 16px",
            flexWrap: "wrap",
          }}
        >
          <img
            src="/images/logo.png"
            alt="Z Natural Foods"
            style={{ height: 56, width: "auto" }}
          />

          <nav
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              fontSize: 18,
              fontWeight: 500,
              color: "#1d1d1d",
            }}
          >
            <span>Categories</span>
            <span>Health Concerns</span>
            <span style={{ color: "#1f8b43", fontWeight: 700 }}>🔥 Specials</span>
            <span>Articles</span>
            <span>Bulk</span>
            <span>About</span>
          </nav>

          <div
            style={{
              minWidth: 200,
              border: "1px solid #d6d2ca",
              borderRadius: 8,
              background: "#fbfbfb",
              padding: "12px 16px",
              color: "#9a9389",
            }}
          >
            🔍 Search
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const footerColumns = [
    {
      title: "CATALOG",
      links: ["All Products", "Specials", "New Products", "Reviews"],
    },
    {
      title: "MY ACCOUNT",
      links: ["Register", "My Address", "Order History"],
    },
    {
      title: "INFORMATION",
      links: ["About Us", "Contact Us", "FAQs", "Shipping"],
    },
    {
      title: "POLICIES",
      links: ["Privacy Policy", "Terms of Use", "Accessibility"],
    },
  ];

  return (
    <footer style={{ marginTop: 64, background: "#2f3948", color: "#c9d2dc" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr",
          gap: 40,
          padding: "64px 24px",
        }}
      >
        <div>
          <img
            src="/images/logo.png"
            alt="Z Natural Foods"
            style={{ height: 52, width: "auto" }}
          />
          <p style={{ marginTop: 24, maxWidth: 240, lineHeight: 1.9 }}>
            Z Natural Foods is dedicated to bringing you the finest quality in
            hard-to-find whole, all natural and organic foods.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 style={{ marginBottom: 20, fontSize: 20, fontWeight: 800, color: "#fff" }}>
              {column.title}
            </h3>
            <div style={{ display: "grid", gap: 12, fontSize: 17 }}>
              {column.links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          color: "#9ca7b3",
          fontSize: 14,
          flexWrap: "wrap",
        }}
      >
        <div>Copyright © 2026, Z Natural Foods, LLC. All Rights Reserved.</div>
        <div>VISA | PayPal | AMEX | Mastercard</div>
      </div>
    </footer>
  );
}

function ProductCard({
  product,
  primary = false,
}: {
  product: {
    key: string;
    badge: string;
    name: string;
    subtitle: string;
    bullets: string[];
    cta: string;
    image: string;
  };
  primary?: boolean;
}) {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: 28,
        border: primary ? "1px solid #2e7723" : "1px solid #e7dfd2",
        background: primary ? "#f8fcf7" : "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #fbfaf8, #f3ede3)",
          padding: "32px 24px 0",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ height: 280, width: "auto", objectFit: "contain" }}
        />
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "inline-block",
            borderRadius: 999,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            background: primary ? "#2e7723" : "#f3efe8",
            color: primary ? "#fff" : "#6a5e53",
          }}
        >
          {product.badge}
        </div>

        <h3 style={{ marginTop: 16, fontSize: 32, fontWeight: 700 }}>
          {product.name}
        </h3>
        <p style={{ marginTop: 12, lineHeight: 1.8, color: "#5f5347" }}>
          {product.subtitle}
        </p>

        <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
          {product.bullets.map((bullet) => (
            <div key={bullet} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  marginTop: 4,
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "#2e7723",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <p style={{ margin: 0, color: "#4f443a" }}>{bullet}</p>
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: 24,
            width: "100%",
            borderRadius: 16,
            padding: "14px 20px",
            fontWeight: 700,
            border: primary ? "none" : "1px solid #d8cec0",
            background: primary ? "#2e7723" : "#faf7f1",
            color: primary ? "#fff" : "#2c241c",
            cursor: "pointer",
          }}
        >
          {product.cta}
        </button>
      </div>
    </div>
  );
}

function RecipeCard({
  recipe,
  index,
}: {
  recipe: { title: string; image: string };
  index: number;
}) {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: 24,
        border: "1px solid #e7dfd2",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "#efe7db" }}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: 20 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#7b705f",
          }}
        >
          Recipe {index + 1}
        </div>
        <div style={{ marginTop: 8, fontSize: 20, fontWeight: 700 }}>
          {recipe.title}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = questions.length;
  const isQuizComplete = step >= totalSteps;
  const result = useMemo(() => getResult(answers), [answers]);

  const currentQuestion = questions[step];

  const handleAnswer = (value: string) => {
    const next = { ...answers, [currentQuestion.id]: value };
    setAnswers(next);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", color: "#2c241c" }}>
      <Header />

      <section style={{ borderBottom: "1px solid #e6ddd1", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              borderRadius: 999,
              border: "1px solid #daccb9",
              background: "#fbf8f3",
              padding: "6px 16px",
              fontSize: 14,
              fontWeight: 500,
              color: "#5f5347",
            }}
          >
            4 Quick Questions
          </div>
          <h1 style={{ marginTop: 20, fontSize: 52, fontWeight: 700, lineHeight: 1.1 }}>
            Find Your MCT Product Match
          </h1>
          <p
            style={{
              maxWidth: 720,
              margin: "20px auto 0",
              fontSize: 20,
              lineHeight: 1.8,
              color: "#5f5347",
            }}
          >
            Answer 4 quick questions to get your personalized product recommendation,
            recipe ideas, and a first-order offer.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 64px" }}>
        {!isQuizComplete && (
          <div
            style={{
              borderRadius: 32,
              border: "1px solid #e7dfd2",
              background: "#fff",
              padding: 32,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <Progress current={step + 1} total={totalSteps} />
            <h2 style={{ fontSize: 36, fontWeight: 700 }}>{currentQuestion.title}</h2>

            <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  style={{
                    borderRadius: 22,
                    border: "1px solid #e3dacc",
                    background: "#fcfaf6",
                    padding: "18px 20px",
                    textAlign: "left",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "#2c241c",
                    cursor: "pointer",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <button
                onClick={handleBack}
                disabled={step === 0}
                style={{
                  borderRadius: 16,
                  padding: "10px 16px",
                  fontWeight: 500,
                  border: "none",
                  background: step === 0 ? "transparent" : "#f4eee4",
                  color: step === 0 ? "#b1a79a" : "#3d342c",
                  cursor: step === 0 ? "default" : "pointer",
                }}
              >
                Back
              </button>
              <div style={{ fontSize: 14, color: "#7a6f63" }}>Takes less than 30 seconds</div>
            </div>
          </div>
        )}

        {isQuizComplete && !submitted && (
          <div
            style={{
              borderRadius: 32,
              border: "1px solid #e7dfd2",
              background: "#fff",
              padding: 40,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  borderRadius: 999,
                  background: "#edf6ea",
                  padding: "6px 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#2e7723",
                }}
              >
                You’re Almost There
              </div>
              <h2 style={{ marginTop: 20, fontSize: 42, fontWeight: 700 }}>
                Unlock Your Personalized Results
              </h2>
              <p style={{ marginTop: 20, lineHeight: 1.8, color: "#5f5347", fontSize: 18 }}>
                Enter your email to see your best product match, unlock recipe ideas,
                and get your first-order offer.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: 640, margin: "32px auto 0" }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500, color: "#5f5347" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  border: "1px solid #ddd4c7",
                  background: "#fcfaf6",
                  padding: "16px 20px",
                  outline: "none",
                  fontSize: 16,
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: 16,
                  width: "100%",
                  borderRadius: 16,
                  border: "none",
                  background: "#2e7723",
                  padding: "16px 20px",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Show My Results
              </button>
              <p
                style={{
                  marginTop: 16,
                  textAlign: "center",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#7a6f63",
                }}
              >
                By continuing, you agree to receive emails from Z Natural Foods.
                You can unsubscribe at any time.
              </p>
            </form>
          </div>
        )}

        {submitted && (
          <div style={{ display: "grid", gap: 32 }}>
            <div
              style={{
                borderRadius: 32,
                border: "1px solid #e7dfd2",
                background: "#fff",
                padding: 40,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  borderRadius: 999,
                  background: "#edf6ea",
                  padding: "6px 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#2e7723",
                }}
              >
                Your #1 Match
              </div>
              <h2 style={{ marginTop: 20, fontSize: 42, fontWeight: 700 }}>
                {result.primary.name}
              </h2>
              <p style={{ marginTop: 16, maxWidth: 760, lineHeight: 1.8, color: "#5f5347", fontSize: 18 }}>
                {result.reason}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <ProductCard product={result.primary} primary />

              <div
                style={{
                  borderRadius: 28,
                  border: "1px solid #e7dfd2",
                  background: "#fff",
                  padding: 24,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    borderRadius: 999,
                    background: "#f3efe8",
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#6a5e53",
                  }}
                >
                  Recipe Ideas
                </div>
                <h3 style={{ marginTop: 16, fontSize: 32, fontWeight: 700 }}>
                  Recipes That Fit Your Result
                </h3>

                <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
                  {result.recipes.map((recipe, index) => (
                    <RecipeCard key={recipe.title} recipe={recipe} index={index} />
                  ))}
                </div>

                <button
                  style={{
                    marginTop: 24,
                    width: "100%",
                    borderRadius: 16,
                    border: "1px solid #d8cec0",
                    background: "#faf7f1",
                    padding: "14px 20px",
                    fontWeight: 700,
                    color: "#2c241c",
                    cursor: "pointer",
                  }}
                >
                  Email Me These Recipe Ideas
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: 16, fontSize: 32, fontWeight: 700 }}>
                Also Worth Trying
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {result.secondary.map((product) => (
                  <ProductCard key={product.key} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}