import request from "@/api/request.js"

export const getVenues = () => {
  return request.get(`/venues/?applet=HiDancing`)
}