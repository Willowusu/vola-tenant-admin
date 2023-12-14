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
        heading: "Finance",
        route: "/finance",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Management",
        route: "/management",
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
        heading: "Communication",
        route: "/communication",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Settings",
        route: "/settings",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      }
    ]
  },

];

export default MainMenuConfig;
