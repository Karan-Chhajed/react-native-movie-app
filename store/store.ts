import { create } from 'zustand';

interface ReviewState {
  name: string;
  company: string;
  designation: string;
  email: string;
  linkedin: string;
  comments: string;
  errors: Partial<Record<string, string>>;

  setName: (value: string) => void;
  setCompany: (value: string) => void;
  setDesignation: (value: string) => void;
  setEmail: (value: string) => void;
  setLinkedin: (value: string) => void;
  setComments: (value: string) => void;
  validate: () => boolean;
  reset: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  name: '',
  company: '',
  designation: '',
  email: '',
  linkedin: '',
  comments: '',
  errors: {},

  setName: (value) => set((state) => ({ name: value, errors: { ...state.errors, name: '' } })),
  setCompany: (value) =>
    set((state) => ({
      company: value,
      errors: { ...state.errors, company: '' },
    })),
  setDesignation: (value) =>
    set((state) => ({
      designation: value,
      errors: { ...state.errors, designation: '' },
    })),
  setEmail: (value) => set((state) => ({ email: value, errors: { ...state.errors, email: '' } })),
  setLinkedin: (value) =>
    set((state) => ({
      linkedin: value,
      errors: { ...state.errors, linkedin: '' },
    })),
  setComments: (value) =>
    set((state) => ({
      comments: value,
      errors: { ...state.errors, comments: '' },
    })),

  validate: () => {
    const { name, email, company, designation } = get();
    const errors: Partial<Record<string, string>> = {};

    if (!name.trim()) errors.name = 'Name is required';
    if (!company.trim()) errors.company = 'Company is required';
    if (!designation.trim()) errors.designation = 'Designation is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  reset: () =>
    set({
      name: '',
      company: '',
      designation: '',
      email: '',
      linkedin: '',
      comments: '',
      errors: {},
    }),
}));
