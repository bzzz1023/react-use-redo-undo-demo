import { add, updateOrDelete } from "../api";

const useHandle = ({ setLoading, setCardDetailData, setQuesList }: any) => {
  const removeCardHandle = (id: any) => {
    setQuesList((preData: any) => {
      return preData.filter((item: any) => {
        return item.id !== id;
      });
    });
  };

  const addCardPre = async (params: any) => {
    setLoading(true);
    const res: any = await add(params);
    setLoading(false);
    return res;
  };

  const addCard = (params: any) => {
    setQuesList((preData: any) => {
      return [...preData, params];
    });
    return params.id
  };

  const removeCard = async (params: any) => {
    const { id } = params;
    setLoading(true);
    const res: any = await updateOrDelete(id);
    setLoading(false);
    if (res.code === 200) {
      removeCardHandle(id);
      setCardDetailData({});
    } else {
      return false;
    }
  };

  return {
    addCardPre,
    addCard,
    removeCard,
  } as const;
};

export default useHandle;
