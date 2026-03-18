export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;

  isActive: boolean;   
  order: number;       

  icon?: {
    url: string;
    publicId: string;
  };

  createdAt?: string; 
  updatedAt?: string; 
};