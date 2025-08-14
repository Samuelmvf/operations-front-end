export const LOGIN_ROUTE = "/login";
export const OPERATIONS_ROUTE = "/operations";
export const NEW_OPERATION_ROUTE = "/operations/new-operation";
export const USER_RECORDS_ROUTE = "/operations/user-records";

const routes = [
  {
    path: "/",
    redirect: LOGIN_ROUTE,
    meta: {
      auth: {
        required: false,
      },
    },
  },
  {
    path: LOGIN_ROUTE,
    component: () => import("@/views/auth/AuthView.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/auth/pages/LoginPage.vue"),
        meta: {
          title: "Login - Operations",
          auth: {
            required: false,
          },
        },
      },
    ],
  },
  {
    path: OPERATIONS_ROUTE,
    component: () => import("@/views/operations/OperationView.vue"),
    children: [
      {
        path: "",
        redirect: { name: "UserRecords" },
        meta: {
          auth: { required: true },
        },
      },
      {
        path: USER_RECORDS_ROUTE,
        name: "UserRecords",
        component: () => import("@/views/operations/pages/UserRecordsPage.vue"),
        meta: {
          title: "User Records",
          auth: { required: true },
        },
        children: [
          {
            path: NEW_OPERATION_ROUTE,
            name: "NewOperation",
            meta: {
              title: "New Operation",
              auth: { required: true },
            },
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
    meta: {
      title: "404 - Page Not Found",
    },
  },
];

export default routes;
