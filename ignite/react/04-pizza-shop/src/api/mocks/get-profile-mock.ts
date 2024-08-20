import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "Ux01",
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "(31) 97070-7070",
      role: "manager",
      createdAt: new Date("Mon Aug 12 2024 20:19:44 GMT-0300"),
      updatedAt: new Date("Mon Aug 19 2024 20:19:44 GMT-0300"),
    });
  },
);
