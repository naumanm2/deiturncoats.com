export type ProductItem = {
  id: string;
  title: string;
  price: string;
  cardTitle: string;
  cardDescription: string;
  deiOutImage1: string;
  deiOutImage2: string;
  deiOutImageAlt: string;
  deiOutDescription: string;
  deiInImage1: string;
  deiInImage2: string;
  deiInImageAlt: string;
  deiInDescription: string;
};

export type heroImages = {
  desktop: string[];
  mobile: string[];
};

export type Content = {
  site: { title: string; description: string };
  url: string;
  hero: {
    heroHeading: string;
    heroSubtitle: string;
    heroCTA: string;
    images: heroImages;
  };
  about: {
    heading: string;
    paragraph: string;
    ctaUrl: string;
    ctaText: string;
  };
  aboutPage: {
    heading: string;
    subtitle: string;
    headline: string;
    paragraph: string;
    images: heroImages;
    ctaText: string;
    ctaUrl: string;
    signature: string;
  };
  products: {
    productsTitle: string;
    items: ProductItem[];
  };
  legal: {
    headline:string;
    paragraph:string;
  }
};

