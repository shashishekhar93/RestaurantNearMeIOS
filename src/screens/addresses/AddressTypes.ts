// ============================================================
// ADDRESS TYPE
// ============================================================

export type Address = {
  id: string;

  title: string;

  addressLine1: string;

  addressLine2?: string;

  city: string;

  state?: string;

  postalCode?: string;

  isDefault?: boolean;

  type?: 'home' | 'work' | 'other';
};