type Address = { address: string; city: string };
type PresentDeliveryList<List> = {
  [Key in keyof List]: Address;
};
