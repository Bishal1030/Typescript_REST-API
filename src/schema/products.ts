import {z} from 'zod'


export const ProductSchema = z.object({
    id: z.number().int().optional(), // ID is usually optional when creating
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal"),
    tags: z
    .array(z.string().min(1, "Empty tags are not allowed"))
    .nonempty("At least one tag is required"),
    
})