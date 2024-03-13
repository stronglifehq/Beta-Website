export type ItemInfo = {
  id: string;
  category: string;
  url: string;
  title: string;
  details: string[];
  selected_option: number;
  rating: number;
  images: string[];
  options: {
    name: string;
    attributes: Array<{
      name: string;
      original_price: number | string;
      price: number | string;
    }>;
  };
};
