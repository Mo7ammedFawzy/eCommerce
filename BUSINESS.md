# eCommerce Storefront — Business Overview

## What it is
An online shop where customers browse a catalogue of products, add them to a cart and place orders. It sells general retail goods in five categories: electronics, books, clothing, home and toys. Today it is a working shop front for browsing and ordering. Accounts, payments and an admin area are planned but not finished.

## Users & roles
| Role | Who | Can do | Can't do |
|---|---|---|---|
| Visitor / Shopper | Anyone who opens the site | Browse, search and filter products. Use a cart. Check out with cash on delivery. See their own past orders. | Sign in or register (screens say "coming soon"). Pay by card or PayPal. |
| User (account holder) | A registered customer | Planned: same as Shopper, plus a profile and orders kept in an account | Not live yet, because sign-in is not built |
| Admin | Shop staff | Planned: add, edit and delete products, and see all orders | Not live yet. The admin dashboard is an empty page. |

Today there is no sign-in. Everything a shopper does is kept on their own device only.

## Core concepts
- **Product** — an item for sale with a title, description, price, category, photos, stock count, rating, optional colours and an optional discount percentage.
- **Category** — one of: electronics, books, clothing, home, toys.
- **Stock** — how many units are available. It caps how many a shopper can put in the cart.
- **Discount** — a percentage off a product, shown as a badge and a reduced price on the product page.
- **Cart** — the products the shopper intends to buy, with a quantity for each.
- **Shipping fee** — a flat charge added to every non-empty cart.
- **Order** — a placed purchase: customer details, items, total, payment method, status and date. Each order gets a unique order number.
- **Order status** — pending, confirmed, shipped, delivered or canceled.
- **Payment method** — cash on delivery, credit card or PayPal. Only cash on delivery can be chosen.

## Main flows
### Finding a product
1. Shopper opens the home page: banner, top collections, categories, best sellers, brands and service promises.
2. Shopper goes to Products and filters by category, or changes how many items show per page (3, 6 or 8).
3. Or shopper opens Search from the header and types. Matching products appear as they type.
4. Shopper opens a product to see photos, price, discount, rating, colours and stock.

### Building a cart
1. On a product, shopper presses "Add to cart". Adding it again raises the quantity by one.
2. In the cart, shopper raises or lowers quantities or removes items.
3. The cart shows subtotal, shipping and total.
4. The cart survives a page reload on the same device and browser.

### Placing an order
1. From the cart, shopper presses Checkout. The button is disabled when the cart is empty.
2. Shopper fills in first and last name, email, phone, address, town/city, state, ZIP/postal code and country.
3. Shopper picks a payment method. Only cash on delivery is available.
4. Shopper presses Place Order. If the cart is empty, they are sent to Products.
5. The order is saved with status **pending**, the cart is emptied, and the shopper lands on their Orders list.

### Reviewing orders
1. Shopper opens Orders from the profile menu.
2. Each order shows its items, unit count, total, status and date.
3. Opening an order shows a thank-you message, the order number, the items, customer details and payment details.

## Business rules
- A shopper can't add more units of a product than are in stock. A message appears when they reach the stock limit.
- Shipping is a flat fee per order, added only when the cart is not empty.
- Order total = sum of (price × quantity) + shipping fee.
- Every new order starts as **pending**.
- Only cash on delivery can be selected. Credit card and PayPal are shown but greyed out.
- Checkout form checks:
  - first name, last name, address, town/city and state: 3 or more characters
  - email: must be valid
  - phone: must look like a phone number
  - ZIP: 5–9 digits
  - country: must be chosen from a list
- Prices are shown in US dollars.
- Orders and the cart stay on the shopper's device. They are not visible on another device or browser.

## Pages / screens
**Shopper**
- Home — banner, collections, categories, best sellers, brands, service promises.
- Products — full catalogue with category filter, page size and "show more".
- Product details — photos, price, discount, rating, colours, add to cart, buy now.
- Search — pop-up search from the header.
- Cart — adjust quantities, see totals, go to checkout.
- Checkout — customer details form, cart items, payment summary, payment method.
- Orders — list of placed orders.
- Order details — thank-you page with the full order breakdown.
- Profile — "coming soon".
- Sign in / Register — "coming soon".
- Light / dark theme switch.

**Admin**
- Dashboard — empty page, not built.

## Status
- **Done:** home page, product list with category filter and paging, product details, search, cart, checkout with cash on delivery, order list and order details (all on the shopper's device only).
- **In progress / ready to start** (from the September 2026 audit):
  - choose one back office for the shop (three partial versions exist)
  - real sign-up, sign-in and logout
  - admin product management with an admin-only guard
  - cart and orders saved to the account so they follow the shopper across devices
  - profile from the account
  - sending signed-out shoppers to sign in before checkout or profile
  - clearer error messages at checkout
- **Partly built in an unused back office:** brands, colours and categories management; a cart kept per user; card payment; an admin list of all orders; sign-in with Google and GitHub; email verification; a welcome email.
- **Planned / ideas:** categories management, wishlist, product reviews, admin sales stats, stock management.
- **Dropped:** favourites on product cards; extra payment methods for now.

## Open questions
- Which back office is the real one? Three partial versions exist and the choice is still open.
- What is the shipping fee? The cart and the order total use $12, but the checkout summary and order details show $8.
- The home page promises "free shipping on all orders", but every order is charged a shipping fee. Which is right?
- Should discounts lower what the shopper pays? The product page shows a discounted price, but the cart and order total use the full price.
- The product page lets the shopper pick a colour, but the colour is not saved in the cart or the order. Should it be?
- Lowering a quantity can go to zero while the item stays in the cart. Should zero remove the item?
- Who moves an order from pending to confirmed, shipped, delivered or canceled, and when? Nothing changes a status today.
- Can a shopper cancel an order?
- Will credit card and PayPal be offered, and when?
- The header menu links to "men" and "women" categories, but the catalogue only has electronics, books, clothing, home and toys. Which category list is right?
- Is tax charged? The unused back office adds 8% tax at checkout, but the live shop does not.
- What does "Buy now" do? Today it goes to the cart without adding the product.
- Will shoppers be able to check out as guests, or must they sign in first? The audit plans to require sign-in.
- The "Return" and "Support" promises on the home page: what are the return window and the support channels?
