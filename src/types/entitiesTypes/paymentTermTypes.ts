export enum paymentTermTypesEnum {
  returnable = "RT",
  partialyreturnable = "PR",
  irrevocable = "IR",
}

export const paymentTermTypesForDisplay = {
  RT: "Возвратный",
  PR: "Частично возвратный",
  IR: "Невозвратный",
};

export const paymentTermTypesValues = [
  {
    id: paymentTermTypesEnum.returnable,
    name: paymentTermTypesForDisplay.RT,
  },
  {
    id: paymentTermTypesEnum.partialyreturnable,
    name: paymentTermTypesForDisplay.PR,
  },
  {
    id: paymentTermTypesEnum.irrevocable,
    name: paymentTermTypesForDisplay.IR,
  },
];