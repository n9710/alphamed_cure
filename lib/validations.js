import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid business email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().min(2, 'Healthcare organization or company name is required'),
  phone: z.string().min(7, 'A valid contact phone number is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const inquiryItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
  notes: z.string().optional(),
});

export const submitInquirySchema = z.object({
  notes: z.string().optional(),
  items: z.array(inquiryItemSchema).min(1, 'At least one item is required in the inquiry'),
});
