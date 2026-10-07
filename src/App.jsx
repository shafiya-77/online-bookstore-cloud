import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  BookOpen,
  Cloud,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import "./App.css";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "CSE & Engineering",
    price: 599,
    rating: 4.8,
    description:
      "A practical guide to writing clean, readable and maintainable software. It is especially useful for students and developers learning professional programming practices.",
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "CSE & Engineering",
    price: 899,
    rating: 4.9,
    description:
      "A comprehensive reference for algorithms, data structures, sorting, searching, graphs and algorithm analysis. A valuable book for computer science students preparing for technical interviews.",
  },
  {
    id: 3,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "CSE & Engineering",
    price: 749,
    rating: 4.7,
    description:
      "Explains the principles behind computer networks, protocols, architectures and network communication. Useful for networking courses and placement preparation.",
  },
  {
    id: 4,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "CSE & Engineering",
    price: 799,
    rating: 4.7,
    description:
      "Covers operating system concepts including processes, memory management, file systems, scheduling and security. A strong academic reference for CSE students.",
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    category: "AI & Machine Learning",
    price: 999,
    rating: 4.9,
    description:
      "An extensive introduction to artificial intelligence covering intelligent agents, machine learning, reasoning, natural language processing, robotics and modern AI techniques.",
  },
  {
    id: 6,
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    category: "AI & Machine Learning",
    price: 849,
    rating: 4.8,
    description:
      "A practical machine learning guide covering supervised learning, neural networks, deep learning and model development using popular Python-based tools.",
  },
  {
    id: 7,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "AI & Machine Learning",
    price: 899,
    rating: 4.8,
    description:
      "A detailed introduction to deep learning fundamentals, neural networks, optimization and representation learning. Suitable for advanced AI and ML learners.",
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Psychology",
    price: 399,
    rating: 4.8,
    description:
      "Explores how emotions, habits and personal experiences influence financial decisions. The book connects psychology with saving, investing and long-term financial behavior.",
  },
  {
    id: 9,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    price: 499,
    rating: 4.7,
    description:
      "Explores two different ways people think and make decisions, explaining biases, judgment and the psychology behind everyday choices.",
  },
  {
    id: 10,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Psychology",
    price: 449,
    rating: 4.6,
    description:
      "Explains how habits are formed and how understanding behavioral patterns can help individuals and organizations create positive changes.",
  },
  {
    id: 11,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    price: 499,
    rating: 4.9,
    description:
      "A practical approach to building better habits through small and consistent improvements. It focuses on systems, routines and sustainable personal development.",
  },
  {
    id: 12,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "Self Help",
    price: 549,
    rating: 4.7,
    description:
      "A classic personal development book focused on principles, effectiveness, responsibility, priorities and improving relationships.",
  },
  {
    id: 13,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    price: 449,
    rating: 4.8,
    description:
      "Explains how focused, distraction-free work can improve productivity and help people develop valuable skills in an increasingly distracted environment.",
  },
  {
    id: 14,
    title: "Getting Things Done",
    author: "David Allen",
    category: "Productivity",
    price: 479,
    rating: 4.6,
    description:
      "Introduces a structured productivity methodology for organizing tasks, commitments and information so that work becomes easier to manage.",
  },
  {
    id: 15,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Business & Finance",
    price: 349,
    rating: 4.7,
    description:
      "Introduces basic financial concepts through contrasting approaches to money, work, assets and financial independence.",
  },
  {
    id: 16,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    category: "Business & Finance",
    price: 599,
    rating: 4.8,
    description:
      "A classic investing book that discusses value investing, risk management, market behavior and long-term investment principles.",
  },
  {
    id: 17,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business & Finance",
    price: 429,
    rating: 4.6,
    description:
      "Discusses entrepreneurship, innovation, technology businesses and how companies can create new markets rather than simply competing in existing ones.",
  },
  {
    id: 18,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 299,
    rating: 4.8,
    description:
      "A popular inspirational novel about following dreams, discovering purpose and learning from the journey toward a personal goal.",
  },
  {
    id: 19,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    price: 329,
    rating: 4.7,
    description:
      "A classic dystopian novel exploring surveillance, power, information control and individual freedom in a fictional society.",
  },
  {
    id: 20,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 279,
    rating: 4.6,
    description:
      "A classic novel exploring ambition, wealth, relationships and the pursuit of an idealized future in 1920s America.",
  },
];

