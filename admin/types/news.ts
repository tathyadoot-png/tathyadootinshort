export type NewsCategory = {
  _id: string;
  name: string;
};

export type Structured = {
  who?: string;
  what?: string;
  when?: string;
  where?: string;
  why?: string;
  how?: string;
};

export type News = {
  _id: string;

  title: string;
  slug: string;

  excerpt?: string;
  detailedContent: string;

  category?: NewsCategory;

  tags?: string[];
  keywords?: string[];

  structured?: Structured;

  status: "draft" | "published";
  isBreaking: boolean;

  metaTitle?: string;
  metaDescription?: string;

  publishedAt?: string;
  location?: string;

  image?: {
    url: string;
    publicId: string;
  };

  createdAt: string;
  updatedAt: string;
};