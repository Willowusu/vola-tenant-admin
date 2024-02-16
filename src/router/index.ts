import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/LayoutBuilder.vue"),
        meta: {
          pageTitle: "Layout Builder",
          breadcrumbs: ["Layout"],
        },
      },

      //custom routes
      {
        path: "/reports",
        name: "reports",
        component: () =>
          import("@/views/Reports.vue"),
        meta: {
          pageTitle: "Reports",
          breadcrumbs: ["Reports"],

        },
      },


      //////////////////////////////////////////////////
      //OPERATIONS
      //////////////////////////////////////////////////
      {
        path: "/operations",
        name: "operations",
        component: () =>
          import("@/views/Operations.vue"),
        meta: {
          pageTitle: "Operations",
          breadcrumbs: ["Operations"],

        },
        children: [
           {
        path: "/transactions",
        name: "transactions",
        component: () =>
          import("@/components/Operations/Transactions.vue"),
        meta: {
          pageTitle: "Transactions",
          breadcrumbs: ["Operations", "Transactions"],
        },
      },
        ],
      },
      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //FINANCE
      //////////////////////////////////////////////////
      {
        path: "/finance",
        name: "finance",
        component: () =>
          import("@/views/Finance.vue"),
        meta: {
          pageTitle: "Finance",
          breadcrumbs: ["Finance"],

        },
         children: [
           {
        path: "/charges",
        name: "charges",
        component: () =>
          import("@/components/Finance/Charges.vue"),
        meta: {
          pageTitle: "Charges",
          breadcrumbs: ["Finance", "Charges"],
        },
      },
      {
        path: "/rates",
        name: "rates",
        component: () =>
          import("@/components/Finance/Rates.vue"),
        meta: {
          pageTitle: "Rates",
          breadcrumbs: ["Finance", "Rates"],
        },
      },
      {
        path: "/payment-gateways",
        name: "payment-gateways",
        component: () =>
          import("@/components/Finance/PaymentGateways.vue"),
        meta: {
          pageTitle: "Payment Gateways",
          breadcrumbs: ["Finance", "Payment Gateways"],
        },
      },
      {
        path: "/payout-gateways",
        name: "payout-gateways",
        component: () =>
          import("@/components/Finance/PayoutGateways.vue"),
        meta: {
          pageTitle: "Payout Gateways",
          breadcrumbs: ["Finance", "Payout Gateways"],
        },
      },
      {
        path: "/balance",
        name: "balance",
        component: () =>
          import("@/components/Finance/Balance.vue"),
        meta: {
          pageTitle: "Balance",
          breadcrumbs: ["Finance", "Balance"],
        },
      },
      {
        path: "/referral-program",
        name: "referral-program",
        component: () =>
          import("@/components/Finance/ReferralProgram.vue"),
        meta: {
          pageTitle: "Referral Program",
          breadcrumbs: ["Finance", "Referral Program"],
        },
      },
      {
        path: "/reward-management",
        name: "reward-management",
        component: () =>
          import("@/components/Finance/RewardManagement.vue"),
        meta: {
          pageTitle: "Reward Management",
          breadcrumbs: ["Finance", "Reward Management"],
        },
      },
        ],
      },
     
      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //Customer Management
      //////////////////////////////////////////////////
      {
        path: "/customer-management",
        name: "customer-management",
        component: () =>
          import("@/views/CustomerManagement.vue"),
        meta: {
          pageTitle: "Customer Management",
          breadcrumbs: ["Customer Management"],

        },
        children: [
           {
        path: "/individuals",
        name: "individuals",
        component: () =>
          import("@/components/CustomerManagement/Individuals.vue"),
        meta: {
          pageTitle: "Customer Management",
          breadcrumbs: ["Customer Management", "Individuals"],
        },
      },
      {
        path: "/businesses",
        name: "businesses",
        component: () =>
          import("@/components/CustomerManagement/Businesses.vue"),
        meta: {
          pageTitle: "Customer Management",
          breadcrumbs: ["Customer Management", "Businesses"],
        },
      },
      {
        path: "/beneficiaries",
        name: "beneficiaries",
        component: () =>
          import("@/components/CustomerManagement/Beneficiaries.vue"),
        meta: {
          pageTitle: "Customer Management",
          breadcrumbs: ["Customer Management", "Beneficiaries"],
        },
      },
      {
        path: "/referrals",
        name: "referrals",
        component: () =>
          import("@/components/CustomerManagement/Referrals.vue"),
        meta: {
          pageTitle: "Customer Management",
          breadcrumbs: ["Customer Management", "Referrals"],
        },
      },
      
        ],
      },
      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //ADMIN
      //////////////////////////////////////////////////
      {
        path: "/admin",
        name: "admin",
        component: () =>
          import("@/views/Admin.vue"),
        meta: {
          pageTitle: "Admin",
          breadcrumbs: ["Admin"],

        },
        children: [
           {
        path: "/payment-gateway-setup",
        name: "payment-gateway-setup",
        component: () =>
          import("@/components/Admin/PaymentGatewaySetup.vue"),
        meta: {
          pageTitle: "Payment Gateway Setup",
          breadcrumbs: ["Admin", "PaymentGatewaySetup"],
        },
      },
           {
        path: "/payout-gateway-setup",
        name: "payout-gateway-setup",
        component: () =>
          import("@/components/Admin/PayoutGatewaySetup.vue"),
        meta: {
          pageTitle: "Payout Gateway Setup",
          breadcrumbs: ["Admin", "PayoutGatewaySetup"],
        },
      },
           {
        path: "/mailers",
        name: "mailers",
        component: () =>
          import("@/components/Admin/Mailers.vue"),
        meta: {
          pageTitle: "Mailers",
          breadcrumbs: ["Admin", "Mailers"],
        },
      },
      {
        path: "/system-user-management",
        name: "system-user-management",
        component: () =>
          import("@/components/Admin/SystemUserManagement.vue"),
        meta: {
          pageTitle: "System User Management",
          breadcrumbs: ["Admin", "System User Management"],
        },
      },
      {
        path: "/logs",
        name: "logs",
        component: () =>
          import("@/components/Admin/Logs.vue"),
        meta: {
          pageTitle: "Logs",
          breadcrumbs: ["Admin", "Logs"],
        },
      },
      {
        path: "/tenant-config",
        name: "tenant-config",
        component: () =>
          import("@/components/Admin/TenantConfig.vue"),
        meta: {
          pageTitle: "TenantConfig",
          breadcrumbs: ["Admin", "Tenant Config"],
        },
      },
      {
        path: "/push-notifications",
        name: "push-notifications",
        component: () =>
          import("@/components/Admin/PushNotifications.vue"),
        meta: {
          pageTitle: "Push Notifications",
          breadcrumbs: ["Admin", "Push Notifications"],
        },
      },
      {
        path: "/app-version",
        name: "app-version",
        component: () =>
          import("@/components/Admin/AppVersion.vue"),
        meta: {
          pageTitle: "AppVersion",
          breadcrumbs: ["Admin", "App Version"],
        },
      },
        ],
      },
      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //COMPLIANCE
      //////////////////////////////////////////////////
      {
        path: "/compliance",
        name: "compliance",
        component: () =>
          import("@/views/Compliance.vue"),
        meta: {
          pageTitle: "Compliance",
          breadcrumbs: ["Compliance"],

        },
        children: [
           {
        path: "/compliance-individuals",
        name: "compliance-individuals",
        component: () =>
          import("@/components/Compliance/Individuals.vue"),
        meta: {
          pageTitle: "Individuals",
          breadcrumbs: ["Compliance", "Individuals"],
        },
      },
      {
        path: "/compliance-businesses",
        name: "compliance-businesses",
        component: () =>
          import("@/components/Compliance/Businesses.vue"),
        meta: {
          pageTitle: "Business",
          breadcrumbs: ["Compliance", "Businesses"],
        },
      },
        ],
      },
      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //RISK
      //////////////////////////////////////////////////      
      {
        path: "/risk",
        name: "risk",
        component: () =>
          import("@/views/Risk.vue"),
        meta: {
          pageTitle: "Risk",
          breadcrumbs: ["Risk"],

        },
         children: [
           {
        path: "/risk-individuals",
        name: "risk-individuals",
        component: () =>
          import("@/components/Risk/Individuals.vue"),
        meta: {
          pageTitle: "Individuals",
          breadcrumbs: ["Risk", "Individuals"],
        },
      },
      {
        path: "/risk-businesses",
        name: "risk-businesses",
        component: () =>
          import("@/components/Risk/Businesses.vue"),
        meta: {
          pageTitle: "Businesses",
          breadcrumbs: ["Risk", "Businesses"],
        },
      },
        ],
      },
      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //Payment methods
      //////////////////////////////////////////////////
      {
        path: "/payment-methods",
        name: "payment-methods",
        component: () =>
          import("@/views/PaymentMethods.vue"),
        meta: {
          pageTitle: "Payment Methods",
          breadcrumbs: ["Payment Methods"],

        },
        children: [
           {
        path: "/cards",
        name: "cards",
        component: () =>
          import("@/components/PaymentMethods/Cards.vue"),
        meta: {
          pageTitle: "Cards",
          breadcrumbs: ["Payment Methods", "Cards"],
        },
      },
      {
        path: "/ach",
        name: "ach",
        component: () =>
          import("@/components/PaymentMethods/ACH.vue"),
        meta: {
          pageTitle: "ACH",
          breadcrumbs: ["Payment Methods", "ACH"],
        },
      },
        ],
      },

      //////////////////////////////////////////////////

      //////////////////////////////////////////////////
      //TRANSACTION MONITORING
      //////////////////////////////////////////////////
      {
        path: "/transaction-monitoring",
        name: "transaction-monitoring",
        component: () =>
          import("@/views/TransactionMonitoring.vue"),
        meta: {
          pageTitle: "Transaction Monitoring",
          breadcrumbs: ["Transaction Monitoring"],

        },
        children: [
           {
        path: "/monitored-transactions",
        name: "monitored-transactions",
        component: () =>
          import("@/components/TransactionMonitoring/MonitoredTransactions.vue"),
        meta: {
          pageTitle: "Monitored Transactions",
          breadcrumbs: ["Transaction Monitoring", "Monitored Transactions"],
        },
      },
        ],
      },
      //////////////////////////////////////////////////













      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        meta: {
          breadcrumbs: ["Pages", "Profile"],
        },
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
            meta: {
              pageTitle: "Projects",
            },
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
            meta: {
              pageTitle: "Campaigns",
            },
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
            meta: {
              pageTitle: "Documents",
            },
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
            meta: {
              pageTitle: "Connections",
            },
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
            meta: {
              pageTitle: "Activity",
            },
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
        meta: {
          pageTitle: "Horizontal",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
        meta: {
          pageTitle: "Vertical",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Crafted", "Account"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
            meta: {
              pageTitle: "Settings",
            },
          },
        ],
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => import("@/views/apps/customers/GettingStarted.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/customers/customers-listing",
        name: "apps-customers-listing",
        component: () => import("@/views/apps/customers/CustomersListing.vue"),
        meta: {
          pageTitle: "Customers Listing",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => import("@/views/apps/customers/CustomerDetails.vue"),
        meta: {
          pageTitle: "Customers Details",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/subscriptions/getting-started",
        name: "apps-subscriptions-getting-started",
        component: () =>
          import("@/views/apps/subscriptions/GettingStarted.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/subscription-list",
        name: "apps-subscriptions-subscription-list",
        component: () =>
          import("@/views/apps/subscriptions/SubscriptionList.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/add-subscription",
        name: "apps-subscriptions-add-subscription",
        component: () =>
          import("@/views/apps/subscriptions/AddSubscription.vue"),
        meta: {
          pageTitle: "Add Subscription",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/view-subscription",
        name: "apps-subscriptions-view-subscription",
        component: () =>
          import("@/views/apps/subscriptions/ViewSubscription.vue"),
        meta: {
          pageTitle: "View Subscription",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/Calendar.vue"),
        meta: {
          pageTitle: "Calendar",
          breadcrumbs: ["Apps"],
        },
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Private Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Group Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/views/apps/chat/DrawerChat.vue"),
        meta: {
          pageTitle: "Drawer Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
        meta: {
          pageTitle: "Invite Friends",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
        meta: {
          pageTitle: "View User",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
        meta: {
          pageTitle: "Upgrade Plan",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
        meta: {
          pageTitle: "Share And Earn",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
        meta: {
          pageTitle: "New Target",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
        meta: {
          pageTitle: "New Card",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
        meta: {
          pageTitle: "New Address",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
        meta: {
          pageTitle: "Create Api Key",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
        meta: {
          pageTitle: "Two Factory Auth",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
        meta: {
          pageTitle: "Create App",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
        meta: {
          pageTitle: "Create Account",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
        meta: {
          pageTitle: "Lists",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
        meta: {
          pageTitle: "Statistics",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
        meta: {
          pageTitle: "Charts",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
        meta: {
          pageTitle: "Mixed",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
        meta: {
          pageTitle: "Tables",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
        meta: {
          pageTitle: "Feeds",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
