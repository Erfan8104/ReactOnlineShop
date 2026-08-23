import { z } from "zod";

import {
  updateProfileSchema,
  createAddressSchema,
  updateAddressSchema,
} from "./user.validator";

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export type CreateAddressDto = z.infer<typeof createAddressSchema>;

export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;
