import axios from "axios";

export const baseClient = axios.create({
  validateStatus: () => true
})