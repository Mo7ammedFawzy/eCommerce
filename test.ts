// Represents a list item with optional icon and text, and a required title
export interface ListItem {
 icon?: string;      // Optional icon for the item
 title: string;      // Title of the item (required)
 text?: string;      // Optional descriptive text
}

// Extends HeaderLink (omitting 'query') with additional properties for header actions
export interface HeaderAction extends Omit<HeaderLink, 'query'> {
 icon: string;                  // Icon for the header action
 hasChip?: boolean;             // Whether the action includes a chip indicator
 color?: 'orange' | 'blue';     // Predefined colors for the action
 mobile?: boolean;              // If the action is mobile-specific
}

// Represents a link used in the header with routing and categorization
export interface HeaderLink {
 title: string;       // Display title of the link
 route: string;       // Navigation route
 category?: string;   // Optional category for grouping
}

// Represents a semi-card with an image, buttons, and additional properties
export interface SemiCard {
 title: string;         // Main title of the card
 subTitle?: string;     // Optional subtitle
 text: string;          // Main content text
 btns: Btns[];          // List of button actions
 img: string;           // Image URL
 name: string;          // Name associated with the card
}

// Represents a button action with a path and title
export interface Btns {
 path: string;          // Navigation path for the button
 title: string;         // Display text for the button
}

// Extends ListItem for profile-specific links with optional switch and path
export interface ProfileLink extends ListItem {
 hasSwitch?: boolean;   // Indicates if a toggle switch is included
 path?: string;         // Optional navigation path
}

// Represents a category with an optional image and a required title
export interface Category {
 img?: string;          // Optional image for the category
 title: string;         // Title of the category (required)
}

// Represents a product card with details such as rating, colors, and pricing
export interface ProductCard extends ListItem {
 img?: string | number; // Image URL or identifier
 rating: number;        // Product rating
 colors: string[];      // List of available colors
 price: number;         // Product price
 discount: number;      // Discount percentage
}

// Represents a service card with an icon and inherits basic list properties
export interface ServiceCard extends ListItem {
 icon: string;          // Icon representing the service
}

// Represents a footer link with an icon and optional color or navigation link
export interface FooterLink {
 icon: string;          // Icon for the footer link
 link?: string;         // Optional navigation link
 color?: string;        // Optional color
}

// Represents a product from an API with detailed attributes
export interface API_Product {
 id: number;            // Unique product ID
 title: string;         // Product title
 price: number;         // Product price
 description: string;   // Product description
 category: string;      // Product category
 image: string;         // Product image URL
 rating: Rating;        // Rating details
 colors?: string[];     // Optional list of available colors
 discount?: number;     // Optional discount percentage
}

// Represents the rating details of a product
export interface Rating {
 rate: number;          // Average rating
 count: number;         // Number of ratings
}

// Represents a main header with a title and optional text
export interface MainHeader {
 title: string;         // Title of the header
 text?: string;         // Optional descriptive text
}

// Extends MainHeader to include a navigation path
export interface PageHeader extends MainHeader {
 path: string;          // Navigation path for the page
}
