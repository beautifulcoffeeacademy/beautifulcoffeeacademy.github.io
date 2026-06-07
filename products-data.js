/* global window */
window.PRODUCTS = {
  "bca-medium-espresso": {
    id: "bca-medium-espresso",
    title: "BCA Medium Roast (Espresso)",
    subtitle: "Bourbon, Typica • Washed",
    metaLine: "1410 MASL • Kavre",
    price: 3200,
    weight: "1kg",
    rating: 5,
    description:
      "A smooth espresso roast from Kavre with gentle acidity, medium body, and a cocoa finish. This washed lot is balanced for rich crema and even extraction.",
    flavors: "Mild Acidity, Medium Body, Cocoa Finish",
    image: "BCA ESPRESSO ROAST.jpg",
    details: [
      { label: "Origin", value: "Kavre, Nepal" },
      { label: "Elevation/Altitude", value: "1410 MASL (Meters Above Sea Level)" },
      { label: "Varietal", value: "Bourbon, Typica" },
      { label: "Process", value: "Washed" },
      { label: "Net Weight", value: "1kg" },
    ],
  },
  "illam-washed": {
    id: "illam-washed",
    title: "Illam Washed",
    subtitle: "Bourbon, Caturra • Washed",
    metaLine: "1350 MASL • Mangsebung, Illam",
    price: 1500,
    weight: "200g",
    rating: 5,
    sold: true,
    description:
      "A bright washed coffee from Mangsebung in Illam, offering nutty sweetness, tea-like clarity, and delicate floral lift.",
    flavors: "Nutty, Tea, Sweet",
    image: "./illam.png",
    details: [
      { label: "Origin", value: "Mangsebung (Illam)" },
      { label: "Elevation/Altitude", value: "1350 MASL" },
      { label: "Varietal", value: "Bourbon, Caturra" },
      { label: "Process", value: "Washed" },
      { label: "Net Weight", value: "200g" },
    ],
  },
  "red-honey-rasuwa": {
    id: "red-honey-rasuwa",
    title: "Red Honey Rasuwa",
    subtitle: "Red Honey • Khalchet",
    metaLine: "1480 MASL • Rasuwa",
    price: 2100,
    weight: "200g",
    rating: 5,
    sold: true,
    description:
      "A floral red honey lot from Khalchet with mandarin and grape notes. Since you uploaded two label designs—red typography and black typography—the technical details are identical for both.",
    flavors: "Floral, Mandarin, Grapes",
    image: "./khalchet.png",
    details: [
      { label: "Origin", value: "Khalchet (Rasuwa)" },
      { label: "Elevation/Altitude", value: "1480 MASL" },
      { label: "Process", value: "Red Honey" },
      { label: "Flavour Profile/Notes", value: "Floral, Mandarin & Grapes" },
      { label: "Net Weight", value: "200g" },
    ],
  },
};

window.PRODUCT_LIST = Object.values(window.PRODUCTS);
