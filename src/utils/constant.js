import { IMAGES } from "./images";

// why choose us cards
export const MAIN_SEARCH_BAR_DATA = {
  items: [
    {
      title: "Buy",
      filterOptions: {
        checkOptions: ["Full House", "Land/Plot"],
        dropDownOptions: [
          { name:"BHK Type",type:"select", Options: ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"] },
          { name:"Property Status",type:"dropdown", Options: ["Under Construction","Ready"] },
        ],
      },
    },
    {
      title: "Rent",
      filterOptions: {
        checkOptions: ["Full House", "PG/Hostel", "Flatmates"],
        dropDownOptions: [
          { name:"BHK Type",type:"select", Options: ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"] },
          { name:"Availability",type:"dropdown", Options: ["Immediate","Within 15 days","Within 30 days", "After 30 days"] },
        ],
      },
    },
    {
      title: "Commercial",
      filterOptions: {
        checkOptions: ["Buy","Rent"],
        dropDownOptions: [
          { name:"BHK Type",type:"select", Options: ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"] },
        ],
      },
    },
  ],
};

export const WHY_CHOOSE_US_CARDS = {
  heading: "Why Choose Us?",
  cards: [
    {
      icon: IMAGES.COURSE_ICON_1,
      title: "Comprehensive Listings",
      content: "Explore various properties with insights, images, and prices.",
    },
    {
      icon: IMAGES.COURSE_ICON_2,
      title: "Expert Guidance",
      content: "Our experienced real estate agents assist you at every step.",
    },
    {
      icon: IMAGES.COURSE_ICON_3,
      title: "User-Friendly Experience",
      content: "Seamlessly search, filter, and connect with sellers or buyers.",
    },
    {
      icon: IMAGES.COURSE_ICON_4,
      title: "Secure & Transparent",
      content: "Reliable property management with clear documentation.",
    },
  ],
};

// our services

export const OUR_SERVICES = {
  heading: "Our Services",
  cards: [
    {
      img: IMAGES.SERVICES_IMG_1,
      title: "Rent & Lease",
    },
    {
      img: IMAGES.SERVICES_IMG_2,
      title: "Buy & Sell",
    },
    {
      img: IMAGES.SERVICES_IMG_3,
      title: "Property Management",
    },
  ],
};

// how it works

export const HOW_IT_WORKS_CARDS = {
  heading: "How it works",
  cards: [
    {
      icon: IMAGES.HOW_IT_WORKS_1,
      title: "Sign Up & Choose Your Role",
      content: "Register as a Buyer, Seller, or Real Estate Agent.",
    },
    {
      icon: IMAGES.HOW_IT_WORKS_2,
      title: "Explore & List Properties",
      content: "Browse listings or add your property for sale or rent.",
    },
    {
      icon: IMAGES.HOW_IT_WORKS_3,
      title: "Connect & Finalize Deals",
      content:
        "Direct communication between buyers and sellers for smooth transactions.",
    },
    {
      icon: IMAGES.HOW_IT_WORKS_4,
      title: "Manage Your Dashboard",
      content:
        "Keep track of saved properties, inquiries, and deals in one place.",
    },
  ],
};

export const BOTTOM_CONTENT = {
  title: `Get Started Today!`,
  content: `Join thousands of satisfied users and find the perfect property with us. 
Sign up now and start exploring!`,
  btnText: "Post Free Property Ad",
};


export const LOCATION_DATA=[
  "Charminar",
  "Golconda Fort",
  "Hussain Sagar Lake",
  "Ramoji Film City",
  "Salar Jung Museum",
  "Birla Mandir",
  "Necklace Road",
  "Lumbini Park",
  "Chilkur Balaji Temple",
  "Qutb Shahi Tombs",
  "Shilparamam",
  "Snow World",
  "KBR National Park",
  "Jubilee Hills",
  "Banjara Hills",
  "HiTech City",
  "Cyber Towers",
  "Durgam Cheruvu",
  "Inorbit Mall",
  "Forum Sujana Mall",
  "GVK One Mall",
  "Tank Bund",
  "Mecca Masjid",
  "Laad Bazaar",
  "Nehru Zoological Park",
  "Botanical Gardens",
  "Public Gardens",
  "Osmania University",
  "Moula Ali Dargah",
  "Taramati Baradari",
  "Sudha Cars Museum",
  "Mount Opera",
  "Peddamma Temple",
  "Shamirpet Lake",
  "Mrugavani National Park",
  "Mahavir Harina Vanasthali",
  "Chowmahalla Palace",
  "Paigah Tombs",
  "Begumpet",
  "Ameerpet",
  "Secunderabad",
  "Koti",
  "Madhapur",
  "Kondapur",
  "Gachibowli",
  "RTC Cross Roads",
  "Somajiguda",
  "LB Nagar",
  "Uppal"
]
export const FILTER_DATA=[
  {
    id:'bhkType',
    label:"BHK Type",
    type:'checkbox',
    options:["1 RK","1 BHK","2 BHK","3 BHK","4 BHK","4+ BHK"]
  },
  {
    id:'range',
    label:"Rent Range",
    type:'range',
    min:"0",
    max:"500000",
    step:"500"
  },
  {
    id:'availability',
    label:"Availability",
    type:'radio',
    options:["Immediate","Within 15 Days","Within 30 Days","After 30 Days"]
  },
  {
    id:'preferredTenants',
    label:"Preferred Tenants",
    type:'checkbox',
    options:["Family","Company","Bachelor Male","Bachelor Female"]
  },
  {
    id:'preferredType',
    label:"Preferred Type",
    type:'checkbox',
    options:["Apartment","Independent House/Villa","Gated Community villa"]
  },
  {
    id:'furnishing',
    label:"Furnishing",
    type:'checkbox',
    options:["Full","Semi","None"]
  },
  {
    id:'parking',
    label:"Parking",
    type:'checkbox',
    options:["2 Wheeler","4 Wheeler","Show Only Lease Properties"]
  },
]