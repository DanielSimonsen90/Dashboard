import createBaseStore from "../BaseStore";

/**
 * ### UserStore hook
 * Upon calling request function (that will either check cache or request mock api), the user data is provided.
 * This forces the data to be async to avoid manual check if data is loaded.
 * For that reason, the custom component, "Suspense", is used as a wrapper to ensure the data is loaded before using its data.
 * 
 * Skeleton values are not required for UserStore, as the Dashboard should only be provided to a logged-in user.
 * 
 * @uses Suspense from ~/components/Suspense
 */
export const useUserStore = createBaseStore('users');