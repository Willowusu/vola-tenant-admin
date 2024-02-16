export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "layoutBuilder",
        route: "/builder",
        keenthemesIcon: "switch",
        bootstrapIcon: "bi-layers",
      },
    ],
  },
  {
    pages: [
      {
        heading: "Reports",
        route: "/reports",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Operations",
        route: "/operations",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Finance",
        route: "/finance",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Customer Management",
        route: "/customer-management",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Admin",
        route: "/admin",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Compliance",
        route: "/compliance",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Risk",
        route: "/risk",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      
      {
        heading: "Payment Methods",
        route: "/payment-methods",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      }, 
      {
        heading: "Transaction Monitoring",
        route: "/transaction-monitoring",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      }
    ]
  },

];

export default MainMenuConfig;