const categories = [
  "All",
  "CSE & Engineering",
  "AI & Machine Learning",
  "Psychology",
  "Business & Finance",
  "Self Help",
  "Productivity",
  "Fiction",
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const addToCart = (book) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === book.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
          <div className="logo-icon">
            <BookOpen size={22} />
          </div>
          <span>CloudBooks</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#books">Books</a>
          <a href="#cloud">Cloud Infrastructure</a>
        </div>

        <button className="cart-button" onClick={() => setShowCart(true)}>
          <ShoppingCart size={20} />
          Cart
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-badge">
              <Cloud size={17} />
              Cloud-Based Online Bookstore
            </div>

            <h1>
              Discover Your
              <span> Next Great Book</span>
            </h1>

            <p>
              Explore books across Computer Science, Artificial Intelligence,
              Psychology, Finance, Self Development, Productivity and Fiction.
            </p>

            <div className="search-box">
              <Search size={21} />
              <input
                type="text"
                placeholder="Search by title, author or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="category-container">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="books-section" id="books">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE COLLECTION</span>
              <h2>Books for Every Interest</h2>
            </div>

            <p>
              {filteredBooks.length} books available
            </p>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="empty-search">
              <BookOpen size={45} />
              <h3>No books found</h3>
              <p>Try another title, author or category.</p>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <article className="book-card" key={book.id}>
                  <div className="book-cover">
                    <BookOpen size={38} />
                    <span>{book.category}</span>
                  </div>

                  <div className="book-info">
                    <div className="rating">★ {book.rating}</div>

                    <h3>{book.title}</h3>

                    <p className="author">{book.author}</p>

                    <p className="short-description">
                      {book.description.slice(0, 100)}...
                    </p>

                    <div className="book-bottom">
                      <strong>₹{book.price}</strong>

                      <button
                        className="details-btn"
                        onClick={() => setSelectedBook(book)}
                      >
                        Details
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="cloud-section" id="cloud">
          <div className="cloud-heading">
            <span className="section-label">CLOUD INFRASTRUCTURE</span>
            <h2>Built for Cloud-Based Access</h2>
            <p>
              CloudBooks demonstrates how an online bookstore can provide
              reliable access to products and customer orders through cloud
              infrastructure.
            </p>
          </div>

          <div className="cloud-grid">
            <div className="cloud-card">
              <div className="cloud-icon">
                <BookOpen />
              </div>
              <h3>Online Catalog</h3>
              <p>
                Book information is organized into a searchable digital
                catalog accessible through the web.
              </p>
            </div>

            <div className="cloud-card">
              <div className="cloud-icon">
                <ShoppingCart />
              </div>
              <h3>Cloud Orders</h3>
              <p>
                Customers can select books, manage quantities and place
                orders through the cloud-hosted application.
              </p>
            </div>

            <div className="cloud-card">
              <div className="cloud-icon">
                <Cloud />
              </div>
              <h3>Reliable Access</h3>
              <p>
                The application is deployed on Vercel cloud infrastructure
                and can be accessed through a public URL.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          <BookOpen size={20} />
          CloudBooks
        </div>
        <p>Online Bookstore System on Cloud Infrastructure</p>
      </footer>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div
            className="book-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedBook(null)}
            >
              <X size={21} />
            </button>

            <div className="modal-cover">
              <BookOpen size={65} />
              <span>{selectedBook.category}</span>
            </div>

            <div className="modal-content">
              <span className="modal-category">
                {selectedBook.category}
              </span>

              <h2>{selectedBook.title}</h2>

              <p className="modal-author">
                By {selectedBook.author}
              </p>

              <div className="modal-rating">
                ★ {selectedBook.rating} / 5
              </div>

              <h3>About this book</h3>

              <p className="modal-description">
                {selectedBook.description}
              </p>

              <div className="modal-price">₹{selectedBook.price}</div>

              <button
                className="add-cart-large"
                onClick={() => {
                  addToCart(selectedBook);
                  setSelectedBook(null);
                }}
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div>
                <span className="section-label">YOUR SELECTION</span>
                <h2>Shopping Cart</h2>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowCart(false)}
              >
                <X size={21} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={48} />
                <h3>Your cart is empty</h3>
                <p>Add books to your cart to continue.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-book-icon">
                        <BookOpen size={24} />
                      </div>

                      <div className="cart-item-info">
                        <h3>{item.title}</h3>
                        <p>{item.author}</p>
                        <strong>₹{item.price}</strong>
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Total</span>
                    <strong>₹{cartTotal}</strong>
                  </div>

                  <button className="order-btn" onClick={placeOrder}>
                    Place Order
                    <ArrowRight size={19} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="success-toast">
          <CheckCircle size={21} />
          <div>
            <strong>Order placed successfully!</strong>
            <span>Your bookstore order has been confirmed.</span>
          </div>

          <button onClick={() => setOrderPlaced(false)}>
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;