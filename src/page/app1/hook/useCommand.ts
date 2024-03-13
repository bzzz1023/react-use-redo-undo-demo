type IAddCardCommand = {
  id?: string;
  name: string;
  content: string;
};

const useCommand = ({ commandMap, addCardPre }: any) => {
  const addCardCommand = async (params: IAddCardCommand) => {
    commandMap.AddCard(params);
  };

  const delCardCommand = (params: any) => {};

  const moveCardCommand = (params: any) => {};

  const updateCardCommand = (params: any) => {};

  return {
    addCardCommand,
    delCardCommand,
    moveCardCommand,
    updateCardCommand,
  };
};

export default useCommand;
