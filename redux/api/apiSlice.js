import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithInterceptor from "@/redux/api/baseQueryWithInterceptor";

export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["User", "Products", "Orders"],
  endpoints: builder => ({
    login: builder.mutation({
      query: payload => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
    }),

    register: builder.mutation({
      query: payload => ({
        url: "/sign-up",
        method: "POST",
        body: payload,
      }),
    }),

    verifyOtp: builder.mutation({
      query: payload => ({
        url: "/verify/otp",
        method: "POST",
        body: payload,
      }),
    }),

    resendOtp: builder.mutation({
      query: payload => ({
        url: "/resend-otp",
        method: "POST",
        body: payload,
      }),
    }),

    forgetPassword: builder.mutation({
      query: payload => ({
        url: "/forget-password",
        method: "POST",
        body: payload,
      }),
    }),

    forgetPasswordVerifyOtp: builder.mutation({
      query: payload => ({
        url: "/forget-password/verify-otp",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: payload => ({
        url: "/reset-password",
        method: "POST",
        body: payload,
      }),
    }),

    submitContactInquiry: builder.mutation({
      query: payload => ({
        url: "/contact-us",
        method: "POST",
        body: payload,
      }),
    }),

    subscribeNewsletter: builder.mutation({
      query: payload => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: payload,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    getData: builder.query({
      query: ({ limit, color, price, search, category }) => ({
        url: "/products",
        method: "GET",
        params: {
          limit,
          color,
          price,
          search,
          category,
        },
      }),
    }),

    getAllData: builder.query({
      query: params => ({
        url: "/products",
        method: "GET",
        params,
      }),
    }),

    addProduct: builder.mutation({
      query: payload => ({
        url: "/products",
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["Products"],
    }),

    getPosts: builder.query({
      query: page => `/posts?_page=${page}&_limit=5`,
      keepUnusedDataFor: 60,
    }),

    getEvents: builder.query({
      query: (params) => ({
        url: "/events",
        method: "GET",
        params,
      }),
    }),

    getEventBySlug: builder.query({
      query: slug => ({
        url: `/events/${slug}`,
        method: "GET",
      }),
    }),

    getSeatsByEventId: builder.query({
      query: eventId => ({
        url: `/events/${eventId}/seats`,
        method: "GET",
      }),
    }),

    getShopCMS: builder.query({
      query: () => ({
        url: "/shop/cms",
        method: "GET",
      }),
    }),

    getShopGallery: builder.query({
      query: () => ({
        url: "/shop/gallery",
        method: "GET",
      }),
    }),

    getShopProducts: builder.query({
      query: () => ({
        url: "/shop/products",
        method: "GET",
      }),
    }),

    getProductDetails: builder.query({
      query: (id) => ({
        url: `/shop/products/${id}`,
        method: "GET",
      }),
    }),

    getHomePageCMS: builder.query({
      query: () => ({
        url: "/cms-pages/home-page",
        method: "GET",
      }),
    }),

    getFooterCMS: builder.query({
      query: () => ({
        url: "/cms-pages/footer",
        method: "GET",
      }),
    }),

    getPrivacyPolicyCMS: builder.query({
      query: () => ({
        url: "/cms-pages/privacy-policy",
        method: "GET",
      }),
    }),

    getTermsOfServiceCMS: builder.query({
      query: () => ({
        url: "/cms-pages/terms-of-service",
        method: "GET",
      }),
    }),

    getContactUsCMS: builder.query({
      query: () => ({
        url: "/cms-pages/contact-us",
        method: "GET",
      }),
    }),

    setupBooking: builder.mutation({
      query: (body) => ({
        url: "/bookings/setup",
        method: "POST",
        body,
      }),
    }),

    confirmBookingCheckout: builder.mutation({
      query: ({ reference, body }) => ({
        url: `/bookings/${reference}/checkout`,
        method: "POST",
        body,
      }),
    }),

    getBookingByReference: builder.query({
      query: reference => ({
        url: `/bookings/${reference}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useForgetPasswordVerifyOtpMutation,
  useResetPasswordMutation,
  useSubmitContactInquiryMutation,
  useSubscribeNewsletterMutation,
  useGetMeQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useGetPostsQuery,
  useGetEventsQuery,
  useGetEventBySlugQuery,
  useGetSeatsByEventIdQuery,
  useGetShopCMSQuery,
  useGetShopGalleryQuery,
  useGetShopProductsQuery,
  useGetProductDetailsQuery,
  useGetHomePageCMSQuery,
  useGetFooterCMSQuery,
  useGetPrivacyPolicyCMSQuery,
  useGetTermsOfServiceCMSQuery,
  useGetContactUsCMSQuery,
  useSetupBookingMutation,
  useConfirmBookingCheckoutMutation,
  useGetBookingByReferenceQuery,
} = apiSlice;
